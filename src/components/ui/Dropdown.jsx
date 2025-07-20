import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-[var(--spacing-sm)] w-56 rounded-[var(--radius-md)] shadow-lg bg-[var(--bg-primary)] ring-1 ring-[var(--border-light)] focus:outline-none"
        >
          <div className="py-[var(--spacing-xs)]" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default Dropdown;