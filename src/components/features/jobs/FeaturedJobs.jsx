import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jobService } from "../../../api_service/jobs";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs"); // ✅ Backend endpoint
        setJobs(res.data || []); // ✅ Assuming response is an array
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Featured Jobs
      </h2>

      {/* Job Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
        {jobs.slice(0, 6).map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>

            {/* Apply Now Button with Dynamic Job ID */}
            <Link
              to={`/apply/${job.id}`}
              aria-label={`Apply for ${job.title}`}
              className="mt-4 inline-block bg-[#177245] text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Apply Now
            </Link>
          </div>
        ))}
      </div>

      {/* View All Jobs */}
      <div className="mt-8 text-center">
        <Link
          to="/jobs"
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          View All Jobs
        </Link>
      </div>
    </section>
  );
}
