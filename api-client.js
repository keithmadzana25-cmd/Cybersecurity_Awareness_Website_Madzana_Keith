/**
 * API Client for CyberSecurity Awareness Platform
 * Handles all communication with the Flask backend
 */

class APIClient {
    constructor(baseURL = 'http://localhost:5000') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('access_token');
    }

    /**
     * Make API request
     */
    async request(endpoint, method = 'GET', data = null) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (this.token) {
            options.headers['Authorization'] = `Bearer ${this.token}`;
        }

        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);
            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || 'API request failed');
            }

            return json;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    /**
     * Authentication endpoints
     */
    async register(username, email, password, firstName = '', lastName = '') {
        return this.request('/api/auth/register', 'POST', {
            username,
            email,
            password,
            first_name: firstName,
            last_name: lastName
        });
    }

    async login(username, password) {
        const response = await this.request('/api/auth/login', 'POST', {
            username,
            password
        });
        
        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.token = response.access_token;
        }
        
        return response;
    }

    async logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        this.token = null;
    }

    async verifyToken() {
        return this.request('/api/auth/verify', 'GET');
    }

    async changePassword(oldPassword, newPassword) {
        return this.request('/api/auth/change-password', 'POST', {
            old_password: oldPassword,
            new_password: newPassword
        });
    }

    /**
     * Quiz endpoints
     */
    async submitQuiz(answers, timeSpent) {
        return this.request('/api/quiz/submit', 'POST', {
            answers,
            time_spent: timeSpent
        });
    }

    async getQuizHistory() {
        return this.request('/api/quiz/history', 'GET');
    }

    async getQuizStats() {
        return this.request('/api/quiz/stats', 'GET');
    }

    /**
     * Leaderboard endpoints
     */
    async getGlobalLeaderboard(limit = 100, offset = 0) {
        return this.request(`/api/leaderboard/global?limit=${limit}&offset=${offset}`, 'GET');
    }

    async getTop10() {
        return this.request('/api/leaderboard/top10', 'GET');
    }

    async getLeaderboardByCountry(country, limit = 50) {
        return this.request(`/api/leaderboard/by-language?country=${country}&limit=${limit}`, 'GET');
    }

    async getUserRank(userId) {
        return this.request(`/api/leaderboard/user-rank/${userId}`, 'GET');
    }

    /**
     * User endpoints
     */
    async getProfile() {
        return this.request('/api/user/profile', 'GET');
    }

    async updateProfile(firstName, lastName, country) {
        return this.request('/api/user/profile', 'PUT', {
            first_name: firstName,
            last_name: lastName,
            country
        });
    }

    async getCertificates() {
        return this.request('/api/user/certificates', 'GET');
    }

    async generateCertificate() {
        return this.request('/api/user/certificates/generate', 'POST');
    }

    async deleteAccount(password) {
        return this.request('/api/user/delete-account', 'POST', {
            password
        });
    }

    /**
     * Helper methods
     */
    isAuthenticated() {
        return !!this.token;
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    setAuthToken(token) {
        this.token = token;
        localStorage.setItem('access_token', token);
    }
}

// Create global API client instance
const api = new APIClient();
