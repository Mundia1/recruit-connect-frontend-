import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { ProfileCard } from '../components/features/profile/ProfileCard';

const UserProfile = () => {
  return (
    <DashboardLayout>
      <div className="p-[var(--spacing-lg)]">
        <h1 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-xl)]">User Profile</h1>
        <ProfileCard />
      </div>
    </DashboardLayout>
  );
};

export default UserProfile;
