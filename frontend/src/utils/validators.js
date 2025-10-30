import { FILE_CONFIG } from './constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate password strength
 */
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  // Optional: Add more password strength checks
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  // Basic phone validation for Pakistani numbers
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  
  if (!phoneRegex.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate file for resume upload
 */
export const validateResumeFile = (file) => {
  if (!file) {
    return { isValid: false, message: 'Please select a file' };
  }
  
  // Check file type
  const allowedTypes = FILE_CONFIG.ALLOWED_RESUME_TYPES;
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  
  if (!allowedTypes.includes(fileExtension)) {
    return { 
      isValid: false, 
      message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  // Check file size
  if (file.size > FILE_CONFIG.MAX_RESUME_SIZE) {
    return { 
      isValid: false, 
      message: `File too large. Maximum size: ${FILE_CONFIG.MAX_RESUME_SIZE / 1024 / 1024}MB` 
    };
  }
  
  return { isValid: true, message: '' };
};

/**
 * Validate job posting form
 */
export const validateJobPosting = (jobData) => {
  const errors = {};
  
  // Required fields
  if (!jobData.job_title?.trim()) {
    errors.job_title = 'Job title is required';
  }
  
  if (!jobData.job_description?.trim()) {
    errors.job_description = 'Job description is required';
  }
  
  if (!jobData.company?.trim()) {
    errors.company = 'Company name is required';
  }
  
  if (!jobData.location?.trim()) {
    errors.location = 'Location is required';
  }
  
  if (!jobData.job_type) {
    errors.job_type = 'Job type is required';
  }
  
  // Salary validation
  if (jobData.salary_range) {
    const min = jobData.salary_range.min;
    const max = jobData.salary_range.max;
    
    if (min && max && min > max) {
      errors.salary_range = 'Minimum salary cannot be greater than maximum salary';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate user profile form
 */
export const validateUserProfile = (profileData) => {
  const errors = {};
  
  if (!profileData.first_name?.trim()) {
    errors.first_name = 'First name is required';
  }
  
  if (!profileData.last_name?.trim()) {
    errors.last_name = 'Last name is required';
  }
  
  if (profileData.phone && !validatePhone(profileData.phone).isValid) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate application form
 */
export const validateApplication = (applicationData) => {
  const errors = {};
  
  if (!applicationData.resume_id) {
    errors.resume_id = 'Please select a resume';
  }
  
  if (!applicationData.cover_letter?.trim()) {
    errors.cover_letter = 'Cover letter is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validate search filters
 */
export const validateSearchFilters = (filters) => {
  const errors = {};
  
  // Salary range validation
  if (filters.salaryRange) {
    const [min, max] = filters.salaryRange.split('-').map(Number);
    
    if (min && max && min > max) {
      errors.salaryRange = 'Invalid salary range';
    }
  }
  
  // Experience validation
  if (filters.experienceLevel) {
    const [min, max] = filters.experienceLevel.split('-').map(Number);
    
    if (min && max && min > max) {
      errors.experienceLevel = 'Invalid experience range';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generic form validator
 */
export const createValidator = (rules) => {
  return (data) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const value = data[field];
      const fieldRules = rules[field];
      
      for (const rule of fieldRules) {
        const result = rule(value, data);
        if (!result.isValid) {
          errors[field] = result.message;
          break;
        }
      }
    });
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };
};

// Pre-built validation rules
export const validationRules = {
  email: [
    (value) => validateRequired(value, 'Email'),
    (value) => validateEmail(value)
  ],
  password: [
    (value) => validateRequired(value, 'Password'),
    (value) => validatePassword(value)
  ],
  phone: [
    (value) => validatePhone(value)
  ],
  required: (fieldName) => [
    (value) => validateRequired(value, fieldName)
  ]
};