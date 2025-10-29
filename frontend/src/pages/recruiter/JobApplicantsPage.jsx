import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsForJob } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';
import CandidateCard from '../../components/recruiter/CandidateManagement/CandidateCard';

const JobApplicantsPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We wrap fetchData in useCallback so it can be used in useEffect
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [jobRes, appsRes] = await Promise.all([
        getJobById(jobId),
        getApplicationsForJob(jobId),
      ]);
      
      setJob(jobRes.data);
      setApplications(appsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load job or applicant data.',err);
    } finally {
      setLoading(false);
    }
  }, [jobId]); // Dependency is jobId

  // This runs when the component first loads
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // This is the function we will pass to the card
  // It simply re-runs the fetch data function
  const handleStatusChange = () => {
    console.log('Status changed, refreshing applicant list...');
    fetchData(); 
  };

  if (loading) return <div>Loading applicants...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Applicants for: {job?.job_title}</h2>
      <p>{applications.length} total applications</p>

      <div style={{ marginTop: '20px' }}>
        {applications.length === 0 ? (
          <p>This job has no applicants yet.</p>
        ) : (
          applications.map((app) => (
            <CandidateCard 
              key={app._id} 
              application={app} 
              onStatusChange={handleStatusChange} // <-- Pass the function
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplicantsPage;