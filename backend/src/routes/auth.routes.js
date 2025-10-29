const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/auth.controller');

// @route   POST /api/auth/register
router.post('/register', registerUser); // for registering a new user

router.post('/login', loginUser) ; // for logging in an existing user
module.exports = router;
