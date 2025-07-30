// src/pages/ApplicationHistory.jsx

import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { applicationService } from "../api_service/applications";

export default function ApplicationHistory() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await applicationService.getAllApplications();
        if (Array.isArray(response)) {
          setApplications(response);
        } else {
          setApplications([]);
          console.warn("API response for applications was not an array or was null/undefined:", response);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Your Application History
        </h1>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            You haven't applied for any jobs yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {applications.map((app) => (
              <li
                key={app.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm bg-white dark:bg-gray-800"
              >
                <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
                  {app.jobTitle}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Company:</strong> {app.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Status:</strong>{" "}
                  <span className="font-medium">{app.status}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Applied on:{" "}
                  {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
}