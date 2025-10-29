const express = require('express');
const router = express.Router();
// --- UPDATE IMPORTS ---
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');

// @route   GET /api/users/profile
// Get the user's own profile
router.get('/profile', protect, getUserProfile);

// --- ADD THIS NEW ROUTE ---
// @route   PUT /api/users/profile
// Update the user's own profile
router.put('/profile', protect, updateUserProfile);

module.exports = router;