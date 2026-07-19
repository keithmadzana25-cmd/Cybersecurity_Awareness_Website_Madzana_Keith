/* ========================================
   CYBERSECURITY AWARENESS WEBSITE
   JavaScript - Main Functionality
   Madzana Keith Co. (Pvt Ltd)
   ======================================== */

// ========================================
// QUIZ DATA & CONFIGURATION
// ========================================

const quizQuestions = [
    {
        question: "What is the primary purpose of multi-factor authentication (MFA)?",
        options: [
            "To make passwords longer",
            "To add an extra layer of security by requiring multiple forms of verification",
            "To make login faster",
            "To replace the need for passwords"
        ],
        correct: 1,
        explanation: "Multi-factor authentication requires multiple verification methods, significantly reducing the risk of unauthorized access even if one factor is compromised."
    },
    {
        question: "Which of the following is an example of social engineering?",
        options: [
            "Using HTTPS instead of HTTP",
            "Installing antivirus software",
            "Pretexting - creating fake scenarios to gain someone's trust and extract information",
            "Using a firewall"
        ],
        correct: 2,
        explanation: "Social engineering exploits human psychology rather than technical vulnerabilities. Pretexting is a common technique where attackers create fake scenarios to manipulate people."
    },
    {
        question: "What should you do when you receive an email asking for your password?",
        options: [
            "Provide it immediately for account verification",
            "Never give your password via email - legitimate organizations never ask for this",
            "Reply saying you don't have a password",
            "Call the sender to verify their identity first"
        ],
        correct: 1,
        explanation: "Legitimate organizations will never ask for passwords via email. This is a common phishing tactic. Passwords should only be entered on secure, legitimate login pages."
    },
    {
        question: "What is ransomware?",
        options: [
            "A type of antivirus program",
            "Malware that encrypts files and demands payment for decryption",
            "A secure backup service",
            "A firewall protection system"
        ],
        correct: 1,
        explanation: "Ransomware is malicious software that encrypts user data and demands payment (ransom) for the decryption key. Prevention includes regular backups and security updates."
    },
    {
        question: "What is the first stage of the Cyber Kill Chain?",
        options: [
            "Exploitation",
            "Delivery",
            "Reconnaissance",
            "Installation"
        ],
        correct: 2,
        explanation: "Reconnaissance is the initial stage where attackers research targets and gather information about vulnerabilities. Disrupting this stage through information security is critical."
    },
    {
        question: "How long should a strong password typically be?",
        options: [
            "At least 6 characters",
            "At least 8 characters",
            "At least 12 characters",
            "At least 20 characters"
        ],
        correct: 2,
        explanation: "Security experts recommend passwords of at least 12 characters for strong protection. Longer passwords with mixed character types are more resistant to brute-force attacks."
    },
    {
        question: "What is phishing?",
        options: [
            "A legitimate fishing method online",
            "Fraudulent attempts to obtain sensitive information by impersonating trustworthy entities",
            "A type of network security protocol",
            "A backup and recovery service"
        ],
        correct: 1,
        explanation: "Phishing is a social engineering attack where attackers impersonate legitimate organizations via email to trick people into revealing sensitive information or downloading malware."
    },
    {
        question: "Which of these is NOT a common malware type?",
        options: [
            "Trojans",
            "Ransomware",
            "Firewalls",
            "Spyware"
        ],
        correct: 2,
        explanation: "A firewall is a security tool that protects against malware, not a type of malware itself. Trojans, ransomware, and spyware are all forms of malicious software."
    },
    {
        question: "What does VPN stand for?",
        options: [
            "Virtual Private Network",
            "Very Protected Networking",
            "Virtual Protection Nucleus",
            "Verification and Privacy Node"
        ],
        correct: 0,
        explanation: "VPN (Virtual Private Network) encrypts your internet connection and masks your IP address, providing security and privacy especially on public Wi-Fi networks."
    },
    {
        question: "Which practice helps prevent unauthorized access through tailgating?",
        options: [
            "Sharing access cards freely",
            "Leaving doors open for colleagues",
            "Verifying identity before granting access and keeping doors closed",
            "Disabling door locks"
        ],
        correct: 2,
        explanation: "Tailgating is when someone follows an authorized person into a secure area. Prevention includes strict identity verification, closed doors, and awareness training."
    }
];

