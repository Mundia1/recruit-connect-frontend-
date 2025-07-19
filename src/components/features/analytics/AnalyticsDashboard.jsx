import React from 'react';
import StatisticsCard from './StatisticsCard';
import BarChart from './BarChart';
import LineChart from './LineChart';
import { Briefcase, Eye, Users, TrendingUp } from 'lucide-react';

const AnalyticsDashboard = () => {
  const statisticsData = [
    {
      title: "Total Jobs",
      value: "120",
      subtitle: "All job listings",
      icon: Briefcase,
    },
    {
      title: "Active Jobs",
      value: "90",
      subtitle: "Currently hiring",
      trend: "+12%",
      icon: TrendingUp,
    },
    {
      title: "Inactive Jobs",
      value: "30",
      subtitle: "Closed positions",
      icon: Users,
    },
    {
      title: "Total Views",
      value: "6.6K",
      subtitle: "This month",
      trend: "+8%",
      icon: Eye,
    },
  ];

  const applicationData = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 78 },
    { name: 'Mar', applications: 92 },
    { name: 'Apr', applications: 88 },
    { name: 'May', applications: 105 },
    { name: 'Jun', applications: 120 },
  ];

  const viewsData = [
    { name: 'Jan', views: 820 },
    { name: 'Feb', views: 932 },
    { name: 'Mar', views: 1045 },
    { name: 'Apr', views: 1180 },
    { name: 'May', views: 1290 },
    { name: 'Jun', views: 1394 },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
        <p className="text-slate-600 mt-2">Track your job posting performance and engagement metrics</p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statisticsData.map((stat, index) => (
          <StatisticsCard
            key={index}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            trend={stat.trend}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BarChart 
          title="Job Applications Over Time"
          data={applicationData}
          trend="+15%"
        />
        <LineChart 
          title="Job Views Over Time"
          data={viewsData}
          trend="+8%"
        />
      </div>

      {/* Additional Analytics Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-600 mb-2">75%</div>
            <div className="text-sm text-slate-600">Job Fill Rate</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">4.8</div>
            <div className="text-sm text-slate-600">Avg. Rating</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600 mb-2">28</div>
            <div className="text-sm text-slate-600">Days Avg. Time to Fill</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;