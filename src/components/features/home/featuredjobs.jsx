import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import { Card } from '../../ui/Card';
import Avatar from '../../ui/Avatar';

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
    <section className="max-w-7xl mx-auto px-[var(--spacing-lg)] py-[var(--spacing-3xl)]">
      <div className="flex justify-between items-center mb-[var(--spacing-2xl)]">
        <h2 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)]">Featured Jobs</h2>
        <Button 
          variant="outline"
          onClick={() => navigate('/jobs')}
        >
          View All Jobs
        </Button>
      </div>
      <div className="grid gap-[var(--spacing-xl)] sm:grid-cols-2 lg:grid-cols-3">
        {featuredJobs.map((job) => (
          <Card 
            className="p-[var(--spacing-xl)] hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
          >
            <div className="flex items-center mb-[var(--spacing-md)]">
              <Avatar 
                src={job.logo} 
                alt={job.company} 
                size="sm"
                className="mr-[var(--spacing-md)]"
              />
              <div className="flex flex-col">
                <h3 className="text-[var(--text-xl)] font-semibold text-[var(--text-primary)]">{job.title}</h3>
                <p className="text-[var(--text-base)] text-[var(--text-secondary)]">{job.company}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-[var(--spacing-md)] gap-y-[var(--spacing-xs)] text-[var(--text-sm)] text-[var(--text-muted)] mb-[var(--spacing-md)]">
              <span>{job.location}</span>
              <span>{job.type}</span>
              <span>{job.salary}</span>
            </div>
            <p className="text-[var(--text-base)] text-[var(--text-primary)] mb-[var(--spacing-xl)]">{job.description}</p>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${job.id}/apply`);
              }}
              className="w-full"
            >
              Apply Now
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
