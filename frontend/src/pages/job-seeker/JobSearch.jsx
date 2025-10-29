import React, { useState, useEffect } from 'react';
import { getActiveJobs } from '../../services/jobService'; // Import our new service
import JobCard from '../../components/job-seeker/JobSearch/JobCard'; // Import the card

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await getActiveJobs();
        setJobs(response.data); // Save the list of jobs
        setError(null);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
        setError(err.response?.data?.message || 'Could not load jobs.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Runs once on load

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Find Your Next Job</h2>
      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No active jobs found. Please check back later.</p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} /> // Use the JobCard component
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;