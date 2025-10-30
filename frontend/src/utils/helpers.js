import { FILE_CONFIG, USER_ROLES, JOB_STATUS } from './constants';

/**
 * Check if user has specific role
 */
export const hasRole = (user, role) => {
  return user?.user_type === role;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user, roles = []) => {
  return roles.includes(user?.user_type);
};

/**
 * Get user display name
 */
export const getUserDisplayName = (user) => {
  if (!user) return 'User';
  
  if (user.profile?.first_name && user.profile?.last_name) {
    return `${user.profile.first_name} ${user.profile.last_name}`;
  }
  
  return user.email || 'User';
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate file type for resume upload
 */
export const isValidResumeFile = (file) => {
  if (!file) return false;
  
  const allowedTypes = FILE_CONFIG.ALLOWED_RESUME_TYPES;
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  
  return allowedTypes.includes(fileExtension);
};

/**
 * Validate file size
 */
export const isValidFileSize = (file, maxSize = FILE_CONFIG.MAX_RESUME_SIZE) => {
  if (!file) return false;
  return file.size <= maxSize;
};

/**
 * Generate random ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Debounce function for search inputs
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 */
export const isEmpty = (obj) => {
  if (!obj) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  return Object.keys(obj).length === 0;
};

/**
 * Get error message from error object
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

/**
 * Calculate match score based on SRS weights
 */
export const calculateMatchScore = (job, candidate) => {
  let score = 0;
  
  // Skills match (40%)
  const jobSkills = job.requirements?.skills || [];
  const candidateSkills = candidate.skills || [];
  const skillMatches = jobSkills.filter(skill => 
    candidateSkills.includes(skill.toLowerCase())
  ).length;
  
  const skillScore = jobSkills.length > 0 ? skillMatches / jobSkills.length : 0;
  score += skillScore * 0.4;
  
  // Experience match (30%)
  const jobExp = job.requirements?.experience || 0;
  const candidateExp = candidate.experience || 0;
  const expScore = jobExp > 0 ? Math.min(candidateExp / jobExp, 1) : 0.5;
  score += expScore * 0.3;
  
  // Education match (20%)
  const jobEdu = job.requirements?.education || '';
  const candidateEdu = candidate.education || '';
  const eduScore = jobEdu ? (candidateEdu.includes(jobEdu) ? 1 : 0.3) : 0.5;
  score += eduScore * 0.2;
  
  // Location/preferences match (10%)
  const jobLocation = job.location || '';
  const candidateLocation = candidate.preferredLocation || '';
  const locationScore = jobLocation && candidateLocation ? 
    (jobLocation.toLowerCase() === candidateLocation.toLowerCase() ? 1 : 0.3) : 0.5;
  score += locationScore * 0.1;
  
  return Math.min(score, 1);
};

/**
 * Filter jobs based on search criteria
 */
export const filterJobs = (jobs, filters) => {
  return jobs.filter(job => {
    // Text search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesTitle = job.job_title?.toLowerCase().includes(searchTerm);
      const matchesCompany = job.company?.toLowerCase().includes(searchTerm);
      const matchesDescription = job.job_description?.toLowerCase().includes(searchTerm);
      
      if (!matchesTitle && !matchesCompany && !matchesDescription) {
        return false;
      }
    }
    
    // Job type filter
    if (filters.jobType && job.job_type !== filters.jobType) {
      return false;
    }
    
    // Location filter
    if (filters.location && !job.location?.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Salary range filter
    if (filters.salaryRange) {
      const [minSalary, maxSalary] = filters.salaryRange.split('-').map(Number);
      const jobMin = job.salary_range?.min || 0;
      const jobMax = job.salary_range?.max || Infinity;
      
      if (minSalary && jobMax < minSalary) return false;
      if (maxSalary && jobMin > maxSalary) return false;
    }
    
    // Experience level filter
    if (filters.experienceLevel) {
      const [minExp, maxExp] = filters.experienceLevel.split('-').map(Number);
      const jobExp = job.requirements?.experience || 0;
      
      if (minExp && jobExp < minExp) return false;
      if (maxExp && jobExp > maxExp) return false;
    }
    
    return true;
  });
};

/**
 * Sort jobs by various criteria
 */
export const sortJobs = (jobs, sortBy = 'relevance') => {
  const sortedJobs = [...jobs];
  
  switch (sortBy) {
    case 'date':
      return sortedJobs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    
    case 'salary':
      return sortedJobs.sort((a, b) => {
        const aSalary = a.salary_range?.max || a.salary_range?.min || 0;
        const bSalary = b.salary_range?.max || b.salary_range?.min || 0;
        return bSalary - aSalary;
      });
    
    case 'title':
      return sortedJobs.sort((a, b) => a.job_title?.localeCompare(b.job_title));
    
    case 'company':
      return sortedJobs.sort((a, b) => a.company?.localeCompare(b.company));
    
    default: // relevance
      return sortedJobs;
  }
};

/**
 * Get paginated data
 */
export const getPaginatedData = (data, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return data.slice(startIndex, endIndex);
};

/**
 * Calculate pagination info
 */
export const getPaginationInfo = (totalItems, currentPage, pageSize) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;
  
  return {
    totalPages,
    currentPage,
    pageSize,
    totalItems,
    hasNext,
    hasPrev,
    startItem: (currentPage - 1) * pageSize + 1,
    endItem: Math.min(currentPage * pageSize, totalItems)
  };
};