// ========================================
// GLOBAL STATE
// ========================================

let currentQuestionIndex = 0;
let quizScore = 0;
let quizAnswers = new Array(quizQuestions.length).fill(null);
let quizStartTime = null;
let quizActive = false;

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadAnalytics();
    initializeQuiz();
    setupPopups();
    addCardListeners();
});

// ========================================
// EVENT LISTENERS
// ========================================

function initializeEventListeners() {
    // Quiz buttons
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    if (prevBtn) prevBtn.addEventListener('click', previousQuestion);
    
    // Password checker
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', checkPasswordStrength);
    }
}

// ========================================
// QUIZ FUNCTIONALITY
// ========================================

function initializeQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    quizAnswers = new Array(quizQuestions.length).fill(null);
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');
    const progressEl = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    if (!questionEl) return;
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    
    // Display question
    questionEl.textContent = question.question;
    
    // Display options
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option';
        if (quizAnswers[currentQuestionIndex] === index) {
            div.classList.add('selected');
        }
        div.textContent = option;
        div.addEventListener('click', function() {
            selectAnswer(index);
        });
        optionsEl.appendChild(div);
    });
    
    // Update button states
    updateQuizButtons();
}

function selectAnswer(index) {
    quizAnswers[currentQuestionIndex] = index;
    loadQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        submitQuiz();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function updateQuizButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = currentQuestionIndex === 0;
    }
    
    if (nextBtn) {
        if (currentQuestionIndex === quizQuestions.length - 1) {
            nextBtn.textContent = 'Submit Quiz';
        } else {
            nextBtn.textContent = 'Next';
        }
    }
}

function submitQuiz() {
    const answers = [];
    const optionElements = document.querySelectorAll('.quiz-option, .option');

    optionElements.forEach((option, index) => {
        if (option.classList.contains('selected')) {
            answers.push({
                question_id: Math.floor(index / 4),
                selected_answer: index % 4
            });
        }
    });

    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);

    if (typeof window.quizModule?.submitQuiz === 'function') {
        window.quizModule.submitQuiz(answers, timeSpent);
        return;
    }

    // Fallback local scoring if the backend module is unavailable
    quizScore = 0;
    quizAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            quizScore++;
        }
    });

    const percentage = (quizScore / quizQuestions.length) * 100;
    showQuizFeedback({
        score: Math.round(percentage),
        correct_answers: quizScore,
        total_questions: quizQuestions.length,
        security_level: calculateSecurityLevel(Math.round(percentage))
    }, quizAnswers);
}

function retakeQuiz() {
    const resultEl = document.getElementById('result');
    resultEl.classList.remove('show');
    resultEl.innerHTML = '';
    initializeQuiz();
}

function getResultMessage(percentage) {
    if (percentage === 100) {
        return "🎉 Perfect score! You're a cybersecurity expert! Keep maintaining these best practices.";
    } else if (percentage >= 80) {
        return "🌟 Excellent! You have strong cybersecurity knowledge. Review the challenging questions to perfect your understanding.";
    } else if (percentage >= 60) {
        return "👍 Good effort! You understand the basics. Review the security tips section to strengthen your knowledge.";
    } else {
        return "📚 Keep learning! Review the security threats and solutions sections for more comprehensive understanding.";
    }
}

