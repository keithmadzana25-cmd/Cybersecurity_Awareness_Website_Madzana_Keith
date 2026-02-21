# CyberSecurity Awareness Platform - Backend

## Overview
Flask-based REST API backend for the CyberSecurity Awareness Platform with user authentication, quiz tracking, global leaderboards, and certificate generation.

## Features Implemented

### Phase 1: Core Backend Infrastructure
- ✅ User authentication (Registration, Login, JWT tokens)
- ✅ User profile management
- ✅ Quiz history tracking with detailed analytics
- ✅ Global leaderboards with ranking system
- ✅ Certificate generation (Expert level)
- ✅ Password security management
- ✅ CORS enabled for frontend integration

## Database Schema

### Users Table
- User profiles with authentication
- Security level calculation
- Account management

### QuizAttempt Table
- Track all quiz submissions
- Store scores, time spent, detailed answers
- Analysis and progress tracking

### ScenarioAttempt Table
- Track scenario question completion
- Performance metrics

### Certificate Table
- Store generated certificates
- Validity tracking
- Certificate codes

### Leaderboard Table
- Global rankings
- Aggregated statistics
- Performance metrics

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login              - Login user (returns JWT)
GET    /api/auth/verify             - Verify token
POST   /api/auth/change-password    - Change password
```

### Quiz Management
```
POST   /api/quiz/submit             - Submit quiz attempt
GET    /api/quiz/history            - Get user's quiz history
GET    /api/quiz/stats              - Get user's statistics
```

### Leaderboards
```
GET    /api/leaderboard/global      - Get global leaderboard
GET    /api/leaderboard/top10       - Get top 10 users
GET    /api/leaderboard/by-language - Filter by country
GET    /api/leaderboard/user-rank/<user_id> - Get specific user rank
```

### User Management
```
GET    /api/user/profile            - Get user profile
PUT    /api/user/profile            - Update profile
GET    /api/user/certificates       - Get user certificates
POST   /api/user/certificates/generate - Generate certificate
POST   /api/user/delete-account     - Delete account
```

## Installation

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- pip

### Setup Steps

1. **Clone repository and navigate to backend:**
```bash
cd backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. **Initialize database:**
```bash
python
>>> from app import create_app, db
>>> app = create_app()
>>> with app.app_context():
>>>     db.create_all()
>>> exit()
```

6. **Run development server:**
```bash
python run.py
```

Server will start at `http://localhost:5000`

## Future Enhancements (Phases 2-3)

### Phase 2: Advanced Features
- [ ] AI-powered adaptive learning paths
- [ ] Multimedia content (videos, voice-overs)
- [ ] Dynamic threat intelligence feeds
- [ ] Certificate download/printing

### Phase 3: Expansion
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced simulations
- [ ] Real-time notifications
- [ ] Analytics dashboard
- [ ] Admin panel

## Testing

```bash
# Run tests
pytest

# With coverage
pytest --cov=app
```

## Deployment

### Using Heroku
```bash
heroku login
heroku create your-app-name
git push heroku main
heroku run python -c "from app import create_app, db; app = create_app('production'); db.create_all()"
```

### Using Docker
```bash
docker build -t cybersecurity-backend .
docker run -p 5000:5000 cybersecurity-backend
```

## Security Notes
- Always change `JWT_SECRET_KEY` in production
- Use HTTPS for all API calls
- Implement rate limiting for production
- Add CSRF protection
- Enable HTTPS only cookies
- Implement request validation

## Support
For issues or questions, contact: keith.madzana25@vupune.ac.in
