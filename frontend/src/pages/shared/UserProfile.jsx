import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// We would need a new API service function: api.get(`/users/${userId}`)
// const { getPublicUserProfile } = require('../../services/userService');

const UserProfile = () => {
  const { userId } = useParams(); // Get the user's ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is a placeholder. We would need to build this API.
    const fetchUser = async () => {
      setLoading(true);
      // const response = await getPublicUserProfile(userId);
      // setUser(response.data);
      
      // Mock data for now:
      setUser({
        profile: {
          first_name: 'Mock',
          last_name: 'User',
          bio: 'A passionate developer looking for opportunities.',
        },
        skills: ['React', 'Node.js', 'MongoDB']
      });
      setLoading(false);
    };

    // fetchUser();
    setLoading(false); // Remove this when fetchUser is real
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div>
      <h2>{user.profile.first_name} {user.profile.last_name}</h2>
      <p>{user.profile.bio}</p>
      <h3>Skills</h3>
      <ul>
        {user.skills?.map(skill => <li key={skill}>{skill}</li>)}
      </ul>
      <p>(This is a placeholder page)</p>
    </div>
  );
};

export default UserProfile;