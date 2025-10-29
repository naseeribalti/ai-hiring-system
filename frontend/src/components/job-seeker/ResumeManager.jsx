import React, { useState, useEffect, useCallback } from 'react';
import { getMyResumes, uploadResume, parseResume } from '../../services/resumeService';

const ResumeManager = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For the upload form
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(null); // Will store the ID of the resume being parsed

  // Function to fetch resumes
  const fetchResumes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getMyResumes();
      setResumes(response.data);
    } catch (err) {
      setError('Failed to fetch resumes.',err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch resumes on component load
  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('resume', selectedFile); // 'resume' must match your backend middleware

    setUploading(true);
    setError(null);
    try {
      await uploadResume(formData);
      setSelectedFile(null); // Clear the file input
      fetchResumes(); // Refresh the resume list
    } catch (err) {
      setError('Upload failed. Is the file a PDF/DOCX?',err);
    } finally {
      setUploading(false);
    }
  };
  // Handle clicking the "Parse" button
  const handleParse = async (resumeId) => {
    setParsing(resumeId); // Set loading state for this specific resume
    setError(null);
    try {
      await parseResume(resumeId);
      fetchResumes(); // Refresh the list
    } catch (err) {
      setError('Parsing failed. Please try again.',err);
    } finally {
      setParsing(null);
    }
  };

  return (
    <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
      <h3>My Resumes</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* 1. UPLOAD FORM */}
      <div style={{ marginBottom: '20px' }}>
        <h4>Upload a New Resume</h4>
        <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        <button onClick={handleUpload} disabled={!selectedFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {/* 2. RESUME LIST */}
      {loading ? (
        <p>Loading resumes...</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume._id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
            <strong>{resume.file_name}</strong> (Uploaded: {new Date(resume.createdAt).toLocaleDateString()})
            <p>Status: <strong>{resume.parsing_status}</strong></p>
            {resume.parsing_status === 'pending' && (
              <button onClick={() => handleParse(resume._id)} disabled={parsing === resume._id}>
                {parsing === resume._id ? 'Parsing...' : 'Parse Now'}
              </button>
            )}
            {resume.parsing_status === 'completed' && (
              <p style={{ color: 'green' }}>Skills Found: {resume.parsed_data?.skills?.join(', ') || 'None'}</p>
            )}
          </div>
        ))
      )}
      {resumes.length === 0 && !loading && <p>You have not uploaded any resumes.</p>}
    </div>
  );
};

export default ResumeManager;