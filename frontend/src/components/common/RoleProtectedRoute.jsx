import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component protects routes based on user role.
 * @param {{ allowedRoles: Array<string>, children: React.ReactNode }} props
 */
const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  // 1. Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has the allowed role
  const hasRole = allowedRoles.includes(user.user_type);

  if (!hasRole) {
    // Redirect to home page if they don't have the role
    return <Navigate to="/" replace />;
  }

  // 3. If authenticated and has role, show the page
  return children;
};

export default RoleProtectedRoute;