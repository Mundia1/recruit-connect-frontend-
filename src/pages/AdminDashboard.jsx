import React, { useEffect, useState } from "react";
import jobsService from "../../api/jobs";
import JobCard from "../components/JobCard";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobsService.getJobs();
        const normalizedJobs = (response.data || []).map((job) => ({
          ...job,
          id: job.id || job._id, // Handle Mongo _id or SQL id
        }));
        setJobs(normalizedJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.response?.data?.message || "Failed to load jobs. Please try again later.");
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
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse All Jobs</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default JobBoard;
