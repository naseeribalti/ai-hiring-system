import api from './api'; // Import our pre-configured axios instance

/**
 * Registers a new user.
 * @param {object} userData - The user data from the form.
 * E.g., { email, password, user_type, profile }
 */
export const register = (userData) => {
  // api.post will automatically send this to http://localhost:5000/api/auth/register
  return api.post('/auth/register', userData);
};

// We will add the login function here later
export const login = (credentials) => {
  // api.post will send this to http://localhost:5000/api/auth/login
  return api.post('/auth/login', credentials);
};