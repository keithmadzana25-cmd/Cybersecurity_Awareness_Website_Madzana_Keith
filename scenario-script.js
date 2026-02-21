/* ========================================
   CYBERSECURITY SCENARIO QUESTIONS
   JavaScript - Scenario Management
   Madzana Keith Co. (Pvt Ltd)
   ======================================== */

// ========================================
// SCENARIO DATA
// ========================================

const scenarios = [
    {
        question: "A user in your organization reports that their computer is running slowly and some files are missing. What steps would you take to investigate and resolve the issue?",
        answer: "First, confirm if the computer has been compromised by checking for signs of malware, such as unusual processes or network traffic. Run a full system scan using antivirus software and check the event logs for suspicious activity. Verify if any files are encrypted (in case of ransomware). After identifying the issue, restore missing files from backup and ensure the system is patched with the latest security updates.",
        difficulty: "intermediate"
    },
    {
        question: "You discover a vulnerable web application running on your network. What steps do you take to mitigate the risk until a full patch can be applied?",
        answer: "Immediately assess the vulnerability using tools like Nmap or Nessus to determine its severity. As an interim measure, apply a web application firewall (WAF) to block exploit attempts and limit access to the vulnerable application by implementing network segmentation. Notify the development team to prioritize a patch and escalate the issue to management. If necessary, disconnect the affected application until the patch is applied.",
        difficulty: "advanced"
    },
    {
        question: "A company employee receives an email that seems to be from the HR department asking for login credentials to update personal information. What would you do?",
        answer: "This sounds like a phishing attack. Immediately inform the employee about the risks of phishing and explain how to spot suspicious emails. Advise them not to click any links or respond. Report the incident to the security team, investigate whether other employees were affected, and ensure the email is blocked. Recommend running a phishing simulation to raise organization-wide awareness.",
        difficulty: "beginner"
    },
    {
        question: "Your organization is facing a DDoS (Distributed Denial of Service) attack. How would you respond to ensure minimal disruption to services?",
        answer: "Implement rate-limiting and block the IP addresses generating malicious traffic using firewalls. Contact your internet service provider (ISP) to assist with mitigation at the network level. Deploy a Content Delivery Network (CDN) if available to distribute traffic and reduce load on critical systems. Monitor the attack's progress and work with internal teams to ensure other security measures are in place, such as scaling server capacity or utilizing DDoS protection services.",
        difficulty: "advanced"
    },
    {
        question: "You notice multiple failed login attempts to an internal server from a single IP address, followed by a successful login. What actions would you take?",
        answer: "Immediately investigate the source of the login attempts by reviewing log files for the server and other systems. If the login was unauthorized, lock the account and reset the password. Ensure multi-factor authentication (MFA) is enabled for sensitive systems. Analyze the IP address for malicious intent and implement intrusion detection systems (IDS) to alert you to unusual login activity. Increase monitoring of that server.",
        difficulty: "intermediate"
    },
    {
        question: "You're tasked with ensuring the security of a newly deployed public-facing web application. What steps would you take to secure it?",
        answer: "Perform a vulnerability assessment using tools like OWASP ZAP or Burp Suite. Secure the application using HTTPS with an SSL/TLS certificate to encrypt data in transit. Review the code for common vulnerabilities such as SQL injection and cross-site scripting (XSS). Implement input validation and sanitization for user inputs, configure a web application firewall (WAF), and ensure sensitive data is stored encrypted. Establish a regular patching schedule.",
        difficulty: "advanced"
    },
    {
        question: "Your company has just experienced a data breach. How would you handle the situation?",
        answer: "Follow the incident response plan and begin by containing the breach to prevent further damage. Collect logs and evidence for forensic analysis and identify the breach source. Notify affected stakeholders including management, legal teams, and potentially customers as required by data protection regulations like GDPR. Report the breach to appropriate regulatory authorities if necessary. Remediate vulnerabilities and perform a root cause analysis to prevent similar incidents.",
        difficulty: "advanced"
    },
    {
        question: "You are tasked with securing a wireless network at your organization. What measures would you implement to enhance security?",
        answer: "Ensure the Wi-Fi network is encrypted using WPA3, the latest security protocol. Disable WPS (Wi-Fi Protected Setup) and use a strong passphrase for network access. Segment the wireless network from the main organizational network using separate VLANs. Implement MAC address filtering to control device access. Monitor connected devices and set up intrusion detection systems (IDS) to detect unusual behavior.",
        difficulty: "intermediate"
    },
    {
        question: "During a routine audit, you find that several systems have outdated software with known vulnerabilities. How would you address this issue?",
        answer: "Prioritize patching the most critical systems and vulnerabilities first. Notify responsible teams to patch systems as soon as possible. For unavailable patches, implement workarounds or temporary security controls to mitigate risk. Establish a regular patch management policy to keep all software current. Conduct additional vulnerability scans to ensure no other systems are similarly exposed.",
        difficulty: "beginner"
    },
    {
        question: "You have been assigned to monitor a network for any potential security threats. What monitoring tools and strategies would you use?",
        answer: "Deploy intrusion detection systems (IDS), firewall logs, and SIEM systems like Splunk or Elastic Stack to continuously monitor network traffic. Configure alerts for critical events such as failed login attempts, unusual outbound traffic, and port scans. Regularly analyze network traffic and review log files to detect threats. Implement endpoint protection software to monitor and secure devices on the network.",
        difficulty: "intermediate"
    },
    {
        question: "You are monitoring network traffic and notice a sudden spike in outbound data from a specific workstation. What steps would you take to investigate?",
        answer: "Immediately isolate the workstation to prevent further data exfiltration. Analyze network traffic logs to identify the type of data being transferred and whether it's encrypted. Determine the destination IP address and check if it's known to be malicious. Scan the workstation for malware and review system logs for unauthorized activities. Verify if the data transfer is legitimate or a potential data breach.",
        difficulty: "intermediate"
    },
    {
        question: "A user has left their computer unattended and someone else tries to access it. What security measures would you recommend to protect sensitive information?",
        answer: "Recommend enabling automatic screen locking after a set period of inactivity. Enforce strong password policies requiring complex passwords and multi-factor authentication. Provide regular security awareness training on protecting unattended workstations. Implement activity monitoring and access controls to ensure users lock their computers when leaving their desks.",
        difficulty: "beginner"
    },
    {
        question: "You notice that a group of employees is using weak passwords for accessing critical company applications. What would you do to resolve this issue?",
        answer: "Implement a strong password policy requiring complex passwords (mix of letters, numbers, and special characters). Encourage the use of password managers for secure password storage. Enforce multi-factor authentication (MFA) for all critical systems. Conduct regular password audits to identify weak passwords and employee training on password security best practices.",
        difficulty: "beginner"
    },
    {
        question: "Your organization is about to launch a new mobile application. What security precautions would you take before the release?",
        answer: "Conduct thorough security assessment including static and dynamic code analysis to identify vulnerabilities. Ensure all sensitive data is encrypted both in transit and at rest. Perform penetration testing to identify weaknesses. Implement secure authentication mechanisms such as OAuth or multi-factor authentication. Review all third-party libraries and dependencies for known vulnerabilities.",
        difficulty: "advanced"
    },
    {
        question: "An employee reports that their device has been infected with ransomware, encrypting their files. What steps would you take?",
        answer: "First, isolate the infected device from the network to prevent spread. Identify the ransomware strain by analyzing the ransom note. Investigate possible entry points and review how the infection occurred. Recover files from backup if available. Clean the device using anti-malware tools. Update the incident response plan and conduct a root cause analysis to prevent future incidents.",
        difficulty: "intermediate"
    },
    {
        question: "A critical system is being accessed by multiple unknown IP addresses. What would be your immediate action to secure the system?",
        answer: "Immediately block the suspicious IP addresses using a firewall. Check system logs to identify any unauthorized access attempts. Verify if any data was accessed or compromised. Implement two-factor authentication (2FA) and review system configurations to ensure access control policies are enforced. Monitor the system closely for continued suspicious activity.",
        difficulty: "intermediate"
    },
    {
        question: "You are tasked with securing a cloud infrastructure. What steps would you take to ensure security in the cloud?",
        answer: "Configure proper identity and access management (IAM) roles ensuring users have minimum necessary access. Enable encryption for data at rest and in transit. Implement multi-factor authentication (MFA) and regularly audit cloud accounts. Configure security groups and virtual private clouds (VPCs) to limit network access. Enable cloud-native security monitoring tools to detect suspicious activities.",
        difficulty: "advanced"
    },
    {
        question: "Your team has just discovered a major vulnerability in a critical software application used within the organization. What would you do to mitigate the risk while waiting for a patch?",
        answer: "Assess the vulnerability severity and implement mitigating controls such as restricting application access, disabling unnecessary features, or applying workarounds. Notify stakeholders and work with the development team to prioritize patching. Monitor the application closely for exploitation signs and escalate if necessary. Consider temporarily disabling the application if the risk is extremely high.",
        difficulty: "advanced"
    },
    {
        question: "An employee clicks on a link in a phishing email that seems to come from your bank. What actions would you take to handle this incident?",
        answer: "Advise the employee to immediately change their login credentials and report the incident. Review the system for signs of malware or data exfiltration. Conduct a phishing simulation across the organization to raise awareness. Work with the IT team to ensure the email server is secured and similar emails are blocked in the future. Monitor the employee's account for suspicious activity.",
        difficulty: "intermediate"
    },
    {
        question: "A security audit reveals that several employee laptops are missing security updates. What is your course of action?",
        answer: "Immediately enforce an organization-wide patch management policy ensuring automatic updates are enabled. Prioritize critical updates and apply them across all systems. For systems that cannot be updated immediately, implement temporary compensating controls. Conduct regular audits to ensure updates are consistently applied. Establish a patch deployment schedule and track compliance.",
        difficulty: "beginner"
    },
    {
        question: "A user's credentials are suspected to have been compromised. What steps would you take to secure their account?",
        answer: "Lock the account immediately and reset the password. Enforce multi-factor authentication (MFA) if not already enabled. Review the account's recent activity to detect unauthorized access. Check if sensitive data was accessed. If so, perform incident response and notify the user. Investigate whether the breach affected other accounts and implement additional security measures.",
        difficulty: "intermediate"
    },
    {
        question: "You need to restrict access to a sensitive database to prevent unauthorized users from accessing it. How would you ensure this?",
        answer: "Implement role-based access control (RBAC) ensuring only authorized users have database access. Enable audit logging to track database activity and monitor unauthorized access attempts. Implement data encryption to protect sensitive information at rest and in transit. Use strong authentication mechanisms and consider implementing database activity monitoring tools.",
        difficulty: "intermediate"
    },
    {
        question: "A DDoS attack has been launched against your web servers. What would you do to mitigate the attack?",
        answer: "Identify the attack source and block malicious IP addresses using a web application firewall (WAF) or network firewall. Work with your hosting provider or use DDoS protection services like Cloudflare to absorb the traffic. Analyze the attack pattern and adjust network configurations, such as rate-limiting and geo-blocking. Monitor server performance and ensure backup systems can handle increased load.",
        difficulty: "intermediate"
    },
    {
        question: "An employee's personal device is found to be connecting to the company network. What actions would you take?",
        answer: "Immediately disconnect the personal device from the network. Investigate whether it accessed critical systems or sensitive data. Determine if the device poses security risks. Recommend implementing a BYOD (Bring Your Own Device) policy ensuring all personal devices comply with company security standards. Provide security guidelines for device configuration before network access.",
        difficulty: "beginner"
    },
    {
        question: "During a routine audit, you notice that a server is running with default security settings. How would you address this?",
        answer: "Immediately harden the server by disabling unnecessary services and changing default passwords. Apply security patches and configure firewalls to limit user access based on the principle of least privilege. Set up auditing to monitor unauthorized activity. Ensure the server undergoes regular security reviews to maintain its security posture. Document all configuration changes.",
        difficulty: "intermediate"
    },
    {
        question: "A malware attack has infected several devices in the organization. What actions would you take?",
        answer: "Begin by isolating the infected devices to prevent further spread. Conduct thorough malware scans on each device using updated antivirus software and remove the malware. Investigate the root cause and apply appropriate security patches. Perform forensic analysis to determine if sensitive data was compromised. Review and strengthen endpoint protection measures organization-wide.",
        difficulty: "intermediate"
    },
    {
        question: "You have to implement a secure communication channel for remote employees to access internal systems. How would you proceed?",
        answer: "Set up a VPN (Virtual Private Network) for secure communication using strong encryption protocols like IPsec or SSL/TLS. Enforce multi-factor authentication (MFA) for VPN access. Provide employees with secure device guidelines and monitor remote access regularly for suspicious activity. Implement network segmentation to isolate remote users and ensure split-tunneling is disabled.",
        difficulty: "intermediate"
    },
    {
        question: "You discover that an employee has been using their work email for personal purposes, which has led to an information leak. What do you do?",
        answer: "First, review the nature and impact of the information leak. Educate the employee on proper email usage and take appropriate disciplinary action if necessary. Strengthen email security protocols by implementing email filtering and data loss prevention (DLP). Conduct organization-wide employee awareness training on email security and acceptable use policies.",
        difficulty: "beginner"
    },
    {
        question: "Your team has received reports of suspicious login attempts on a critical application. How would you investigate and prevent unauthorized access?",
        answer: "Review logs to identify the source and pattern of login attempts. Implement account lockout policies to prevent brute-force attacks. Enable multi-factor authentication (MFA) to secure access. Monitor the application for compromise signs and reset passwords for affected users. Implement IP whitelisting for known trusted locations if applicable.",
        difficulty: "intermediate"
    },
    {
        question: "A cloud storage service has been compromised, and sensitive documents have been exposed. How would you respond to this situation?",
        answer: "Immediately revoke access to the cloud storage and initiate incident response procedures. Assess the breach's impact and notify affected parties including customers and partners. Work with the cloud service provider to secure the environment and preserve evidence. Investigate the breach cause, such as weak authentication controls, and implement additional security measures like encryption and stricter access controls.",
        difficulty: "advanced"
    }
];

