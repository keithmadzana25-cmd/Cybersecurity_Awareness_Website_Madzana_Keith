/**
 * Leaderboard Module - Global Rankings & Competitions
 */

class LeaderboardModule {
    constructor() {
        this.leaderboard = [];
        this.userRank = null;
    }

    async loadGlobalLeaderboard(limit = 100) {
        try {
            const response = await api.getGlobalLeaderboard(limit);
            this.leaderboard = response.leaderboard;
            return response;
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
            return null;
        }
    }

    async loadTop10() {
        try {
            const response = await api.getTop10();
            return response.top_10;
        } catch (error) {
            console.error('Failed to load top 10:', error);
            return null;
        }
    }

    async loadLeaderboardByCountry(country) {
        try {
            const response = await api.getLeaderboardByCountry(country);
            return response.leaderboard;
        } catch (error) {
            console.error('Failed to load country leaderboard:', error);
            return null;
        }
    }

    async getUserRank() {
        if (!api.isAuthenticated()) {
            return null;
        }

        try {
            const user = api.getCurrentUser();
            const response = await api.getUserRank(user.id);
            this.userRank = response;
            return response;
        } catch (error) {
            console.error('Failed to load user rank:', error);
            return null;
        }
    }

    displayLeaderboard(leaderboard) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'leaderboard-modal';
        
        let html = `
            <div class="modal-content leaderboard-modal">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>Global Leaderboard</h3>
                <table class="leaderboard-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Username</th>
                            <th>Avg Score</th>
                            <th>Attempts</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        leaderboard.forEach(entry => {
            html += `
                <tr>
                    <td>${entry.rank}</td>
                    <td>${entry.username}</td>
                    <td>${entry.average_score}%</td>
                    <td>${entry.total_attempts}</td>
                    <td><span class="level-badge ${entry.security_level.toLowerCase()}">${entry.security_level}</span></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        modal.innerHTML = html;
        document.body.appendChild(modal);
    }

    async displayUserRank() {
        const rankData = await this.getUserRank();
        if (!rankData) return;

        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'user-rank-modal';
        modal.innerHTML = `
            <div class="modal-content user-rank-modal">
                <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <h3>Your Rank</h3>
                <div class="rank-info">
                    <div class="rank-badge">
                        <h2>#${rankData.rank}</h2>
                        <p>out of ${rankData.total_users}</p>
                    </div>
                    <div class="rank-stats">
                        <p><strong>Percentile:</strong> Top ${rankData.percentile}%</p>
                        <p><strong>Average Score:</strong> ${rankData.user_stats.average_score}%</p>
                        <p><strong>Total Attempts:</strong> ${rankData.user_stats.total_attempts}</p>
                        <p><strong>Security Level:</strong> ${rankData.user_stats.security_level}</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Initialize leaderboard module
const leaderboardModule = new LeaderboardModule();

// Function to show leaderboard
async function showLeaderboard() {
    const leaderboard = await leaderboardModule.loadGlobalLeaderboard(50);
    if (leaderboard) {
        leaderboardModule.displayLeaderboard(leaderboard);
    }
}

// Function to show user rank
async function showUserRank() {
    await leaderboardModule.displayUserRank();
}
