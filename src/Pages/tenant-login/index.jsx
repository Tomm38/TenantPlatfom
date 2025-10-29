import React from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import NewTenantInfo from './components/NewTenantInfo';
import Icon from '../../components/AppIcon';


const TenantLogin = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <LoginHeader />

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Login Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card border border-border rounded-lg p-8 elevation-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Sign In to Your Account</h3>
                    <p className="text-sm text-muted-foreground">
                      Enter your credentials to access your tenant portal
                    </p>
                  </div>

                  <LoginForm />

                  {/* Demo Credentials Info */}
                  <div className="mt-6 p-4 bg-muted/30 rounded-md border border-border">
                    <div className="flex items-start space-x-2">
                      <div className="p-1 bg-primary/10 rounded-full flex-shrink-0">
                        <Icon name="Info" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">Demo Credentials</p>
                        <p className="text-xs text-muted-foreground">
                          Email: <span className="font-mono">tenant@example.com</span><br />
                          Password: <span className="font-mono">tenant123</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6">
                  <SecurityBadges />
                </div>
              </div>

              {/* Right Column - New Tenant Info */}
              <div className="order-1 lg:order-2">
                <NewTenantInfo />

                {/* Additional Features */}
                <div className="mt-6 bg-card border border-border rounded-lg p-6 elevation-1">
                  <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center">
                    <Icon name="Sparkles" size={16} className="mr-2 text-accent" />
                    What You Can Do
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-success/10 rounded-full flex-shrink-0">
                        <Icon name="FileText" size={14} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">View Lease Details</p>
                        <p className="text-xs text-muted-foreground">Access your complete lease agreement and terms</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-primary/10 rounded-full flex-shrink-0">
                        <Icon name="CreditCard" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Pay Rent Online</p>
                        <p className="text-xs text-muted-foreground">Secure payments with automatic receipts</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-warning/10 rounded-full flex-shrink-0">
                        <Icon name="Bell" size={14} className="text-warning" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Payment Reminders</p>
                        <p className="text-xs text-muted-foreground">Never miss a payment with email notifications</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-accent/10 rounded-full flex-shrink-0">
                        <Icon name="History" size={14} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Payment History</p>
                        <p className="text-xs text-muted-foreground">Track all your payments and download receipts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
                <span>© {new Date()?.getFullYear()} TenantPlatform</span>
                <span>•</span>
                <span>Secure Tenant Portal</span>
                <span>•</span>
                <span>Namibia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLogin;