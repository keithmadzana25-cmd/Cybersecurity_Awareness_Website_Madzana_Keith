# System Architecture & Data Flow

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE (HTML)                        │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ index.html │ scenario.html │ Navigation │ Quiz │ Leaderboard │  │
│  └───────────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  FRONTEND MODULES   │
                    ├─────────────────────┤
                    │ api-client.js       │
                    │ auth-module.js      │
                    │ quiz-module.js      │
                    │ leaderboard-mod.js  │
                    │ certificate-mod.js  │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │    HTTPS/REST  │                │
              │                │                │
              ▼                ▼                ▼
        ┌─────────────┐  ┌──────────┐  ┌──────────┐
        │  Port 5000  │  │Port 8000 │  │CORS/TLS │
        └─────────────┘  └──────────┘  └──────────┘
              │
    ┌─────────▼──────────┐
    │  FLASK BACKEND     │
    ├────────────────────┤
    │ auth_routes.py     │
    │ quiz_routes.py     │
    │ leaderboard_routes │
    │ user_routes.py     │
    │                    │
    │ JWT Verification   │
    │ Input Validation   │
    │ Bcrypt Hashing     │
    └────────┬───────────┘
             │
             │ SQL Queries
             │
    ┌────────▼──────────────┐
    │  PostgreSQL DATABASE  │
    ├───────────────────────┤
    │ users                 │
    │ quiz_attempts         │
    │ scenario_attempts     │
    │ certificates          │
    │ leaderboard           │
    │                       │
    │ 5 Models              │
    │ Relationships         │
    │ Constraints           │
    └───────────────────────┘
```

---

## User Authentication Flow

```
REGISTRATION
─────────────────────────────────────────────────────────────────
1. User fills form → 
2. Frontend sends POST to /api/auth/register →
3. Backend validates input →
4. Check if user exists →
5. Hash password with bcrypt →
6. Store in database →
7. Return user object
8. Auto-login user


LOGIN
─────────────────────────────────────────────────────────────────
1. User enters credentials →
2. Frontend sends POST to /api/auth/login →
3. Backend fetches user from DB →
4. Compare password hash →
5. Generate JWT token (30-day expiry) →
6. Return token + user data →
7. Store token in localStorage →
8. Include token in all future requests


PROTECTED REQUESTS
─────────────────────────────────────────────────────────────────
1. Frontend reads token from localStorage →
2. Add to Authorization header →
3. Send request: GET /api/quiz/stats →
4. Backend extracts token →
5. Verify JWT signature →
6. Extract user_id from token →
7. Execute request for that user →
8. Return user-specific data
```

---

## Quiz Submission Flow

```
QUIZ SUBMISSION PROCESS
─────────────────────────────────────────────────────────────────

USER PERSPECTIVE:
  1. User takes 10-question quiz
  2. Selects answers
  3. Timer tracks time
  4. Clicks "Submit Quiz"

FRONTEND PROCESSING:
  1. Collect selected answers
  2. Calculate time spent
  3. Format data:
     {
       "answers": [
         {"question_id": 0, "selected_answer": 2},
         ...
       ],
       "time_spent": 600
     }
  4. Add JWT token to headers
  5. POST to /api/quiz/submit

BACKEND PROCESSING:
  1. Verify JWT token
  2. Get user_id from token
  3. Validate answer format
  4. Compare against correct answers:
     - Question 0: correct = 2 ✓
     - Question 1: correct = 1 ✓
     - ... (all 10 questions)
  5. Calculate score
     Score = (8/10) * 100 = 80%
  6. Create QuizAttempt record
  7. Update Leaderboard:
     - Increment attempt count
     - Recalculate average score
  8. Determine security level:
     - Average 90%+ = Expert
     - Average 80%+ = Advanced
     - Average 70%+ = Intermediate
     - Below 70% = Beginner

FRONTEND RESULT:
  1. Receive response with score
  2. Display: "You scored 80%"
  3. Show security level: "Intermediate"
  4. Display correct/incorrect count
  5. Allow review of answers
  6. Update local storage

DATABASE UPDATE:
  quiz_attempts table:
  ├─ id: 15
  ├─ user_id: 1
  ├─ score: 80
  ├─ correct_answers: 8
  ├─ total_questions: 10
  ├─ time_spent: 600
  ├─ answers: [JSON of answers]
  └─ created_at: 2024-02-21 10:30:00

  leaderboard table:
  ├─ user_id: 1
  ├─ total_quiz_attempts: 5 (incremented)
  ├─ average_score: 76.0 (recalculated)
  ├─ total_time_spent: 3600
  └─ rank: (updated)
```

---

## Leaderboard Calculation Flow

```
LEADERBOARD RANKING PROCESS
─────────────────────────────────────────────────────────────────

TRIGGER: When quiz is submitted

STEP 1: Calculate each user's stats
  For each user in database:
    - Sum all quiz attempts
    - Calculate average score
    - Count scenarios completed
    - sum time spent learning

