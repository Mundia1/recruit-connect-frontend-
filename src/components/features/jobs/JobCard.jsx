import React from "react";
import Button from '../../ui/Button';
import { Card } from '../../ui/Card';

export default function JobCard({ job }) {
  return (
    <Card className="rounded-[var(--radius-lg)] shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between p-[var(--spacing-xl)]">
      <div>
        <h3 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">{job.title}</h3>
        <p className="text-[var(--text-base)] text-[var(--text-secondary)] mt-[var(--spacing-xs)]">{job.company}</p>
        <p className="text-[var(--text-sm)] text-[var(--text-muted)] mt-[var(--spacing-xs)]">{job.location}</p>
      </div>
      <Button
        className="mt-[var(--spacing-xl)] w-full"
        aria-label={`Apply for ${job.title} at ${job.company}`}
      >
        Apply Now
      </Button>
    </Card>
  );
}