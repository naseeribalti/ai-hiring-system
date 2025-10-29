import React, { useState, useEffect, useCallback } from 'react';
import { getPendingJobs, updateJobStatus } from '../../../services/jobService';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define a function to fetch data that we can call again
  const fetchPendingJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPendingJobs();
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pending jobs.',err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when component loads
  useEffect(() => {
    fetchPendingJobs();
  }, [fetchPendingJobs]);

  const handleUpdateStatus = async (jobId, newStatus) => {
    try {
      await updateJobStatus(jobId, newStatus);
      // Refresh the list after an update
      fetchPendingJobs();
    } catch (err) {
      alert(`Failed to update job status: ${err.response?.data?.message}`);
    }
  };

  if (loading) return <div>Loading jobs for approval...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h3>Jobs Awaiting Approval</h3>
      {jobs.length === 0 ? (
        <p>No jobs are currently pending approval.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid black' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Job Title</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Company</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Posted On</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>
                  <Link to={`/jobs/${job._id}`}>{job.job_title}</Link>
                </td>
                <td style={{ padding: '8px' }}>{job.company_name}</td>
                <td style={{ padding: '8px' }}>
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '8px' }}>
                  <button
                    onClick={() => handleUpdateStatus(job._id, 'active')}
                    style={{ marginRight: '5px', backgroundColor: 'green', color: 'white' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(job._id, 'rejected')}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;