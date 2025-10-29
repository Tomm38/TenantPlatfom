import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvitationPreview = ({ invitationData, selectedUnit, onClose }) => {
  if (!invitationData || !selectedUnit) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const mockSignUpUrl = `https://tenantplatform.com/tenant-signup?invitation=${btoa(invitationData?.tenantEmail)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto elevation-3">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Email Preview</h3>
              <p className="text-sm text-muted-foreground">Tenant invitation email</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Email Content */}
        <div className="p-6">
          {/* Email Header */}
          <div className="bg-primary text-primary-foreground p-6 rounded-t-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={16} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold">TenantPlatform</span>
            </div>
            <h1 className="text-2xl font-bold mb-2">You're Invited!</h1>
            <p className="text-primary-foreground/90">
              Welcome to your new rental home
            </p>
          </div>

          {/* Email Body */}
          <div className="bg-white border border-border rounded-b-lg p-6 text-gray-900">
            <div className="mb-6">
              <p className="text-lg mb-4">Hello,</p>
              <div className="whitespace-pre-line text-gray-700 leading-relaxed mb-6">
                {invitationData?.welcomeMessage}
              </div>
            </div>

            {/* Unit Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="Home" size={20} className="mr-2 text-primary" />
                Your New Unit Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Building:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedUnit?.buildingName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Unit Number:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedUnit?.unitNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Monthly Rent:</span>
                  <span className="ml-2 font-semibold text-gray-900">
                    NAD {selectedUnit?.rentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Security Deposit:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    NAD {selectedUnit?.depositAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Move-in Date:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {formatDate(invitationData?.moveInDate)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedUnit?.address}</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mb-6">
              <div className="bg-primary text-primary-foreground inline-block px-8 py-3 rounded-lg font-semibold text-lg mb-4">
                Complete Your Registration
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Click the button above or use this link:
              </p>
              <p className="text-xs text-gray-500 break-all bg-gray-100 p-2 rounded border">
                {mockSignUpUrl}
              </p>
            </div>

            {/* Next Steps */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-900 mb-3">What happens next?</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Complete your registration using the link above</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Review and sign your lease agreement online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Set up your payment method for rent collection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Access your tenant portal for ongoing management</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
              <p className="text-sm text-gray-700 mb-2">
                If you have any questions or need assistance, please don't hesitate to contact us:
              </p>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={14} />
                  <span>support@tenantplatform.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} />
                  <span>+264 61 123 4567</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 pt-6 mt-6 text-center">
              <p className="text-xs text-gray-500">
                This invitation was sent to {invitationData?.tenantEmail}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                © {new Date()?.getFullYear()} TenantPlatform. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close Preview
          </Button>
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
          >
            Send This Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvitationPreview;