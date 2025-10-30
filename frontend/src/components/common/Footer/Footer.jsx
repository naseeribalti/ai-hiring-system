import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Single-line Footer Layout */}
        <div className="footer-single-line">
          <nav className="footer-nav" aria-label="Footer navigation">
            <a className="footer-brand" href="/">AI-Powered Hiring System</a>
            <a href="/jobs" className="footer-link">For Job Seekers</a>
            <a href="/recruiter" className="footer-link">For Recruiters</a>
            <a href="/resources" className="footer-link">Resources</a>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} AI-Powered Hiring System.</p>
            </div>
            <div className="footer-badges">
              <span className="badge">Final Year Project</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;