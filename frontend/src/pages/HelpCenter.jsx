import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ResourcePages.css';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');

  const faqCategories = {
    general: [
      {
        question: "What is the AI Hiring System?",
        answer: "The AI Hiring System is an intelligent platform that uses artificial intelligence and machine learning to revolutionize the recruitment process. It provides automated resume screening, intelligent job-candidate matching, and streamlined hiring workflows for both job seekers and recruiters."
      },
      {
        question: "Is this platform free to use?",
        answer: "Yes, our platform is completely free for job seekers. Recruiters can post jobs and access basic features for free, with premium features available for enhanced functionality."
      },
      {
        question: "How does the AI matching work?",
        answer: "Our AI matching algorithm analyzes multiple factors including skills (40%), experience (30%), education (20%), and location preferences (10%) to calculate a comprehensive match score between candidates and job opportunities."
      }
    ],
    jobSeekers: [
      {
        question: "How do I create an effective profile?",
        answer: "Complete all profile sections including education, work experience, and skills. Upload your resume for AI parsing to automatically extract your information. A complete profile increases your match score by up to 30%."
      },
      {
        question: "How can I improve my job match score?",
        answer: "Keep your profile updated, add relevant skills, ensure your resume is properly parsed, and specify your preferences accurately. The AI learns from your activity to provide better matches over time."
      },
      {
        question: "Can I track my application status?",
        answer: "Yes, you can track all your applications in the 'My Applications' section of your dashboard. You'll see status updates like Submitted, Under Review, Shortlisted, or Rejected."
      }
    ],
    recruiters: [
      {
        question: "How do I post a job?",
        answer: "Navigate to your recruiter dashboard and click 'Post Job'. Fill in the job details, requirements, and preferences. Jobs require admin approval before going live to ensure quality and compliance."
      },
      {
        question: "How are candidates ranked?",
        answer: "Candidates are automatically ranked by our AI based on match score, which considers skills, experience, education, and preferences. You can also filter and sort candidates based on specific criteria."
      },
      {
        question: "What's the approval process for jobs?",
        answer: "All job postings are reviewed by our admin team to ensure they meet platform guidelines. Approval typically takes 1-4 hours during business days. You'll receive a notification once approved."
      }
    ],
    technical: [
      {
        question: "What file formats are supported for resumes?",
        answer: "We support PDF, DOC, DOCX, and TXT files. Maximum file size is 5MB. For best results with AI parsing, we recommend using PDF format."
      },
      {
        question: "What browsers are supported?",
        answer: "We support Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser."
      },
      {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption and security measures to protect your data. We comply with GDPR and other data protection regulations."
      }
    ]
  };

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Support",
      description: "Get help via email",
      details: "support@ai-hiring-system.com",
      response: "Typically within 24 hours"
    },
    {
      icon: "📞",
      title: "Phone Support",
      description: "Speak directly with our team",
      details: "+92 316 4254407",
      response: "Mon-Fri, 9AM-6PM PKT"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Instant messaging support",
      details: "Available on dashboard",
      response: "Real-time assistance"
    }
  ];

  return (
    <div className="resource-page">
      <div className="resource-header">
        <div className="container">
          <h1>Help Center</h1>
          <p>Find answers to common questions and get support</p>
        </div>
      </div>

      <div className="container">
        <div className="resource-layout">
          {/* Sidebar */}
          <div className="resource-sidebar">
            <h3>Categories</h3>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeCategory === 'general' ? 'active' : ''}`}
                onClick={() => setActiveCategory('general')}
              >
                🌟 General
              </button>
              <button 
                className={`nav-item ${activeCategory === 'jobSeekers' ? 'active' : ''}`}
                onClick={() => setActiveCategory('jobSeekers')}
              >
                👨‍💼 Job Seekers
              </button>
              <button 
                className={`nav-item ${activeCategory === 'recruiters' ? 'active' : ''}`}
                onClick={() => setActiveCategory('recruiters')}
              >
                👔 Recruiters
              </button>
              <button 
                className={`nav-item ${activeCategory === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveCategory('technical')}
              >
                🔧 Technical
              </button>
            </nav>

            <div className="sidebar-help">
              <h4>Need More Help?</h4>
              <p>Can't find what you're looking for? Our support team is here to assist you.</p>
              <Link to="/contact" className="btn btn-primary">
                Contact Support
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="resource-content">
            {/* FAQ Section */}
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqCategories[activeCategory].map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Methods */}
            <section className="contact-section">
              <h2>Get in Touch</h2>
              <div className="contact-grid">
                {contactMethods.map((method, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-icon">{method.icon}</div>
                    <h3>{method.title}</h3>
                    <p>{method.description}</p>
                    <div className="contact-details">
                      <strong>{method.details}</strong>
                      <span className="response-time">{method.response}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Links */}
            <section className="quick-links-section">
              <h2>Quick Resources</h2>
              <div className="quick-links">
                <Link to="/career-blog" className="quick-link">
                  <span>📝</span>
                  <div>
                    <strong>Career Blog</strong>
                    <p>Tips and advice for job seekers</p>
                  </div>
                </Link>
                <Link to="/privacy" className="quick-link">
                  <span>🔒</span>
                  <div>
                    <strong>Privacy Policy</strong>
                    <p>How we protect your data</p>
                  </div>
                </Link>
                <Link to="/terms" className="quick-link">
                  <span>📄</span>
                  <div>
                    <strong>Terms of Service</strong>
                    <p>Platform rules and guidelines</p>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;