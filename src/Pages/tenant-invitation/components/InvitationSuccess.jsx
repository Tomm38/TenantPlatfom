import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvitationSuccess = ({ invitationData, onSendAnother, onClose }) => {
  const navigate = useNavigate();

  const handleViewBuildings = () => {
    navigate('/building-management');
  };

  const handleViewDashboard = () => {
    navigate('/landlord-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-lg w-full elevation-3">
        {/* Success Icon */}
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Invitation Sent Successfully!
          </h2>
          
          <p className="text-muted-foreground mb-6">
            The tenant invitation has been sent to <strong>{invitationData?.tenantEmail}</strong>
          </p>

          {/* Invitation Details */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Invitation Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit:</span>
                <span className="font-medium text-foreground">
                  {invitationData?.buildingName} - Unit {invitationData?.unitNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Move-in Date:</span>
                <span className="font-medium text-foreground">
                  {new Date(invitationData.moveInDate)?.toLocaleDateString('en-GB')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Rent:</span>
                <span className="font-medium text-foreground">
                  NAD {invitationData?.rentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-warning bg-warning/10">
                  <Icon name="Clock" size={12} className="mr-1" />
                  Pending Response
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-foreground mb-3 flex items-center">
              <Icon name="ListChecks" size={16} className="mr-2 text-primary" />
              What Happens Next?
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>The tenant will receive an email with registration instructions</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>They'll complete their profile and review the lease terms</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>You'll receive a notification when they accept the invitation</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>The lease will be automatically generated and activated</span>
              </div>
            </div>
          </div>

          {/* Reminder */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Reminder</p>
                <p className="text-xs text-muted-foreground">
                  The tenant has 7 days to respond to this invitation. You can send a reminder or resend the invitation if needed.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={onSendAnother}
              iconName="UserPlus"
              iconPosition="left"
              className="flex-1"
            >
              Send Another Invitation
            </Button>
            <Button
              variant="default"
              onClick={handleViewBuildings}
              iconName="Building2"
              iconPosition="left"
              className="flex-1"
            >
              View Buildings
            </Button>
          </div>

          <div className="flex justify-center mt-3">
            <Button
              variant="ghost"
              onClick={handleViewDashboard}
              iconName="LayoutDashboard"
              iconPosition="left"
              size="sm"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationSuccess;