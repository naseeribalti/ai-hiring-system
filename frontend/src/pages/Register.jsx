import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div>
      {/* No need for h2 or p tag, form handles it */}
      <RegisterForm />
    </div>
  );
};
export default Register;