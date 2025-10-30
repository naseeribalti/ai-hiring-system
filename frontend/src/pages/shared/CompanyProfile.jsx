import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// We would need a new API service: api.get(`/company/${companyId}`)

const CompanyProfile = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder for a future API call
    const fetchCompany = async () => {
      setLoading(true);
      // const response = await getCompanyProfile(companyId);
      // setCompany(response.data);

      // Mock data for now:
      setCompany({
        name: 'Mock Tech Innovations Ltd.',
        description: 'A leading company in AI and web development.',
        jobs: [
          { _id: '1', title: 'Senior Developer' },
          { _id: '2', title: 'UX Designer' }
        ]
      });
      setLoading(false);
    };

    // fetchCompany();
    setLoading(false); // Remove this when fetchCompany is real
  }, [companyId]);

  if (loading) return <div>Loading company profile...</div>;
  if (!company) return <div>Company not found.</div>;

  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      
      <h3>Active Jobs at {company.name}</h3>
      <ul>
        {company.jobs.map(job => (
          <li key={job._id}>{job.title}</li>
        ))}
      </ul>
      <p>(This is a placeholder page)</p>
    </div>
  );
};

export default CompanyProfile;