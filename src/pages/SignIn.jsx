import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/admin-dashboard');
    } catch (error) {
      console.error('Failed to sign in', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome back</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('email')}
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-md bg-[var(--green-light-alt)] text-gray-700 focus:outline-none ${errors.email ? 'border border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-md bg-[var(--green-light-alt)] text-gray-700 focus:outline-none ${errors.password ? 'border border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          <Link to="#" className="block text-sm text-right text-gray-600">Forgot password?</Link>
          <button type="submit" className="w-full py-3 text-white font-semibold bg-[var(--green-primary)] rounded-md hover:bg-[var(--green-dark)]">
            Sign In
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="text-[var(--green-primary)] font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}