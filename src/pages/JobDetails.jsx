import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../api/jobs";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return <p className="text-gray-600 mt-6 text-center">Loading job details...</p>;
  }
  if (error) {
    return <p className="text-red-600 mt-6 text-center">{error}</p>;
  }
  if (!job) {
    return <p className="text-gray-600 mt-6 text-center">Job not found.</p>;
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-lg text-gray-700 mb-2">{job.company}</p>
      <p className="text-gray-500 mb-4">{job.location}</p>
      {/* Add more job details here as needed */}
      <button className="mt-6 bg-[#177245] text-white px-5 py-2 rounded-full hover:bg-green-700 transition">
        Apply Now
      </button>
    </section>
  );
}
