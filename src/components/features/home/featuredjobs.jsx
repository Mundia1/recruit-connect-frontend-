import React, { useEffect, useState } from "react";
import { jobService } from "../../../api_service";
import JobCard from "../jobs/JobCard";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobService.getAllJobs();
        
        // Assuming jobService.getAllJobs() returns the array directly, 
        // and normalizing id as per your sample
        const normalizedJobs = (res || []).map((job) => ({
          ...job,
          id: job.id || job._id,
        }));
        setJobs(normalizedJobs);
      } catch (err) {
        setError(err.message || "Failed to load jobs"); // Use err.message for consistency
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
        {jobs.slice(0, 6).map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="/jobs"
          className="bg-[#177245] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
        >
          View All Jobs
        </a>
      </div>
    </section>
  );
}

