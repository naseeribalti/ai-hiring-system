import React from 'react';
import LoginForm from '../components/auth/LoginForm'; // Import our new form
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;