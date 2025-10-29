import axios from 'axios';

// Get the token from localStorage (we will set this after login)
const token = localStorage.getItem('userToken');

// Create a new axios instance
const api = axios.create({
  // Your backend API's base URL
  baseURL: 'http://localhost:5000/api',
});

// --- Interceptor for API Requests ---
// This function will run before every API request
api.interceptors.request.use(
  (config) => {
    // Get the token from local storage
    const token = localStorage.getItem('userToken');
    
    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;