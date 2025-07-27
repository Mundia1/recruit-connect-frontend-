// src/pages/JobBoard.jsx

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/features/jobs/JobCard";
import jobsService from "../api/jobs";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        const response = await jobsService.getJobs();
        if (isMounted) {
          const normalized = (response.data || []).map((job) => ({
            ...job,
            id: job.id || job._id,
          }));
          setJobs(normalized);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load jobs. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-10 text-center">
        <h1 className="text-4xl font-extrabold mb-3 text-gray-800">Job Board</h1>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-3 text-gray-400" size={22} />
          <input
            type="text"
            placeholder="Search for jobs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-full pl-12 pr-4 py-3 w-full"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-12">
        {loading && <div className="text-center py-10">Loading jobs...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div key={job.id}>
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <div className="text-center col-span-full">No jobs found.</div>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
