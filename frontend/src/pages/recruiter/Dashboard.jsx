import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import RecruiterDashboard from '../../components/recruiter/Dashboard/RecruiterDashboard';

const RecruiterDashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Recruiter Dashboard</h2>
      <p>Welcome, {user?.profile?.first_name}!</p>
      <RecruiterDashboard />
    </div>
  );
};

export default RecruiterDashboardPage;