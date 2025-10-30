import { DATE_FORMATS } from './constants';

/**
 * Format currency with proper symbols
 */
export const formatCurrency = (amount, currency = 'PKR') => {
  if (!amount && amount !== 0) return 'Not specified';
  
  const formatter = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currency === 'PKR' ? 'PKR' : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return formatter.format(amount);
};

/**
 * Format salary range for display
 */
export const formatSalaryRange = (min, max, currency = 'PKR') => {
  if (!min && !max) return 'Not specified';
  if (!max) return `From ${formatCurrency(min, currency)}`;
  if (!min) return `Up to ${formatCurrency(max, currency)}`;
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

/**
 * Format date for display
 */
export const formatDate = (dateString, format = 'DISPLAY') => {
  if (!dateString) return 'Not specified';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Format file size to human readable format
 */
export const formatFileSize = (bytes) => {
  if (!bytes) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format for Pakistani numbers
  if (cleaned.length === 10) {
    return `+92 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  if (cleaned.length === 12 && cleaned.startsWith('92')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone; // Return original if format doesn't match
};

/**
 * Format match score as percentage with color coding
 */
export const formatMatchScore = (score) => {
  if (score === null || score === undefined) return 'N/A';
  
  const percentage = Math.round(score * 100);
  let color = '#ef4444'; // red
  
  if (percentage >= 80) color = '#10b981'; // green
  else if (percentage >= 60) color = '#f59e0b'; // yellow
  else if (percentage >= 40) color = '#f97316'; // orange
  
  return {
    percentage,
    color,
    label: `${percentage}% Match`
  };
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

/**
 * Format experience duration
 */
export const formatExperience = (years) => {
  if (!years && years !== 0) return 'Not specified';
  
  if (years === 0) return 'Fresh Graduate';
  if (years === 1) return '1 year';
  if (years < 1) return `${Math.round(years * 12)} months`;
  
  return `${years} years`;
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Format skills array for display
 */
export const formatSkills = (skills, maxDisplay = 5) => {
  if (!skills || !Array.isArray(skills)) return [];
  
  if (skills.length <= maxDisplay) {
    return skills.map(skill => capitalizeWords(skill));
  }
  
  const displayed = skills.slice(0, maxDisplay).map(skill => capitalizeWords(skill));
  const remaining = skills.length - maxDisplay;
  
  return [...displayed, `+${remaining} more`];
};

/**
 * Generate initials from name
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};