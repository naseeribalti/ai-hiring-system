import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#f4f4f4',
      borderBottom: '1px solid #ccc'
    }}>
      <div>
        <Link to="/">
          <h3>AI Hiring System</h3>
        </Link>
      </div>
      <nav>
        <Link to="/jobs" style={{ marginRight: '15px' }}>Find Jobs</Link>

        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px' }}>
              Welcome, {user.profile?.first_name || user.email}!
            </span>

            {/* --- DYNAMIC DASHBOARD LINK --- */}
            {user.user_type === 'job_seeker' && (
              <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
            )}
            {user.user_type === 'recruiter' && (
              <Link to="/recruiter/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
            )}
            {/* We can add admin link later */}

            {user.user_type === 'admin' && (
              <Link to="/admin/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
            )}

            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;