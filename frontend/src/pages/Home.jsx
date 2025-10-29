import React from 'react';
import { useAuth } from '../hooks/useAuth'; // Import the hook

const Home = () => {
  const { user, isAuthenticated } = useAuth(); // Get auth state

  return (
    <div>
      {isAuthenticated ? (
        // Show a welcome message if logged in
        <h1>Welcome back, {user.profile?.first_name}!</h1>
      ) : (
        // Show a generic message if logged out
        <h1>Welcome to the AI Hiring System</h1>
      )}
      
      <p>This is the home page. The best candidates are found here.</p>
    </div>
  );
};

export default Home;