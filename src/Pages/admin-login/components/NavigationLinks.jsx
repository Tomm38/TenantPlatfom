import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const NavigationLinks = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    {
      label: 'Landlord Registration',
      path: '/landlord-registration',
      icon: 'Building2',
      description: 'Register as a property owner'
    },
    {
      label: 'Tenant Login',
      path: '/tenant-login',
      icon: 'Users',
      description: 'Access tenant portal'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">
          Not an administrator?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {navigationOptions?.map((option) => (
          <Button
            key={option?.path}
            variant="outline"
            size="sm"
            onClick={() => handleNavigation(option?.path)}
            iconName={option?.icon}
            iconPosition="left"
            className="flex-col h-auto p-4 text-left"
          >
            <div className="w-full">
              <div className="font-medium text-foreground mb-1">
                {option?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {option?.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavigationLinks;