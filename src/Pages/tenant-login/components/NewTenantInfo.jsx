import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NewTenantInfo = () => {
  const navigate = useNavigate();

  const handleContactLandlord = () => {
    // In a real app, this might open a contact form or redirect to support
    alert('Please contact your landlord for an invitation link to create your account.');
  };

  const handleViewOtherLogins = () => {
    navigate('/landlord-registration');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="UserPlus" size={24} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">New Tenant?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Tenant accounts are created through invitation only. Your landlord will send you a secure invitation link to set up your account.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-muted/30 rounded-md p-4">
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
            <Icon name="Mail" size={16} className="mr-2 text-primary" />
            How to Get Started
          </h4>
          <ol className="text-xs text-muted-foreground space-y-2">
            <li className="flex items-start">
              <span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">1</span>
              <span>Your landlord sends you an invitation email</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">2</span>
              <span>Click the secure link to create your account</span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">3</span>
              <span>Access your lease details and make payments</span>
            </li>
          </ol>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleContactLandlord}
          iconName="MessageCircle"
          iconPosition="left"
          fullWidth
        >
          Contact Your Landlord
        </Button>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">Are you a property owner?</p>
          <Button
            variant="link"
            size="sm"
            onClick={handleViewOtherLogins}
          >
            Landlord Registration →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTenantInfo;