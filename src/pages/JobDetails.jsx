import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobDetails } from '../../api/jobsApi';
import { setLoading } from '../../features/jobs/jobsSlice';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useSelector(state => state.auth);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        dispatch(setLoading(true));
        const jobData = await fetchJobDetails(id);
        setJob(jobData);
      } catch (err) {
        setError(err.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    getJobDetails();
  }, [id, dispatch]);

  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    setIsApplying(true);
    navigate(`/jobs/${id}/apply`);
  };

  if (error) return <div className="error-message">Error: {error}</div>;
  if (!job) return <div className="loading">Loading...</div>;

  return (
    <div className="job-details-container">
      <div className="job-details-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          &larr; Back to Job Board
        </button>
        <h1 className="job-title">{job.title}</h1>
        <div className="company-info">
          <img 
            src={job.company.logo || '/default-company-logo.png'} 
            alt={job.company.name} 
            className="company-logo"
          />
          <div>
            <h2 className="company-name">{job.company.name}</h2>
            <p className="job-location">{job.location}</p>
          </div>
        </div>
      </div>

      <div className="job-details-content">
        <div className="job-meta">
          <div className="meta-item">
            <span className="meta-label">Salary:</span>
            <span className="meta-value">{job.salary || 'Not specified'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Type:</span>
            <span className="meta-value">{job.type}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Posted:</span>
            <span className="meta-value">{new Date(job.postedAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="job-section">
          <h3 className="section-title">Job Description</h3>
          <p className="job-description">{job.description}</p>
        </div>

        <div className="job-section">
          <h3 className="section-title">Requirements</h3>
          <ul className="requirements-list">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="job-section">
          <h3 className="section-title">Benefits</h3>
          <ul className="benefits-list">
            {job.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="apply-section">
          <button 
            className="apply-button"
            onClick={handleApply}
            disabled={isApplying}
          >
            {isApplying ? 'Processing...' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;