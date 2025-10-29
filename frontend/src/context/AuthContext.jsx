import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginService, register as registerService } from '../services/authService';
import api from '../services/api';

// 1. Create the Context
export const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the logged-in user's data
  const [loading, setLoading] = useState(true); // To check auth status on app load
  const navigate = useNavigate();

  // 3. Check for an existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      // If we have a token, set the user state
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // 4. Login function
  const login = async (email, password) => {
    try {
      const response = await loginService({ email, password });
      
      // Store token and user data
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      
      // Update the user state
      setUser(response.data);
      
      // Navigate to the dashboard (or home for now)
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw the error so the form can catch it
    }
  };

  // 5. Logout function
  const logout = () => {
    // Clear token and user data
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Clear the user state
    setUser(null);
    
    // Navigate to the login page
    navigate('/login');
  };

  // 6. Provide these values to all children components
  const value = {
    user,
    isAuthenticated: !!user, // True if 'user' is not null
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};