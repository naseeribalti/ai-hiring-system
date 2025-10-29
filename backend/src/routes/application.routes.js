const express = require('express');
const router = express.Router();
// Import all four functions
const {
  applyForJob,
  getApplicationsForJob,
  updateApplicationStatus,
  getMyApplications, // <-- Add this
} = require('../controllers/application.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// --- ADD THIS NEW ROUTE ---
// @route   GET /api/applications/my
// Job Seeker: Get all their own applications
router.get('/my', protect, authorize('job_seeker'), getMyApplications);

// @route   POST /api/applications/:jobId
// Job Seeker: Apply for a job
router.post('/:jobId', protect, authorize('job_seeker'), applyForJob);

// @route   GET /api/applications/job/:jobId
// Recruiter: Get all applications for one of their jobs
router.get('/job/:jobId', protect, authorize('recruiter'), getApplicationsForJob);

// @route   PATCH /api/applications/:applicationId/status
// Recruiter: Update an application's status
router.patch(
  '/:applicationId/status',
  protect,
  authorize('recruiter'),
  updateApplicationStatus
);

module.exports = router;