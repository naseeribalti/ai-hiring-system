import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService'; // Import our new function

const RegisterForm = () => {
  const navigate = useNavigate(); // Hook for redirecting
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: 'job_seeker', // Default to job_seeker
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // This function updates the state when you type in a field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // This function runs when you click the "Register" button
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the browser from refreshing
    setLoading(true);
    setError(null);

    // This data structure must match your backend API
    const dataToSubmit = {
      email: formData.email,
      password: formData.password,
      user_type: formData.userType,
      profile: {
        first_name: formData.firstName,
        last_name: formData.lastName,
      },
    };

    try {
      // Call the API
      const response = await register(dataToSubmit);
      console.log('Registration successful:', response.data);
      
      // Redirect to the login page on success
      navigate('/login');

    } catch (err) {
      // Handle errors (e.g., "User already exists")
      console.error('Registration error:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Show an error message if one exists */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          minLength="6"
          required
        />
      </div>
      <div>
        <label>Register as:</label>
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;