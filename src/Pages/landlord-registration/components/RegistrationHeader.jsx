import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const RegistrationHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 mb-8">
      {/* Logo */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center elevation-2">
            <Icon name="Building2" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">TenantPlatform</h1>
            <p className="text-sm text-muted-foreground">Property Management Made Simple</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Join TenantPlatform</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Start managing your rental properties with ease. Create your landlord account and streamline your property management today.
        </p>
      </div>

      {/* Benefits List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={20} className="text-success" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Tenant Management</h3>
            <p className="text-sm text-muted-foreground">Invite and manage tenants easily</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="CreditCard" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Online Payments</h3>
            <p className="text-sm text-muted-foreground">Secure rent collection via Stripe</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
          <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-accent" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Auto Leases</h3>
            <p className="text-sm text-muted-foreground">Generate leases automatically</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin-login')}
          iconName="Shield"
          iconPosition="left"
        >
          Admin Login
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/tenant-login')}
          iconName="User"
          iconPosition="left"
        >
          Tenant Login
        </Button>
      </div>
    </div>
  );
};

export default RegistrationHeader;