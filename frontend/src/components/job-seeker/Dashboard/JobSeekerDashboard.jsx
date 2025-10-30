import React, { useState, useEffect } from 'react';
import { getMyApplications } from '../../../services/applicationService';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { formatDate, formatRelativeTime, capitalizeWords } from '../../../utils/formatters';
import { ContentLoader, PageLoader } from '../../../components/common/Loading/LoadingSpinner';
import '../../../pages/job-seeker/Dashboard.css';

const JobSeekerDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    shortlisted: 0,
    rejected: 0
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await getMyApplications();
        setApplications(response.data);
        calculateStats(response.data);
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

  const calculateStats = (apps) => {
    const stats = {
      total: apps.length,
      pending: apps.filter(app => app.status === 'pending').length,
      reviewed: apps.filter(app => app.status === 'reviewed').length,
      shortlisted: apps.filter(app => app.status === 'shortlisted').length,
      rejected: apps.filter(app => app.status === 'rejected').length
    };
    setStats(stats);
  };

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', label: '⏳ Pending', color: '#f59e0b' },
      reviewed: { class: 'status-reviewed', label: '👀 Reviewed', color: '#3b82f6' },
      shortlisted: { class: 'status-shortlisted', label: '✅ Shortlisted', color: '#10b981' },
      rejected: { class: 'status-rejected', label: '❌ Rejected', color: '#ef4444' },
      accepted: { class: 'status-accepted', label: '🎉 Accepted', color: '#8b5cf6' }
    };

    return statusConfig[status] || { class: 'status-default', label: capitalizeWords(status), color: '#6b7280' };
  };

  const getMatchScore = (application) => {
    // This would come from your backend - using placeholder for now
    return application.match_score || Math.floor(Math.random() * 30) + 70;
  };

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to Load Dashboard</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-btn">
          🔄 Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="job-seeker-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.profile?.first_name || 'Job Seeker'}! 👋</h1>
          <p>Here's your job search progress and applications</p>
        </div>
        <div className="header-actions">
          <Link to="/jobs" className="find-jobs-btn">
            🔍 Find New Jobs
          </Link>
          <Link to="/resume-builder" className="resume-btn">
            📄 Improve Resume
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Applications</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.pending}</h3>
            <p>Pending Review</p>
          </div>
        </div>

        <div className="stat-card shortlisted">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.shortlisted}</h3>
            <p>Shortlisted</p>
          </div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>{stats.rejected}</h3>
            <p>Not Selected</p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="applications-section">
        <div className="section-header">
          <h2>Your Job Applications</h2>
          <div className="filter-tabs">
            {[
              { key: 'all', label: 'All', count: stats.total },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'reviewed', label: 'Reviewed', count: stats.reviewed },
              { key: 'shortlisted', label: 'Shortlisted', count: stats.shortlisted },
              { key: 'rejected', label: 'Rejected', count: stats.rejected }
            ].map(tab => (
              <button
                key={tab.key}
                className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
                onClick={() => setFilter(tab.key)}
              >
                {tab.label}
                <span className="tab-count">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No Applications Yet</h3>
            <p>Start your job search and apply to positions that match your skills.</p>
            <Link to="/jobs" className="cta-button">
              🚀 Browse Available Jobs
            </Link>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No {filter !== 'all' ? filter : ''} Applications</h3>
            <p>You don't have any applications with this status.</p>
            <button onClick={() => setFilter('all')} className="cta-button">
              View All Applications
            </button>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApplications.map((application) => {
              const statusConfig = getStatusBadge(application.status);
              const matchScore = getMatchScore(application);

              return (
                <div key={application._id} className="application-card">
                  <div className="card-header">
                    <div className="job-info">
                      <h3 className="job-title">
                        {application.job_id?.job_title || 'Position Not Available'}
                      </h3>
                      <p className="company-name">
                        {application.job_id?.company_name || 'Company Not Specified'}
                      </p>
                      <p className="job-location">
                        📍 {application.job_id?.location?.city || 'Remote'} •
                        {application.job_id?.job_type ? ` ${application.job_id.job_type.replace('_', ' ')}` : ' Full-time'}
                      </p>
                    </div>
                    <div className="application-meta">
                      <div className={`status-badge ${statusConfig.class}`}>
                        {statusConfig.label}
                      </div>
                      <div className="match-score">
                        <div className="score-circle">
                          <span>{matchScore}%</span>
                        </div>
                        <small>AI Match</small>
                      </div>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="application-details">
                      <div className="detail-item">
                        <span className="detail-label">Applied:</span>
                        <span className="detail-value">
                          {formatDate(application.createdAt)}
                        </span>
                        <span className="detail-relative">
                          ({formatRelativeTime(application.createdAt)})
                        </span>
                      </div>

                      {application.updatedAt !== application.createdAt && (
                        <div className="detail-item">
                          <span className="detail-label">Updated:</span>
                          <span className="detail-value">
                            {formatRelativeTime(application.updatedAt)}
                          </span>
                        </div>
                      )}

                      {application.job_id?.salary_range && (
                        <div className="detail-item">
                          <span className="detail-label">Salary:</span>
                          <span className="detail-value">
                            {application.job_id.salary_range.min ?
                              `$${application.job_id.salary_range.min} - $${application.job_id.salary_range.max}` :
                              'Not specified'
                            }
                          </span>
                        </div>
                      )}
                    </div>

                    {application.status === 'shortlisted' && (
                      <div className="success-note">
                        <span>🎉 You're shortlisted! The employer is interested in your profile.</span>
                      </div>
                    )}

                    {application.status === 'rejected' && (
                      <div className="rejection-note">
                        <span>💡 Don't get discouraged! This position wasn't the right fit, but many others will be.</span>
                      </div>
                    )}
                  </div>

                  <div className="card-actions">
                    <Link
                      to={`/jobs/${application.job_id?._id}`}
                      className="view-job-btn"
                    >
                      👀 View Job
                    </Link>
                    <button className="track-btn">
                      📊 Track Status
                    </button>
                    {application.status === 'rejected' && (
                      <button className="feedback-btn">
                        💬 Request Feedback
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <Link to="/jobs" className="action-card">
            <div className="action-icon">🔍</div>
            <div className="action-content">
              <h4>Search Jobs</h4>
              <p>Find new opportunities that match your skills</p>
            </div>
          </Link>

          <Link to="/resume-builder" className="action-card">
            <div className="action-icon">📄</div>
            <div className="action-content">
              <h4>Update Resume</h4>
              <p>Improve your resume for better matches</p>
            </div>
          </Link>

          <Link to="/my-applications" className="action-card">
            <div className="action-icon">📋</div>
            <div className="action-content">
              <h4>All Applications</h4>
              <p>View detailed application history</p>
            </div>
          </Link>

          <div className="action-card">
            <div className="action-icon">🎯</div>
            <div className="action-content">
              <h4>AI Recommendations</h4>
              <p>Get personalized job suggestions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;