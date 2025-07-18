import React from 'react';

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
    <section className="how-it-works-section">
      <h2 className="section-title">How RecruitConnect Works</h2>
      <div className="steps-container">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-number">{step.number}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;