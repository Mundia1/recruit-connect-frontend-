import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../../api/auth';

const ProtectedRoute = () => {
  const user = getCurrentUser();

  if (!user) {

    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;