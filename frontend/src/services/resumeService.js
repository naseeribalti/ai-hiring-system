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

/**
 * Generate a resume PDF (preferred via backend). Falls back to an HTML blob if the backend
 * endpoint isn't available. Returns a Blob suitable for URL.createObjectURL()
 * @param {object} resumeData
 * @returns {Promise<Blob>}
 */
export const generateResumePDF = async (resumeData) => {
  try {
    // Try server-side generation first (expects a blob response)
    const response = await api.post('/resumes/generate-pdf', resumeData, { responseType: 'blob' });
    return response.data;
  } catch (err) {
    // If server generation fails, warn and fallback to client-side HTML blob
    console.warn('generateResumePDF: server generation failed, using HTML fallback', err);
    const html = buildResumeHTML(resumeData);
    return new Blob([html], { type: 'text/html' });
  }
};

const escapeHtml = (str) => {
  if (!str && str !== 0) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const buildResumeHTML = (data) => {
  const personal = data.personal || {};
  const experience = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || [];
  const projects = data.projects || [];

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(personal.firstName || '')} ${escapeHtml(personal.lastName || '')} - Resume</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;color:#111;padding:24px}
    h1{margin:0 0 8px}
    h2{margin:16px 0 8px;font-size:16px}
    .section{margin-bottom:12px}
    .muted{color:#555}
    ul{margin:4px 0 0;padding-left:18px}
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(personal.firstName || '')} ${escapeHtml(personal.lastName || '')}</h1>
    <div class="muted">${escapeHtml(personal.email || '')} ${personal.phone ? ' • ' + escapeHtml(personal.phone) : ''}</div>
    ${personal.summary ? `<p>${escapeHtml(personal.summary)}</p>` : ''}
  </header>

  <main>
    ${experience.length ? `<div class="section"><h2>Experience</h2>${experience.map(exp => `<div><strong>${escapeHtml(exp.title || '')}</strong> — ${escapeHtml(exp.company || '')}<div class="muted">${escapeHtml(exp.startDate || '')} - ${escapeHtml(exp.current ? 'Present' : exp.endDate || '')}</div>${exp.description ? `<p>${escapeHtml(exp.description)}</p>` : ''}</div>`).join('')}</div>` : ''}

    ${education.length ? `<div class="section"><h2>Education</h2>${education.map(ed => `<div><strong>${escapeHtml(ed.degree || '')}</strong> — ${escapeHtml(ed.institution || '')}<div class="muted">${escapeHtml(ed.graduationDate || '')}</div>${ed.achievements ? `<p>${escapeHtml(ed.achievements)}</p>` : ''}</div>`).join('')}</div>` : ''}

    ${skills.length ? `<div class="section"><h2>Skills</h2><ul>${skills.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ul></div>` : ''}

    ${projects.length ? `<div class="section"><h2>Projects</h2>${projects.map(p => `<div><strong>${escapeHtml(p.name || '')}</strong>${p.link ? ` — <a href="${escapeHtml(p.link)}">Link</a>` : ''}${p.description ? `<p>${escapeHtml(p.description)}</p>` : ''}</div>`).join('')}</div>` : ''}
  </main>
</body>
</html>`;
};