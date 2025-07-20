import React from 'react';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-[var(--bg-secondary)] text-center py-[var(--spacing-4xl)] px-[var(--spacing-xl)]">
      <h1 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-md)]">
        Find Your Dream Job or the Perfect Candidate
      </h1>
      <p className="text-[var(--text-base)] text-[var(--text-muted)] mb-[var(--spacing-3xl)] max-w-3xl mx-auto">
        RecruitConnect is a comprehensive platform designed to streamline the recruitment process for both job seekers and employers.
      </p>
      <div className="space-x-[var(--spacing-md)]">
        <Button asChild>
          <Link to="/jobs">Browse Jobs</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/post-job">Post a Job</Link>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
