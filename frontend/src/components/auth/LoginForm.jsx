import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail, validateRequired } from '../../utils/validators';
import { getErrorMessage } from '../../utils/helpers';
import '../../styles/Form.css';

const LoginForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validateRequired(formData.password, 'Password');

    if (!emailValidation.isValid) newErrors.email = emailValidation.message;
    if (!passwordValidation.isValid) newErrors.password = passwordValidation.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setErrors({ form: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (email input, password input, button) */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p className="form-error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="password">Password:</label>
            {/* --- ADD THIS LINK --- */}
            <Link to="/forgot-password" style={{ fontSize: '0.8rem', marginBottom: '0.5rem' }}>Forgot Password?</Link>
          </div>
          <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p className="form-error-message">{errors.password}</p>}
        </div>
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="form-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;