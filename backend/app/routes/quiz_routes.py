from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, QuizAttempt, Leaderboard
from datetime import datetime
import os, json

bp = Blueprint('quiz', __name__, url_prefix='/api/quiz')

@bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_quiz():
    """Submit quiz attempt and calculate score"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    # Validate required fields
    if not data or 'answers' not in data or 'time_spent' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    answers = data['answers']  # List of {question_id, selected_answer}
    time_spent = data['time_spent']  # Time in seconds
    
    # Server-side authoritative scoring: load question keys from data file
    questions_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'quiz_questions.json')
    correct_map = {}
    try:
        with open(questions_file, 'r') as f:
            q_list = json.load(f)
            for q in q_list:
                correct_map[int(q.get('id'))] = int(q.get('correct'))
    except Exception:
        correct_map = {}

    correct_count = 0
    total_questions = len(correct_map) if correct_map else len(answers) or 10

    if correct_map:
        for answer in answers:
            q_id = answer.get('question_id')
            selected = answer.get('selected_answer')
            if q_id is None or selected is None:
                continue
            if correct_map.get(int(q_id)) == int(selected):
                correct_count += 1
        score = int((correct_count / total_questions) * 100)
    else:
        # As a fallback, accept client-provided score if present
        if 'score' in data and isinstance(data['score'], int):
            score = int(data['score'])
            correct_count = int(data.get('correct_answers', 0))
        else:
            # Best-effort: count answers provided but cannot validate
            correct_count = 0
            provided = 0
            for answer in answers:
                if answer is None:
                    continue
                if answer.get('selected_answer') is not None:
                    provided += 1
            provided = provided or total_questions
            score = int((correct_count / provided) * 100) if provided > 0 else 0
    
    # Save quiz attempt
    attempt = QuizAttempt(
        user_id=user_id,
        score=score,
        correct_answers=correct_count,
        total_questions=len(QUIZ_QUESTIONS),
        time_spent=time_spent,
        answers=answers
    )
    
    db.session.add(attempt)
    
    # Update leaderboard
    leaderboard = Leaderboard.query.filter_by(user_id=user_id).first()
    if not leaderboard:
        leaderboard = Leaderboard(user_id=user_id)
        db.session.add(leaderboard)
    
    leaderboard.total_quiz_attempts += 1
    leaderboard.total_time_spent += time_spent
    
    # Recalculate average score
    all_attempts = QuizAttempt.query.filter_by(user_id=user_id).all()
    if all_attempts:
        avg = sum([a.score for a in all_attempts + [attempt]]) / (len(all_attempts) + 1)
        leaderboard.average_score = avg
    
    db.session.commit()
    
    return jsonify({
        'message': 'Quiz submitted successfully',
        'quiz_id': attempt.id,
        'score': score,
        'correct_answers': correct_count,
        'total_questions': len(QUIZ_QUESTIONS),
        'security_level': user.get_security_level()
    }), 201

@bp.route('/history', methods=['GET'])
@jwt_required()
def get_quiz_history():
    """Get user's quiz attempt history"""
    user_id = get_jwt_identity()
    
    attempts = QuizAttempt.query.filter_by(user_id=user_id).order_by(QuizAttempt.created_at.desc()).all()
    
    return jsonify({
        'total_attempts': len(attempts),
        'attempts': [a.to_dict() for a in attempts]
    }), 200

@bp.route('/stats', methods=['GET'])
@jwt_required()
def get_quiz_stats():
    """Get user's quiz statistics"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    attempts = QuizAttempt.query.filter_by(user_id=user_id).all()
    
    if not attempts:
        return jsonify({
            'total_attempts': 0,
            'average_score': 0,
            'best_score': 0,
            'worst_score': 0,
            'total_time_spent': 0,
            'security_level': 'Beginner'
        }), 200
    
    scores = [a.score for a in attempts]
    total_time = sum([a.time_spent for a in attempts])
    
    return jsonify({
        'total_attempts': len(attempts),
        'average_score': round(sum(scores) / len(scores), 2),
        'best_score': max(scores),
        'worst_score': min(scores),
        'total_time_spent': total_time,
        'security_level': user.get_security_level()
    }), 200
