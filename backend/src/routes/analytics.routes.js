const express = require('express'); // Use require
const router = express.Router();
const { getSystemAnalytics } = require('../controllers/analytics.controller'); // Use require
const { protect, authorize } = require('../middleware/auth.middleware'); // Use require

/**
 * @route   GET /api/analytics/system
 * @desc    Get system-wide analytics
 * @access  Private (Admin)
 */
router.get(
  '/system',
  protect,
  authorize('admin'),
  getSystemAnalytics
);

module.exports = router; // Use module.exports