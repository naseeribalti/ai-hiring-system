import React from 'react';
import RegisterForm from '../components/auth/RegisterForm'; // Import our new form
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <RegisterForm />
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;