import React, { useEffect, useState } from "react";
import { getUserProfile, getUserApplications } from "../api/profile";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [profileData, applicationsData] = await Promise.all([
          getUserProfile(),
          getUserApplications(),
        ]);
        setProfile(profileData);
        setApplications(applicationsData);
      } catch (err) {
        setError("Failed to load profile or applications.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-gray-600 mt-6 text-center">Loading profile...</p>;
  if (error) return <p className="text-red-600 mt-6 text-center">{error}</p>;
  if (!profile) return <p className="text-gray-600 mt-6 text-center">Profile not found.</p>;

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-4">{profile.name}</h1>
      <p className="mb-2">Email: {profile.email}</p>
      {/* Add more profile fields as needed */}
      <h2 className="text-xl font-semibold mt-8 mb-2">My Applications</h2>
      {applications.length > 0 ? (
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app.id} className="border rounded p-3">
              <div>Job: {app.jobTitle}</div>
              <div>Status: {app.status}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </section>
  );
}
