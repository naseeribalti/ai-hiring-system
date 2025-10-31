const axios = require('axios');
const Resume = require('../../models/Resume');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001/parse';

/**
 * Download file from URL with proper error handling
 */
const downloadFileFromUrl = async (fileUrl) => {
  try {
    console.log(`Downloading file from: ${fileUrl}`);

    const response = await axios({
      method: 'GET',
      url: fileUrl,
      responseType: 'arraybuffer',
      timeout: 30000, // 30 seconds timeout
      headers: {
        'User-Agent': 'AI-Hiring-System/1.0.0',
        'Accept': 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain'
      },
      maxContentLength: 10 * 1024 * 1024, // 10MB max
    });

    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    console.log(`File downloaded successfully. Size: ${response.data.length} bytes`);
    return response.data;

  } catch (error) {
    console.error('File download error:', error.message);

    if (error.code === 'ENOTFOUND') {
      throw new Error('Cannot connect to file server. Please check the URL.');
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('Connection refused by file server.');
    } else if (error.response) {
      throw new Error(`Server responded with ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from file server.');
    } else {
      throw new Error(`Download failed: ${error.message}`);
    }
  }
};

/**
 * Test if a Cloudinary URL is accessible
 */
const testFileUrl = async (fileUrl) => {
  try {
    const response = await axios.head(fileUrl, {
      timeout: 10000,
      headers: {
        'User-Agent': 'AI-Hiring-System/1.0.0'
      }
    });

    console.log(`File URL test successful. Status: ${response.status}`);
    return {
      accessible: true,
      status: response.status,
      contentType: response.headers['content-type'],
      contentLength: response.headers['content-length']
    };
  } catch (error) {
    console.error(`File URL test failed: ${error.message}`);
    return {
      accessible: false,
      error: error.message
    };
  }
};

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
    console.log(`AI Service URL: ${AI_SERVICE_URL}`);
    console.log(`File URL: ${file_url}`);

    // Test if file URL is accessible before sending to AI service
    const urlTest = await testFileUrl(file_url);
    if (!urlTest.accessible) {
      throw new Error(`File URL is not accessible: ${urlTest.error}. Please ensure the file has public read access.`);
    }

    const response = await axios.post(
      AI_SERVICE_URL,
      { file_url },
      {
        timeout: 60000, // Increased to 60 seconds for large files
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Get the parsed data (including skills)
    const { extracted_text, extracted_skills } = response.data || {};

    // Update the resume in MongoDB with safe defaults
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
    if (error.response) {
      console.error('AI Service Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('AI Service Request Error: No response received');
      console.error('Is the AI service running on', AI_SERVICE_URL, '?');
    } else {
      console.error('Error details:', error);
    }
    await Resume.findByIdAndUpdate(resumeId, { parsing_status: 'failed' });
    throw error;
  }
};

module.exports = {
  callAiParsingService,
  downloadFileFromUrl,
  testFileUrl,
};