function showQuizFeedback(result, answersToReview = quizAnswers) {
    const resultEl = document.getElementById('result');
    const percentage = result?.score ?? 0;
    resultEl.classList.add('show');
    resultEl.innerHTML = `
        <h3>Quiz Complete!</h3>
        <p style="font-size: 2em; color: #1e40af; margin: 1rem 0; font-weight: bold;">
            ${result?.correct_answers ?? 0}/${result?.total_questions ?? quizQuestions.length} (${Math.round(percentage)}%)
        </p>
        <p style="margin-bottom: 1rem;">
            ${getResultMessage(percentage)}
        </p>
        <button class="quiz-btn" onclick="retakeQuiz()">Retake Quiz</button>
    `;

    document.getElementById('prev-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
    updateAnalytics(percentage);
    showQuizExplanations(answersToReview);
}

window.showQuizFeedback = showQuizFeedback;

function showQuizExplanations(answersToReview = quizAnswers) {
    const resultEl = document.getElementById('result');
    let explanations = '<h4 style="margin-top: 2rem;">Answer Review:</h4>';
    
    answersToReview.forEach((answer, index) => {
        const question = quizQuestions[index];
        const isCorrect = answer === question.correct;
        const statusIcon = isCorrect ? '✓' : '✗';
        const statusColor = isCorrect ? '#16a34a' : '#dc2626';
        
        explanations += `
            <div style="margin: 1rem 0; padding: 1rem; background: #f8fafc; border-left: 4px solid ${statusColor}; border-radius: 4px;">
                <p style="color: ${statusColor}; font-weight: bold;">${statusIcon} Question ${index + 1}</p>
                <p style="font-weight: 500; margin: 0.5rem 0;">${question.question}</p>
                <p style="font-size: 0.9rem; color: #64748b; margin: 0.5rem 0;">
                    <strong>Your answer:</strong> ${question.options[answer] || 'Not answered'}
                </p>
                ${!isCorrect ? `<p style="font-size: 0.9rem; color: #16a34a; margin: 0.5rem 0;"><strong>Correct answer:</strong> ${question.options[question.correct]}</p>` : ''}
                <p style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem; font-style: italic;">
                    ${question.explanation}
                </p>
            </div>
        `;
    });
    
    resultEl.innerHTML += explanations;
}

// ========================================
// PASSWORD STRENGTH CHECKER
// ========================================

function openPasswordChecker() {
    const modal = document.getElementById('password-modal');
    modal.classList.add('active');
    document.getElementById('password-input').focus();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.getElementById('password-input').value = '';
    document.getElementById('strength-text').textContent = 'Enter a password to check its strength';
    document.getElementById('strength-fill').style.width = '0%';
    document.getElementById('password-tips').innerHTML = '';
}

function togglePasswordVisibility() {
    const input = document.getElementById('password-input');
    const btn = document.getElementById('toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function checkPasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    const tipsEl = document.getElementById('password-tips');
    
    if (!password) {
        strengthFill.style.width = '0%';
        strengthText.textContent = 'Enter a password to check its strength';
        tipsEl.innerHTML = '';
        return;
    }
    
    // Calculate strength
    let strength = 0;
    const tips = [];
    
    // Length check
    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;
    if (password.length >= 16) strength += 10;
    else tips.push('Use at least 12 characters for better security');
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 15;
    else tips.push('Add lowercase letters (a-z)');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 15;
    else tips.push('Add uppercase letters (A-Z)');
    
    // Number check
    if (/\d/.test(password)) strength += 15;
    else tips.push('Add numbers (0-9)');
    
    // Special character check
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 15;
    else tips.push('Add special characters (!@#$%^&*)');
    
    // No dictionary words (simplified)
    const commonWords = ['password', 'password123', 'qwerty', 'abc123', '12345678', 'letmein'];
    if (commonWords.includes(password.toLowerCase())) {
        strength = Math.max(0, strength - 30);
        tips.unshift('Avoid common passwords and dictionary words');
    }
    
    // Cap at 100
    strength = Math.min(100, strength);
    
    // Update UI
    strengthFill.style.width = strength + '%';
    
    // Set color and text based on strength
    if (strength < 30) {
        strengthFill.style.background = 'linear-gradient(90deg, #dc2626, #dc2626)';
        strengthText.textContent = '❌ Weak Password';
        strengthText.style.color = '#dc2626';
    } else if (strength < 60) {
        strengthFill.style.background = 'linear-gradient(90deg, #dc2626, #ea580c)';
        strengthText.textContent = '⚠️ Fair Password';
        strengthText.style.color = '#ea580c';
    } else if (strength < 80) {
        strengthFill.style.background = 'linear-gradient(90deg, #ea580c, #facc15)';
        strengthText.textContent = '👍 Good Password';
        strengthText.style.color = '#16a34a';
    } else {
        strengthFill.style.background = 'linear-gradient(90deg, #16a34a, #16a34a)';
        strengthText.textContent = '✅ Strong Password';
        strengthText.style.color = '#16a34a';
    }
    
    // Display tips
    if (tips.length > 0) {
        tipsEl.innerHTML = '<h5 style="margin-top: 1rem; color: #1e40af;">Improvement Tips:</h5><ul>' +
            tips.map(tip => `<li>${tip}</li>`).join('') +
            '</ul>';
    } else {
        tipsEl.innerHTML = '<p style="color: #16a34a; margin-top: 1rem;">✅ Your password is very strong!</p>';
    }
}

// ========================================
// POPUP MANAGEMENT
// ========================================

function setupPopups() {
    const overlay = document.getElementById('popup-overlay');
    
    // Show popups on page load
    setTimeout(() => {
        const randomPopup = Math.floor(Math.random() * 3) + 1;
        showPopup(`popup${randomPopup}`);
    }, 2000);
}

function showPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    
    if (popup && overlay) {
        popup.classList.add('active');
        overlay.classList.add('active');
    }
}

function dismissPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    
    if (popup) {
        popup.classList.remove('active');
    }
    
    const activePopups = document.querySelectorAll('.popup.active');
    if (activePopups.length === 0) {
        overlay.classList.remove('active');
    }
}

