import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const LeaseOverview = ({ leaseData, tenantData, onContactLandlord }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-NA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = () => {
    const today = new Date();
    const leaseEnd = new Date(leaseData?.leaseEndDate);
    const diffTime = leaseEnd - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = calculateDaysRemaining();
  const isLeaseExpiringSoon = daysRemaining <= 90 && daysRemaining > 0;

  return (
    <div className="space-y-6">
      {/* Lease Status Alert */}
      {isLeaseExpiringSoon && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning mb-1">Lease Expiring Soon</h4>
              <p className="text-sm text-foreground">
                Your lease expires in {daysRemaining} days. Contact your landlord to discuss renewal options.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Property Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Property Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="MapPin" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Property Address</p>
                <p className="text-muted-foreground">{leaseData?.propertyAddress}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Building" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Building</p>
                <p className="text-muted-foreground">{leaseData?.buildingName}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Home" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Unit Number</p>
                <p className="text-muted-foreground">{leaseData?.unitNumber}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Calendar" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Lease Term</p>
                <p className="text-muted-foreground">
                  {formatDate(leaseData?.leaseStartDate)} - {formatDate(leaseData?.leaseEndDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="Clock" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Days Remaining</p>
                <p className={`${isLeaseExpiringSoon ? 'text-warning' : 'text-muted-foreground'}`}>
                  {daysRemaining > 0 ? `${daysRemaining} days` : 'Expired'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Icon name="DollarSign" size={20} className="text-primary mt-1" />
              <div>
                <p className="font-medium text-foreground">Monthly Rent</p>
                <p className="text-muted-foreground font-semibold">
                  NAD {leaseData?.monthlyRent?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Financial Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Shield" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Security Deposit</p>
                <p className="text-lg font-semibold text-foreground">
                  NAD {leaseData?.securityDeposit?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="CreditCard" size={20} className="text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-lg font-semibold text-success">
                  NAD {leaseData?.currentBalance?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Next Payment Due</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatDate(leaseData?.nextPaymentDue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Landlord Contact Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Landlord Contact</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" size={20} className="text-primary" />
              <div>
                <p className="font-medium text-foreground">{leaseData?.landlordContact?.name}</p>
                <p className="text-sm text-muted-foreground">Property Management</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-foreground">{leaseData?.landlordContact?.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{leaseData?.landlordContact?.email}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Mail"
              iconPosition="left"
              onClick={onContactLandlord}
              className="flex-1"
            >
              Send Email
            </Button>
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
              onClick={() => window.location.href = `tel:${leaseData?.landlordContact?.phone}`}
              className="flex-1"
            >
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Lease Document */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Lease Agreement</h3>
        
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <p className="font-medium text-foreground">Lease Agreement Document</p>
              <p className="text-sm text-muted-foreground">
                Signed on {formatDate(leaseData?.leaseStartDate)}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={() => window.open(leaseData?.leaseDocument, '_blank')}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeaseOverview;