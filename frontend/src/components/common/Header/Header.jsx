import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import './Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getUserDashboardPath = () => {
    if (!user) return '/dashboard';
    switch (user.user_type) {
      case 'job_seeker':
        return '/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  const getUserRoleLabel = () => {
    if (!user) return '';
    switch (user.user_type) {
      case 'job_seeker':
        return 'Job Seeker';
      case 'recruiter':
        return 'Recruiter';
      case 'admin':
        return 'Administrator';
      default:
        return 'User';
    }
  };

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Brand/Logo */}
        <div className="header-brand">
          <Link to="/" onClick={closeMobileMenu}>
            <div className="brand-content">
              <span className="brand-icon">🤖</span>
              <span className="brand-text">
                AI<span className="brand-highlight">Hiring</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {/* Public Navigation */}
          <div className="nav-section">
            <NavLink 
              to="/jobs" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              <span className="nav-icon">🔍</span>
              Find Jobs
            </NavLink>
          </div>

          {/* Authenticated User Navigation */}
          {isAuthenticated ? (
            <div className="nav-section authenticated-nav">
              {/* Dashboard Link */}
              <NavLink 
                to={getUserDashboardPath()} 
                className="nav-link"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </NavLink>

              {/* Role-specific Quick Actions */}
              {user.user_type === 'job_seeker' && (
                <>
                  <NavLink 
                    to="/my-applications" 
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-icon">📝</span>
                    My Applications
                  </NavLink>
                  <NavLink 
                    to="/resume-builder" 
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-icon">📄</span>
                    Resume Builder
                  </NavLink>
                </>
              )}

              {user.user_type === 'recruiter' && (
                <>
                  <NavLink 
                    to="/recruiter/post-job" 
                    className="nav-link highlight"
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-icon">➕</span>
                    Post Job
                  </NavLink>
                  <NavLink 
                    to="/recruiter/candidates" 
                    className="nav-link"
                    onClick={closeMobileMenu}
                  >
                    <span className="nav-icon">👥</span>
                    Candidates
                  </NavLink>
                </>
              )}

              {user.user_type === 'admin' && (
                <NavLink 
                  to="/admin/dashboard" 
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  <span className="nav-icon">⚙️</span>
                  Admin Panel
                </NavLink>
              )}

              {/* User Profile Section */}
              <div className="user-profile-section">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.profile?.first_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <span className="user-name">
                      {user.profile?.first_name || user.email}
                    </span>
                    <span className="user-role">
                      {getUserRoleLabel()}
                    </span>
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                <div className="user-dropdown">
                  <button 
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    <span className="nav-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Guest Navigation */
            <div className="nav-section guest-nav">
              <NavLink 
                to="/login" 
                className="nav-link"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">🔑</span>
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className="nav-link register-button"
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">👤</span>
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-overlay"
            onClick={closeMobileMenu}
          ></div>
        )}
      </div>
    </header>
  );
};

export default Header;