# REST API Reference Guide

## Base URL
```
Development: http://localhost:5000
Production: https://api.your-domain.com
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require JWT token:
```
Authorization: Bearer <your_access_token>
```

---

## 🔐 AUTHENTICATION ENDPOINTS

### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "first_name": "John",
  "last_name": "Doe",
  "country": "United States"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "country": "United States",
    "created_at": "2024-02-21T10:30:00",
    "security_level": "Beginner"
  }
}
```

### POST /api/auth/login
Login user and receive JWT token.

**Request:**
```json
{
  "username": "john_doe",
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "security_level": "Beginner"
  }
}
```

### GET /api/auth/verify
Verify JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "security_level": "Intermediate"
  }
}
```

### POST /api/auth/change-password
Change user password.

**Request:**
```json
{
  "old_password": "OldPassword123!",
  "new_password": "NewPassword456!"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

---

## 📝 QUIZ ENDPOINTS

### POST /api/quiz/submit
Submit completed quiz with answers.

**Request:**
```json
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
```

**Response (201):**
```json
{
  "message": "Quiz submitted successfully",
  "quiz_id": 15,
  "score": 80,
  "correct_answers": 8,
  "total_questions": 10,
  "security_level": "Intermediate"
}
```

### GET /api/quiz/history
Get user's quiz attempt history.

**Query Parameters:**
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
{
  "total_attempts": 5,
  "attempts": [
    {
      "id": 15,
      "score": 80,
      "correct_answers": 8,
      "total_questions": 10,
      "time_spent": 600,
      "percentage": 80.0,
      "created_at": "2024-02-21T10:30:00"
    },
    {
      "id": 14,
      "score": 70,
      "correct_answers": 7,
      "total_questions": 10,
      "time_spent": 720,
      "percentage": 70.0,
      "created_at": "2024-02-20T15:45:00"
    }
  ]
}
```

### GET /api/quiz/stats
Get user's quiz statistics and performance.

**Response (200):**
```json
{
  "total_attempts": 5,
  "average_score": 76.0,
  "best_score": 90,
  "worst_score": 60,
  "total_time_spent": 3600,
  "security_level": "Intermediate"
}
```

---

## 🏆 LEADERBOARD ENDPOINTS

### GET /api/leaderboard/global
Get global leaderboard rankings.

**Query Parameters:**
- `limit` (optional): Max results (default: 100)
- `offset` (optional): Pagination offset (default: 0)

**Response (200):**
```json
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
      "total_attempts": 38,
      "average_score": 92.5,
      "scenarios_completed": 28,
      "security_level": "Expert"
    },
    {
      "rank": 3,
      "username": "john_doe",
      "total_attempts": 5,
      "average_score": 76.0,
      "scenarios_completed": 5,
      "security_level": "Intermediate"
    }
  ]
}
```

### GET /api/leaderboard/top10
Get top 10 users.

**Response (200):**
```json
{
  "top_10": [
    {
      "rank": 1,
      "username": "security_master",
      "total_attempts": 45,
      "average_score": 95.2,
      "scenarios_completed": 30,
      "security_level": "Expert"
    }
    // ... 9 more entries
  ]
}
```

### GET /api/leaderboard/by-language
Get leaderboard filtered by country.

**Query Parameters:**
- `country` (required): Country name (e.g., "United States", "India")
- `limit` (optional): Max results (default: 50)

**Response (200):**
```json
{
  "country": "United States",
  "leaderboard": [
    {
      "rank": 1,
      "username": "us_security_pro",
      "total_attempts": 25,
      "average_score": 88.5,
      "scenarios_completed": 20,
      "security_level": "Advanced"
    }
  ]
}
```

### GET /api/leaderboard/user-rank/{user_id}
Get specific user's rank and percentile.

**Response (200):**
```json
{
  "rank": 45,
  "total_users": 250,
  "percentile": 82.0,
  "user_stats": {
    "rank": 45,
    "username": "john_doe",
    "total_attempts": 5,
    "average_score": 76.0,
    "scenarios_completed": 5,
    "security_level": "Intermediate"
  }
}
```

---

## 👤 USER ENDPOINTS

### GET /api/user/profile
Get user profile information.

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "country": "United States",
    "created_at": "2024-02-21T10:30:00",
    "security_level": "Intermediate"
  }
}
```

