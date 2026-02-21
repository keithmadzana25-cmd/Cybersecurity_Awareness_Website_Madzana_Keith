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

        try {
            const response = await api.submitQuiz(answers, timeSpent);
            
            // Show result with backend validation
            alert(`
Quiz Submitted!
Score: ${response.score}%
Correct: ${response.correct_answers}/${response.total_questions}
Security Level: ${response.security_level}
            `);
            
            // Redirect to stats page
            await this.showQuizStats();
            
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

// Override the existing submitQuiz function
const originalSubmitQuiz = window.submitQuiz;

window.submitQuiz = async function() {
    const answers = [];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach((option, idx) => {
        if (option.classList.contains('selected')) {
            answers.push({
                question_id: Math.floor(idx / 4), // Assuming 4 options per question
                selected_answer: idx % 4
            });
        }
    });

    const timeSpent = Math.floor((Date.now() - quizModule.startTime) / 1000);
    await quizModule.submitQuiz(answers, timeSpent);
};

// Track quiz start time
document.addEventListener('DOMContentLoaded', () => {
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        quizModule.startTime = Date.now();
    }
});
