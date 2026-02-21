# 🛡️ CyberSecurity Awareness Website
## Madzana Keith Co. (Pvt Ltd)

A comprehensive, interactive cybersecurity awareness platform designed to educate individuals and organizations about digital threats, best practices, and security measures.

---

## ✨ Features

### 📚 Educational Content
- **Security Threats & Solutions**: Detailed cards covering:
  - Phishing Attacks
  - Malware Protection
  - Password Security
  - Social Engineering
  - Cyber Kill Chain (7 stages)

- Expandable content sections with identification tips, prevention strategies, and protection measures

### 🎯 Interactive Quiz
- **10 comprehensive questions** covering:
  - Multi-factor authentication
  - Social engineering
  - Password security
  - Ransomware
  - Cyber Kill Chain
  - And more...

- Features:
  - Instant feedback on answers
  - Detailed explanations for each question
  - Progress tracking
  - Score calculation with security level assessment
  - Ability to review answers and explanations

### 🔐 Password Strength Checker
- Real-time password analysis
- Strength indicator with color coding
- Actionable improvement suggestions
- Password visibility toggle
- Categories checked:
  - Length (8, 12, 16+ characters)
  - Uppercase and lowercase letters
  - Numbers and special characters
  - Common password detection

### 🎬 Scenario-Based Questions
- **30 real-world cybersecurity scenarios** covering:
  - Incident response & breach handling
  - Malware detection & remediation
  - DDoS mitigation strategies
  - Phishing attack response
  - Access control & authentication
  - Vulnerability management
  - Cloud security
  - Network security
  - And more...

- Features:
  - Difficulty levels (Beginner, Intermediate, Advanced)
  - Show/Hide answers for self-assessment
  - Professional recommended responses
  - Progress tracking across scenarios
  - Keyboard shortcuts for navigation

### 📊 Analytics Dashboard
- Track quiz attempts
- Best score monitoring
- Time spent learning
- Security level progression (Beginner → Master)
- Persistent storage using localStorage

### 🚨 Security Alerts
- Interactive popups with security warnings:
  - Phishing alert
  - Software update reminder
  - Network security warning
- Actionable tips and learning resources

### 🎨 Modern, Responsive Design
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Mobile-responsive layout
- Professional color scheme
- Accessible UI with proper contrast

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (fully client-side)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/keithmadzana25-cmd/Cybersecurity_Awareness_Website_Madzana_Keith.git
   cd Cybersecurity_Awareness_Website_Madzana_Keith
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or serve with a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server
   ```

3. **Access the website**
   - Open `http://localhost:8000` in your browser

---

## 📁 Project Structure

```
Cybersecurity_Awareness_Website_Madzana_Keith/
├── index.html              # Main HTML file with page structure
├── styles.css              # Comprehensive styling and animations
├── script.js               # Interactive functionality and logic
├── scenario.html           # Scenario-based questions page
├── scenario-styles.css     # Scenario page styling
├── scenario-script.js      # Scenario-based questions logic
└── README.md               # This file
```

### File Descriptions

- **index.html**: Contains the complete HTML structure including:
  - Navigation header
  - Hero section
  - Security threat cards
  - Interactive quiz section
  - Threat simulation area
  - Analytics dashboard
  - Modals and popups
  - Footer with contact information

- **styles.css**: 
  - CSS variables for consistent theming
  - Responsive grid layouts
  - Smooth animations and transitions
  - Mobile-first responsive design
  - Professional color palette
  - Over 600 lines of optimized CSS

- **script.js**:
  - Quiz logic with 10 questions and detailed explanations
  - Password strength checker algorithm
  - Local storage for analytics persistence
  - Modal and popup management
  - Card expansion/collapse functionality
  - Keyboard shortcuts support
  - Performance optimizations

- **scenario.html**:
  - Complete scenario-based questions page
  - Integrated header/navigation and footer
  - 30 real-world cybersecurity scenarios
  - Responsive layout with progress tracking
  - Info cards with usage guidelines

