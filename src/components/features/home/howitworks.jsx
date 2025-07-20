import React from 'react';
import { Card } from '../../ui/Card';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Profile",
      description: "Sign up and create your profile as a job seeker or employer in just a few minutes."
    },
    {
      number: 2,
      title: "Find or Post Jobs",
      description: "Job seekers can search for opportunities, while employers can post job listings."
    },
    {
      number: 3,
      title: "Connect & Apply",
      description: "Apply to jobs with one click or review applications if you're an employer."
    },
    {
      number: 4,
      title: "Get Hired or Hire",
      description: "Job seekers land their dream jobs and employers find the perfect candidates."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
      <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-2xl)] text-center">
        How RecruitConnect Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-xl)]">
        {steps.map((step) => (
          <Card key={step.number} className="p-[var(--spacing-xl)] flex flex-col items-center text-center">
            <div className="text-[var(--text-3xl)] font-bold text-[var(--green-primary)] mb-[var(--spacing-md)]">{step.number}</div>
            <h3 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)] mb-[var(--spacing-xs)]">{step.title}</h3>
            <p className="text-[var(--text-base)] text-[var(--text-muted)]">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
