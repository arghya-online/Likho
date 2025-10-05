import React from 'react';

function Container({ children, full }) {
  return (
    <div className={`${full ? 'w-full px-4 md:px-12' : 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
      {children}
    </div>
  );
}

export default Container;
