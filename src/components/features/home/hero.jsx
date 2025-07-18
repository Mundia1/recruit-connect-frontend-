import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <h1 className="hero-title">Find Your Dream Job or Top Talent</h1>
      <p className="hero-subtitle">
        RecruitConnect bridges the gap between talented professionals and innovative companies. 
        Whether you're looking for your next career move or your next star employee, we've got you covered.
      </p>
      <div className="hero-button-group">
        <button 
          className="hero-button primary"
          onClick={() => navigate('/register?role=seeker')}
        >
          I'm a Job Seeker
        </button>
        <button 
          className="hero-button secondary"
          onClick={() => navigate('/register?role=employer')}
        >
          I'm an Employer
        </button>
      </div>
    </section>
  );
};

export default Hero;