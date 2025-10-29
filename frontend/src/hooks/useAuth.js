import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // We will create this next

/**
 * A custom hook to easily access the AuthContext.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};