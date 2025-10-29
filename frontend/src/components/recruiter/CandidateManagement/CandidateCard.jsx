import React, { useState } from 'react';
import { updateApplicationStatus } from '../../../services/applicationService';

// We add 'onStatusChange' as a prop
// This will tell the parent page to refresh its list
const CandidateCard = ({ application, onStatusChange }) => {
  const { applicant_id, resume_id, ai_match_score } = application;
  
  // Give the card its own state for status
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    setError(null);
    try {
      // Call the API
      await updateApplicationStatus(application._id, newStatus);
      // Update the card's local state
      setCurrentStatus(newStatus);
      
      // Call the parent function to refresh the whole list (optional but good)
      if (onStatusChange) {
        onStatusChange();
      }

    } catch (err) {
      setError('Failed to update status',err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '16px', 
      marginBottom: '16px', 
      borderRadius: '8px' 
    }}>
      <h4 style={{ margin: '0 0 10px 0' }}>
        {applicant_id.profile?.first_name} {applicant_id.profile?.last_name}
      </h4>
      <p><strong>Match Score: {ai_match_score}%</strong></p>
      <p>Status: <strong>{currentStatus}</strong></p>
      <p>Email: {applicant_id.email}</p>
      <p>
        <a href={resume_id.file_url} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      </p>

      {/* --- ADD THESE BUTTONS --- */}
      <div style={{ marginTop: '10px' }}>
        <button 
          onClick={() => handleStatusUpdate('shortlisted')}
          disabled={loading || currentStatus === 'shortlisted'}
          style={{ marginRight: '10px' }}
        >
          Shortlist
        </button>
        <button 
          onClick={() => handleStatusUpdate('rejected')}
          disabled={loading || currentStatus === 'rejected'}
        >
          Reject
        </button>
        {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default CandidateCard;