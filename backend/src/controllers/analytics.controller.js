/**
 * @desc    Get system-wide analytics (Admin)
 * @route   GET /api/analytics/system
 * @access  Private (Admin)
 */
const getSystemAnalytics = async (req, res) => { // No 'export' here
  try {
    // Placeholder data
    const analytics = {
      totalUsers: 150,
      totalJobsPosted: 75,
      totalApplications: 500,
    };
    
    res.status(200).json({
      message: "Analytics feature is under development.",
      data: analytics
    });

  } catch (error) {
    console.error('Analytics Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Use module.exports at the bottom
module.exports = {
  getSystemAnalytics,
};