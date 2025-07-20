import React from "react";
import { Link } from "react-router-dom";
import { jobs } from "../../../api/jobs";
import Button from '../../ui/Button';
import { Card } from '../../ui/Card';

export default function FeaturedJobs() {
  return (
    <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
      <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)] text-center">
        Featured Jobs
      </h2>

      <div className="grid gap-[var(--spacing-xl)] sm:grid-cols-2 lg:grid-cols-3 max-h-[600px] overflow-y-auto pr-2">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="p-[var(--spacing-xl)] hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">{job.title}</h3>
            <p className="text-[var(--text-base)] text-[var(--text-secondary)]">{job.company}</p>
            <p className="text-[var(--text-sm)] text-[var(--text-muted)]">{job.location}</p>
            <Button className="mt-[var(--spacing-md)] w-full">
              Apply Now
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-[var(--spacing-2xl)] text-center">
        <Button asChild>
          <Link to="/jobs">
            View All Jobs
          </Link>
        </Button>
      </div>
    </section>
  );
}