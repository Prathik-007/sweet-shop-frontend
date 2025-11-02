import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If user is NOT authenticated, redirect them to the root/login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />; 
  }

  // If user IS authenticated, render the children component (e.g., DashboardPage)
  return children;
};

export default ProtectedRoute;