STEP 2: Sort by average score (descending)
  
  User1: 95.2% → Rank 1
  User2: 92.5% → Rank 2
  User3: 88.0% → Rank 3
  User4: 76.0% → Rank 4
  ...
  User250: 45.0% → Rank 250

STEP 3: Assign security levels
  if avg_score >= 90:     level = "Expert"
  elif avg_score >= 80:   level = "Advanced"
  elif avg_score >= 70:   level = "Intermediate"
  else:                   level = "Beginner"

STEP 4: Calculate percentiles
  Rank 1 out of 250 = Top 0.4%
  Rank 5 out of 250 = Top 2%
  Rank 50 out of 250 = Top 20%

GLOBAL LEADERBOARD RESPONSE:
  {
    "total_users": 250,
    "leaderboard": [
      {
        "rank": 1,
        "username": "security_master",
        "total_attempts": 45,
        "average_score": 95.2,
        "scenarios_completed": 30,
        "security_level": "Expert"
      },
      {
        "rank": 2,
        "username": "cyber_warrior",
        ...
      }
    ]
  }

COUNTRY-SPECIFIC LEADERBOARD:
  Filter users by country
  Re-rank within that country
  Same calculation process
```

---

## Certificate Generation Flow

```
CERTIFICATE GENERATION PROCESS
─────────────────────────────────────────────────────────────────

ELIGIBILITY CHECK:
  1. User clicks "Generate Certificate"
  2. Frontend calls POST /api/user/certificates/generate
  3. Backend verifies user is authenticated

SECURITY LEVEL CALCULATION:
  1. Query all quiz attempts for user
  2. Calculate average score
  3. Determine security level:
     - 90%+ = Expert ✓ (Can get certificate)
     - 80-89% = Advanced ✗ (Not eligible)
     - <80% = Beginner/Intermediate ✗

CERTIFICATE GENERATION (if Expert):
  1. Generate unique code:
     - UUID shortened: "CERT201A2024"
  2. Set issue date: current timestamp
  3. Set expiry date: current + 1 year
  4. Create certificate record:
     {
       "id": 1,
       "user_id": 1,
       "certificate_code": "CERT201A2024",
       "level": "Expert",
       "issued_date": "2024-02-21T10:30:00",
       "expires_date": "2025-02-21T10:30:00"
     }

PDF GENERATION (Future):
  1. Fetch certificate data
  2. Use jsPDF/html2pdf
  3. Generate formatted PDF:
     ┌─────────────────────────────┐
     │  CERTIFICATE OF ACHIEVEMENT │
     │  Expert Level               │
     │  Award to: John Doe         │
     │  Code: CERT201A2024         │
     │  Issued: Feb 21, 2024       │
     │  Expires: Feb 21, 2025      │
     └─────────────────────────────┘
  4. Download to user's device

VERIFICATION (Future):
  1. User shares certificate code
  2. Employer visits verification page
  3. Enter code: "CERT201A2024"
  4. System returns:
     - Certificate valid ✓
     - User name: John Doe
     - Level: Expert
     - Expiry: Feb 21, 2025
```

---

## Database Schema Relationships

```
┌──────────────────────────────────────────────────────────────────┐
│                         USERS TABLE                              │
├──────────────────────────────────────────────────────────────────┤
│ PK: id                                                           │
│ username (UNIQUE)                                                │
│ email (UNIQUE)                                                   │
│ password_hash (bcrypt)                                           │
│ first_name, last_name, country                                   │
│ created_at, last_login                                           │
│ is_active                                                        │
└──┬──────────────────────────────────────────────────────────────┘
   │
   ├──────────────────────────┬──────────────────────────┬─────────────────┐
   │                          │                          │                 │
   ▼                          ▼                          ▼                 ▼
   │                          │                          │                 │
┌──┴──────────────────┐  ┌───┴──────────────────┐  ┌──┴──────────────┐  ┌┴──────────────────┐
│ QUIZ_ATTEMPTS       │  │ SCENARIO_ATTEMPTS    │  │ CERTIFICATES    │  │ LEADERBOARD       │
├─────────────────────┤  ├──────────────────────┤  ├─────────────────┤  ├───────────────────┤
│ PK: id              │  │ PK: id               │  │ PK: id          │  │ id (1-to-1)       │
│ FK: user_id         │  │ FK: user_id          │  │ FK: user_id     │  │ FK: user_id       │
│ score               │  │ scenario_id          │  │ cert_code       │  │ total_quiz_att.   │
│ correct_answers     │  │ completed            │  │ level           │  │ average_score     │
│ total_questions     │  │ created_at           │  │ issued_date     │  │ scenarios_compl.  │
│ time_spent          │  │                      │  │ expires_date    │  │ total_time_spent  │
│ answers (JSON)      │  │                      │  │                 │  │ rank              │
│ created_at          │  │                      │  │                 │  │ last_updated      │
└─────────────────────┘  └──────────────────────┘  └─────────────────┘  └───────────────────┘

