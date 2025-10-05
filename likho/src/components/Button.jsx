import React from 'react';
import { motion } from 'framer-motion';

function Button({
  children,
  type = 'button',
  bgColor = 'bg-teal-700',
  textColor = 'text-white',
  hoverBgColor = 'hover:bg-teal-800',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ duration: 0.15 }}
      type={type}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-md font-medium tracking-wide transition-all duration-200
        ${bgColor} ${textColor} ${hoverBgColor}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default Button;
