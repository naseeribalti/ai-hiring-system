const express = require('express');
const router = express.Router();
const {
  uploadResume,
  parseResume,
  getMyResumes, // <-- Import this
} = require('../controllers/resume.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { uploadResume: uploadMiddleware } = require('../middleware/upload.middleware');

// @route   POST /api/resumes/upload
router.post(
  '/upload',
  protect,
  authorize('job_seeker'),
  uploadMiddleware,
  uploadResume
);

// --- ADD THIS NEW ROUTE ---
// @route   GET /api/resumes/my
// Get all of the user's resumes
router.get('/my', protect, authorize('job_seeker'), getMyResumes);

// @route   POST /api/resumes/:id/parse
router.post('/:id/parse', protect, authorize('job_seeker'), parseResume);

module.exports = router;