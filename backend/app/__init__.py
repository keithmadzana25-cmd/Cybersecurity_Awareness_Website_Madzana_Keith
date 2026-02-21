from flask import Flask, send_from_directory, render_template_string
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import config
import os

db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name='development'):
    """Application factory"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": app.config['CORS_ORIGINS']}})
    
    # Register blueprints
    from app.routes import auth_routes, quiz_routes, leaderboard_routes, user_routes
    
    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(quiz_routes.bp)
    app.register_blueprint(leaderboard_routes.bp)
    app.register_blueprint(user_routes.bp)
    
    # Serve static files and root route
    @app.route('/')
    def serve_index():
        """Serve index.html from frontend"""
        # Try workspace mount first (docker), then fallback to relative path
        index_paths = [
            '/workspace/index.html',  # Docker mount path
            os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '..', 'index.html')  # Relative path
        ]
        
        for index_path in index_paths:
            if os.path.exists(index_path):
                with open(index_path, 'r') as f:
                    return f.read()
        
        return 'Frontend not found', 404
    
    @app.route('/<path:filename>')
    def serve_static(filename):
        """Serve static files (CSS, JS, etc.)"""
        # Try workspace mount first (docker), then fallback to relative path
        static_dirs = [
            '/workspace',  # Docker mount path
            os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Relative path
        ]
        
        for static_dir in static_dirs:
            static_path = os.path.join(static_dir, filename)
            if os.path.isfile(static_path):
                return send_from_directory(static_dir, filename)
        
        return 'Not found', 404
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app
