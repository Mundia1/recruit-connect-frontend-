import React from 'react';
import PropTypes from 'prop-types';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-[48px] w-full rounded-[var(--radius-md)] border border-[var(--border-light)] bg-transparent px-4 py-2 text-base
        placeholder:text-[var(--text-muted)] 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 
        ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Input;
