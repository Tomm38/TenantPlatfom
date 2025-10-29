import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, canAccessRoute, getCurrentUserRole, redirectToDashboard } from '../utils/auth';

/**
 * Protected Route Component
 * Ensures only authenticated users with proper role can access routes
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const navigate = useNavigate();
  const userRole = getCurrentUserRole();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      // Redirect to login based on intended route
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('admin')) {
        navigate('/admin-login');
      } else if (currentPath.includes('tenant')) {
        navigate('/tenant-login');
      } else {
        navigate('/landlord-registration');
      }
      return;
    }

    // Check if user has required role
    if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
      // Redirect to appropriate dashboard
      redirectToDashboard(navigate);
      return;
    }

    // Check if user can access current route
    if (!canAccessRoute(window.location.pathname, userRole)) {
      redirectToDashboard(navigate);
    }
  }, [navigate, userRole, requiredRole]);

  // If not authenticated, don't render children
  if (!isAuthenticated()) {
    return null;
  }

  // Check role-based access
  if (requiredRole && userRole !== requiredRole && userRole !== 'admin') {
    return null;
  }

  return children;
};

export default ProtectedRoute;

