import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import useParams to read the URL
import { getJobById } from '../../services/jobService'; // Import the API function
import { useAuth } from '../../hooks/useAuth'; // We'll check if the user is a job_seeker

const JobDetails = () => {
  const { jobId } = useParams(); // Gets the ':jobId' from the URL
  const { user, isAuthenticated } = useAuth(); // Get auth state
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This function runs when the component loads
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await getJobById(jobId);
        setJob(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch job details:', err);
        setError(err.response?.data?.message || 'Could not load job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]); // It re-runs if the jobId in the URL changes

  // --- Render Logic ---
  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  // Check if the user is a job_seeker to show the "Apply" button
  const isJobSeeker = isAuthenticated && user.user_type === 'job_seeker';

  return (
    <div>
      <h2>{job.job_title}</h2>
      <p>
        <strong>{job.company_name}</strong> - {job.location?.city}, {job.location?.country}
      </p>

      <div style={{ marginTop: '30px' }}>
        {isJobSeeker && (
          <Link 
            to={`/apply/${job._id}`} 
            style={{ 
              padding: '10px 15px', 
              backgroundColor: 'blue', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '5px' 
            }}
          >
            Apply Now
          </Link>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Job Description</h4>
        {/* 'whiteSpace: "pre-wrap"' respects newlines in the description */}
        <p style={{ whiteSpace: 'pre-wrap' }}>{job.job_description}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Requirements</h4>
        <ul>
          {job.requirements?.required_skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <p>Experience Level: {job.requirements?.experience_level}</p>
      </div>
    </div>
  );
};

export default JobDetails;