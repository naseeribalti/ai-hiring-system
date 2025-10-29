import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyResumes } from '../../services/resumeService';
import { applyToJob } from '../../services/applicationService';
import { getJobById } from '../../services/jobService';

const ApplyPage = () => {
  const { jobId } = useParams(); // Get job ID from URL
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch job details and user's resumes
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fetch both at the same time
        const [jobRes, resumesRes] = await Promise.all([
          getJobById(jobId),
          getMyResumes(),
        ]);

        setJob(jobRes.data);
        setResumes(resumesRes.data);

        // Auto-select the first resume if it exists
        if (resumesRes.data.length > 0) {
          setSelectedResume(resumesRes.data[0]._id);
        }
      } catch (err) {
        setError('Failed to load application data.',err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedResume) {
      setError('Please select a resume to apply with.');
      return;
    }

    // Check if the selected resume is parsed
    const resume = resumes.find(r => r._id === selectedResume);
    if (resume.parsing_status !== 'completed') {
      setError('This resume has not been parsed yet. Please parse it on your dashboard.');
      // In a real app, you'd link them to the parse page
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Call the API
      await applyToJob(jobId, selectedResume);
      
      // Success! Redirect to the dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('Failed to apply:', err);
      setError(err.response?.data?.message || 'Application failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading Application...</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div>
      <h2>Apply for: {job.job_title}</h2>
      <p>at {job.company_name}</p>

      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {resumes.length === 0 ? (
          <div>
            <p>You have no resumes uploaded. Please upload a resume first.</p>
            {/* We'd link to an upload page here */}
          </div>
        ) : (
          <div>
            <label htmlFor="resume-select">Choose your resume:</label>
            <select
              id="resume-select"
              value={selectedResume}
              onChange={(e) => setSelectedResume(e.target.value)}
            >
              <option value="">-- Select a Resume --</option>
              {resumes.map((resume) => (
                <option key={resume._id} value={resume._id}>
                  {resume.file_name} (Status: {resume.parsing_status})
                </option>
              ))}
            </select>
          </div>
        )}

        <button 
          type="submit" 
          disabled={submitting || resumes.length === 0} 
          style={{ marginTop: '20px' }}
        >
          {submitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;