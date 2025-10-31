const Resume = require('../models/Resume');
const cloudinary = require('cloudinary').v2;
const { callAiParsingService, testFileUrl } = require('../services/ai/resumeParser.service');

/**
 * @desc    Upload a resume
 * @route   POST /api/resumes/upload
 */
const uploadResume = async (req, res) => {
  // ... (keep your existing uploadResume function)
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const userId = req.user._id;
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: `ai-hiring-system/resumes/${userId}`,
      type: 'upload',
      access_mode: 'public', // Ensure public read access for AI service
    });
    const newResume = await Resume.create({
      user_id: userId,
      file_name: req.file.originalname,
      file_url: uploadResponse.secure_url,
      parsing_status: 'pending',
    });
    res.status(201).json({
      message: 'Resume uploaded successfully',
      resume: newResume,
    });
  } catch (error) {
    console.error('Resume Upload Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Trigger AI parsing for a resume
 * @route   POST /api/resumes/:id/parse
 */
const parseResume = async (req, res) => {
  // ... (keep your existing parseResume function)
  try {
    const resumeId = req.params.id;
    const userId = req.user._id;
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    if (resume.user_id.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not own this resume' });
    }
    const parsedResume = await callAiParsingService(resumeId);
    res.status(200).json({
      message: 'Resume parsed successfully',
      resume: parsedResume,
    });
  } catch (error) {
    console.error('Parse Resume Controller Error:', error.message);
    res.status(500).json({
      message: 'Error triggering resume parsing',
      error: error.message,
      details: 'Check if the AI service is running on the configured port'
    });
  }
};

// --- ADD THIS NEW FUNCTION ---
/**
 * @desc    Get all resumes for the logged-in job seeker
 * @route   GET /api/resumes/my
 * @access  Private (Job Seeker only)
 */
const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Get My Resumes Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Test if a Cloudinary URL is accessible
 * @route   POST /api/resumes/test-url
 * @access  Private
 */
const testCloudinaryUrl = async (req, res) => {
  try {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'File URL is required'
      });
    }

    const result = await testFileUrl(fileUrl);

    res.status(result.accessible ? 200 : 400).json({
      success: result.accessible,
      message: result.accessible ? 'URL is accessible' : 'URL is not accessible',
      data: result
    });
  } catch (error) {
    console.error('Test URL Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error testing URL',
      error: error.message
    });
  }
};

/**
 * @desc    Get a specific resume by ID
 * @route   GET /api/resumes/:id
 * @access  Private
 */
const getResumeById = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const userId = req.user._id;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Check ownership
    if (resume.user_id.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not own this resume' });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error('Get Resume Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- UPDATE MODULE.EXPORTS ---
module.exports = {
  uploadResume,
  parseResume,
  getMyResumes, // <-- Add this
  testCloudinaryUrl,
  getResumeById,
};