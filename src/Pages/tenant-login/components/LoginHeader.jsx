import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Building2" size={24} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">TenantPlatform</h1>
      </div>

      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Welcome Back</h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          Sign in to access your lease information, view payment history, and make secure rent payments online.
        </p>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-center space-x-1 text-xs">
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/admin-login')}
          className="text-muted-foreground hover:text-foreground"
        >
          Admin
        </Button>
        <span className="text-muted-foreground">•</span>
        <Button
          variant="link"
          size="sm"
          onClick={() => navigate('/landlord-registration')}
          className="text-muted-foreground hover:text-foreground"
        >
          Landlord
        </Button>
        <span className="text-muted-foreground">•</span>
        <span className="text-primary font-medium">Tenant Login</span>
      </div>
    </div>
  );
};

export default LoginHeader;