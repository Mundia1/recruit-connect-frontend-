import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[var(--bg-secondary)] text-center py-[var(--spacing-4xl)] px-[var(--spacing-lg)]">
      <h1 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)] mb-[var(--spacing-md)] leading-[var(--leading-tight)]">
        Find Your Dream Job or Top Talent
      </h1>
      <p className="text-[var(--text-base)] text-[var(--text-muted)] mb-[var(--spacing-3xl)] max-w-3xl mx-auto">
        RecruitConnect bridges the gap between talented professionals and innovative companies. 
        Whether you're looking for your next career move or your next star employee, we've got you covered.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-[var(--spacing-md)]">
        <Button 
          onClick={() => navigate('/signup')}
        >
          I'm a Job Seeker
        </Button>
        <Button 
          variant="secondary"
          onClick={() => navigate('/signin')}
        >
          I'm an Admin
        </Button>
      </div>
    </section>
  );
};

export default Hero;