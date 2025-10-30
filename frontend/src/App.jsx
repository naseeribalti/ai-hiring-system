import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout & Auth
import Header from './components/common/Header/Header.jsx';
import Footer from './components/common/Footer/Footer.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import RoleProtectedRoute from './components/common/RoleProtectedRoute.jsx';

// Public Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import JobSearch from './pages/job-seeker/JobSearch.jsx';
import JobDetails from './pages/shared/JobDetails.jsx';
import UserProfile from './pages/shared/UserProfile.jsx';
import CompanyProfile from './pages/shared/CompanyProfile.jsx';
// --- ADD THESE IMPORTS ---
import HelpCenter from './pages/HelpCenter.jsx';
import Blog from './pages/CareerBlog.jsx'; // Assuming Blog.jsx, not CareerBlog.jsx based on earlier task
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';

// Job Seeker Pages
import DashboardPage from './pages/job-seeker/Dashboard.jsx';
import ApplyPage from './pages/job-seeker/ApplyPage.jsx';
import ApplicationsPage from './pages/job-seeker/Applications.jsx';
import ResumeBuilderPage from './pages/job-seeker/ResumeBuilder.jsx';

// Recruiter Pages
import RecruiterDashboardPage from './pages/recruiter/Dashboard.jsx';
import JobApplicantsPage from './pages/recruiter/JobApplicantsPage.jsx';
import PostJobPage from './pages/recruiter/PostJob.jsx';
import RecruiterJobsPage from './pages/recruiter/Jobs.jsx';
import RecruiterAnalyticsPage from './pages/recruiter/Analytics.jsx';
import CandidateSearchPage from './pages/recruiter/Candidates.jsx';

// Admin Pages
import AdminDashboardPage from './pages/admin/Dashboard.jsx';

import './App.css';
import './index.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main className="container" style={{ flexGrow: 1 }}>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jobs" element={<JobSearch />} />
          <Route path="/jobs/:jobId" element={<JobDetails />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/company/:companyId" element={<CompanyProfile />} />
          {/* --- ADD THESE ROUTES --- */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/career-blog" element={<Blog />} /> {/* Using /blog */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* --- Protected Job Seeker Routes --- */}
          {/* ... */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/apply/:jobId" element={<ProtectedRoute><ApplyPage /></ProtectedRoute>} />
          <Route path="/my-applications" element={<ProtectedRoute><ApplicationsPage /></ProtectedRoute>} />
          <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilderPage /></ProtectedRoute>} />

          {/* --- Protected Recruiter Routes --- */}
          {/* ... */}
           <Route path="/recruiter/dashboard" element={<RoleProtectedRoute allowedRoles={['recruiter']}><RecruiterDashboardPage /></RoleProtectedRoute>} />
          <Route path="/recruiter/job/:jobId" element={<RoleProtectedRoute allowedRoles={['recruiter']}><JobApplicantsPage /></RoleProtectedRoute>} />
          <Route path="/recruiter/post-job" element={<RoleProtectedRoute allowedRoles={['recruiter']}><PostJobPage /></RoleProtectedRoute>} />
          <Route path="/recruiter/jobs" element={<RoleProtectedRoute allowedRoles={['recruiter']}><RecruiterJobsPage /></RoleProtectedRoute>} />
          <Route path="/recruiter/analytics" element={<RoleProtectedRoute allowedRoles={['recruiter']}><RecruiterAnalyticsPage /></RoleProtectedRoute>} />
          <Route path="/recruiter/candidates" element={<RoleProtectedRoute allowedRoles={['recruiter']}><CandidateSearchPage /></RoleProtectedRoute>} />

          {/* --- Protected Admin Routes --- */}
          {/* ... */}
          <Route path="/admin/dashboard" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminDashboardPage /></RoleProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;