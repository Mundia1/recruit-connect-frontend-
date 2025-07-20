import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b border-[var(--border-light)]">
        <nav className="-mb-px flex space-x-[var(--spacing-lg)]" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`${index === activeTab
                  ? 'border-[var(--green-primary)] text-[var(--green-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)]'
                } whitespace-nowrap py-[var(--spacing-lg)] px-[var(--spacing-xs)] border-b-2 font-medium text-[var(--text-sm)]`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="pt-[var(--spacing-xl)]">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
  })).isRequired,
};

export default Tabs;