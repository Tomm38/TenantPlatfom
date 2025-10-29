import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlatformLogo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="text-center mb-8">
      <Button
        variant="ghost"
        onClick={handleLogoClick}
        className="flex items-center space-x-3 mx-auto p-2 hover:bg-transparent"
      >
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center elevation-2">
          <Icon name="Shield" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">TenantPlatform</h1>
          <p className="text-sm text-muted-foreground">Administrator Portal</p>
        </div>
      </Button>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Admin Sign In
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Access system management functions and oversee platform operations
        </p>
      </div>
    </div>
  );
};

export default PlatformLogo;