// ========================================
// STATE MANAGEMENT
// ========================================

let currentScenario = 0;
let showingAnswer = false;

// ========================================
// DOM ELEMENTS
// ========================================

const questionNumberEl = document.getElementById('questionNumber');
const difficultyBadgeEl = document.getElementById('difficultyBadge');
const questionTextEl = document.getElementById('questionText');
const answerSectionEl = document.getElementById('answerSection');
const answerTextEl = document.getElementById('answerText');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const progressText = document.getElementById('progressText');
const progressFill = document.getElementById('progressFill');

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    displayScenario();
    setupEventListeners();
});

// ========================================
// EVENT LISTENERS
// ========================================

function setupEventListeners() {
    nextBtn.addEventListener('click', handleNextClick);
    restartBtn.addEventListener('click', restartScenarios);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            handleNextClick();
        }
        if (e.key === 'Escape') {
            // Could add additional functionality here
        }
    });
}

// ========================================
// SCENARIO DISPLAY
// ========================================

function displayScenario() {
    const scenario = scenarios[currentScenario];
    const progress = ((currentScenario + 1) / scenarios.length) * 100;
    
    // Update progress bar
    progressFill.style.width = progress + '%';
    progressText.textContent = `Question ${currentScenario + 1} of ${scenarios.length}`;
    
    // Update question number and difficulty
    questionNumberEl.textContent = `Question ${currentScenario + 1}`;
    updateDifficultyBadge(scenario.difficulty);
    
    // Display question and answer
    questionTextEl.textContent = scenario.question;
    answerTextEl.textContent = scenario.answer;
    
    // Reset answer visibility
    answerSectionEl.classList.remove('show');
    showingAnswer = false;
    nextBtn.textContent = 'Show Answer';
    nextBtn.style.display = 'inline-block';
    restartBtn.style.display = 'none';
}

