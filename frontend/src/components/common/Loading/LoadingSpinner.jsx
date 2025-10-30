import React from 'react';
import './LoadingSpinner.css'; // This line will now correctly import the CSS

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'primary', 
  text = 'Loading...',
  overlay = false,
  fullScreen = false 
}) => {
  const spinnerClass = `spinner spinner-${size} spinner-${color}`;
  
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="fullscreen-content">
          <div className={spinnerClass}></div>
          {text && <p className="loading-text">{text}</p>}
          <div className="loading-subtitle">
            AI Hiring System
          </div>
        </div>
      </div>
    );
  }

  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className="overlay-content">
          <div className={spinnerClass}></div>
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className={spinnerClass}></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

// Specific loading components for different use cases
export const PageLoader = () => (
  <LoadingSpinner 
    size="large" 
    text="Preparing your experience..." 
    fullScreen 
  />
);

export const ContentLoader = () => (
  <LoadingSpinner 
    size="medium" 
    text="Loading content..." 
  />
);

export const ButtonLoader = ({ size = 'small' }) => (
  <div className="button-loader">
    <LoadingSpinner size={size} text="" />
  </div>
);

export const AIProcessingLoader = () => (
  <div className="ai-processing-loader">
    <LoadingSpinner 
      size="large" 
      color="ai" 
      text="AI is processing your resume..." 
    />
    <div className="ai-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);

export const JobMatchingLoader = () => (
  <div className="job-matching-loader">
    <LoadingSpinner 
      size="large" 
      color="success" 
      text="Finding the perfect job matches..." 
    />
    <div className="matching-animation">
      <div className="resume-icon">📄</div>
      <div className="sparkle">✨</div>
      <div className="job-icon">💼</div>
    </div>
  </div>
);

export default LoadingSpinner;