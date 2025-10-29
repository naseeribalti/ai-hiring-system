import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '16px', 
      marginBottom: '16px', 
      borderRadius: '8px' 
    }}>
      <h3>{job.job_title}</h3>
      <p><strong>{job.company_name}</strong></p>
      <p>{job.location?.city}, {job.location?.country}</p>
      <p>Type: {job.location?.job_type}</p>
      
      {/* This will link to the Job Details page we will build next */}
      <Link to={`/jobs/${job._id}`}>
        View Details
      </Link>
    </div>
  );
};

export default JobCard;