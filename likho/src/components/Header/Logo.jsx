import React from 'react';
import likhoLogo from '../../assets/Logo.svg';

function Logo({ width = '100px', className = '' }) {
  return (
      <img 
        src={likhoLogo} 
        alt="LIKHO Logo" 
        className={`-block h-16 w-24 object-inline-cover ${className}`}
        style={{ width: width }} 
      />
  );
}

export default Logo;