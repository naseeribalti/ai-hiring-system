const User = require('../models/User');

/**
 * @desc    Get current user's profile
 * @route   GET /api/users/profile
 * @access  Private (Protected)
 */
const getUserProfile = async (req, res) => {
  // ... (keep your existing getUserProfile function)
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        user_type: user.user_type,
        profile: user.profile,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ADD THIS NEW FUNCTION ---

/**
 * @desc    Update current user's profile
 * @route   PUT /api/users/profile
 * @access  Private (Protected)
 */
const updateUserProfile = async (req, res) => {
  try {
    // 1. Get the user from the 'protect' middleware
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Get the new profile data from the request body
    const { profile } = req.body;

    // 3. Update the user's profile fields
    // We use (user.profile.field = new_data) to allow partial updates
    if (profile) {
      user.profile.first_name = profile.first_name || user.profile.first_name;
      user.profile.last_name = profile.last_name || user.profile.last_name;
      user.profile.phone = profile.phone || user.profile.phone;
      user.profile.avatar = profile.avatar || user.profile.avatar;
      user.profile.bio = profile.bio || user.profile.bio;
      
      // Update location if provided
      if (profile.location) {
        user.profile.location.city = profile.location.city || user.profile.location.city;
        user.profile.location.country = profile.location.country || user.profile.location.country;
      }
    }

    // 4. Save the updated user document
    const updatedUser = await user.save();

    // 5. Send back the updated user data (and a new token, optionally)
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      user_type: updatedUser.user_type,
      profile: updatedUser.profile,
    });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- UPDATE MODULE.EXPORTS ---
module.exports = {
  getUserProfile,
  updateUserProfile, // Add this line
};