RELATIONSHIPS:
- 1 User → Many QuizAttempts (1-to-Many)
- 1 User → Many ScenarioAttempts (1-to-Many)
- 1 User → Many Certificates (1-to-Many)
- 1 User → 1 Leaderboard (1-to-1)

CASCADING DELETES:
- Delete User → Delete all QuizAttempts, Certificates, etc.
- Maintains referential integrity
```

---

## Request/Response Example

```
CLIENT REQUEST:
─────────────────────────────────────────────────────────────────
POST /api/quiz/submit
Host: localhost:5000
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "answers": [
    {"question_id": 0, "selected_answer": 2},
    {"question_id": 1, "selected_answer": 1},
    {"question_id": 2, "selected_answer": 3},
    {"question_id": 3, "selected_answer": 0},
    {"question_id": 4, "selected_answer": 2},
    {"question_id": 5, "selected_answer": 1},
    {"question_id": 6, "selected_answer": 3},
    {"question_id": 7, "selected_answer": 2},
    {"question_id": 8, "selected_answer": 1},
    {"question_id": 9, "selected_answer": 0}
  ],
  "time_spent": 600
}

SERVER PROCESSING:
─────────────────────────────────────────────────────────────────
1. Verify JWT token ✓ (user_id = 1)
2. Validate request format ✓
3. Calculate score:
   - Correct answers: 8/10
   - Score: 80%
4. Create database record
5. Update leaderboard
6. Calculate security level

SERVER RESPONSE:
─────────────────────────────────────────────────────────────────
HTTP/1.1 201 CREATED
Content-Type: application/json

{
  "message": "Quiz submitted successfully",
  "quiz_id": 15,
  "score": 80,
  "correct_answers": 8,
  "total_questions": 10,
  "security_level": "Intermediate"
}

FRONTEND PROCESSING:
─────────────────────────────────────────────────────────────────
1. Parse JSON response ✓
2. Display score: "80%"
3. Show level: "Intermediate"
4. Update leaderboard (optional)
5. Show confetti/celebration (optional)
6. Offer to share or continue learning
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    PRODUCTION ENVIRONMENT                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐              ┌─────────────────────────────┐   │
│  │   Browser   │              │  Load Balancer (Nginx)      │   │
│  │  (HTTPS)    │──────────────│  Port 443/80                │   │
│  └─────────────┘              └────────────┬────────────────┘   │
│                                            │                     │
│                    ┌───────────────────────┼───────────────────┐ │
│                    │                       │                   │ │
│              ┌─────▼──────┐      ┌────────▼────────┐  ┌──────▼──┐
│              │  Frontend   │      │  Backend API #1 │  │Backend #2
│              │  (Static)   │      │  (Gunicorn)     │  │(Scaling)
│              │  Port 80    │      │  Port 5000-5003 │  │         
│              └─────┬──────┘      └────────┬────────┘  └──────┬──┘
│                    │                      │                   │
│                    └──────────────────────┼───────────────────┘
│                                           │
│                                    ┌──────▼────────┐
│                                    │  PostgreSQL   │
│                                    │  RDS (AWS)    │
│                                    │  Replicated   │
│                                    │  Backed up    │
│                                    └───────────────┘

LOCAL DEVELOPMENT:
─────────────────────────────────────────────────────────────────
docker-compose up -d
├─ PostgreSQL (localhost:5432)
├─ Flask API (localhost:5000)
└─ Frontend (localhost:8000)
```

---

## Security Flow

```
PASSWORD SECURITY
─────────────────────────────────────────────────────────────────
User Password: "MyPassword123!"
         ↓
    bcrypt.hashpw()
    (salt: automatically generated)
         ↓
hash: $2b$12$R9h/cIPz0gi.URNNGO3He.OPST9/PgBkqq8Kd0QFW5...
         ↓
    Stored in database
         ↓
Login attempt: "MyPassword123!"
         ↓
bcrypt.checkpw(input, stored_hash)
         ↓
Valid: ✓ Generate JWT token
Invalid: ✗ Return 401 error

JWT AUTHENTICATION
─────────────────────────────────────────────────────────────────
Login response includes:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                   .eyJ1c2VyX2lkIjogMSwgZXhwIjogMTcwODU...
                   .qJtG3k2g9KdL8mNp..."
}
         ↓
Store in localStorage:
localStorage.setItem('access_token', token)
         ↓
On each API request:
Authorization: Bearer eyJhbGciOi...
         ↓
Backend verifies:
- Signature is valid
- Token hasn't expired
- User exists
         ↓
Execute request / Return 401 error

HTTPS PROTECTION
─────────────────────────────────────────────────────────────────
All requests encrypted in transit:
HTTP/1.1 → HTTPS (TLS 1.3)
└─ Certificate from Let's Encrypt
└─ Automatic renewal
└─ Encrypted channel
└─ Man-in-the-middle protection
```

---

**This architecture ensures:**
✅ Scalability - Multiple backend instances
✅ Security - Encryption + authentication
✅ Persistence - Database redundancy
✅ Availability - Load balancing
✅ Reliability - Error handling & logging
