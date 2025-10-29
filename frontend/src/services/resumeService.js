import api from './api';

/**
 * Fetches all resumes for the currently logged-in job seeker.
 */
export const getMyResumes = () => {
  return api.get('/resumes/my');
};

/**
 * Uploads a new resume file.
 * @param {FormData} formData - The form data containing the file.
 */
export const uploadResume = (formData) => {
  return api.post('/resumes/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Triggers the AI parsing service for a resume.
 * @param {string} resumeId - The ID of the resume to parse.
 */
export const parseResume = (resumeId) => {
  return api.post(`/resumes/${resumeId}/parse`);
};