import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Badge from '../../ui/Badge';

const ApplicationHistoryRow = ({ application }) => {
  const { jobTitle, company, applicationDate, status } = application;

  const formattedDate = applicationDate ? format(new Date(applicationDate), 'MMM dd, yyyy') : 'N/A';

  const statusVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'secondary';
      case 'accepted':
        return 'primary';
      case 'rejected':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="flex items-center justify-between py-[var(--spacing-md)] border-b border-[var(--border-light)] last:border-b-0">
      <div className="flex-1 min-w-0">
        <p className="text-[var(--text-base)] font-medium text-[var(--text-primary)] truncate">
          {jobTitle}
        </p>
        <p className="text-[var(--text-sm)] text-[var(--text-muted)] truncate">
          {company}
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-[var(--text-sm)] text-[var(--text-primary)]">
          {formattedDate}
        </p>
        <Badge variant={statusVariant(status)} className="mt-[var(--spacing-xs)] capitalize">
          {status}
        </Badge>
      </div>
    </div>
  );
};

ApplicationHistoryRow.propTypes = {
  application: PropTypes.shape({
    jobTitle: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    applicationDate: PropTypes.string,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default ApplicationHistoryRow;
