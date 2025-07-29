import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import JobCard from "../components/features/jobs/JobCard";
import { Search } from "lucide-react";
import { jobService } from "../api_service";

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobService.getAllJobs();
        const normalizedJobs = (res || []).map((job) => ({
          ...job,
          id: job.id || job._id,
        }));
        setJobs(normalizedJobs);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-10 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Job Board</h1>
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
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
