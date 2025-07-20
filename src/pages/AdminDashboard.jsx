import React from 'react';
import AnalyticsDashboard from '../components/features/analytics/AnalyticsDashboard';

const AdminDashboard = () => {
  return (
    <div>
      <AnalyticsDashboard isAdmin={true} />
    </div>
  );
};

export default AdminDashboard;
