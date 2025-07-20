import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ children, variant = 'primary', className = '' }) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold';

  const variantClasses = {
    primary: 'bg-[var(--green-primary)] text-white',
    secondary: 'bg-[var(--green-light)] text-[var(--green-darker)]',
    outline: 'text-[var(--green-darker)] border border-[var(--green-primary)] bg-transparent',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  className: PropTypes.string,
};

export default Badge;
