import React from 'react';

function Button({
  children,      // should be lowercase 'children'
  type = 'button',
  bgColor = 'bg-teal-700',
  textColor = 'text-white',
  hoverBgColor = 'hover:bg-teal-900',
  className = '',
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded ${bgColor} ${textColor} ${hoverBgColor} ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;