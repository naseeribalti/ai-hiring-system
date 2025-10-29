const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * --- Authentication Middleware ---
 * Checks for a valid JWT in the request header.
 * If valid, it finds the user in the DB and attaches them to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  // Check if the 'Authorization' header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get token from header (format: "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user by ID from the token's payload
      // We add .select('-password') to make sure the hashed password is not attached
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // 4. Move to the next function (the controller)
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * --- Authorization Middleware ---
 * Checks if the user's role (from req.user) is allowed.
 * This runs *after* the 'protect' middleware.
 * @param {...string} roles - A list of roles allowed (e.g., 'admin', 'recruiter')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.user_type)) {
      // User role is not authorized
      return res.status(403).json({
        message: `User role '${req.user.user_type}' is not authorized to access this route`,
      });
    }
    // User role is authorized
    next();
  };
};

module.exports = {
  protect,
  authorize,
};