import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES } from '../utils/constants';
import { getUserDisplayName } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  const getRoleBasedContent = () => {
    if (!isAuthenticated) return null;

    switch (user.user_type) {
      case USER_ROLES.JOB_SEEKER:
        return {
          title: `Welcome back, ${getUserDisplayName(user)}! 🎯`,
          subtitle: 'Your next career opportunity is waiting',
          actions: [
            { label: '🔍 Find Jobs', path: '/jobs', color: 'primary' },
            { label: '📝 My Applications', path: '/my-applications', color: 'secondary' },
            { label: '📄 Resume Builder', path: '/resume-builder', color: 'success' }
          ],
          stats: [
            { label: 'Jobs Applied', value: '12', change: '+2' },
            { label: 'Profile Views', value: '45', change: '+5' },
            { label: 'Match Score', value: '85%', change: '+3%' }
          ]
        };

      case USER_ROLES.RECRUITER:
        return {
          title: `Welcome, ${getUserDisplayName(user)}! 👔`,
          subtitle: 'Find the perfect candidates for your team',
          actions: [
            { label: '➕ Post Job', path: '/recruiter/post-job', color: 'primary' },
            { label: '👥 View Candidates', path: '/recruiter/candidates', color: 'secondary' },
            { label: '📊 Analytics', path: '/recruiter/analytics', color: 'success' }
          ],
          stats: [
            { label: 'Active Jobs', value: '8', change: '+1' },
            { label: 'New Applications', value: '23', change: '+5' },
            { label: 'Hired This Month', value: '3', change: '+1' }
          ]
        };

      case USER_ROLES.ADMIN:
        return {
          title: `Admin Dashboard, ${getUserDisplayName(user)}! ⚙️`,
          subtitle: 'Manage the platform and ensure smooth operations',
          actions: [
            { label: '👥 User Management', path: '/admin/dashboard', color: 'primary' },
            { label: '📋 Job Moderation', path: '/admin/dashboard', color: 'secondary' },
            { label: '📈 System Analytics', path: '/admin/dashboard', color: 'success' }
          ],
          stats: [
            { label: 'Total Users', value: '1,234', change: '+23' },
            { label: 'Pending Jobs', value: '12', change: '-3' },
            { label: 'Platform Health', value: '99.8%', change: '+0.2%' }
          ]
        };

      default:
        return null;
    }
  };

  const roleContent = getRoleBasedContent();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              🤖 AI-Powered Hiring Platform
            </div>
            <h1 className="hero-title">
              {isAuthenticated ? roleContent?.title : 'Find Your Dream Job with AI Precision 🚀'}
            </h1>
            <p className="hero-subtitle">
              {isAuthenticated 
                ? roleContent?.subtitle 
                : 'Revolutionizing recruitment through artificial intelligence. Smart resume screening, intelligent matching, and faster hiring decisions.'
              }
            </p>
            
            {!isAuthenticated && (
              <div className="hero-actions">
                <Link to="/register" className="btn btn-primary btn-large">
                  👤 Get Started - It's Free
                </Link>
                <Link to="/jobs" className="btn btn-secondary btn-large">
                  🔍 Browse Jobs
                </Link>
              </div>
            )}
          </div>
          
          <div className="hero-visual">
            <div className="floating-cards">
              <div className="card resume-card">
                <div className="card-icon">📄</div>
                <h4>AI Resume Parsing</h4>
                <p>Extract skills with 90%+ accuracy</p>
              </div>
              <div className="card match-card">
                <div className="card-icon">🎯</div>
                <h4>Smart Matching</h4>
                <p>Intelligent candidate-job matching</p>
              </div>
              <div className="card analytics-card">
                <div className="card-icon">📊</div>
                <h4>Advanced Analytics</h4>
                <p>Data-driven hiring insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-specific Quick Actions */}
      {isAuthenticated && roleContent && (
        <section className="quick-actions-section">
          <div className="container">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              {roleContent.actions.map((action, index) => (
                <Link 
                  key={index}
                  to={action.path}
                  className={`action-card ${action.color}`}
                >
                  <span className="action-icon">{action.label.split(' ')[0]}</span>
                  <span className="action-text">{action.label.split(' ').slice(1).join(' ')}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {isAuthenticated && roleContent && (
        <section className="stats-section">
          <div className="container">
            <h2 className="section-title">Your Overview</h2>
            <div className="stats-grid">
              {roleContent.stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-change positive">
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section (for non-authenticated users) */}
      {!isAuthenticated && (
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">Why Choose AI Hiring System?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Process resumes and find matches in seconds, not days</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Precision Matching</h3>
                <p>AI algorithms that understand context and relevance</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure & Private</h3>
                <p>Enterprise-grade security for your data and privacy</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Smart Analytics</h3>
                <p>Get insights into your hiring process and candidate pool</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Transform Your Hiring Process?</h2>
              <p className="cta-subtitle">
                Join thousands of companies and job seekers already using our AI-powered platform
              </p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-large">
                  🚀 Start Free Trial
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  🔑 Sign In
                </Link>
              </div>
              <div className="cta-stats">
                <div className="stat">
                  <strong>10,000+</strong>
                  <span>Active Job Seekers</span>
                </div>
                <div className="stat">
                  <strong>500+</strong>
                  <span>Companies Hiring</span>
                </div>
                <div className="stat">
                  <strong>95%</strong>
                  <span>Match Accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Note */}
      <section className="footer-note">
        <div className="container">
          <p>
            <strong>Academic Project</strong> - Developed by Muhammad Usama & Syed Qamar Abbas | 
            BS Computer Science 2022-2026 | Federal Urdu University of Arts, Science & Technology
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;