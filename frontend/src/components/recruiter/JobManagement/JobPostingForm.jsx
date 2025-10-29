import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../../services/jobService';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    company_name: '',
    city: '',
    country: 'Pakistan', // Default
    job_type: 'on_site', // Default
    experience_level: 'entry', // Default
    required_skills: '', // We'll use a comma-separated string
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert skills string to an array
    const skillsArray = formData.required_skills
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    // Format the data for your backend API
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
      // We will add salary_range later
    };

    try {
      // Call the API
      await createJob(jobData);
      
      // Success! Redirect to the recruiter dashboard
      navigate('/recruiter/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ marginBottom: '15px' }}>
        <label>Job Title:</label>
        <input
          type="text"
          name="job_title"
          value={formData.job_title}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Company Name:</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Job Type:</label>
        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="on_site">On-Site</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Experience Level:</label>
        <select
          name="experience_level"
          value={formData.experience_level}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="entry">Entry</option>
          <option value="mid">Mid-Level</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Required Skills (comma-separated):</label>
        <input
          type="text"
          name="required_skills"
          value={formData.required_skills}
          onChange={handleChange}
          placeholder="e.g., react, nodejs, mongodb"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Job Description:</label>
        <textarea
          name="job_description"
          value={formData.job_description}
          onChange={handleChange}
          required
          rows="10"
          style={{ width: '100%', padding: '8px' }}
        />
      </div>

      <button type="submit" disabled={loading} style={{ padding: '10px 15px' }}>
        {loading ? 'Posting Job...' : 'Post Job'}
      </button>
    </form>
  );
};

export default JobPostingForm;