import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-[var(--spacing-lg)] px-[var(--spacing-lg)] pb-[var(--spacing-4xl)] text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-[var(--text-primary)] opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-[var(--bg-primary)] rounded-[var(--radius-lg)] text-left overflow-hidden shadow-sm transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;