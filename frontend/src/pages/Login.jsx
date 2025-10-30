import React from 'react';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div>
      {/* No need for h2 or p tag, form handles it */}
      <LoginForm /> 
    </div>
  );
};
export default Login;