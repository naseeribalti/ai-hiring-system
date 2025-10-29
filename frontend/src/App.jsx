import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Auth
import Header from './components/common/Header/Header.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DashboardPage from './pages/job-seeker/Dashboard.jsx';
import JobSearch from './pages/job-seeker/JobSearch.jsx';
import JobDetails from './pages/shared/JobDetails.jsx';
import ApplyPage from './pages/job-seeker/ApplyPage.jsx'; // <-- IMPORT THIS
import RoleProtectedRoute from './components/common/RoleProtectedRoute.jsx'; // <-- IMPORT THIS
import RecruiterDashboardPage from './pages/recruiter/Dashboard.jsx'; // <-- IMPORT THIS
import JobApplicantsPage from './pages/recruiter/JobApplicantsPage.jsx'; // <-- IMPORT THIS
import PostJobPage from './pages/recruiter/PostJob.jsx'; // <-- IMPORT THIS
import AdminDashboardPage from './pages/admin/Dashboard.jsx'; // <-- IMPORT THIS


import './App.css';


function App() {
  return (
    <div className="App">
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          {/* --- Public Routes --- */}
          {/* ... (home, login, register, /jobs, /jobs/:jobId) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />

          {/* --- Protected Job Seeker Routes --- */}
          {/* ... (dashboard, apply) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apply/:jobId"
            element={
              <ProtectedRoute>
                <ApplyPage />
              </ProtectedRoute>
            }
          />

          {/* --- Protected Recruiter Routes --- */}
          <Route
            path="/recruiter/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['recruiter']}>
                <RecruiterDashboardPage />
              </RoleProtectedRoute>
            }
          />
          {/* --- ADD THIS NEW ROUTE --- */}
          <Route
            path="/recruiter/job/:jobId"
            element={
              <RoleProtectedRoute allowedRoles={['recruiter']}>
                <JobApplicantsPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/recruiter/post-job"
            element={
              <RoleProtectedRoute allowedRoles={['recruiter']}>
                <PostJobPage />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <RoleProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </RoleProtectedRoute>
            }
          />
        </Routes>

      </main>
    </div>
  );
}
export default App;