- **scenario-styles.css**:
  - Professional styling for scenario page
  - Responsive design for all screen sizes
  - Smooth animations and transitions
  - Difficulty badge styling
  - Print-friendly styles

- **scenario-script.js**:
  - 30 scenario questions with professional answers
  - Difficulty level classification
  - Show/hide answer functionality
  - Progress bar management
  - Completion screen and restart functionality
  - Accessibility enhancements

---

## 🎮 How to Use

### Taking the Quiz
1. Scroll to the "Test Your Cyber Security Knowledge" section
2. Click on an answer option to select it
3. Use "Next" to proceed to the next question or "Previous" to go back
4. Submit your quiz when you reach the final question
5. Review your score and detailed explanations
6. Click "Retake Quiz" to try again

### Using Password Checker
1. Click "Check Password" in the Threat Simulation section
2. Enter a password to analyze
3. Use "Show Password" button to reveal/hide the password
4. Review the strength indicator and improvement tips
5. Close the modal when done

### Learning from Cards
1. Click "Learn More" on any security threat card
2. Read the identification tips and protection measures
3. Click "Show Less" to collapse the card
4. Explore multiple cards to build comprehensive knowledge

### Exploring Scenarios
1. Click "Explore Scenarios" button in the Threat Simulation section
2. Read each cybersecurity scenario carefully
3. Think about how you would respond to the situation
4. Click "Show Answer" to reveal the recommended response
5. Click "Next Question" to proceed to the next scenario
6. Use arrow keys or Enter key for keyboard navigation
7. Review all 30 scenarios to build practical incident response knowledge

### Tracking Progress
- Your quiz scores, attempts, and learning time are automatically saved
- Check the "Your Security Progress" section to see your statistics
- Your security level updates based on your best quiz score
- Scenario progress is tracked as you navigate through each question

---

## 📊 Content Overview

### Quiz Content

| Topic | Count | Coverage |
|-------|-------|----------|
| Multi-Factor Authentication | 1 | Security mechanisms |
| Social Engineering | 2 | Phishing, pretexting, manipulation |
| Password Security | 2 | Strong passwords, MFA |
| Malware | 1 | Ransomware types |
| Cyber Kill Chain | 1 | Attack stages |
| VPN & Network | 1 | Network security |
| Email Security | 1 | Phishing identification |
| Physical Security | 1 | Tailgating prevention |

### Scenario Content

| Category | Topics Covered |
|----------|----------------|
| Incident Response | Malware removal, data breaches, ransomware recovery |
| Threat Detection | Phishing, DDoS attacks, suspicious login attempts |
| Access Control | Weak passwords, unauthorized access, BYOD policies |
| Vulnerability Management | System hardening, patch management, vulnerability assessment |
| Infrastructure Security | Web applications, cloud security, wireless networks |
| Security Operations | Monitoring, forensics, evidence collection |
| **Total Scenarios** | **30 real-world situations with professional responses** |

---

## 🔒 Security Features

- ✅ Client-side processing (no data sent to server)
- ✅ LocalStorage for offline analytics
- ✅ No external dependencies for core functionality
- ✅ HTTPS ready
- ✅ Keyboard accessible
- ✅ Screen reader friendly HTML structure