function updateDifficultyBadge(difficulty) {
    // Remove all difficulty classes
    difficultyBadgeEl.classList.remove('beginner', 'intermediate', 'advanced');
    
    // Add appropriate class and text
    switch(difficulty.toLowerCase()) {
        case 'beginner':
            difficultyBadgeEl.textContent = 'Beginner';
            difficultyBadgeEl.classList.add('beginner');
            break;
        case 'intermediate':
            difficultyBadgeEl.textContent = 'Intermediate';
            difficultyBadgeEl.classList.add('intermediate');
            break;
        case 'advanced':
            difficultyBadgeEl.textContent = 'Advanced';
            difficultyBadgeEl.classList.add('advanced');
            break;
        default:
            difficultyBadgeEl.textContent = 'Intermediate';
            difficultyBadgeEl.classList.add('intermediate');
    }
}

// ========================================
// BUTTON HANDLERS
// ========================================

function handleNextClick() {
    if (!showingAnswer) {
        showAnswer();
    } else {
        nextScenario();
    }
}

function showAnswer() {
    answerSectionEl.classList.add('show');
    showingAnswer = true;
    nextBtn.textContent = 'Next Question';
    
    // Scroll to answer
    setTimeout(() => {
        answerSectionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

function nextScenario() {
    if (currentScenario < scenarios.length - 1) {
        currentScenario++;
        displayScenario();
        
        // Scroll to top
        document.querySelector('.question-box').scrollIntoView({ behavior: 'smooth' });
    } else {
        showCompletion();
    }
}

function showCompletion() {
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    
    questionNumberEl.textContent = 'Scenarios Complete!';
    difficultyBadgeEl.textContent = 'Excellent';
    
    questionTextEl.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <i class="fas fa-trophy" style="font-size: 3rem; color: #16a34a; margin-bottom: 1rem;"></i>
            <p style="font-size: 1.3rem; color: #16a34a; font-weight: 600;">You have completed all ${scenarios.length} cybersecurity scenarios!</p>
            <p style="color: #64748b; margin-top: 1rem; font-size: 1.05rem;">
                Great job working through these real-world security challenges. You've reviewed comprehensive responses to common cybersecurity incidents. Continue to apply these principles in your daily security practices.
            </p>
        </div>
    `;
    
    answerSectionEl.classList.remove('show');
}

function restartScenarios() {
    currentScenario = 0;
    showingAnswer = false;
    displayScenario();
    
    // Scroll to top
    document.querySelector('.question-box').scrollIntoView({ behavior: 'smooth' });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function saveProgress() {
    // Could save user progress to localStorage
    const progress = {
        currentScenario: currentScenario,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('scenarioProgress', JSON.stringify(progress));
}

function loadProgress() {
    // Could load user progress from localStorage
    const saved = localStorage.getItem('scenarioProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        // Optionally restore position
    }
}

// Save progress periodically
window.addEventListener('beforeunload', saveProgress);

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================

// Focus management
nextBtn.addEventListener('focus', function() {
    this.style.outline = '2px solid #1e40af';
});

nextBtn.addEventListener('blur', function() {
    this.style.outline = 'none';
});

restartBtn.addEventListener('focus', function() {
    this.style.outline = '2px solid #16a34a';
});

restartBtn.addEventListener('blur', function() {
    this.style.outline = 'none';
});

console.log('CyberSecurity Scenario Questions - JavaScript loaded successfully');
console.log(`Total scenarios loaded: ${scenarios.length}`);
