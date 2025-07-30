import React, { useEffect, useState } from "react";
import { applicationService } from "../../api_service/applications";
import { formatDate } from "../../utils/formatDate";
import { useAuthContext } from "../../context/AuthContext";

export default function ApplicationHistory() {
  const { user } = useAuthContext();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user) {
        setLoading(false);
        setError("Please sign in to view your applications.");
        return;
      }
      try {
        const response = await applicationService.getAllApplications({ userId: user.id });
        setApplications(response);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load your applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading your applications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (applications.length === 0) {
    return <div className="text-center text-gray-500 py-10">No applications found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">{app.jobTitle}</h2>
            <p className="text-gray-600">{app.company}</p>
            <p className="text-gray-500 text-sm mt-2">Applied on: {formatDate(app.appliedAt)}</p>
            <p className="mt-4 text-gray-700">{app.status || "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
