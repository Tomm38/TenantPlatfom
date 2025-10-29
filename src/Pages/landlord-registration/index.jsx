import React, { useState } from 'react';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';
import EmailVerificationModal from './components/EmailVerificationModal';
import Icon from '../../components/AppIcon';


const LandlordRegistration = () => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleRegistrationSuccess = (email) => {
    setRegisteredEmail(email);
    setShowVerificationModal(true);
  };

  const handleResendEmail = () => {
    // Simulate resending verification email
    console.log('Resending verification email to:', registeredEmail);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <RegistrationHeader />
          
          {/* Main Registration Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Registration Form - Takes up 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RegistrationForm onSuccess={handleRegistrationSuccess} />
            </div>
            
            {/* Security Features Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SecurityFeatures />
              
              {/* Additional Trust Signals */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="Users" size={16} className="mr-2 text-primary" />
                  Trusted by Property Managers
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Active Landlords</span>
                    <span className="font-medium text-foreground">500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Properties Managed</span>
                    <span className="font-medium text-foreground">2,500+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Transactions</span>
                    <span className="font-medium text-foreground">NAD 2.5M+</span>
                  </div>
                </div>
              </div>
              
              {/* Support Information */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                  <Icon name="HelpCircle" size={16} className="mr-2 text-primary" />
                  Need Help?
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-muted-foreground">
                    Our support team is here to help you get started with TenantPlatform.
                  </p>
                  <div className="flex items-center space-x-2 text-primary">
                    <Icon name="Mail" size={14} />
                    <span>support@tenantplatform.na</span>
                  </div>
                  <div className="flex items-center space-x-2 text-primary">
                    <Icon name="Phone" size={14} />
                    <span>+264 61 123 4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        email={registeredEmail}
        onClose={() => setShowVerificationModal(false)}
        onResendEmail={handleResendEmail}
      />
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={16} color="white" />
                </div>
                <span className="font-semibold text-foreground">TenantPlatform</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simplifying property management across Namibia with modern technology and secure payment solutions.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-3">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Property Management</li>
                <li>Tenant Portal</li>
                <li>Payment Processing</li>
                <li>Lease Management</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>System Status</li>
                <li>API Documentation</li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-foreground mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cookie Policy</li>
                <li>Compliance</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} TenantPlatform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="Shield" size={12} />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Icon name="CreditCard" size={12} />
                <span>Stripe Powered</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandlordRegistration;