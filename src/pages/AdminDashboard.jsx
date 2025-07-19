import React from "react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,254</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Active Jobs</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">87</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Pending Approvals</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">12</p>
        </div>
      </main>
    </div>
  );
}