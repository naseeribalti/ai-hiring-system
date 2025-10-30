import React from 'react';
import JobSeekerDashboard from '../../components/job-seeker/Dashboard/JobSeekerDashboard';
import ResumeManager from '../../components/job-seeker/ResumeManager';

// This page just acts as a wrapper for your main dashboard components
const JobSeekerApplicationsPage = () => {
  return (
    <div>
      <h2>My Applications & Resumes</h2>
      
      {/* This is the "My Applications" table */}
      <JobSeekerDashboard />

      {/* This is the "My Resumes" manager */}
      <ResumeManager />
    </div>
  );
};

export default JobSeekerApplicationsPage;