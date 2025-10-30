import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company/Project Info */}
          <div className="footer-section">
            <h3 className="footer-title">AI-Powered Hiring System</h3>
            <p className="footer-description">
              Revolutionizing recruitment through artificial intelligence and 
              machine learning. Smart resume screening and intelligent job-candidate 
              matching for modern businesses.
            </p>
            <div className="footer-contact">
              <p>📧 usamakj47@gmail.com</p>
              <p>📞 +92 316 4254407</p>
              <div className="social-links">
                <a href="https://www.linkedin.com/in/muhammad-usama-balti-3aa0a0257/" target="_blank" rel="noopener noreferrer">
                  💼 LinkedIn
                </a>
                <a href="https://drive.google.com/file/d/1b6r9A9vDvknPeZvBaEZ7sO7bjo9G1hQK/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  📄 View Resume
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-subtitle">For Job Seekers</h4>
            <ul className="footer-links">
              <li><a href="/jobs">Browse Jobs</a></li>
              <li><a href="/register">Create Account</a></li>
              <li><a href="/resume-builder">Resume Builder</a></li>
              <li><a href="/my-applications">Application Status</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">For Recruiters</h4>
            <ul className="footer-links">
              <li><a href="/recruiter/post-job">Post a Job</a></li>
              <li><a href="/recruiter/dashboard">Recruiter Dashboard</a></li>
              <li><a href="/recruiter/candidates">Find Candidates</a></li>
              <li><a href="/recruiter/analytics">View Analytics</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Resources</h4>
            <ul className="footer-links">
              <li><a href="/help">Help Center</a></li>
              <li><a href="/blog">Career Blog</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          {/* University Info */}
          <div className="footer-section">
            <h4 className="footer-subtitle">Academic Project</h4>
            <div className="university-info">
              <p><strong>Federal Urdu University</strong></p>
              <p>Arts, Science & Technology</p>
              <p>Islamabad, Pakistan</p>
              <p>BS Computer Science</p>
              <p>2022-2026 Session</p>
            </div>
          </div>
        </div>

        {/* Development Team */}
        <div className="team-section">
          <h4 className="team-title">Developed By</h4>
          <div className="team-members">
            <div className="team-member">
              <strong>Muhammad Usama</strong>
              <p>BSCS-2022-37326</p>
              <p>Full Stack Developer</p>
              <div className="member-contact">
                <a href="tel:+923164254407">📞 +92 316 4254407</a>
                <a href="mailto:usamakj47@gmail.com">📧 Email</a>
                <a href="https://www.linkedin.com/in/muhammad-usama-balti-3aa0a0257/" target="_blank" rel="noopener noreferrer">
                  💼 LinkedIn
                </a>
                <a href="https://drive.google.com/file/d/1b6r9A9vDvknPeZvBaEZ7sO7bjo9G1hQK/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                  📄 Resume
                </a>
              </div>
            </div>
            <div className="team-member">
              <strong>Syed Qamar Abbas</strong>
              <p>BSCS-2022-37392</p>
              <p>Frontend & AI Specialist</p>
              <div className="member-contact">
                <p>📞 Contact Available</p>
                <p>📧 Email Available</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h4 className="contact-title">🚀 Need Help or Want to Collaborate?</h4>
          <div className="contact-actions">
            <a href="tel:+923164254407" className="contact-btn phone-btn">
              📞 Call Now: +92 316 4254407
            </a>
            <a href="mailto:usamakj47@gmail.com" className="contact-btn email-btn">
              📧 Email: usamakj47@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/muhammad-usama-balti-3aa0a0257/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-btn linkedin-btn"
            >
              💼 Connect on LinkedIn
            </a>
            <a 
              href="https://drive.google.com/file/d/1b6r9A9vDvknPeZvBaEZ7sO7bjo9G1hQK/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-btn resume-btn"
            >
              📄 View My Resume
            </a>
          </div>
        </div>

        {/* Supervisors */}
        <div className="supervisors-section">
          <h4 className="supervisors-title">Under the Guidance of</h4>
          <div className="supervisors">
            <div className="supervisor">
              <strong>Ma'am Sabeen</strong>
              <p>Project Supervisor</p>
              <p>Department of Computer Science</p>
            </div>
            <div className="supervisor">
              <strong>Sir Naeem Malik</strong>
              <p>Project Coordinator</p>
              <p>Department of Computer Science</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} AI-Powered Hiring System. Final Year Project - BS Computer Science.</p>
              <p>Contact: +92 316 4254407 | usamakj47@gmail.com</p>
            </div>
            <div className="footer-badges">
              <span className="badge">🚀 AI-Powered</span>
              <span className="badge">🔒 Secure</span>
              <span className="badge">⚡ Fast</span>
              <span className="badge">🎯 Accurate</span>
              <span className="badge">📞 +92 316 4254407</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;