import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ isAuthenticated, user, onLogout, onCloseMobileMenu }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    onCloseMobileMenu();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  const getUserInitials = () => {
    if (user?.profile?.first_name) {
      return user.profile.first_name.charAt(0).toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="user-menu">
      <div className="user-profile-section">
        <div 
          className="user-info"
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && toggleDropdown()}
        >
          <div className="user-avatar">
            {getUserInitials()}
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
        {isDropdownOpen && (
          <div className="user-dropdown">
            <DropdownMenu 
              user={user}
              onLogout={handleLogout}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DropdownMenu = ({ user, onLogout, onClose }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const getProfilePath = () => {
    switch (user.user_type) {
      case 'job_seeker':
        return '/job-seeker/profile';
      case 'recruiter':
        return '/recruiter/profile';
      case 'admin':
        return '/admin/profile';
      default:
        return '/profile';
    }
  };

  const getSettingsPath = () => {
    switch (user.user_type) {
      case 'job_seeker':
        return '/job-seeker/settings';
      case 'recruiter':
        return '/recruiter/settings';
      case 'admin':
        return '/admin/settings';
      default:
        return '/settings';
    }
  };

  return (
    <div className="dropdown-content">
      <div className="dropdown-item" onClick={() => handleNavigation(getProfilePath())}>
        <span className="dropdown-icon">👤</span>
        My Profile
      </div>
      
      <div className="dropdown-item" onClick={() => handleNavigation(getSettingsPath())}>
        <span className="dropdown-icon">⚙️</span>
        Settings
      </div>

      {user.user_type === 'job_seeker' && (
        <div className="dropdown-item" onClick={() => handleNavigation('/job-seeker/resume')}>
          <span className="dropdown-icon">📄</span>
          My Resume
        </div>
      )}

      {user.user_type === 'recruiter' && (
        <div className="dropdown-item" onClick={() => handleNavigation('/recruiter/company')}>
          <span className="dropdown-icon">🏢</span>
          Company Profile
        </div>
      )}

      <div className="dropdown-divider"></div>

      <div className="dropdown-item logout-item" onClick={onLogout}>
        <span className="dropdown-icon">🚪</span>
        Logout
      </div>
    </div>
  );
};

export default UserMenu;