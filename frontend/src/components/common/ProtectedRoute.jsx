import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/**
 * This component protects routes that require a user to be logged in.
 * @param {{ children: React.ReactNode }} props
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // 1. Show a loading message while auth state is being checked
  if (loading) {
    return <div>Loading authentication status...</div>;
  }

  // 2. If the user is NOT authenticated, redirect them to the login page
  if (!isAuthenticated) {
    // 'replace' stops the user from using the "back" button to return
    return <Navigate to="/login" replace />;
  }

  // 3. If the user IS authenticated, show the page
  // 'children' will be the page component we are protecting (e.g., <Dashboard />)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;