import api from './api';

/**
 * Fetches all applications for the logged-in job seeker.
 */
export const getMyApplications = () => {
  return api.get('/applications/my');
};

// --- ADD THIS NEW FUNCTION ---
/**
 * Submits a new job application.
 * @param {string} jobId - The ID of the job to apply for.
 * @param {string} resumeId - The ID of the resume to use.
 */

/**
 * Fetches all applications for a specific job (for recruiters).
 * @param {string} jobId - The ID of the job.
 */
export const getApplicationsForJob = (jobId) => {
  return api.get(`/applications/job/${jobId}`);
};

export const applyToJob = (jobId, resumeId) => {
  return api.post(`/applications/${jobId}`, { resume_id: resumeId });
};

/**
 * Updates the status of a specific application.
 * @param {string} applicationId - The ID of the application.
 * @param {string} status - The new status (e.g., "shortlisted", "rejected").
 */
export const updateApplicationStatus = (applicationId, status) => {
  return api.patch(`/applications/${applicationId}/status`, { status });
};