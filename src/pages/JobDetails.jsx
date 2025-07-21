import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchJobDetails } from '../api/jobs.js';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useSelector(state => state.auth);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const jobData = await fetchJobDetails(id);
        setJob(jobData);
      } catch (err) {
        setError(err.message);
      }
    };

    getJobDetails();
  }, [id]);

  const handleApply = () => {
    if (!user) {
      navigate('/signin', { state: { from: `/jobs/${id}` } });
      return;
    }
    setIsApplying(true);
    navigate(`/jobs/${id}/apply`);
  };

  if (error) return <div className="text-center text-red-500 p-[var(--spacing-lg)]">Error: {error}</div>;
  if (!job) return <div className="text-center text-[var(--text-muted)] p-[var(--spacing-lg)]">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-[var(--spacing-lg)] bg-[var(--bg-secondary)] rounded-[var(--radius-lg)] shadow-sm">
      <div className="flex flex-col items-start mb-[var(--spacing-xl)]">
        <Button 
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-[var(--spacing-md)] text-[var(--green-primary)] hover:text-[var(--green-dark)]"
        >
          &larr; Back to Job Board
        </Button>
        <h1 className="text-[var(--text-3xl)] font-bold text-[var(--text-primary)]">{job.title}</h1>
        <div className="flex items-center mt-[var(--spacing-md)]">
          <Avatar 
            src={job.company.logo || '/default-company-logo.png'} 
            alt={job.company.name}
            size="sm"
            className="mr-[var(--spacing-md)]"
          />
          <div>
            <h2 className="text-[var(--text-lg)] font-semibold text-[var(--text-secondary)]">{job.company.name}</h2>
            <p className="text-[var(--text-sm)] text-[var(--text-muted)]">{job.location}</p>
          </div>
        </div>
      </div>

      <Card className="mb-[var(--spacing-xl)]">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-[var(--spacing-md)]">
          <div className="flex flex-col">
            <span className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">Salary:</span>
            <span className="text-[var(--text-base)] text-[var(--text-primary)]">{job.salary || 'Not specified'}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">Type:</span>
            <span className="text-[var(--text-base)] text-[var(--text-primary)]">{job.type}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">Posted:</span>
            <span className="text-[var(--text-base)] text-[var(--text-primary)]">{new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-[var(--spacing-xl)]">
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-[var(--text-base)] text-[var(--text-primary)]">{job.description}</p>
        </CardContent>
      </Card>

      <Card className="mb-[var(--spacing-xl)]">
        <CardHeader>
          <CardTitle>Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-[var(--spacing-xs)] text-[var(--text-base)] text-[var(--text-primary)]">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-[var(--spacing-xl)]">
        <CardHeader>
          <CardTitle>Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-[var(--spacing-xs)] text-[var(--text-base)] text-[var(--text-primary)]">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleApply}
          disabled={isApplying}
          className="w-full md:w-auto"
        >
          {isApplying ? 'Processing...' : 'Apply Now'}
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
