import React from 'react';
import JobPostingForm from '../../components/recruiter/JobManagement/JobPostingForm';

const PostJobPage = () => {
  return (
    <div>
      <h2>Post a New Job</h2>
      <p>Fill out the details below to find your next great hire.</p>
      <JobPostingForm />
    </div>
  );
};

export default PostJobPage;