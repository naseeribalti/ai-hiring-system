const Job = require('../models/Job');
const User = require('../models/User');

/**
 * @desc    Create a new job posting
 * @route   POST /api/jobs
 * @access  Private (Recruiter only)
 */
const createJob = async (req, res) => {
  // ... (keep your existing createJob function)
  try {
    const {
      job_title,
      job_description,
      company_name,
      location,
      salary_range,
      requirements,
    } = req.body;
    const recruiter_id = req.user._id;
    if (!job_title || !job_description || !company_name || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    const job = await Job.create({
      job_title,
      job_description,
      company_name,
      location,
      salary_range,
      requirements,
      recruiter_id: recruiter_id,
      status: 'pending',
    });
    res.status(201).json(job);
  } catch (error) {
    console.error('Create Job Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get all active job postings
 * @route   GET /api/jobs
 * @access  Public
 */
const getActiveJobs = async (req, res) => {
  // ... (keep your existing getActiveJobs function)
  try {
    const jobs = await Job.find({ status: 'active' }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Get Active Jobs Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Admin: Update any job's status
 * @route   PATCH /api/jobs/:jobId/status
 * @access  Private (Admin only)
 */
const updateJobStatusByAdmin = async (req, res) => {
  // ... (keep your existing updateJobStatusByAdmin function)
  try {
    const { jobId } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    job.status = status;
    await job.save();
    res.status(200).json({
      message: `Job status updated to '${status}'`,
      job,
    });
  } catch (error) {
    console.error('Admin Update Status Error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- ADD THIS NEW FUNCTION ---

/**
 * @desc    Get a single job by its ID
 * @route   GET /api/jobs/:jobId
 * @access  Public
 */
const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate(
      'recruiter_id',
      'profile company_name'
    ); // Also get the recruiter's info

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Optional: Only return if active (or if user is admin/owner)
    // For now, we'll just return it
    res.status(200).json(job);
  } catch (error) {
    console.error('Get Job By ID Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get all jobs for the logged-in recruiter
 * @route   GET /api/jobs/my
 * @access  Private (Recruiter only)
 */
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiter_id: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Get My Jobs Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


/**
 * @desc    Admin: Get all jobs awaiting approval
 * @route   GET /api/jobs/pending
 * @access  Private (Admin only)
 */
const getPendingJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'pending' }).sort({ createdAt: 'asc' });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Get Pending Jobs Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- UPDATE MODULE.EXPORTS ---
module.exports = {
  createJob,
  getActiveJobs,
  updateJobStatusByAdmin,
  getJobById, // Add this line
  getMyJobs, // Add this line
  getPendingJobs, // Add this line
};