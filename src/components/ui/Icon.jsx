import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ as, size = 'md', color, className = '' }) => {
  const IconComponent = as;

  const sizeClasses = {
    sm: 'h-[16px] w-[16px]',
    md: 'h-[20px] w-[20px]',
    lg: 'h-[24px] w-[24px]',
  };

  const colorClass = color ? `text-[${color}]` : '';

  return (
    <IconComponent className={`${sizeClasses[size]} ${colorClass} ${className}`} />
  );
};

Icon.propTypes = {
  as: PropTypes.elementType.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
