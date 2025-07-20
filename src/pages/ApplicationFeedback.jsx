import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import Rating from '../components/ui/Rating';

const ApplicationFeedback = () => {
  const { applicationId } = useParams();
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  // Mock API call for submitting feedback
  const submitFeedback = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Submitting feedback:', data);
        resolve({ success: true, message: 'Feedback submitted successfully!' });
      }, 1000);
    });
  };

  const feedbackMutation = useMutation({
    mutationFn: submitFeedback,
    onSuccess: () => {
      toast.success('Feedback submitted successfully!');
      setRating(0);
      setFeedbackText('');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to submit feedback.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please provide a rating.');
      return;
    }
    if (feedbackText.trim() === '') {
      toast.error('Please provide some feedback text.');
      return;
    }
    feedbackMutation.mutate({ applicationId, rating, feedbackText });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--bg-secondary)] p-[var(--spacing-lg)]">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">Feedback for Application #{applicationId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-[var(--spacing-md)]">
          <form onSubmit={handleSubmit} className="space-y-[var(--spacing-md)]">
            <div>
              <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                Overall Rating
              </label>
              <Rating rating={rating} onRatingChange={setRating} />
            </div>
            <div>
              <label className="block text-[var(--text-sm)] font-medium text-[var(--text-secondary)] mb-[var(--spacing-xs)]">
                Your Feedback
              </label>
              <TextArea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts on this application..."
                rows="6"
              />
            </div>
            <Button type="submit" className="w-full" disabled={feedbackMutation.isPending}>
              {feedbackMutation.isPending ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationFeedback;
