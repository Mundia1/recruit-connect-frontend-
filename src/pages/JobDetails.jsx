import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobs as jobsApi } from "../api/index";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    jobsApi
      .getById(id)
      .then((data) => setJob(data.data || data))
      .catch(() => setJob(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-2">{job.company}</p>
      <p className="text-gray-500 mb-2">{job.location}</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Description</h2>
        <p>{job.description}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Requirements</h2>
        <p>{job.requirements}</p>
      </div>
      {job.benefits && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-1">Benefits</h2>
          <p>{job.benefits}</p>
        </div>
      )}
      <button
        className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        onClick={() => navigate(`/apply/${job.id}`)}
      >
        Apply Now
      </button>
    </div>
  );
}