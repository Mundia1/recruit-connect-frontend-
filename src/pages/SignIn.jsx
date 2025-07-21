import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.auth.login(data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-secondary)]">
      <div className="w-full max-w-sm p-8 space-y-6 bg-[var(--bg-primary)] rounded-[var(--radius-lg)] shadow-md">
        <h2 className="text-2xl font-bold text-center text-[var(--text-primary)]">Sign in to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register('email')}
              placeholder="Email"
              type="email"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Input
              type="password"
              {...register('password')}
              placeholder="Password"
              className={errors.password ? 'border-red-500' : ''}
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
        <p className="text-sm text-center text-[var(--text-muted)]">
          Don't have an account? <Link to="/signup" className="font-semibold text-[var(--green-primary)] hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
