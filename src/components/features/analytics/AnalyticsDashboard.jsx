import React from "react";
import { Briefcase, Users, Eye } from "lucide-react";
import DashboardLayout from "../../layout/DashboardLayout";

const stats = [
  {
    label: "Active Jobs",
    value: 15,
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Applications",
    value: 120,
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Views",
    value: 450,
    icon: Eye,
    color: "bg-indigo-100 text-indigo-600",
  },
];

// Dummy data for the line chart
const chartData = [10, 20, 30, 25, 40, 35, 50];

export default function AnalyticsDashboard() {
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6">
          <nav className="space-y-4">
            <div className="font-bold text-lg text-gray-900 mb-6">Admin Panel</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="block px-3 py-2 rounded bg-[#177245] text-white font-medium">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
                  Applications
                </a>
              </li>
              <li>
                <a href="#" className="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700">
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow p-6 flex items-center gap-4"
              >
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Simple Line Chart (placeholder) */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Views</h2>
            <div className="w-full h-48 flex items-end">
              {/* Simple SVG line chart */}
              <svg viewBox="0 0 300 100" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="#177245"
                  strokeWidth="3"
                  points={chartData
                    .map((v, i) => `${(i * 50)},${100 - v * 2}`)
                    .join(" ")}
                />
                {/* Dots */}
                {chartData.map((v, i) => (
                  <circle
                    key={i}
                    cx={i * 50}
                    cy={100 - v * 2}
                    r="4"
                    fill="#177245"
                  />
                ))}
              </svg>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}