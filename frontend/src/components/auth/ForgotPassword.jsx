import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/validators';
import { getErrorMessage } from '../../utils/helpers';
import '../../styles/Form.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call - Replace with actual password reset service
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would call:
      // await resetPassword(formData.email);
      
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-container">
        <div className="success-state">
          <div className="success-icon">✅</div>
          <h2>Check Your Email!</h2>
          <p className="success-message">
            We've sent a password reset link to <strong>{formData.email}</strong>
          </p>
          <div className="success-details">
            <p>📧 The email should arrive within 5 minutes</p>
            <p>🔗 Click the link in the email to reset your password</p>
            <p>⏳ The link expires in 1 hour for security</p>
          </div>
          <div className="success-actions">
            <Link to="/login" className="btn btn-primary">
              Back to Login
            </Link>
            <button 
              onClick={() => setSubmitted(false)}
              className="btn btn-outline"
            >
              Try Another Email
            </button>
          </div>
          <p className="form-link">
            Didn't receive the email? <button 
              onClick={handleSubmit}
              className="resend-link"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>Reset Your Password 🔐</h2>
      <p className="form-subtitle">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <form onSubmit={handleSubmit}>
        {errors.form && <div className="form-general-error">{errors.form}</div>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="your.email@example.com"
          />
          {errors.email && <div className="form-error-message">{errors.email}</div>}
        </div>

        <button 
          type="submit" 
          className={`form-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="form-links">
        <p className="form-link">
          Remember your password? <Link to="/login">Back to Login</Link>
        </p>
        <p className="form-link">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>

      <div className="security-notice">
        <div className="security-icon">🔒</div>
        <p>
          <strong>Security Notice:</strong> For your protection, we'll only send password 
          reset links to verified email addresses.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;