import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encryption',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor authentication keeps your account safe'
    },
    {
      icon: 'CreditCard',
      title: 'Stripe Integration',
      description: 'PCI-compliant payment processing you can trust'
    },
    {
      icon: 'Eye',
      title: 'Privacy Protected',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="bg-muted/30 border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="ShieldCheck" size={20} className="text-success" />
        <h3 className="text-lg font-semibold text-foreground">Your Security is Our Priority</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name={feature?.icon} size={16} className="text-success" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="MapPin" size={12} />
            <span>Namibian Business Registration</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Globe" size={12} />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;