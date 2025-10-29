const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to create a token
const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // 1. Get data from request body (using your schema structure)
    const { email, password, user_type, profile } = req.body;

    // 2. Check if all required fields are present
    if (!email || !password || !user_type || !profile?.first_name || !profile?.last_name) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // 3. Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // 4. Create new user
    // The password will be auto-hashed by the 'pre save' hook in your User.js model
    const user = await User.create({
      email,
      password,
      user_type,
      profile: {
        first_name: profile.first_name,
        last_name: profile.last_name,
      },
      status: 'active', // Using the default from your schema
      email_verified: false, // Default from your schema
    });

    // 5. If user created successfully, generate token and send response
    if (user) {
      const token = generateToken(user._id, user.user_type);

      res.status(201).json({
        _id: user._id,
        email: user.email,
        user_type: user.user_type,
        profile: user.profile,
        token: token,
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Authenticate (log in) a user
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // 1. Get email and password from request body
    const { email, password } = req.body;

    // 2. Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 3. Check if user exists
    // We use .select('+password') because 'select: false' is in our User model
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Check if password is correct
    // We use the .comparePassword() method we defined in the User model
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 5. User is valid, generate token and send response
    const token = generateToken(user._id, user.user_type);

    res.status(200).json({
      _id: user._id,
      email: user.email,
      user_type: user.user_type,
      profile: user.profile,
      token: token,
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
    registerUser,
    loginUser,
};