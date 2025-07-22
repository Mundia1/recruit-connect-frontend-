
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StatisticsCard from "../components/features/analytics/StatisticsCard";
import BarChart from "../components/features/analytics/BarChart";
import LineChart from "../components/features/analytics/LineChart";
import { BriefcaseIcon, UserGroupIcon, EyeIcon, HomeIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

const sidebarItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
  { name: "Job Management", path: "/admin/jobs", icon: BriefcaseIcon },
  { name: "Applications", path: "/admin/applicants", icon: UserGroupIcon },
  { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
  { name: "Help", path: "/admin/help", icon: QuestionMarkCircleIcon },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock applicants data
  const [applicants, setApplicants] = useState([
    {
      id: 1,
      jobTitle: "Frontend Developer",
      name: "Jane Doe",
      email: "jane@example.com",
      status: "pending",
    },
    {
      id: 2,
      jobTitle: "Backend Developer",
      name: "John Smith",
      email: "john@example.com",
      status: "reviewed",
    },
  ]);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Simple job posting form
  const JobPostingForm = () => (
    <div className="bg-white p-8 rounded-lg shadow max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Post a New Job</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Job Title</label>
          <input className="w-full border rounded px-3 py-2" type="text" placeholder="Job Title" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input className="w-full border rounded px-3 py-2" type="text" placeholder="Company Name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input className="w-full border rounded px-3 py-2" type="text" placeholder="Location" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea className="w-full border rounded px-3 py-2" rows={4} placeholder="Job Description"></textarea>
        </div>
        <button type="submit" className="bg-[#177245] text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">
          Post Job
        </button>
      </form>
    </div>
  );

  // Main content switcher
  const renderMainContent = () => {
    if (location.pathname === "/admin/jobs") {
      return <JobPostingForm />;
    }
    if (location.pathname === "/admin/applicants") {
      return (
        <div className="bg-white p-8 rounded-lg shadow max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Job Applications</h2>
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Job Title</th>
                <th className="py-2 px-4 border-b">Applicant Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td className="py-2 px-4 border-b">{app.jobTitle}</td>
                  <td className="py-2 px-4 border-b">{app.name}</td>
                  <td className="py-2 px-4 border-b">{app.email}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      className="border rounded px-2 py-1"
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (location.pathname === "/admin/settings") {
      return (
        <div className="bg-white p-8 rounded-lg shadow max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Settings</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Admin Name</label>
              <input className="w-full border rounded px-3 py-2" type="text" placeholder="Admin Name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input className="w-full border rounded px-3 py-2" type="email" placeholder="admin@email.com" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Change Password</label>
              <input className="w-full border rounded px-3 py-2" type="password" placeholder="New Password" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Notification Preferences</label>
              <select className="w-full border rounded px-3 py-2">
                <option value="all">All Notifications</option>
                <option value="jobs">Only Job Updates</option>
                <option value="applications">Only Applications</option>
                <option value="none">None</option>
              </select>
            </div>
            <button type="submit" className="bg-[#177245] text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">
              Save Settings
            </button>
          </form>
        </div>
      );
    }
    if (location.pathname === "/admin/help") {
      return (
        <div className="bg-white p-8 rounded-lg shadow max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Admin Help & Support</h2>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Need assistance? Here are some resources:
            </p>
            <ul className="list-disc ml-6 text-gray-600">
              <li>How to post a job</li>
              <li>How to review applications</li>
              <li>Managing your account settings</li>
              <li>Contact technical support</li>
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Contact Support</label>
            <textarea className="w-full border rounded px-3 py-2" rows={3} placeholder="Describe your issue..."></textarea>
          </div>
          <button type="button" className="bg-[#177245] text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition">
            Send Message
          </button>
        </div>
      );
    }
    // Default dashboard content
    return (
      <>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatisticsCard
            title="Active Jobs"
            value={90}
            subtitle="Total jobs currently open"
            trend={"+5%"}
            icon={BriefcaseIcon}
            iconBgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <StatisticsCard
            title="Applications"
            value={320}
            subtitle="Total applications received"
            trend={"+15%"}
            icon={UserGroupIcon}
            iconBgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatisticsCard
            title="Views"
            value={1200}
            subtitle="Profile/job views"
            trend={"+8%"}
            icon={EyeIcon}
            iconBgColor="bg-yellow-50"
            iconColor="text-yellow-600"
          />
        </div>
        {/* Analytics Charts */}
        <div className="grid grid-cols-2 gap-6">
          <BarChart />
          <LineChart />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4 border-b">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#177245] tracking-tight">RecruitConnect</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-700">Admin</span>
          <img src="https://ui-avatars.com/api/?name=Admin&background=177245&color=fff" alt="Admin Avatar" className="w-10 h-10 rounded-full border" />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r flex flex-col justify-between">
          <nav className="mt-8">
            <ul>
              {sidebarItems.map((item) => (
                <li
                  key={item.name}
                  className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-blue-50 font-medium text-gray-700 ${
                    location.pathname === item.path ? "bg-blue-50 text-blue-600 rounded-lg" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
          <button className="m-6 flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 font-medium">
            <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-10">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}