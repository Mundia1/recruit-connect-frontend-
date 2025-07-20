import React from 'react';
import PropTypes from 'prop-types';

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={`flex h-[48px] w-full rounded-[var(--radius-md)] border border-[var(--border-light)] bg-transparent px-4 py-2 text-base
        placeholder:text-[var(--text-muted)] 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green-primary)] focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 
        ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Select;
