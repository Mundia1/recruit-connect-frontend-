import React, { useState, useEffect } from "react";
import api from "../api";
import { Search } from "lucide-react";
import JobCard from "../components/features/jobs/JobCard";
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { Card } from '../components/ui/Card';

const PAGE_SIZE = 6;

export default function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchJobsData = async () => {
      try {
        setLoading(true);
        const response = await api.jobs.getAll();
        setJobs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsData();
  }, []);

  const featuredJobs = jobs.slice(0, 3);

  // Helper to get job type from title
  const getJobType = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes("frontend")) return "frontend";
    if (lower.includes("backend")) return "backend";
    if (lower.includes("designer") || lower.includes("ui/ux")) return "designer";
    if (lower.includes("data")) return "data";
    return "";
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter
      ? job.location.toLowerCase().includes(locationFilter)
      : true;
    const matchesType = jobTypeFilter
      ? getJobType(job.title) === jobTypeFilter
      : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  const jobsToShow = filteredJobs.slice(0, visibleCount);

  return (
    <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
      <h1 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)]">
        Explore Jobs
      </h1>

      {/* Filters */}
      <Card className="p-[var(--spacing-lg)] mb-[var(--spacing-2xl)] flex flex-col sm:flex-row gap-[var(--spacing-md)] items-center sticky top-0 z-10">
        {/* Search Input */}
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>

        {/* Location Filter */}
        <Select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full sm:w-1/4"
        >
          <option value="">All Locations</option>
          <option value="kenya">Kenya</option>
          <option value="tanzania">Tanzania</option>
          <option value="rwanda">Rwanda</option>
          <option value="uganda">Uganda</option>
          <option value="nigeria">Nigeria</option>
        </Select>

        {/* Job Type Filter */}
        <Select
          value={jobTypeFilter}
          onChange={(e) => setJobTypeFilter(e.target.value)}
          className="w-full sm:w-1/4"
        >
          <option value="">Job Type</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="designer">Designer</option>
          <option value="data">Data</option>
        </Select>
      </Card>

      {/* Jobs Grid */}
      {jobsToShow.length > 0 ? (
        <>
          <div className="grid gap-[var(--spacing-xl)] sm:grid-cols-2 lg:grid-cols-3">
            {jobsToShow.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          {visibleCount < filteredJobs.length && (
            <div className="flex justify-center mt-[var(--spacing-2xl)]">
              <Button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-[var(--text-muted)] mt-[var(--spacing-xl)] text-center">No jobs match your search.</p>
      )}
    </section>
  );
}