// Close popup with X button
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 3; i++) {
        const closeBtn = document.getElementById(`close-popup${i}`);
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                dismissPopup(`popup${i}`);
            });
        }
    }
    
    // Close popup when clicking overlay
    const overlay = document.getElementById('popup-overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            document.querySelectorAll('.popup.active').forEach(popup => {
                popup.classList.remove('active');
            });
            overlay.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('password-modal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal('password-modal');
            }
        });
    }
});

// ========================================
// CARD EXPANSION
// ========================================

function addCardListeners() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.card');
            const expandedContent = card.querySelector('.expanded-content');
            
            // Toggle active class
            const isActive = expandedContent.classList.contains('active');
            
            // Close all other expanded cards
            document.querySelectorAll('.expanded-content.active').forEach(content => {
                if (content !== expandedContent) {
                    content.classList.remove('active');
                }
            });
            
            // Toggle current card
            if (isActive) {
                expandedContent.classList.remove('active');
                this.textContent = 'Learn More';
            } else {
                expandedContent.classList.add('active');
                this.textContent = 'Show Less';
            }
        });
    });
}

// ========================================
// ANALYTICS & STORAGE
// ========================================

function updateAnalytics(score) {
    let analytics = JSON.parse(localStorage.getItem('quizAnalytics')) || {
        attempts: 0,
        bestScore: 0,
        timeSpent: 0,
        lastAttempt: new Date()
    };
    
    analytics.attempts += 1;
    analytics.bestScore = Math.max(analytics.bestScore, score);
    
    if (quizStartTime) {
        const timeElapsed = Math.floor((Date.now() - quizStartTime) / 1000 / 60); // in minutes
        analytics.timeSpent += timeElapsed;
    }
    
    analytics.lastAttempt = new Date();
    
    localStorage.setItem('quizAnalytics', JSON.stringify(analytics));
    loadAnalytics();
}

