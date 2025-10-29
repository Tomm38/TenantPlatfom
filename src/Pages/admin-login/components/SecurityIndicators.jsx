import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      text: 'SSL Encrypted'
    },
    {
      icon: 'Lock',
      text: 'Secure Login'
    },
    {
      icon: 'CheckCircle',
      text: 'Verified Platform'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-muted-foreground">
            <Icon 
              name={feature?.icon} 
              size={16} 
              className="text-success" 
            />
            <span className="text-sm font-medium">{feature?.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} TenantPlatform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;