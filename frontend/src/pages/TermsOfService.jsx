import React from 'react';
import './ResourcePages.css';

const TermsOfService = () => {
  return (
    <div className="resource-page">
      <div className="resource-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Last updated: January 15, 2024</p>
        </div>
      </div>

      <div className="container">
        <div className="policy-content">
          <div className="policy-nav">
            <h3>Contents</h3>
            <nav>
              <a href="#acceptance">Acceptance of Terms</a>
              <a href="#accounts">User Accounts</a>
              <a href="#job-seekers">Job Seeker Responsibilities</a>
              <a href="#recruiters">Recruiter Responsibilities</a>
              <a href="#ai-services">AI Services</a>
              <a href="#intellectual-property">Intellectual Property</a>
              <a href="#limitations">Limitations of Liability</a>
              <a href="#termination">Termination</a>
              <a href="#governing-law">Governing Law</a>
            </nav>
          </div>

          <div className="policy-sections">
            <section id="acceptance" className="policy-section">
              <h2>1. Acceptance of Terms</h2>
              <p>
                Welcome to AI Hiring System. By accessing or using our AI-powered hiring platform, 
                you agree to be bound by these Terms of Service and our Privacy Policy. 
                If you disagree with any part of these terms, you may not access our services.
              </p>
              
              <div className="notice important">
                <strong>Important:</strong> These terms contain provisions that limit our liability 
                and require individual arbitration for disputes.
              </div>
            </section>

            <section id="accounts" className="policy-section">
              <h2>2. User Accounts</h2>
              
              <h3>Registration</h3>
              <p>To access certain features, you must register for an account and provide accurate, complete information.</p>
              
              <h3>Account Security</h3>
              <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
              
              <h3>Account Types</h3>
              <ul>
                <li><strong>Job Seekers:</strong> Individuals seeking employment opportunities</li>
                <li><strong>Recruiters:</strong> Employers or representatives posting job opportunities</li>
                <li><strong>Administrators:</strong> Platform managers with moderation capabilities</li>
              </ul>
              
              <h3>Multiple Accounts</h3>
              <p>Users may not create multiple accounts for deceptive or fraudulent purposes.</p>
            </section>

            <section id="job-seekers" className="policy-section">
              <h2>3. Job Seeker Responsibilities</h2>
              
              <h3>Profile Accuracy</h3>
              <p>You must provide accurate and truthful information in your profile, resume, and applications.</p>
              
              <h3>Application Conduct</h3>
              <ul>
                <li>Apply only to positions for which you are qualified</li>
                <li>Do not submit misleading or fraudulent applications</li>
                <li>Respond professionally to employer communications</li>
                <li>Withdraw applications if you are no longer interested</li>
              </ul>
              
              <h3>AI Processing Consent</h3>
              <p>By uploading your resume, you consent to our AI systems processing and analyzing your information for matching purposes.</p>
              
              <h3>Prohibited Actions</h3>
              <ul>
                <li>Creating fake profiles or applications</li>
                <li>Harassing employers or other users</li>
                <li>Circumventing platform security measures</li>
                <li>Using the platform for unauthorized commercial purposes</li>
              </ul>
            </section>

            <section id="recruiters" className="policy-section">
              <h2>4. Recruiter Responsibilities</h2>
              
              <h3>Job Posting Requirements</h3>
              <ul>
                <li>Post only legitimate job opportunities</li>
                <li>Provide accurate job descriptions and requirements</li>
                <li>Disclose company information truthfully</li>
                <li>Include accurate salary ranges when available</li>
              </ul>
              
              <h3>Candidate Communication</h3>
              <p>Respond to applicants in a timely and professional manner. Provide status updates for applications.</p>
              
              <h3>Equal Opportunity</h3>
              <p>Do not post jobs that discriminate based on race, gender, religion, age, disability, or other protected characteristics.</p>
              
              <h3>Fee Structure</h3>
              <p>Basic job posting is free. Premium features may require payment. All fees are clearly disclosed before purchase.</p>
              
              <h3>Data Usage</h3>
              <p>Use candidate information only for legitimate hiring purposes. Do not share, sell, or misuse candidate data.</p>
            </section>

            <section id="ai-services" className="policy-section">
              <h2>5. AI Services Disclaimer</h2>
              
              <h3>Matching Accuracy</h3>
              <p>
                Our AI matching provides recommendations based on available data. We do not guarantee 
                job placement or perfect matches. Final hiring decisions remain with employers.
              </p>
              
              <h3>Resume Parsing</h3>
              <p>
                AI resume parsing aims for 90%+ accuracy but may contain errors. Users should 
                verify parsed information and make corrections as needed.
              </p>
              
              <h3>Algorithm Transparency</h3>
              <p>
                While we explain matching factors, specific algorithm details are proprietary. 
                We continuously work to reduce bias and improve fairness.
              </p>
              
              <h3>No Employment Guarantee</h3>
              <p>
                The platform facilitates connections but does not guarantee employment. 
                We are not a party to employment agreements between users.
              </p>
            </section>

            <section id="intellectual-property" className="policy-section">
              <h2>6. Intellectual Property</h2>
              
              <h3>Platform IP</h3>
              <p>
                All platform software, design, AI models, and content are owned by AI Hiring System 
                and protected by intellectual property laws.
              </p>
              
              <h3>User Content</h3>
              <p>
                You retain ownership of your resumes, profiles, and applications. By submitting content, 
                you grant us license to use, display, and process it for platform operations.
              </p>
              
              <h3>Prohibited Use</h3>
              <p>You may not:</p>
              <ul>
                <li>Copy, modify, or create derivative works of the platform</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use platform data to train competing AI models</li>
                <li>Scrape or collect user information without permission</li>
              </ul>
            </section>

            <section id="limitations" className="policy-section">
              <h2>7. Limitations of Liability</h2>
              
              <h3>Service Availability</h3>
              <p>
                We strive for 99.5% uptime but do not guarantee uninterrupted service. 
                We are not liable for temporary outages or technical issues.
              </p>
              
              <h3>Third-Party Content</h3>
              <p>
                We are not responsible for job postings, employer conduct, or user-generated content. 
                Users interact at their own risk.
              </p>
              
              <h3>Damages Limitation</h3>
              <p>
                To the maximum extent permitted by law, our total liability for any claims 
                shall not exceed the amount paid to us in the past six months.
              </p>
              
              <div className="notice">
                <strong>No Warranties:</strong> The service is provided "as is" without warranties 
                of any kind, either express or implied.
              </div>
            </section>

            <section id="termination" className="policy-section">
              <h2>8. Termination</h2>
              
              <p>We may suspend or terminate your account for:</p>
              <ul>
                <li>Violation of these terms</li>
                <li>Fraudulent or illegal activity</li>
                <li>Creating a risk or possible legal exposure</li>
                <li>Platform abuse or misuse</li>
              </ul>
              
              <p>You may terminate your account at any time through your account settings.</p>
              
              <h3>Effect of Termination</h3>
              <p>
                Upon termination, your right to use the platform ceases immediately. 
                We may retain certain information as required by law or for legitimate business purposes.
              </p>
            </section>

            <section id="governing-law" className="policy-section">
              <h2>9. Governing Law and Dispute Resolution</h2>
              
              <h3>Governing Law</h3>
              <p>These terms shall be governed by the laws of Pakistan, without regard to conflict of law principles.</p>
              
              <h3>Dispute Resolution</h3>
              <p>Any disputes shall be resolved through binding arbitration in Islamabad, Pakistan.</p>
              
              <h3>Contact for Disputes</h3>
              <div className="contact-info">
                <p><strong>Email:</strong> legal@ai-hiring-system.com</p>
                <p><strong>Phone:</strong> +92 316 4254407</p>
                <p><strong>Address:</strong> Federal Urdu University of Arts, Science & Technology, Islamabad</p>
              </div>
            </section>

            <div className="policy-update">
              <p>
                <strong>Changes to Terms:</strong> We reserve the right to modify these terms at any time. 
                Continued use after changes constitutes acceptance of modified terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;