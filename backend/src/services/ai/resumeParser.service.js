const axios = require('axios');
const Resume = require('../../models/Resume');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001/parse';

const callAiParsingService = async (resumeId) => {
  try {
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      throw new Error('Resume not found');
    }
    if (resume.parsing_status === 'completed') {
      throw new Error('Resume already parsed');
    }

    const { file_url } = resume;

    console.log(`Sending request to AI service for resume: ${resumeId}`);
    const response = await axios.post(
      AI_SERVICE_URL,
      { file_url },
      { timeout: 15000 }
    );

    // --- UPDATE THIS SECTION ---
    // 3. Get the parsed data (now including skills)
    const { extracted_text, extracted_skills } = response.data || {};

    // 4. Update the resume in MongoDB with safe defaults
    resume.parsed_data = {
      summary: extracted_text || '',
      skills: Array.isArray(extracted_skills) ? extracted_skills : [],
      // In the future, you'd add experience, education, etc.
    };
    resume.parsing_status = 'completed';
    resume.confidence_score = 90; // Placeholder
    await resume.save();

    console.log(`Resume ${resumeId} parsed and updated successfully.`);
    return resume;
  } catch (error) {
    console.error('Error in AI Parsing Service:', error.message);
    await Resume.findByIdAndUpdate(resumeId, { parsing_status: 'failed' });
    throw error;
  }
};

module.exports = {
  callAiParsingService,
};