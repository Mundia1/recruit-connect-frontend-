import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from '../../ui';

export default function ApplicationSuccess() {
  const { id } = useParams();

  return (
    <Card className="max-w-2xl mx-auto p-6 text-center">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <h1 className="text-xl font-bold mb-2">Application Submitted Successfully!</h1>
        <p>Thank you for applying. We'll review your application and get back to you soon.</p>
      </div>
      <div className="flex gap-3 justify-center">
        <Button as={Link} to={`/jobs/${id}`} variant="primary">
          Back to Job
        </Button>
        <Button as={Link} to="/jobs" variant="secondary">
          Browse More Jobs
        </Button>
      </div>
    </Card>
  );
}