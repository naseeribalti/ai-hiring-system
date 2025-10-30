import React from 'react';
import './ResourcePages.css';

const PrivacyPolicy = () => {
  return (
    <div className="resource-page">
      <div className="resource-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Last updated: January 15, 2024</p>
        </div>
      </div>

      <div className="container">
        <div className="policy-content">
          <div className="policy-nav">
            <h3>Contents</h3>
            <nav>
              <a href="#introduction">Introduction</a>
              <a href="#data-collection">Data We Collect</a>
              <a href="#data-use">How We Use Data</a>
              <a href="#data-sharing">Data Sharing</a>
              <a href="#data-security">Data Security</a>
              <a href="#your-rights">Your Rights</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </div>

          <div className="policy-sections">
            <section id="introduction" className="policy-section">
              <h2>1. Introduction</h2>
              <p>
                Welcome to AI Hiring System ("we," "our," or "us"). We are committed to protecting 
                your personal information and your right to privacy. This Privacy Policy explains 
                how we collect, use, disclose, and safeguard your information when you use our 
                AI-powered hiring platform.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in 
                accordance with this policy.
              </p>
            </section>

            <section id="data-collection" className="policy-section">
              <h2>2. Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <ul>
                <li>Contact information (email, phone number)</li>
                <li>Profile information (name, location, photo)</li>
                <li>Professional information (resume, work experience, education)</li>
                <li>Skills and qualifications</li>
                <li>Job preferences and search history</li>
              </ul>

              <h3>Automatically Collected Information</h3>
              <ul>
                <li>Device information and IP address</li>
                <li>Browser type and version</li>
                <li>Usage patterns and platform interactions</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3>AI Processing Data</h3>
              <ul>
                <li>Resume content for parsing and skill extraction</li>
                <li>Job descriptions for matching algorithms</li>
                <li>Application history and matching patterns</li>
              </ul>
            </section>

            <section id="data-use" className="policy-section">
              <h2>3. How We Use Your Information</h2>
              
              <div className="usage-grid">
                <div className="usage-card">
                  <div className="usage-icon">🎯</div>
                  <h4>Job Matching</h4>
                  <p>Use AI algorithms to match you with relevant job opportunities based on your profile and preferences.</p>
                </div>
                
                <div className="usage-card">
                  <div className="usage-icon">📊</div>
                  <h4>Platform Improvement</h4>
                  <p>Analyze usage patterns to enhance our AI models and improve user experience.</p>
                </div>
                
                <div className="usage-card">
                  <div className="usage-icon">🔒</div>
                  <h4>Security & Compliance</h4>
                  <p>Protect against fraud, ensure platform security, and comply with legal obligations.</p>
                </div>
                
                <div className="usage-card">
                  <div className="usage-icon">📱</div>
                  <h4>Communication</h4>
                  <p>Send important updates, job alerts, and platform notifications.</p>
                </div>
              </div>
            </section>

            <section id="data-sharing" className="policy-section">
              <h2>4. Data Sharing and Disclosure</h2>
              
              <p>We may share your information in the following circumstances:</p>
              
              <h3>With Your Consent</h3>
              <p>We share your profile and application information with employers when you apply for jobs.</p>
              
              <h3>Service Providers</h3>
              <p>Trusted third parties who assist in platform operations (cloud storage, email services, analytics).</p>
              
              <h3>Legal Requirements</h3>
              <p>When required by law, legal process, or governmental request.</p>
              
              <h3>Business Transfers</h3>
              <p>In connection with a merger, acquisition, or sale of assets.</p>
              
              <div className="notice">
                <strong>Note:</strong> We do not sell your personal information to third parties.
              </div>
            </section>

            <section id="data-security" className="policy-section">
              <h2>5. Data Security</h2>
              
              <p>We implement appropriate technical and organizational security measures to protect your personal information, including:</p>
              
              <ul>
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure data storage and backup procedures</li>
              </ul>
              
              <p>While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet or electronic storage is 100% secure.</p>
            </section>

            <section id="your-rights" className="policy-section">
              <h2>6. Your Data Protection Rights</h2>
              
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              
              <div className="rights-grid">
                <div className="right-card">
                  <h4>Access & Portability</h4>
                  <p>Request copies of your personal data in a structured format.</p>
                </div>
                
                <div className="right-card">
                  <h4>Correction</h4>
                  <p>Request correction of inaccurate or incomplete information.</p>
                </div>
                
                <div className="right-card">
                  <h4>Deletion</h4>
                  <p>Request deletion of your personal data ("right to be forgotten").</p>
                </div>
                
                <div className="right-card">
                  <h4>Restriction & Objection</h4>
                  <p>Object to or restrict certain processing activities.</p>
                </div>
              </div>
              
              <p>To exercise these rights, please contact us using the information below.</p>
            </section>

            <section id="contact" className="policy-section">
              <h2>7. Contact Us</h2>
              
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@ai-hiring-system.com</p>
                <p><strong>Phone:</strong> +92 316 4254407</p>
                <p><strong>Address:</strong> Federal Urdu University of Arts, Science & Technology, Islamabad</p>
              </div>
            </section>

            <div className="policy-update">
              <p>
                <strong>Updates to This Policy:</strong> We may update this privacy policy from time to time. 
                We will notify you of any changes by posting the new policy on this page and updating the 
                "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;