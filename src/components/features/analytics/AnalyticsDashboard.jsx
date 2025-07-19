import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Briefcase, Users, TrendingUp, AlertCircle, Plus, RefreshCw, Loader2, Eye } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '../../layout/DashboardLayout';
import StatisticsCard from './StatisticsCard';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Tabs } from '../../ui/Tabs';
import { api } from '../../../api/profile';

// API functions
const fetchJobs = async () => {
  const { data } = await api.get('/jobs');
  return data || [];
};

const fetchApplications = async () => {
  const { data } = await api.get('/applications');
  return data || [];
};

const fetchViews = async () => {
  const { data } = await api.get('/analytics/views');
  return data || [];
};

const AnalyticsDashboard = ({ isAdmin = false }) => {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch data
  const {
    data: jobs = [],
    isLoading: isLoadingJobs,
    error: jobsError,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  const {
    data: applications = [],
    isLoading: isLoadingApplications,
    error: applicationsError,
  } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    enabled: isAdmin,
  });

  const {
    data: viewsData = [],
    isLoading: isLoadingViews,
    error: viewsError,
  } = useQuery({
    queryKey: ['views'],
    queryFn: fetchViews,
  });

  // Handle refresh
  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
        isAdmin && queryClient.invalidateQueries({ queryKey: ['applications'] }),
      ]);
      toast.success('Data refreshed successfully');
    } catch (error) {
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Process data for statistics and charts
  const stats = useMemo(() => {
    if (isLoadingJobs || isLoadingApplications || isLoadingViews) return {};

    const applicationStatusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter(job => job.status === 'active').length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'pending').length,
      totalViews: viewsData.total || 0,
      uniqueVisitors: viewsData.unique || 0,
      applicationStatusCounts
    };
  }, [jobs, applications, viewsData, isLoadingJobs, isLoadingApplications, isLoadingViews]);

  // Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Loading state
  if (isLoadingJobs || (isAdmin && isLoadingApplications) || isLoadingViews) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2">Loading dashboard...</span>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (jobsError || applicationsError || viewsError) {
    return (
      <DashboardLayout>
        <Card className="border-red-200 bg-red-50">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading dashboard data
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please try refreshing the page or contact support if the problem persists.</p>
              </div>
              <div className="mt-4">
                <Button
                  variant="ghost"
                  onClick={handleRefresh}
                  className="text-red-700 hover:bg-red-100"
                >
                  Try again <span aria-hidden="true">&rarr;</span>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your recruitment metrics and performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            {isAdmin && (
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Job
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <Tabs.List className="flex space-x-2 border-b">
            <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
            <Tabs.Trigger value="applications">
              Applications
              {!isLoadingJobs && !isLoadingApplications && stats.totalApplications > 0 && (
                <Badge variant="outline" className="ml-2">
                  {stats.totalApplications}
                </Badge>
              )}
            </Tabs.Trigger>
            <Tabs.Trigger value="jobs">
              Jobs
              {!isLoadingJobs && stats.activeJobs > 0 && (
                <Badge variant="outline" className="ml-2">
                  {stats.activeJobs} Active
                </Badge>
              )}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
              <StatisticsCard
                title="Total Jobs"
                value={stats.totalJobs?.toLocaleString() || '0'}
                icon={Briefcase}
                iconBgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <StatisticsCard
                title="Active Jobs"
                value={stats.activeJobs?.toLocaleString() || '0'}
                icon={TrendingUp}
                trend={stats.activeJobs > 0 ? 5 : 0}
                iconBgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <StatisticsCard
                title="Applications"
                value={stats.totalApplications?.toLocaleString() || '0'}
                icon={Users}
                trend={10}
                iconBgColor="bg-purple-50"
                iconColor="text-purple-600"
              />
              <StatisticsCard
                title="Pending Reviews"
                value={stats.pendingApplications?.toLocaleString() || '0'}
                icon={AlertCircle}
                iconBgColor="bg-yellow-50"
                iconColor="text-yellow-600"
              />
              <StatisticsCard
                title="Total Views"
                value={stats.totalViews?.toLocaleString() || '0'}
                icon={Eye}
                trend={15}
                iconBgColor="bg-indigo-50"
                iconColor="text-indigo-600"
              />
            </div>

            {/* Application Status Badges */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Application Status</h3>
              <div className="flex flex-wrap gap-2">
                {stats.applicationStatusCounts ? (
                  Object.entries(stats.applicationStatusCounts).map(([status, count]) => (
                    <Badge 
                      key={status}
                      variant="outline"
                      className={`capitalize ${
                        status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                        status === 'accepted' ? 'bg-green-50 text-green-800 border-green-200' :
                        status === 'rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                        'bg-gray-50 text-gray-800 border-gray-200'
                      }`}
                    >
                      {status}: {count}
                    </Badge>
                  ))
                ) : (
                  <div className="h-8 w-full animate-pulse bg-gray-100 rounded-md"></div>
                )}
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="applications">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Recent Applications</h3>
                {isLoadingApplications ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{app.jobTitle || 'Job Title'}</p>
                            <p className="text-sm text-gray-500">{app.company || 'Company'}</p>
                          </div>
                          <Badge 
                            variant="outline"
                            className={`capitalize ${
                              app.status === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                              app.status === 'accepted' ? 'bg-green-50 text-green-800 border-green-200' :
                              app.status === 'rejected' ? 'bg-red-50 text-red-800 border-red-200' :
                              'bg-gray-50 text-gray-800 border-gray-200'
                            }`}
                          >
                            {app.status || 'Unknown'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No applications found</p>
                )}
              </div>
            </Card>
          </Tabs.Content>

          <Tabs.Content value="jobs">
            <Card>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-4">Active Jobs</h3>
                {isLoadingJobs ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                  </div>
                ) : jobs.length > 0 ? (
                  <div className="space-y-4">
                    {jobs
                      .filter(job => job.status === 'active')
                      .slice(0, 5)
                      .map((job) => (
                        <div key={job.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{job.title || 'Job Title'}</p>
                              <p className="text-sm text-gray-500">{job.company || 'Company'}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                              Active
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No active jobs found</p>
                )}
              </div>
            </Card>
          </Tabs.Content>
        </Tabs>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-5">
          <BarChart
            title="Monthly Page Views"
            data={viewsData.monthly || []}
            dataKey="value"
            fill="#3b82f6"
            height={400}
            loading={isLoading}
          />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Status</h3>
              <div className="h-80">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-pulse text-gray-400">Loading data...</div>
                  </div>
                ) : chartData.applicationStatus?.length > 0 ? (
                  <LineChart
                    data={chartData.applicationStatus}
                    dataKey="value"
                    height={300}
                    stroke="#8b5cf6"
                    showTitle={false}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No application data available
                  </div>
                )}
              </div>
            </div>

            <LineChart
              title="Views Trend"
              data={chartData.monthlyViews}
              dataKey="value"
              height={300}
              stroke="#3b82f6"
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsDashboard;