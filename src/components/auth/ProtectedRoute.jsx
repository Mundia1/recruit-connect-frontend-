import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const location = useLocation();

  // If route is admin, check for admin role
  if (location.pathname.startsWith('/admin')) {
    if (!token || user.role !== 'admin') {
      return <Navigate to="/signin" replace />;
    }
  } else {
    if (!token) {
      return <Navigate to="/signin" replace />;
    }
  }
  return <Outlet />;
}
