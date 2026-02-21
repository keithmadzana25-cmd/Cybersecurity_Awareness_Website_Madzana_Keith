/**
 * Authentication Module for CyberSecurity Awareness Platform
 * Handles user registration, login, and account management
 */

class AuthModule {
    constructor() {
        this.isLoggedIn = api.isAuthenticated();
        this.currentUser = api.getCurrentUser();
        this.init();
    }

    init() {
        // Add authentication UI if needed
        this.updateAuthUI();
        
        // Listen for auth changes
        window.addEventListener('storageChange', () => {
            this.isLoggedIn = api.isAuthenticated();
            this.currentUser = api.getCurrentUser();
            this.updateAuthUI();
        });
    }

    async register(formData) {
        try {
            const response = await api.register(
                formData.username,
                formData.email,
                formData.password,
                formData.first_name || '',
                formData.last_name || ''
            );
            
            this.isLoggedIn = true;
            this.currentUser = response.user;
            this.updateAuthUI();
            
            return { success: true, message: 'Registration successful' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async login(username, password) {
        try {
            const response = await api.login(username, password);
            
            this.isLoggedIn = true;
            this.currentUser = response.user;
            this.updateAuthUI();
            
            return { success: true, message: 'Login successful', user: response.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        await api.logout();
        this.isLoggedIn = false;
        this.currentUser = null;
        this.updateAuthUI();
    }

    async changPassword(oldPassword, newPassword) {
        try {
            const response = await api.changePassword(oldPassword, newPassword);
            return { success: true, message: response.message };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    updateAuthUI() {
        // Update navbar with login/logout buttons
        const authContainer = document.getElementById('auth-container');
        if (!authContainer) return;

        if (this.isLoggedIn && this.currentUser) {
            authContainer.innerHTML = `
                <div class="user-menu">
                    <span class="username">${this.currentUser.username}</span>
                    <button onclick="auth.logout()" class="logout-btn">Logout</button>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <button onclick="openLoginModal()" class="login-btn">Login</button>
                <button onclick="openRegisterModal()" class="register-btn">Register</button>
            `;
        }
    }
}

// Initialize auth module
const auth = new AuthModule();

/**
 * Modal functions for login/register
 */
function openLoginModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'login-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>Login</h3>
            <form id="login-form">
                <input type="text" placeholder="Username" id="login-username" required>
                <input type="password" placeholder="Password" id="login-password" required>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const result = await auth.login(
            document.getElementById('login-username').value,
            document.getElementById('login-password').value
        );
        
        if (result.success) {
            alert('Login successful!');
            modal.remove();
        } else {
            alert('Login failed: ' + result.error);
        }
    });
}

function openRegisterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'register-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h3>Register</h3>
            <form id="register-form">
                <input type="text" placeholder="Username" id="reg-username" required>
                <input type="email" placeholder="Email" id="reg-email" required>
                <input type="text" placeholder="First Name" id="reg-first-name">
                <input type="text" placeholder="Last Name" id="reg-last-name">
                <input type="password" placeholder="Password" id="reg-password" required>
                <input type="password" placeholder="Confirm Password" id="reg-confirm-password" required>
                <button type="submit" class="btn btn-primary">Register</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const pwd = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm-password').value;
        
        if (pwd !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        const result = await auth.register({
            username: document.getElementById('reg-username').value,
            email: document.getElementById('reg-email').value,
            password: pwd,
            first_name: document.getElementById('reg-first-name').value,
            last_name: document.getElementById('reg-last-name').value
        });
        
        if (result.success) {
            alert('Registration successful! You are now logged in.');
            modal.remove();
        } else {
            alert('Registration failed: ' + result.error);
        }
    });
}
