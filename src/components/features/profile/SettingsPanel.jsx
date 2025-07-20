import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../../../api/profile';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Modal from '../../ui/Modal';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card';
import Switch from '../../ui/Switch';
import React from 'react';

export function SettingsPanel({ onLogout }) {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    notifications: {
      email: true,
      push: true,
      jobAlerts: true,
    },
  });

  const updatePassword = useMutation({
    mutationFn: async ({ currentPassword, newPassword }) => {
      const response = await api.patch('/users/me/password', {
        currentPassword,
        newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password updated successfully');
      setActiveModal(null);
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update password');
    },
  });

  const updateEmail = useMutation({
    mutationFn: async ({ email }) => {
      const response = await api.patch('/users/me/email', { email });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Email updated successfully');
      setActiveModal(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update email');
    },
  });

  const updateNotifications = useMutation({
    mutationFn: async (notifications) => {
      const response = await api.patch('/users/me/notifications', { notifications });
      return response.data;
    },
    onSuccess: () => {
      toast.success('Notification preferences updated');
      setActiveModal(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update notifications');
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 'password') {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      updatePassword.mutate({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
    } else if (type === 'email') {
      updateEmail.mutate({ email: formData.email });
    } else if (type === 'notifications') {
      updateNotifications.mutate(formData.notifications);
    }
  };

  const settingsItems = [
    {
      id: 'email',
      title: 'Email',
      description: 'Update your email address',
      modalContent: (
        <form onSubmit={(e) => handleSubmit(e, 'email')} className="space-y-[var(--spacing-md)]">
          <Input
            label="New Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-[var(--spacing-md)] pt-[var(--spacing-lg)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveModal(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={updateEmail.isPending}
            >
              {updateEmail.isPending ? 'Updating...' : 'Update Email'}
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Change your password',
      modalContent: (
        <form onSubmit={(e) => handleSubmit(e, 'password')} className="space-y-[var(--spacing-md)]">
          <Input
            label="Current Password"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />
          <Input
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            minLength={8}
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-[var(--spacing-md)] pt-[var(--spacing-lg)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveModal(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={updatePassword.isPending}
            >
              {updatePassword.isPending ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      ),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Manage your notification preferences',
      modalContent: (
        <form onSubmit={(e) => handleSubmit(e, 'notifications')} className="space-y-[var(--spacing-xl)]">
          <div className="space-y-[var(--spacing-md)]">
            <div className="flex items-center justify-between">
              <label className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
                Email Notifications
              </label>
              <Switch
                name="email"
                checked={formData.notifications.email}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: checked }
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
                Push Notifications
              </label>
              <Switch
                name="push"
                checked={formData.notifications.push}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: checked }
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
                Job Alerts
              </label>
              <Switch
                name="jobAlerts"
                checked={formData.notifications.jobAlerts}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, jobAlerts: checked }
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-end space-x-[var(--spacing-md)] pt-[var(--spacing-lg)]">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveModal(null)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={updateNotifications.isPending}
            >
              {updateNotifications.isPending ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </form>
      ),
    },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto p-[var(--spacing-xl)]">
      <div className="space-y-[var(--spacing-xl)]">
        {/* Header */}
        <div className="border-b border-[var(--border-light)] pb-[var(--spacing-lg)]">
          <h2 className="text-[var(--text-2xl)] font-bold text-[var(--text-primary)]">Account Settings</h2>
          <p className="text-[var(--text-sm)] text-[var(--text-muted)] mt-[var(--spacing-xs)]">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings List */}
        <div className="space-y-[var(--spacing-lg)]">
          {settingsItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-[var(--spacing-lg)] rounded-[var(--radius-md)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <div>
                <h3 className="font-medium text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-[var(--text-sm)] text-[var(--text-muted)]">{item.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModal(item.id)}
              >
                Edit
              </Button>
            </div>
          ))}
        </div>

        {/* Log Out Button */}
        <div className="pt-[var(--spacing-lg)] border-t border-[var(--border-light)]">
          <Button
            variant="outline"
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            onClick={onLogout}
          >
            Sign out
          </Button>
        </div>
      </div>

      {/* Active Modal */}
      <Modal
        isOpen={!!activeModal}
        onClose={() => setActiveModal(null)}
        title={settingsItems.find(item => item.id === activeModal)?.title || ''}
      >
        {activeModal && settingsItems.find(item => item.id === activeModal)?.modalContent}
      </Modal>
    </Card>
  );
}
