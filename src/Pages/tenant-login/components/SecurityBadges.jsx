import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Payments',
      description: 'Powered by Stripe for safe online transactions'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Registered and compliant with Namibian regulations'
    }
  ];

  return (
    <div className="bg-muted/30 rounded-lg p-6 border border-border">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="text-sm font-semibold text-foreground">Secure & Trusted</h3>
      </div>
      <div className="space-y-3">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="p-1.5 bg-success/10 rounded-full flex-shrink-0">
              <Icon name={feature?.icon} size={14} className="text-success" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Stripe</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">SSL Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;