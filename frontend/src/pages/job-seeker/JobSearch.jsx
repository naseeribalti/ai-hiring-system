import React, { useState, useEffect } from 'react';
import { getActiveJobs } from '../../services/jobService'; // Import our new service
import JobCard from '../../components/job-seeker/JobSearch/JobCard'; // Import the card
import { ContentLoader } from '../../components/common/Loading/LoadingSpinner';


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
    // Replace the old text with your new component
    return <ContentLoader text="Loading available jobs..." />;
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
            <JobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch;