const express = require('express');
const router = express.Router();
const {
  uploadResume,
  parseResume,
  getMyResumes,
  testCloudinaryUrl,
  getResumeById,
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

// @route   POST /api/resumes/test-url
// Test if a Cloudinary URL is accessible
router.post('/test-url', protect, testCloudinaryUrl);

// @route   GET /api/resumes/:id
// Get a specific resume
router.get('/:id', protect, authorize('job_seeker'), getResumeById);

// @route   POST /api/resumes/:id/parse
router.post('/:id/parse', protect, authorize('job_seeker'), parseResume);

module.exports = router;