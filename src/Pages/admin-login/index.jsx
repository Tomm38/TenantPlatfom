import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlatformLogo from './components/PlatformLogo';
import LoginForm from './components/LoginForm';
import NavigationLinks from './components/NavigationLinks';
import SecurityIndicators from './components/SecurityIndicators';

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = localStorage.getItem('adminSession');
    const userRole = localStorage.getItem('userRole');
    
    if (adminSession && userRole === 'admin') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Login Card */}
          <div className="bg-card border border-border rounded-xl p-8 elevation-2">
            {/* Platform Logo & Branding */}
            <PlatformLogo />
            
            {/* Login Form */}
            <LoginForm />
            
            {/* Navigation Links */}
            <NavigationLinks />
            
            {/* Security Indicators */}
            <SecurityIndicators />
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AdminLogin;