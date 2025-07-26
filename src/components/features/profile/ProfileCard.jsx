import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, getUserApplications, updateUserProfile } from '../../../api/profile';
import { toast } from 'react-toastify';
// Removed date-fns import - using native Date methods instead
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';
import Footer from '../../layout/Footer';

export function ProfileCard() {
  const queryClient = useQueryClient();

  // Fetch current user data
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    onError: (error) => {
      toast.error('Failed to load profile data');
      console.error('Error fetching user:', error);
    }
  });

  // Fetch user's applications
  const { data: applications = [], isLoading: isLoadingApplications } = useQuery({
    queryKey: ['userApplications'],
    queryFn: () => getUserApplications(user?.id),
    enabled: !!user?.id,
    onError: (error) => {
      toast.error('Failed to load application history');
      console.error('Error fetching applications:', error);
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
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
        return 'blue';
      case 'rejected':
        return 'red';
      case 'accepted':
        return 'green';
      case 'applied':
        return 'yellow';
      default:
        return 'gray';
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
    return <div>Loading profile...</div>;
  }

  if (!user) {
    return <div>Failed to load profile data</div>;
  }

  return (
    <>
      <div className="w-full max-w-5xl mx-auto p-4">
        {/* ...existing profile and application history code... */}
        {/* (Paste the previous return content here, unchanged) */}
      </div>
      <Footer />
    </>
  );
}