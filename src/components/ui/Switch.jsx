import React from 'react';
import PropTypes from 'prop-types';

const Switch = ({ checked, onCheckedChange, name, className = '' }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[var(--green-primary)] focus:ring-offset-2 ${checked ? 'bg-[var(--green-primary)]' : 'bg-[var(--border-medium)]'} ${className}`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onCheckedChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;
