import React, { useState, useEffect } from 'react';
import { getMyApplications } from '../../../services/applicationService'; // Make sure this path is correct
import { Link } from 'react-router-dom';

const JobSeekerDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await getMyApplications();
        setApplications(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch applications:', err);
        setError(err.response?.data?.message || 'Could not load your applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h3>My Applications</h3>
      
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet. <Link to="/jobs">Find jobs here</Link>.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid black' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Job Title</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Company</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{app.job_id?.job_title || 'N/A'}</td>
                <td style={{ padding: '8px' }}>{app.job_id?.company_name || 'N/A'}</td>
                <td style={{ padding: '8px', textTransform: 'capitalize' }}>
                  <strong>{app.status}</strong>
                </td>
                <td style={{ padding: '8px' }}>
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// --- THIS IS THE CRITICAL LINE ---
export default JobSeekerDashboard;