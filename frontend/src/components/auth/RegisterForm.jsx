import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validators';
import { USER_ROLES } from '../../utils/constants';
import { getErrorMessage } from '../../utils/helpers';
import '../../styles/Form.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userType: USER_ROLES.JOB_SEEKER,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const calculatePasswordStrength = (password) => {
    if (!password) return '';
    
    let strength = 0;
    
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 8) strength += 1;
    
    // Complexity checks
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'fair';
    if (strength <= 5) return 'good';
    return 'strong';
  };

  const getStrengthLabel = (strength) => {
    const labels = {
      '': 'Start typing...',
      'weak': 'Too weak',
      'fair': 'Fair',
      'good': 'Good',
      'strong': 'Strong!'
    };
    return labels[strength];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const firstNameValidation = validateRequired(formData.firstName, 'First Name');
    const lastNameValidation = validateRequired(formData.lastName, 'Last Name');
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);

    if (!firstNameValidation.isValid) newErrors.firstName = firstNameValidation.message;
    if (!lastNameValidation.isValid) newErrors.lastName = lastNameValidation.message;
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
      await register(dataToSubmit);
      navigate('/login');
    } catch (err) {
      setErrors({ form: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Join AI Hiring System 🚀</h2>
      <form onSubmit={handleSubmit}>
        {errors.form && <div className="form-general-error">{errors.form}</div>}

        <div className="role-selection">
          <div 
            className={`role-card ${formData.userType === USER_ROLES.JOB_SEEKER ? 'selected' : ''}`}
            onClick={() => setFormData({...formData, userType: USER_ROLES.JOB_SEEKER})}
          >
            <div className="role-icon">👨‍💼</div>
            <h3>Job Seeker</h3>
            <p>Find your dream job with AI-powered matching</p>
          </div>
          <div 
            className={`role-card ${formData.userType === USER_ROLES.RECRUITER ? 'selected' : ''}`}
            onClick={() => setFormData({...formData, userType: USER_ROLES.RECRUITER})}
          >
            <div className="role-icon">👔</div>
            <h3>Recruiter</h3>
            <p>Find perfect candidates with smart AI screening</p>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && <div className="form-error-message">{errors.firstName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && <div className="form-error-message">{errors.lastName}</div>}
        </div>

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

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
            placeholder="Create a strong password"
          />
          {formData.password && (
            <>
              <div className="password-strength">
                <div className={`strength-bar strength-${passwordStrength}`}></div>
              </div>
              <div className="strength-labels">
                <span className={`strength-label ${passwordStrength === 'weak' ? 'active' : ''}`}>
                  Weak
                </span>
                <span className={`strength-label ${passwordStrength === 'fair' ? 'active' : ''}`}>
                  Fair
                </span>
                <span className={`strength-label ${passwordStrength === 'good' ? 'active' : ''}`}>
                  Good
                </span>
                <span className={`strength-label ${passwordStrength === 'strong' ? 'active' : ''}`}>
                  Strong!
                </span>
              </div>
            </>
          )}
          {errors.password && <div className="form-error-message">{errors.password}</div>}
        </div>

        <button 
          type="submit" 
          className={`form-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <p className="form-link">
        Already have an account? <Link to="/login">Sign in here</Link>
      </p>
    </div>
  );
};

export default RegisterForm;