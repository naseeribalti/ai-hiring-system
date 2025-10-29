const Application = require('../models/Application');
const Job = require('../models/Job');
const Resume = require('../models/Resume');

// --- ADD THIS NEW HELPER FUNCTION ---
/**
 * Calculates a skill-based match score.
 * Based on SRS Section 7.1.2: Skills are 40% of the score.
 * @param {Array<string>} jobSkills - The skills required by the job.
 * @param {Array<string>} resumeSkills - The skills extracted from the resume.
 * @returns {number} A score out of 100 (but based on 40% weighting).
 */
const calculateSkillMatchScore = (jobSkills, resumeSkills) => {
  if (!jobSkills || jobSkills.length === 0 || !resumeSkills) {
    return 0;
  }

  // Find the common skills. We normalize to lowercase for a fair comparison.
  const jobSkillsLower = new Set(jobSkills.map((s) => s.toLowerCase()));
  const resumeSkillsLower = new Set(resumeSkills.map((s) => s.toLowerCase()));

  const intersection = new Set(
    [...resumeSkillsLower].filter((skill) => jobSkillsLower.has(skill))
  );

  // Calculate the percentage of job skills that the resume has
  const matchPercentage = (intersection.size / jobSkills.length) * 100;

  // Per SRS, skills are 40% of the total score.
  // We'll calculate the score out of 40 for now.
  const scoreOutOf40 = (intersection.size / jobSkills.length) * 40;

  console.log(
    `Match calc: ${intersection.size} matching skills out of ${jobSkills.length} required.`
  );
  console.log(`Final Skill Score: ${scoreOutOf40.toFixed(0)}`);

  // Return a whole number score (e.g., 30, 20, 40)
  return Math.round(scoreOutOf40);
};

/**
 * @desc    Apply for a job
 * @route   POST /api/applications/:jobId
 * @access  Private (Job Seeker only)
 */
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { resume_id } = req.body;
    const applicant_id = req.user._id;

    if (!resume_id) {
      return res.status(400).json({ message: 'Resume ID is required' });
    }

    // 2. Find the job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.status !== 'active') {
      return res.status(400).json({ message: 'This job is not active' });
    }

    // 4. Verify the resume
    const resume = await Resume.findOne({ _id: resume_id, user_id: applicant_id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // 5. Check if resume has been parsed
    if (resume.parsing_status !== 'completed' || !resume.parsed_data?.skills) {
      return res.status(400).json({
        message: 'This resume has not been parsed. Please parse it first.',
      });
    }

    // 6. Check if already applied
    const alreadyApplied = await Application.findOne({
      job_id: jobId,
      applicant_id: applicant_id,
    });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied' });
    }

    // --- NEW MATCHING LOGIC ---
    // 7. Calculate the AI Match Score
    const jobSkills = job.requirements?.required_skills || [];
    const resumeSkills = resume.parsed_data?.skills || [];
    
    const aiMatchScore = calculateSkillMatchScore(jobSkills, resumeSkills);
    // (We will add Experience + Education score later)
    // --- END NEW LOGIC ---

    // 8. Create the new application
    const application = await Application.create({
      job_id: jobId,
      applicant_id: applicant_id,
      resume_id: resume_id,
      recruiter_id: job.recruiter_id,
      status: 'submitted',
      ai_match_score: aiMatchScore, // <-- SAVE THE SCORE
    });

    // 9. Add applicant to job's array
    await job.addApplicant(applicant_id);

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Apply for Job Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get all applications for a specific job
 * @route   GET /api/applications/job/:jobId
 * @access  Private (Recruiter only)
 */
const getApplicationsForJob = async (req, res) => {
  // ... (keep your existing getApplicationsForJob function)
  try {
    const { jobId } = req.params;
    const recruiter_id = req.user._id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    if (job.recruiter_id.toString() !== recruiter_id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not own this job' });
    }
    // --- UPDATED POPULATE ---
    const applications = await Application.find({ job_id: jobId })
      .populate('applicant_id', 'email profile')
      .populate('resume_id', 'file_name file_url parsing_status parsed_data.skills') // <-- Also get the skills
      .sort({ ai_match_score: -1 }); // <-- SORT BY SCORE!
    
    res.status(200).json(applications);
  } catch (error) {
    console.error('Get Applications Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Update an application's status
 * @route   PATCH /api/applications/:applicationId/status
 * @access  Private (Recruiter only)
 */
const updateApplicationStatus = async (req, res) => {
  // ... (keep your existing updateApplicationStatus function)
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const recruiter_id = req.user._id;
    if (!status) {
      return res.status(400).json({ message: 'New status is required' });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    if (application.recruiter_id.toString() !== recruiter_id.toString()) {
      return res.status(403).json({ message: 'Forbidden: You do not own this application' });
    }
    application.status = status;
    await application.save();
    res.status(200).json(application);
  } catch (error) {
    console.error('Update Status Error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

/**
 * @desc    Get all applications for the logged-in job seeker
 * @route   GET /api/applications/my
 * @access  Private (Job Seeker only)
 */
const getMyApplications = async (req, res) => {
  // ... (keep your existing getMyApplications function)
  try {
    const applicant_id = req.user._id;
    const applications = await Application.find({ applicant_id: applicant_id })
      .sort({ createdAt: -1 })
      .populate('job_id', 'job_title company_name location')
      .populate('resume_id', 'file_name');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Get My Applications Error:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  applyForJob,
  getApplicationsForJob,
  updateApplicationStatus,
  getMyApplications,
};