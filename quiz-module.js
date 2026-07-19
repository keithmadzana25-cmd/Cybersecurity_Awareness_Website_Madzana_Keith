/**
 * Quiz Module - Backend Integration
 * Connects quiz functionality to the Flask backend
 */

class QuizModule {
    constructor() {
        this.startTime = null;
        this.answers = [];
        this.currentQuestionIndex = 0;
    }

    async submitQuiz(answers, timeSpent) {
        if (!api.isAuthenticated()) {
            alert('Please login to submit quiz');
            openLoginModal();
            return;
        }

        // Compute score client-side to avoid mismatch with backend question bank
        let correctCount = 0;
        try {
            answers.forEach(a => {
                const q = window.quizQuestions ? window.quizQuestions[a.question_id] : null;
                if (q && typeof a.selected_answer !== 'undefined') {
                    if (a.selected_answer === q.correct) correctCount += 1;
                }
            });
        } catch (e) {
            // ignore and let backend compute if available
        }

        const scorePercent = Math.round((correctCount / (window.quizQuestions ? window.quizQuestions.length : 10)) * 100);

        // Attach score metadata to answers object so api-client can include it
        const ansPayload = answers;
        ansPayload.score = scorePercent;
        ansPayload.correct_answers = correctCount;

        try {
            const response = await api.submitQuiz(ansPayload, timeSpent);

            if (typeof window.showQuizFeedback === 'function') {
                window.showQuizFeedback(response, answers);
            } else {
                alert(`Quiz Submitted! Score: ${response.score}%`);
            }

            return response;
        } catch (error) {
            alert('Failed to submit quiz: ' + error.message);
        }
    }

    async getQuizHistory() {
        if (!api.isAuthenticated()) {
            return null;
        }

        try {
            return await api.getQuizHistory();
        } catch (error) {
            console.error('Failed to get quiz history:', error);
            return null;
        }
    }

    async getQuizStats() {
        if (!api.isAuthenticated()) {
            return null;
        }

        try {
            return await api.getQuizStats();
        } catch (error) {
            console.error('Failed to get quiz stats:', error);
            return null;
        }
    }

    async showQuizStats() {
        const stats = await this.getQuizStats();
        if (!stats) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'stats-modal';
        modal.innerHTML = `
            <div class="modal-content stats-modal">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>Your Quiz Statistics</h3>
                <div class="stats-grid">
                    <div class="stat">
                        <h4>${stats.total_attempts}</h4>
                        <p>Total Attempts</p>
                    </div>
                    <div class="stat">
                        <h4>${stats.average_score.toFixed(1)}%</h4>
                        <p>Average Score</p>
                    </div>
                    <div class="stat">
                        <h4>${stats.best_score}%</h4>
                        <p>Best Score</p>
                    </div>
                    <div class="stat">
                        <h4>${stats.security_level}</h4>
                        <p>Security Level</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Initialize quiz module
const quizModule = new QuizModule();
window.quizModule = quizModule;

// Track quiz start time
document.addEventListener('DOMContentLoaded', () => {
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizModule.startTime = Date.now();
    }
});
