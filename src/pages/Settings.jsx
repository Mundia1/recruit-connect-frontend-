import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { SettingsPanel } from '../components/features/profile/SettingsPanel';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear local storage, call an API, etc.
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <DashboardLayout>
      <div className="p-[var(--spacing-lg)]">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-xl)]">Settings</h1>
        <SettingsPanel onLogout={handleLogout} />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
