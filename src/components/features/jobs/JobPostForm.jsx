import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Button from '../../ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../ui/Card';

const schema = yup.object().shape({
  title: yup.string().required('Job title is required'),
  company: yup.string().required('Company name is required'),
  location: yup.string().required('Location is required'),
  description: yup.string().min(50, 'Description must be at least 50 characters').required('Description is required'),
  salary: yup.string().nullable(),
  requirements: yup.string().nullable(),
});

const JobPostForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Here you would typically send data to your API
      console.log('Job Post Data:', data);
      alert('Job posted successfully!');
      reset(); // Clear form after successful submission
    } catch (error) {
      console.error('Failed to post job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[var(--spacing-md)]">
          <div>
            <Input
              {...register('title')}
              placeholder="Job Title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Input
              {...register('company')}
              placeholder="Company Name"
              className={errors.company ? 'border-red-500' : ''}
            />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
          </div>

          <div>
            <Input
              {...register('location')}
              placeholder="Location (e.g., Remote, New York, NY)"
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <TextArea
              {...register('description')}
              placeholder="Job Description (min 50 characters)"
              rows="6"
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Input
              {...register('salary')}
              placeholder="Salary (e.g., $80,000 - $100,000)"
            />
          </div>

          <div>
            <TextArea
              {...register('requirements')}
              placeholder="Job Requirements (optional)"
              rows="4"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostForm;
