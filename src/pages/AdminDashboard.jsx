import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StatisticsCard from "../components/features/analytics/StatisticsCard";
import BarChart from "../components/features/analytics/BarChart";
import LineChart from "../components/features/analytics/LineChart";
import { BriefcaseIcon, UserGroupIcon, EyeIcon, HomeIcon, Cog6ToothIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, UserCircleIcon, BellIcon } from "@heroicons/react/24/outline";


export default function AdminDashboard() {
  const [sidebarCollapsed] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New application received", read: false },
    { id: 2, text: "Job post approved", read: false },
    { id: 3, text: "Password changed successfully", read: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: `Mock notification #${prev.length + 1} at ${new Date().toLocaleTimeString()}`,
          read: false,
        },
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const jobEvents = [
      "New job posted: Frontend Developer",
      "Job application received for Backend Developer",
      "Job 'UI Designer' has been closed",
      "Job 'QA Engineer' has been approved",
      "Job 'DevOps Specialist' was updated",
      "Job 'Product Manager' received a new application",
      "Job 'React Developer' was rejected",
      "Job 'Full Stack Developer' is now live",
      "Job 'Data Analyst' has been reviewed",
      "Job 'Mobile Developer' received feedback",
    ];
    const interval = setInterval(() => {
      const randomEvent = jobEvents[Math.floor(Math.random() * jobEvents.length)];
      setNotifications((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomEvent,
          read: false,
        },
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const sidebarItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
    { name: "Job Management", path: "/admin/jobs", icon: BriefcaseIcon },
    { name: "Applications", path: "/admin/applicants", icon: UserGroupIcon },
    { name: "Settings", path: "/admin/settings", icon: Cog6ToothIcon },
    { name: "Help", path: "/admin/help", icon: QuestionMarkCircleIcon },
  ];
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin/dashboard");
    }
  };

  const handleLogout = () => {
    navigate("/signin", { replace: true });
  };

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

  const handleStatusChange = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

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

  const barChartData = [
    { name: 'Mon', applications: 30 },
    { name: 'Tue', applications: 45 },
    { name: 'Wed', applications: 38 },
    { name: 'Thu', applications: 52 },
    { name: 'Fri', applications: 41 },
    { name: 'Sat', applications: 20 },
    { name: 'Sun', applications: 15 },
  ];
  const lineChartData = [
    { name: 'Mon', views: 120 },
    { name: 'Tue', views: 200 },
    { name: 'Wed', views: 150 },
    { name: 'Thu', views: 180 },
    { name: 'Fri', views: 220 },
    { name: 'Sat', views: 90 },
    { name: 'Sun', views: 60 },
  ];

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
          <h2 className="text-xl font-bold mb-6 text-gray-800">Employer Settings</h2>
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
          <h2 className="text-xl font-bold mb-6 text-gray-800">Employer Help & Support</h2>
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


    return (
      <>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
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
        <div className="grid grid-cols-2 gap-6">
          <BarChart
            title="Applications per Day"
            data={barChartData}
            dataKey="applications"
            fill="#3b82f6"
            showTitle={true}
            height={280}
          />
          <LineChart
            title="Views per Day"
            data={lineChartData}
            dataKey="views"
            stroke="#16a34a"
            showTitle={true}
            height={280}
          />
        </div>
      </>
    );
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const fullName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.name || user.email || "Employer";

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
        <div className="flex items-center gap-2 min-w-[56px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="#177245"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M12 17.75l-6.172 3.245 1.179-6.881-5-4.873 6.9-1.002L12 2.25l3.093 6.989 6.9 1.002-5 4.873 1.179 6.881z"/>
          </svg>
          <span className="text-lg font-bold text-[#177245] tracking-tight">Employer Panel</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="relative focus:outline-none group"
              onClick={() => setShowNotifications((prev) => !prev)}
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-30">
                <div className="px-4 py-2 font-semibold text-gray-700 border-b flex justify-between items-center">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      className="text-xs text-blue-600 hover:underline"
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, read: true }))
                        )
                      }
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <ul>
                  {notifications.length === 0 && (
                    <li className="px-4 py-2 text-gray-400">No notifications</li>
                  )}
                  {notifications.map((n) => (
                    <li key={n.id} className="px-4 py-2 text-gray-600 hover:bg-gray-50 flex justify-between items-center">
                      <span className={n.read ? "text-gray-400" : ""}>{n.text}</span>
                      {!n.read && (
                        <button
                          className="ml-2 text-xs text-blue-600 hover:underline"
                          onClick={() => markAsRead(n.id)}
                        >
                          Mark as Read
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100 border-t"
                  onClick={() => setShowNotifications(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
          <div className="relative group">
            <img src="https://ui-avatars.com/api/?name=Employer&background=177245&color=fff" alt="Employer Avatar" className="w-10 h-10 rounded-full border cursor-pointer" />
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20">
              <div className="px-4 py-2 text-gray-700 font-semibold border-b">Employer</div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Profile</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Settings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 border-t" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        <aside
          className={`relative transition-all duration-200 bg-white border-r flex flex-col justify-between py-6 px-0 ${
            sidebarCollapsed && !sidebarHovered ? 'w-20' : 'w-64'
          }`}
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          onTouchStart={() => setSidebarHovered(true)}
          onTouchEnd={() => setSidebarHovered(false)}
        >
          <div className={`flex items-center justify-center ${sidebarCollapsed && !sidebarHovered ? 'mb-2' : 'mb-6'} mt-2`}>
            {!(sidebarCollapsed && !sidebarHovered) && (
              <span className="text-lg font-bold text-[#177245] tracking-tight">Employer Panel</span>
            )}
          </div>
          <nav className="flex-1 mt-2">
            <ul className="space-y-1 mt-8">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.name}
                    className={`relative flex items-center gap-3 px-3 md:px-6 py-3 cursor-pointer hover:bg-green-50 font-medium text-gray-700 transition-colors ${
                      location.pathname === item.path ? "bg-green-100 text-[#177245] rounded-lg" : ""
                    } group`}
                    onClick={() => navigate(item.path)}
                    tabIndex={0}
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!(sidebarCollapsed && !sidebarHovered) && <span>{item.name}</span>}
                    {location.pathname === item.path && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded bg-[#177245]" />
                    )}
                    {sidebarCollapsed && !sidebarHovered && (
                      <span className="absolute left-full ml-2 px-2 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-20 whitespace-nowrap">
                        {item.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className={`pb-2 mt-8 ${sidebarCollapsed && !sidebarHovered ? 'px-2' : 'px-6'}`}>
            <div className={`flex items-center gap-3 mb-2 ${sidebarCollapsed && !sidebarHovered ? 'justify-center' : ''}`}>
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              {!(sidebarCollapsed && !sidebarHovered) && (
                <div>
                  <div className="font-semibold text-gray-800 leading-tight">Employer</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
              )}
            </div>
            <button
              className={`w-full flex items-center gap-2 bg-gray-100 text-gray-700 px-2 md:px-4 py-2 rounded hover:bg-gray-200 font-medium transition justify-center ${sidebarCollapsed && !sidebarHovered ? 'justify-center' : ''}`}
              onClick={handleLogout}
              type="button"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              {!(sidebarCollapsed && !sidebarHovered) && 'Logout'}
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-10 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
      <footer className="bg-white border-t text-gray-500 text-sm py-4 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between">
        <div>
          &copy; {new Date().getFullYear()} Recruit Connect. All rights reserved.
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  );
}