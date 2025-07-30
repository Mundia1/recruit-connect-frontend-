import React, { useState, useEffect } from "react";
import { applicationService } from "../api_service/applications";
import { formatDate } from "../utils/formatDate";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getAllApplications();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch applications.");
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading applications...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Applications</h1>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Job Title</th>
                <th className="py-2 px-4 border-b">Applicant Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="py-2 px-4 border-b">{app.jobTitle}</td>
                  <td className="py-2 px-4 border-b">{app.name}</td>
                  <td className="py-2 px-4 border-b">{app.email}</td>
                  <td className="py-2 px-4 border-b">{app.status}</td>
                  <td className="py-2 px-4 border-b">{formatDate(app.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
