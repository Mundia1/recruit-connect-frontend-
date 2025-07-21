import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../api';
import { toast } from 'react-toastify';
import Avatar from '../../ui/Avatar';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Badge from '../../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card';
import React from 'react';

export function ProfileCard() {
  const queryClient = useQueryClient();
  
  // Fetch current user data
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: api.auth.getCurrentUser,
    onError: (error) => {
      toast.error('Failed to load profile data');
      console.error('Error fetching user:', error);
    }
  });

  // Fetch user's applications
  const { data: applications = [], isLoading: isLoadingApplications } = useQuery({
    queryKey: ['userApplications', user?.id],
    queryFn: () => api.applications.getAll({ userId: user.id }),
    enabled: !!user?.id,
    onError: (error) => {
      toast.error('Failed to load application history');
      console.error('Error fetching applications:', error);
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: api.auth.updateUserProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  });

  const getStatusBadgeVariant = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'interviewing':
        return 'secondary'; // Using secondary for a neutral/in-progress state
      case 'rejected':
        return 'outline'; // Using outline for a negative state
      case 'accepted':
        return 'primary'; // Using primary for a positive state
      case 'applied':
        return 'secondary'; // Using secondary for a neutral state
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = Object.fromEntries(formData.entries());
    updateProfileMutation.mutate(updates);
  };

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--green-primary)]"></div>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-[var(--text-muted)]">Failed to load profile data</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-[var(--spacing-lg)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[var(--spacing-2xl)]">
        <div>
          <h1 className="text-[var(--text-2xl)] md:text-[var(--text-3xl)] font-bold text-[var(--text-primary)]">
            {user.name}'s Profile
          </h1>
          <p className="text-[var(--text-sm)] text-[var(--text-muted)] mt-[var(--spacing-xs)]">
            Manage your profile information and application history.
          </p>
        </div>
      </div>
  
      {/* Profile Info Card */}
      <Card className="mb-[var(--spacing-2xl)]">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-[var(--spacing-xl)]">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <Avatar
                  src={user.avatar_url}
                  alt={user.name}
                  size="lg"
                  className="border-4 border-[var(--bg-primary)] shadow-sm"
                />
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-[var(--spacing-md)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
                  <div>
                    <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={user.name || ''}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                      Job Title
                    </label>
                    <Input
                      type="text"
                      name="title"
                      defaultValue={user.title || ''}
                      placeholder="Your job title"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                      Email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      defaultValue={user.email || ''}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      defaultValue={user.phone || ''}
                      placeholder="+254 712 345 678"
                    />
                  </div>
                </div>
                
                <div className="flex items-center text-[var(--text-sm)] text-[var(--text-muted)]">
                  <span>Member since {new Date(user.created_at).getFullYear()}</span>
                </div>
                
                <div className="flex justify-end pt-[var(--spacing-lg)]">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    variant="primary"
                  >
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
  
      {/* Application History Card */}
      <Card>
        <CardHeader>
          <CardTitle>Application History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingApplications ? (
            <div className="flex justify-center py-[var(--spacing-2xl)]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--green-primary)]"></div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-[var(--spacing-2xl)] text-[var(--text-muted)]">
              <p>No applications found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[var(--border-light)]">
                <thead className="bg-[var(--bg-secondary)]">
                  <tr>
                    <th scope="col" className="px-[var(--spacing-xl)] py-[var(--spacing-md)] text-left text-[var(--text-xs)] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                      Job Title
                    </th>
                    <th scope="col" className="px-[var(--spacing-xl)] py-[var(--spacing-md)] text-left text-[var(--text-xs)] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-[var(--spacing-xl)] py-[var(--spacing-md)] text-left text-[var(--text-xs)] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-[var(--spacing-xl)] py-[var(--spacing-md)] text-left text-[var(--text-xs)] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                      Date Applied
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[var(--bg-primary)] divide-y divide-[var(--border-light)]">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-[var(--bg-secondary)]">
                      <td className="px-[var(--spacing-xl)] py-[var(--spacing-lg)] whitespace-nowrap text-[var(--text-sm)] font-medium text-[var(--text-primary)]">
                        {application.job_title}
                      </td>
                      <td className="px-[var(--spacing-xl)] py-[var(--spacing-lg)] whitespace-nowrap text-[var(--text-sm)] text-[var(--text-muted)]">
                        {application.company_name}
                      </td>
                      <td className="px-[var(--spacing-xl)] py-[var(--spacing-lg)] whitespace-nowrap">
                        <Badge variant={getStatusBadgeVariant(application.status)}>
                          {application.status}
                        </Badge>
                      </td>
                      <td className="px-[var(--spacing-xl)] py-[var(--spacing-lg)] whitespace-nowrap text-[var(--text-sm)] text-[var(--text-muted)]">
                        {formatDate(application.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