---

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #1e40af;        /* Main blue */
    --secondary-color: #dc2626;      /* Red accent */
    --success-color: #16a34a;        /* Green for success */
    --warning-color: #ea580c;        /* Orange for warnings */
    /* ... more colors ... */
}
```

### Adding Quiz Questions
Add objects to the `quizQuestions` array in `script.js`:
```javascript
{
    question: "Your question here?",
    options: [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
    ],
    correct: 0,  // Index of correct answer
    explanation: "Explanation of the correct answer"
}
```

### Modifying Content
Edit the security threat cards in `index.html` to add:
- New threat types
- Different content
- Additional learning resources

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support:
  - **Tab**: Navigate between elements
  - **Arrow Right**: Next quiz question
  - **Arrow Left**: Previous quiz question
  - **Escape**: Close modals and popups
- Color contrast compliant
- Screen reader friendly

---

## 📈 Analytics Stored

The website stores the following in browser localStorage:
```json
{
    "quizAnalytics": {
        "attempts": 5,
        "bestScore": 90,
        "timeSpent": 45,
        "lastAttempt": "2024-11-20T10:30:00.000Z"
    }
}
```

Clear localStorage to reset analytics:
- Open DevTools (F12)
- Go to Application/Storage tab
- Clear LocalStorage

---

## 🤝 Contributing

To contribute improvements:

1. Make your changes
2. Test thoroughly in multiple browsers
3. Maintain code style and structure
4. Add comments for complex logic
5. Update this README if needed
6. Submit a pull request

---

## 📧 Contact & Support

**Madzana Keith Co. (Pvt Ltd)**

- 📧 Email: [keith.madzana25@vupune.ac.in](mailto:keith.madzana25@vupune.ac.in)
- 📱 WhatsApp: [+263 714 415163](https://wa.me/263714415163)

**Social Media:**
- 🔗 LinkedIn: [Keith Madzana](https://www.linkedin.com/in/keith-madzana-040316386)
- 🐙 GitHub: [@keithmadzana25-cmd](https://github.com/keithmadzana25-cmd)
- 📺 YouTube: [M.K Mighty](https://youtube.com/@m.kmighty)

---

## 📄 License

This project is provided as-is for educational and awareness purposes.

---

## 🙏 Acknowledgments

- Security threat information from industry best practices
- Images from Unsplash
- Icons from Font Awesome
- Cybersecurity frameworks: MITRE ATT&CK, Cyber Kill Chain

---

## 🔄 Version History

### v1.1.0 (Current)
- ✨ Added 30 scenario-based questions covering real-world cybersecurity incidents
- 🎬 Scenario page with difficulty levels (Beginner, Intermediate, Advanced)
- 📊 Enhanced content coverage with incident response scenarios
- ⌨️ Keyboard navigation support for scenarios
- 🎯 Professional recommended responses for each scenario
- 🔄 Improved navigation between quizzes and scenarios

### v1.0.0 (Initial Release)
- ✨ Initial release
- 📚 5 comprehensive security threat cards
- 🎯 10-question interactive quiz
- 🔐 Advanced password strength checker
- 📊 Analytics dashboard with localStorage
- 🎨 Responsive design with animations
- 🚨 Interactive security alert popups
- ⌨️ Keyboard shortcuts support

---

## 🎯 Future Enhancements

- [ ] Additional quiz questions (50+ total)
- [ ] Video tutorials
- [ ] Interactive threat simulation games
- [ ] Certificate generation
- [ ] Leaderboard system
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Email notifications
- [ ] Company/organization support
- [ ] Advanced analytics dashboard
- [ ] PDF report generation

---

## 💡 Tips for Maximum Learning

1. **Take the quiz multiple times** - Aim for 100% score
2. **Read all card content** - Don't skip the expanded sections
3. **Check your password strength** - Test various combinations
4. **Review explanations carefully** - Understand the "why"
5. **Share with others** - Spread security awareness
6. **Implement practices** - Apply what you learn in real life
7. **Stay updated** - Cybersecurity threats constantly evolve

---

## ⚠️ Important Disclaimer

This website is for educational purposes. While it provides valuable cybersecurity awareness information:

- Always use strong, unique passwords for important services
- Never share your real passwords with anyone
- Keep your devices and software updated
- Use reputable security tools
- Consult security professionals for enterprise security

Stay safe! 🛡️

---

**Last Updated:** February 2026  
**Created by:** Madzana Keith  
**Status:** Active & Maintained
