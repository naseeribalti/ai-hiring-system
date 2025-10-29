import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import JobSeekerDashboard from '../../components/job-seeker/Dashboard/JobSeekerDashboard.jsx';
import ResumeManager from '../../components/job-seeker/ResumeManager.jsx'; // <-- IMPORT THIS

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Job Seeker Dashboard</h2>
      <p>Welcome, {user?.profile?.first_name}!</p>

      {/* We are using the component here */}
      <JobSeekerDashboard />
      <ResumeManager />
    </div>
  );
};

// --- THIS IS THE FIX ---
// The error says this line is missing from your file.
export default DashboardPage;