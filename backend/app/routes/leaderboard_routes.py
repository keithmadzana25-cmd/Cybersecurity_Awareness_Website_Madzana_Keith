from flask import Blueprint, request, jsonify
from app import db
from app.models import Leaderboard, User, QuizAttempt

bp = Blueprint('leaderboard', __name__, url_prefix='/api/leaderboard')

def update_leaderboard_rankings():
    """Update ranking for all users based on average score"""
    leaderboards = Leaderboard.query.order_by(Leaderboard.average_score.desc()).all()
    for idx, lb in enumerate(leaderboards, 1):
        lb.rank = idx
    db.session.commit()

@bp.route('/global', methods=['GET'])
def get_global_leaderboard():
    """Get global leaderboard with top 100 users"""
    limit = request.args.get('limit', 100, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    # Update rankings
    update_leaderboard_rankings()
    
    leaderboards = Leaderboard.query.order_by(Leaderboard.rank).limit(limit).offset(offset).all()
    total_users = Leaderboard.query.count()
    
    return jsonify({
        'total_users': total_users,
        'leaderboard': [lb.to_dict() for lb in leaderboards]
    }), 200

@bp.route('/top10', methods=['GET'])
def get_top_10():
    """Get top 10 users"""
    update_leaderboard_rankings()
    
    leaderboards = Leaderboard.query.order_by(Leaderboard.rank).limit(10).all()
    
    return jsonify({
        'top_10': [lb.to_dict() for lb in leaderboards]
    }), 200

@bp.route('/by-language', methods=['GET'])
def get_leaderboard_by_language():
    """Get leaderboard filtered by language/country"""
    country = request.args.get('country')
    limit = request.args.get('limit', 50, type=int)
    
    if not country:
        return jsonify({'error': 'Country parameter required'}), 400
    
    update_leaderboard_rankings()
    
    # Get users from specific country
    users = User.query.filter_by(country=country).all()
    user_ids = [u.id for u in users]
    
    leaderboards = Leaderboard.query.filter(Leaderboard.user_id.in_(user_ids)).order_by(
        Leaderboard.average_score.desc()
    ).limit(limit).all()
    
    return jsonify({
        'country': country,
        'leaderboard': [lb.to_dict() for lb in leaderboards]
    }), 200

@bp.route('/user-rank/<int:user_id>', methods=['GET'])
def get_user_rank(user_id):
    """Get specific user's rank and stats"""
    leaderboard = Leaderboard.query.filter_by(user_id=user_id).first()
    
    if not leaderboard:
        return jsonify({'error': 'User not found'}), 404
    
    total_users = Leaderboard.query.count()
    user = User.query.get(user_id)
    
    return jsonify({
        'rank': leaderboard.rank,
        'total_users': total_users,
        'percentile': round((leaderboard.rank / total_users) * 100, 2) if total_users > 0 else 0,
        'user_stats': leaderboard.to_dict()
    }), 200
