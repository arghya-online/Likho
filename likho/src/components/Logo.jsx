import React from 'react';
import likhoLogo from '../assets/Logo.png'; 

function Logo({ width = '100px', className = '' }) {
  return (
    <div className={`logo-container ${className}`}>
      <img 
        src={likhoLogo} 
        alt="LIKHO Logo" 
        style={{ width: width }} // Apply the width prop directly
        className="block h-auto object-contain" // Optional Tailwind CSS classes for better styling
      />
    </div>
  );
}

export default Logo;