### PUT /api/user/profile
Update user profile information.

**Request:**
```json
{
  "first_name": "Jonathan",
  "last_name": "Doe",
  "country": "Canada"
}
```

**Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "Jonathan",
    "last_name": "Doe",
    "country": "Canada",
    "created_at": "2024-02-21T10:30:00",
    "security_level": "Intermediate"
  }
}
```

### GET /api/user/certificates
Get user's earned certificates.

**Response (200):**
```json
{
  "total_certificates": 1,
  "certificates": [
    {
      "id": 1,
      "certificate_code": "CERT201A2024",
      "level": "Expert",
      "issued_date": "2024-02-21T10:30:00",
      "expires_date": "2025-02-21T10:30:00"
    }
  ]
}
```

### POST /api/user/certificates/generate
Generate certificate for reaching Expert level.

**Response (201):**
```json
{
  "message": "Certificate generated successfully",
  "certificate": {
    "id": 1,
    "certificate_code": "CERT201A2024",
    "level": "Expert",
    "issued_date": "2024-02-21T10:30:00",
    "expires_date": "2025-02-21T10:30:00"
  }
}
```

**Error Response (400):**
```json
{
  "error": "User must reach Expert level to receive certificate",
  "current_level": "Intermediate"
}
```

### POST /api/user/delete-account
Delete user account and all associated data.

**Request:**
```json
{
  "password": "SecurePassword123!"
}
```

**Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

---

## 📊 RESPONSE CODES

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK - Successful GET/PUT | User profile retrieved |
| 201 | Created - Successful POST | Quiz submitted, cert generated |
| 400 | Bad Request | Missing required fields |
| 401 | Unauthorized | Invalid credentials/expired token |
| 404 | Not Found | User/resource doesn't exist |
| 409 | Conflict | Username already exists |
| 500 | Server Error | Database error |

---

## 🔄 EXAMPLE WORKFLOWS

### Complete Quiz & Check Score

```javascript
// 1. Submit quiz answers
const result = await api.submitQuiz(answers, timeSpent);

// 2. Get quiz history
const history = await api.getQuizHistory();

// 3. Get statistics
const stats = await api.getQuizStats();

// 4. Check leaderboard rank
const rank = await api.getUserRank(userId);
```

### Register, Login & Generate Certificate

```javascript
// 1. Register
const reg = await api.register('john_doe', 'john@example.com', 'Pass123!');

// 2. Login
const login = await api.login('john_doe', 'Pass123!');

// 3. After reaching Expert level
const cert = await api.generateCertificate();
```

### Get Top Performers

```javascript
// Global top 10
const top10 = await api.getTop10();

// Country specific
const india_top = await api.getLeaderboardByCountry('India');
```

---

## 🔐 ERROR HANDLING

All errors follow this format:
```json
{
  "error": "Clear error message describing what went wrong"
}
```

### Examples:

**Invalid Credentials:**
```json
{
  "error": "Invalid credentials"
}
```

**Missing Required Fields:**
```json
{
  "error": "Missing required fields"
}
```

**Resource Not Found:**
```json
{
  "error": "User not found"
}
```

---

## 📌 BEST PRACTICES

1. **Always include Authorization header** for protected endpoints
2. **Handle network errors** gracefully in frontend
3. **Store JWT token** securely (localStorage or sessionStorage)
4. **Refresh token** when it expires
5. **Validate inputs** before sending to API
6. **Use HTTPS** in production
7. **Rate limit** requests to prevent abuse
8. **Log API errors** for debugging

---

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123!"
  }'

# Login and save token
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "TestPass123!"
  }' | jq -r '.access_token')

# Get profile
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer $TOKEN"

# Get leaderboard
curl -X GET "http://localhost:5000/api/leaderboard/global?limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

---

**API Version:** 1.0.0  
**Last Updated:** February 2024
