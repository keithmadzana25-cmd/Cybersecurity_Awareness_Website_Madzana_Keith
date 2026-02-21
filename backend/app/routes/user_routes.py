from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Certificate
from datetime import datetime, timedelta
import uuid

bp = Blueprint('user', __name__, url_prefix='/api/user')

@bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get user profile"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'user': user.to_dict()}), 200

@bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update user profile"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    # Update fields
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'country' in data:
        user.country = data['country']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Profile updated successfully',
        'user': user.to_dict()
    }), 200

@bp.route('/certificates', methods=['GET'])
@jwt_required()
def get_certificates():
    """Get user's certificates"""
    user_id = get_jwt_identity()
    
    certificates = Certificate.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'total_certificates': len(certificates),
        'certificates': [c.to_dict() for c in certificates]
    }), 200

@bp.route('/certificates/generate', methods=['POST'])
@jwt_required()
def generate_certificate():
    """Generate certificate if user has reached Expert level"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    security_level = user.get_security_level()
    
    if security_level != 'Expert':
        return jsonify({
            'error': 'User must reach Expert level to receive certificate',
            'current_level': security_level
        }), 400
    
    # Check if user already has certificate for this level
    existing = Certificate.query.filter_by(user_id=user_id, level=security_level).first()
    if existing:
        return jsonify({
            'message': 'Certificate already exists',
            'certificate': existing.to_dict()
        }), 200
    
    # Generate new certificate
    cert_code = str(uuid.uuid4())[:12].upper()
    certificate = Certificate(
        user_id=user_id,
        certificate_code=cert_code,
        level=security_level,
        expires_date=datetime.utcnow() + timedelta(days=365)  # 1 year validity
    )
    
    db.session.add(certificate)
    db.session.commit()
    
    return jsonify({
        'message': 'Certificate generated successfully',
        'certificate': certificate.to_dict()
    }), 201

@bp.route('/delete-account', methods=['POST'])
@jwt_required()
def delete_account():
    """Delete user account and all associated data"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Verify password
    data = request.get_json()
    if not data or not data.get('password'):
        return jsonify({'error': 'Password required to delete account'}), 400
    
    if not user.check_password(data['password']):
        return jsonify({'error': 'Invalid password'}), 401
    
    # Delete user and all related data (cascading)
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message': 'Account deleted successfully'}), 200
