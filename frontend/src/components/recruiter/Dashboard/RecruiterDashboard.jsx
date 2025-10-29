import React, { useState, useEffect } from 'react';
import { getMyJobs } from '../../../services/jobService';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getMyJobs();
                setJobs(response.data);
            } catch (err) {
                setError('Failed to fetch your jobs.', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) return <div>Loading your jobs...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div>
            <h3>My Job Postings</h3>
            <div style={{ marginBottom: '20px' }}>
                <Link
                    to="/recruiter/post-job"
                    style={{
                        padding: '10px 15px',
                        backgroundColor: 'green',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px'
                    }}
                >
                    + Post a New Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <p>You have not posted any jobs yet.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid black' }}>
                            <th style={{ textAlign: 'left', padding: '8px' }}>Title</th>
                            <th style={{ textAlign: 'left', padding: '8px' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '8px' }}>Applicants</th>
                            <th style={{ textAlign: 'left', padding: '8px' }}>Posted On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '8px' }}>
                                    {/* This will link to a "View Applicants" page later */}
                                    <Link to={`/recruiter/job/${job._id}`}>{job.job_title}</Link>
                                </td>
                                <td style={{ padding: '8px', textTransform: 'capitalize' }}>
                                    <strong>{job.status}</strong>
                                </td>
                                <td style={{ padding: '8px' }}>{job.applicants.length}</td>
                                <td style={{ padding: '8px' }}>
                                    {new Date(job.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RecruiterDashboard;