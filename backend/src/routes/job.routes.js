const express = require('express');
const router = express.Router();
const {
  createJob,
  getActiveJobs,
  updateJobStatusByAdmin,
  getJobById,
  getMyJobs,
  getPendingJobs,
} = require('../controllers/job.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

// @route   GET /api/jobs
// Public: Get all active jobs
router.get('/', getActiveJobs);

// @route   GET /api/jobs/pending
// Admin: Get all jobs needing approval
router.get('/pending', protect, authorize('admin'), getPendingJobs);

// --- THIS ROUTE MUST COME FIRST ---
// @route   GET /api/jobs/my
// Recruiter: Get all jobs they have posted
router.get('/my', protect, authorize('recruiter'), getMyJobs);

// @route   POST /api/jobs
// Recruiter: Create a new job
router.post('/', protect, authorize('recruiter'), createJob);

// --- DYNAMIC ROUTES WITH :jobId MUST COME LATER ---

// @route   PATCH /api/jobs/:jobId/status
// Admin: Update a job's status
router.patch(
  '/:jobId/status',
  protect,
  authorize('admin'),
  updateJobStatusByAdmin
);

// @route   GET /api/jobs/:jobId
// Public: Get a single job's details
router.get('/:jobId', getJobById);

module.exports = router;