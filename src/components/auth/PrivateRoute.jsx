import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("accessToken"); // Assuming accessToken is the correct key
  const location = useLocation();

  return token ? children : <Navigate to="/signin" state={{ from: location }} replace />;
}