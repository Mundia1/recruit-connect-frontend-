import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Job Management", path: "/admin/jobs" },
  { name: "Applications", path: "/admin/applicants" },
  { name: "Settings", path: "/admin/settings" },
  { name: "Help", path: "/admin/help" },
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
        {/* Job Management Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Total Jobs</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Active Jobs</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">90</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700">Inactive Jobs</h2>
            <p className="text-3xl font-bold text-gray-400 mt-2">30</p>
          </div>
        </div>
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Job Applications Over Time</h2>
            <div className="flex items-end gap-2 h-32">
              {/* Simple bar chart mockup */}
              {[40, 60, 80, 50, 70, 90].map((val, i) => (
                <div
                  key={i}
                  className="bg-blue-200 w-8 rounded"
                  style={{ height: `${val}px` }}
                ></div>
              ))}
            </div>
            <p className="mt-4 text-green-600 font-bold text-lg">+15%</p>
            <p className="text-gray-500 text-sm">Last 30 Days = +15%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Job Views Over Time</h2>
            <svg height="100" width="200" className="mb-2">
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="4"
                points="0,80 40,60 80,90 120,50 160,70 200,60"
              />
            </svg>
            <p className="mt-4 text-green-600 font-bold text-lg">+8%</p>
            <p className="text-gray-500 text-sm">Last 30 Days = +8%</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <nav className="mt-8">
          <ul>
            {sidebarItems.map((item) => (
              <li
                key={item.name}
                className={`px-6 py-3 cursor-pointer hover:bg-blue-50 font-medium text-gray-700 ${
                  location.pathname === item.path ? "bg-blue-50 text-blue-600 rounded-lg" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
        <button className="m-6 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {renderMainContent()}
      </main>
    </div>
  );
}