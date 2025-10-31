import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isAuthenticated, user, isMobileMenuOpen, onCloseMobileMenu }) => {
  const getUserDashboardPath = () => {
    if (!user) return '/dashboard';
    switch (user.user_type) {
      case 'job_seeker':
        return '/job-seeker/dashboard';
      case 'recruiter':
        return '/recruiter/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Public Navigation */}
      <div className="nav-section">
        <NavLinkItem 
          to="/jobs" 
          icon="🔍"
          label="Find Jobs"
          onClick={onCloseMobileMenu}
        />
      </div>

      {/* Authenticated User Navigation */}
      {isAuthenticated ? (
        <AuthenticatedNavigation 
          user={user}
          dashboardPath={getUserDashboardPath()}
          onCloseMobileMenu={onCloseMobileMenu}
        />
      ) : (
        <GuestNavigation onCloseMobileMenu={onCloseMobileMenu} />
      )}
    </nav>
  );
};

const NavLinkItem = ({ to, icon, label, onClick, className = '' }) => (
  <NavLink 
    to={to} 
    className={`nav-link ${className}`}
    onClick={onClick}
  >
    <span className="nav-icon">{icon}</span>
    {label}
  </NavLink>
);

const AuthenticatedNavigation = ({ user, dashboardPath, onCloseMobileMenu }) => (
  <div className="nav-section authenticated-nav">
    {/* Dashboard Link */}
    <NavLinkItem 
      to={dashboardPath}
      icon="📊"
      label="Dashboard"
      onClick={onCloseMobileMenu}
    />

    {/* Role-specific Navigation */}
    {user.user_type === 'job_seeker' && <JobSeekerNavigation onCloseMobileMenu={onCloseMobileMenu} />}
    {user.user_type === 'recruiter' && <RecruiterNavigation onCloseMobileMenu={onCloseMobileMenu} />}
    {user.user_type === 'admin' && <AdminNavigation onCloseMobileMenu={onCloseMobileMenu} />}
  </div>
);

const JobSeekerNavigation = ({ onCloseMobileMenu }) => (
  <>
    <NavLinkItem 
      to="/job-seeker/applications" 
      icon="📝"
      label="My Applications"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/job-seeker/resume-builder" 
      icon="📄"
      label="Resume Builder"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/job-seeker/recommended-jobs" 
      icon="⭐"
      label="Recommended Jobs"
      onClick={onCloseMobileMenu}
    />
  </>
);

const RecruiterNavigation = ({ onCloseMobileMenu }) => (
  <>
    <NavLinkItem 
      to="/recruiter/post-job" 
      icon="➕"
      label="Post Job"
      className="highlight"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/recruiter/jobs" 
      icon="💼"
      label="My Jobs"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/recruiter/candidates" 
      icon="👥"
      label="Candidates"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/recruiter/analytics" 
      icon="📈"
      label="Analytics"
      onClick={onCloseMobileMenu}
    />
  </>
);

const AdminNavigation = ({ onCloseMobileMenu }) => (
  <>
    <NavLinkItem 
      to="/admin/users" 
      icon="👥"
      label="User Management"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/admin/jobs" 
      icon="💼"
      label="Job Moderation"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/admin/analytics" 
      icon="📊"
      label="Platform Analytics"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/admin/system" 
      icon="⚙️"
      label="System Settings"
      onClick={onCloseMobileMenu}
    />
  </>
);

const GuestNavigation = ({ onCloseMobileMenu }) => (
  <div className="nav-section guest-nav">
    <NavLinkItem 
      to="/login" 
      icon="🔑"
      label="Login"
      onClick={onCloseMobileMenu}
    />
    <NavLinkItem 
      to="/register" 
      icon="👤"
      label="Sign Up"
      className="register-button"
      onClick={onCloseMobileMenu}
    />
  </div>
);

export default Navigation;