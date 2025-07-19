import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedJobs = () => {
  const navigate = useNavigate();
  
  const featuredJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      logo: "https://logo.clearbit.com/techcorp.com",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      posted: "2 days ago",
      description: "We're looking for a skilled Frontend Developer with React experience to join our growing team."
    },
    {
      id: 2,
      title: "UX Designer",
      company: "DesignHub",
      logo: "https://logo.clearbit.com/designhub.com",
      location: "Remote",
      type: "Contract",
      salary: "$70 - $90/hr",
      posted: "1 week ago",
      description: "Join our design team to create beautiful, user-friendly interfaces for our clients."
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems",
      logo: "https://logo.clearbit.com/datasystems.com",
      location: "New York, NY",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "3 days ago",
      description: "Looking for a backend engineer with Python and Django experience to help scale our platform."
    }
  ];

  return (
    <section className="featured-jobs-section">
      <div className="section-header">
        <h2 className="section-title">Featured Jobs</h2>
        <button 
          className="view-all-button"
          onClick={() => navigate('/jobs')}
        >
          View All Jobs
        </button>
      </div>
      <div className="jobs-grid">
        {featuredJobs.map((job) => (
          <div 
            className="job-card"
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <div className="job-header">
              <img 
                src={job.logo} 
                alt={job.company} 
                className="company-logo"
              />
              <div className="job-info">
                <h3 className="job-title">{job.title}</h3>
                <p className="company-name">{job.company}</p>
                <div className="job-meta">
                  <span className="meta-item">{job.location}</span>
                  <span className="meta-item">{job.type}</span>
                  <span className="meta-item">{job.salary}</span>
                </div>
              </div>
            </div>
            <p className="job-description">{job.description}</p>
            <button 
              className="apply-button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${job.id}/apply`);
              }}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;