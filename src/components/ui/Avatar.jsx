import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, alt, size = 'md', className = '', children }) => {
  const sizeClasses = {
    sm: 'h-10 w-10', // 40px
    md: 'h-14 w-14', // 56px
    lg: 'h-32 w-32', // 128px
  };

  const containerClasses = `relative inline-flex items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green-darker)] ${sizeClasses[size]} ${className}`;

  return (
    <div className={containerClasses}>
      {src ? (
        <img className="h-full w-full rounded-full object-cover" src={src} alt={alt} />
      ) : (
        <span className="font-medium">{children}</span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Avatar;
