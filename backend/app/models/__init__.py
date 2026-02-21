from datetime import datetime
from app import db
import bcrypt

class User(db.Model):
    """User model for authentication and profile management"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False, index=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    country = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    # Relationships
    quiz_attempts = db.relationship('QuizAttempt', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    scenario_attempts = db.relationship('ScenarioAttempt', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    certificates = db.relationship('Certificate', backref='user', lazy='dynamic', cascade='all, delete-orphan')
    
    def set_password(self, password):
        """Hash and set password"""
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        """Verify password"""
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))
    
    def get_security_level(self):
        """Calculate user's security level based on quiz performance"""
        avg_score = db.session.query(db.func.avg(QuizAttempt.score)).filter_by(user_id=self.id).scalar()
        if avg_score is None:
            return "Beginner"
        if avg_score >= 90:
            return "Expert"
        elif avg_score >= 80:
            return "Advanced"
        elif avg_score >= 70:
            return "Intermediate"
        else:
            return "Beginner"
    
    def to_dict(self):
        """Convert user to dictionary"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'country': self.country,
            'created_at': self.created_at.isoformat(),
            'security_level': self.get_security_level()
        }

class QuizAttempt(db.Model):
    """Track user's quiz attempts"""
    __tablename__ = 'quiz_attempts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    score = db.Column(db.Integer, nullable=False)  # Score out of 100
    total_questions = db.Column(db.Integer, default=10)
    correct_answers = db.Column(db.Integer, nullable=False)
    time_spent = db.Column(db.Integer)  # Time in seconds
    answers = db.Column(db.JSON)  # Detailed answers for analysis
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'score': self.score,
            'correct_answers': self.correct_answers,
            'total_questions': self.total_questions,
            'time_spent': self.time_spent,
            'created_at': self.created_at.isoformat(),
            'percentage': (self.correct_answers / self.total_questions * 100) if self.total_questions > 0 else 0
        }

class ScenarioAttempt(db.Model):
    """Track user's scenario question attempts"""
    __tablename__ = 'scenario_attempts'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    scenario_id = db.Column(db.Integer, nullable=False)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, index=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'scenario_id': self.scenario_id,
            'completed': self.completed,
            'created_at': self.created_at.isoformat()
        }

class Certificate(db.Model):
    """Store generated certificates for users who reach Expert level"""
    __tablename__ = 'certificates'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, index=True)
    certificate_code = db.Column(db.String(50), unique=True, nullable=False)
    level = db.Column(db.String(20), nullable=False)  # Expert, Advanced, etc.
    issued_date = db.Column(db.DateTime, default=datetime.utcnow)
    expires_date = db.Column(db.DateTime)  # Optional expiration date
    
    def to_dict(self):
        return {
            'id': self.id,
            'certificate_code': self.certificate_code,
            'level': self.level,
            'issued_date': self.issued_date.isoformat(),
            'expires_date': self.expires_date.isoformat() if self.expires_date else None
        }

class Leaderboard(db.Model):
    """Aggregate leaderboard data for performance"""
    __tablename__ = 'leaderboard'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True, index=True)
    total_quiz_attempts = db.Column(db.Integer, default=0)
    average_score = db.Column(db.Float, default=0.0)
    total_scenarios_completed = db.Column(db.Integer, default=0)
    total_time_spent = db.Column(db.Integer, default=0)  # Total time in seconds
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    rank = db.Column(db.Integer)  # Updated periodically
    
    def to_dict(self):
        user = User.query.get(self.user_id)
        return {
            'rank': self.rank,
            'username': user.username,
            'total_attempts': self.total_quiz_attempts,
            'average_score': round(self.average_score, 2),
            'scenarios_completed': self.total_scenarios_completed,
            'security_level': user.get_security_level()
        }
