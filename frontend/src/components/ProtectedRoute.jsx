import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  if (!token) {
    // If no token, always redirect to authentication page
    return <Navigate to="/authentication" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user is authenticated but role is not allowed for this specific route,
    // redirect to their default dashboard based on their role.
    if (userRole === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === 'parent') {
      return <Navigate to="/parent-dashboard" replace />;
    } else if (userRole === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    }
    // Fallback for any other roles or unexpected scenarios
    return <Navigate to="/authentication" replace />;
  }

  // If authenticated and role is allowed (or no specific roles required), render the outlet
  return <Outlet />;
};

export default ProtectedRoute;