function loadAnalytics() {
    const analytics = JSON.parse(localStorage.getItem('quizAnalytics')) || {
        attempts: 0,
        bestScore: 0,
        timeSpent: 0
    };
    
    // Update dashboard
    const quizAttemptsEl = document.getElementById('quiz-attempts');
    const bestScoreEl = document.getElementById('best-score');
    const timeSpentEl = document.getElementById('time-spent');
    const securityLevelEl = document.getElementById('security-level');
    
    if (quizAttemptsEl) quizAttemptsEl.textContent = analytics.attempts;
    if (bestScoreEl) bestScoreEl.textContent = Math.round(analytics.bestScore) + '%';
    if (timeSpentEl) timeSpentEl.textContent = analytics.timeSpent + 'm';
    
    // Calculate security level
    const level = calculateSecurityLevel(analytics.bestScore);
    if (securityLevelEl) securityLevelEl.textContent = level;
}

function calculateSecurityLevel(bestScore) {
    if (bestScore === 0) return 'Beginner';
    if (bestScore < 40) return 'Novice';
    if (bestScore < 60) return 'Intermediate';
    if (bestScore < 80) return 'Advanced';
    if (bestScore < 95) return 'Expert';
    return 'Master';
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function startSecurityTest() {
    window.location.href = 'scenario.html';
}

function showSecurityTips() {
    alert('Security Tips:\n\n1. Use strong passwords with 12+ characters\n2. Enable two-factor authentication\n3. Verify email sender addresses carefully\n4. Never share passwords via email\n5. Update software regularly\n6. Use a password manager\n7. Be suspicious of urgent language\n8. Keep personal information private');
    dismissPopup('popup1');
}

function checkForUpdates() {
    alert('Check your system settings for available updates:\n\nWindows: Settings > Update & Security\nMac: System Preferences > Software Update\nLinux: Open your package manager\n\nEnable automatic updates when possible!');
    dismissPopup('popup2');
}

function showNetworkTips() {
    alert('Network Security Tips:\n\n1. Avoid accessing sensitive information on public Wi-Fi\n2. Use a VPN on untrusted networks\n3. Disable auto-connect features\n4. Keep your firewall enabled\n5. Use HTTPS websites only\n6. Disable file sharing on public networks\n7. Keep Bluetooth off when not in use\n8. Consider a mobile hotspot alternative');
    dismissPopup('popup3');
}

// ========================================
// QUIZ START TRACKING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Start tracking quiz time when question loads
    const quizSection = document.getElementById('quiz');
    if (quizSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !quizActive) {
                    quizStartTime = Date.now();
                    quizActive = true;
                }
            });
        });
        observer.observe(quizSection);
    }
});

// ========================================
// SMOOTH SCROLLING ENHANCEMENTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add loading feedback for navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
    // Escape to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('password-modal');
        if (modal && modal.classList.contains('active')) {
            closeModal('password-modal');
        }
        
        // Close popups
        document.querySelectorAll('.popup.active').forEach(popup => {
            popup.classList.remove('active');
        });
        const overlay = document.getElementById('popup-overlay');
        if (overlay) overlay.classList.remove('active');
    }
    
    // Arrow keys for quiz navigation
    if (document.getElementById('quiz').offsetParent !== null) { // Check if quiz is visible
        if (e.key === 'ArrowRight') {
            const nextBtn = document.getElementById('next-btn');
            if (nextBtn && !nextBtn.disabled) nextBtn.click();
        }
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.getElementById('prev-btn');
            if (prevBtn && !prevBtn.disabled) prevBtn.click();
        }
    }
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy load images when visible
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Page visibility API to pause analytics when tab is hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden && quizActive) {
        // Page hidden
    } else if (!document.hidden && quizActive) {
        // Page visible again
    }
});

console.log('CyberSecurity Awareness Website - JavaScript loaded successfully');
