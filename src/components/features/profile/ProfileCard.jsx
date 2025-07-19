import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, getUserApplications, updateUserProfile } from '../../../api/profile';
import { toast } from 'react-toastify';
// Removed date-fns import - using native Date methods instead
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';

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
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {user.name}'s Profile
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your profile information and application history.
          </p>
        </div>
      </div>
  
      {/* Profile Info Card */}
      <Card className="mb-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <Avatar
                src={user.avatar_url}
                name={user.name}
                size="large"
                className="w-32 h-32 border-4 border-white shadow-sm"
              />
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">
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
              
              <div className="flex items-center text-sm text-gray-500">
                <span>Member since {new Date(user.created_at).getFullYear()}</span>
              </div>
              
              <div className="flex justify-end pt-4">
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
      </Card>
  
      {/* Application History Card */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Application History
        </h2>
        
        {isLoadingApplications ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No applications found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Applied
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {application.job_title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.company_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadgeVariant(application.status)}>
                        {application.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(application.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}