import api from './api';

// --- EXISTING EXPORTS ---
export const getActiveJobs = () => {
  return api.get('/jobs');
};

export const getJobById = (jobId) => {
  return api.get(`/jobs/${jobId}`);
};

export const getMyJobs = () => {
  return api.get('/jobs/my');
};

export const createJob = (jobData) => {
  return api.post('/jobs', jobData);
};

// --- FIX IS HERE: Add 'export' ---
/**
 * Admin: Fetches all jobs with 'pending' status.
 * Calls GET /api/jobs/pending
 */
export const getPendingJobs = () => {
  return api.get('/jobs/pending');
};

// --- FIX IS HERE: Add 'export' ---
/**
 * Admin: Updates the status of any job.
 * Calls PATCH /api/jobs/:jobId/status
 */
export const updateJobStatus = (jobId, status) => {
  return api.patch(`/jobs/${jobId}/status`, { status });
};