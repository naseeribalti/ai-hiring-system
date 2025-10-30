import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../../services/jobService';
import '../../../styles/Form.css'; // <-- Import the shared Form CSS
// Import validators if needed
import { validateRequired } from '../../../utils/validators';
import { getErrorMessage } from '../../../utils/helpers';


const JobPostingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    company_name: '',
    city: '',
    country: 'Pakistan',
    job_type: 'on_site',
    experience_level: 'entry',
    required_skills: '',
  });
  const [loading, setLoading] = useState(false);
  // Use state for errors
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
     if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // --- Optional: Add Validation ---
  const validateForm = () => {
    const newErrors = {};
    const titleVal = validateRequired(formData.job_title, 'Job Title');
    const companyVal = validateRequired(formData.company_name, 'Company Name');
    const cityVal = validateRequired(formData.city, 'City');
    const descVal = validateRequired(formData.job_description, 'Job Description');

    if (!titleVal.isValid) newErrors.job_title = titleVal.message;
    if (!companyVal.isValid) newErrors.company_name = companyVal.message;
    if (!cityVal.isValid) newErrors.city = cityVal.message;
    if (!descVal.isValid) newErrors.job_description = descVal.message;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate first

    setLoading(true);
    setErrors({});

    const skillsArray = formData.required_skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    const jobData = {
      job_title: formData.job_title,
      job_description: formData.job_description,
      company_name: formData.company_name,
      location: {
        city: formData.city,
        country: formData.country,
        job_type: formData.job_type,
      },
      requirements: {
        required_skills: skillsArray,
        experience_level: formData.experience_level,
      },
    };

    try {
      await createJob(jobData);
      navigate('/recruiter/dashboard');
    } catch (err) {
      setErrors({ form: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Add the form-container class
    <div className="form-container">
      {/* Remove h2 from here, page has it */}
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="form-general-error">{errors.form}</p>}
        
        <div className="form-group"> {/* Add form-group class */}
          <label htmlFor="job_title">Job Title:</label>
          <input id="job_title" type="text" name="job_title" value={formData.job_title} onChange={handleChange} />
          {errors.job_title && <p className="form-error-message">{errors.job_title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="company_name">Company Name:</label>
          <input id="company_name" type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
           {errors.company_name && <p className="form-error-message">{errors.company_name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} />
           {errors.city && <p className="form-error-message">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="job_type">Job Type:</label>
          <select id="job_type" name="job_type" value={formData.job_type} onChange={handleChange}>
            <option value="on_site">On-Site</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience_level">Experience Level:</label>
          <select id="experience_level" name="experience_level" value={formData.experience_level} onChange={handleChange}>
            <option value="entry">Entry</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="required_skills">Required Skills (comma-separated):</label>
          <input id="required_skills" type="text" name="required_skills" value={formData.required_skills} onChange={handleChange} placeholder="e.g., react, nodejs, mongodb" />
        </div>

        <div className="form-group">
          <label htmlFor="job_description">Job Description:</label>
          <textarea id="job_description" name="job_description" value={formData.job_description} onChange={handleChange} rows="10" />
           {errors.job_description && <p className="form-error-message">{errors.job_description}</p>}
        </div>

        <button type="submit" className="form-button" disabled={loading}> {/* Add form-button class */}
          {loading ? 'Posting Job...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;