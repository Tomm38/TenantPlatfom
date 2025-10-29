import React from 'react';
import { Shield, Lock, CheckCircle, Globe } from 'lucide-react';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: Shield,
      label: 'SSL Secured',
      status: 'active'
    },
    {
      icon: Lock,
      label: 'PCI Compliant',
      status: 'active'
    },
    {
      icon: CheckCircle,
      label: 'Verified',
      status: 'active'
    }
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Security Badges */}
      <div className="hidden sm:flex items-center space-x-2">
        {securityFeatures?.map((feature, index) => {
          const IconComponent = feature?.icon;
          return (
            <div key={index} className="flex items-center space-x-1 text-green-600">
              <IconComponent className="w-4 h-4" />
              <span className="text-xs font-medium">{feature?.label}</span>
            </div>
          );
        })}
      </div>
      {/* SSL Certificate Indicator */}
      <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1">
        <Globe className="w-4 h-4 text-green-600" />
        <div className="text-xs">
          <div className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-green-600" />
            <span className="font-medium text-green-800">Secure</span>
          </div>
          <span className="text-green-600">256-bit SSL</span>
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center space-x-1 text-gray-600">
        <Shield className="w-5 h-5 text-blue-600" />
        <div className="text-xs">
          <div className="font-medium text-gray-900">Trusted</div>
          <div className="text-gray-500">Payment</div>
        </div>
      </div>
    </div>
  );
};

export default SecurityIndicators;