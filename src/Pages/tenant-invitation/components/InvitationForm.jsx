import React, { useState } from 'react';
import { supabase } from '../../../config/supabase';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InvitationForm = ({ selectedUnit, onSendInvitation }) => {
  const [formData, setFormData] = useState({
    tenantEmail: '',
    moveInDate: '',
    welcomeMessage: `Welcome to ${selectedUnit?.buildingName || 'your new home'}!\n\nWe're excited to have you as our tenant. This invitation includes all the details about your new unit and lease terms.\n\nPlease complete your registration to access your tenant portal and review your lease agreement.\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nProperty Management Team`
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData?.tenantEmail) {
      newErrors.tenantEmail = 'Tenant email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.tenantEmail)) {
      newErrors.tenantEmail = 'Please enter a valid email address';
    }

    // Move-in date validation
    if (!formData?.moveInDate) {
      newErrors.moveInDate = 'Move-in date is required';
    } else {
      const selectedDate = new Date(formData.moveInDate);
      const today = new Date();
      today?.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.moveInDate = 'Move-in date cannot be in the past';
      }
    }

    // Welcome message validation
    if (!formData?.welcomeMessage?.trim()) {
      newErrors.welcomeMessage = 'Welcome message is required';
    } else if (formData?.welcomeMessage?.trim()?.length < 50) {
      newErrors.welcomeMessage = 'Welcome message should be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('invite-tenant', {
        body: { email: formData?.tenantEmail, unitId: selectedUnit?.id }
      });
      if (error) throw error;

      const invitationData = {
        ...formData,
        unitId: selectedUnit?.id,
        buildingName: selectedUnit?.buildingName,
        unitNumber: selectedUnit?.unitNumber,
        rentAmount: selectedUnit?.rentAmount,
        depositAmount: selectedUnit?.depositAmount,
        invitationDate: new Date()?.toISOString(),
        status: 'sent',
        token: data?.invitation?.token
      };

      onSendInvitation(invitationData);
    } catch (error) {
      console.error('Error sending invitation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow?.setDate(tomorrow?.getDate() + 1);
    return tomorrow?.toISOString()?.split('T')?.[0];
  };

  if (!selectedUnit) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="text-center py-8">
          <Icon name="UserPlus" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Invite</h3>
          <p className="text-muted-foreground">
            Select a unit to begin the tenant invitation process.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="UserPlus" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Send Tenant Invitation</h3>
          <p className="text-sm text-muted-foreground">Invite a tenant to {selectedUnit?.buildingName} - Unit {selectedUnit?.unitNumber}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tenant Email */}
        <div>
          <Input
            label="Tenant Email Address"
            type="email"
            placeholder="tenant@example.com"
            description="The tenant will receive an invitation email with sign-up instructions"
            value={formData?.tenantEmail}
            onChange={(e) => handleInputChange('tenantEmail', e?.target?.value)}
            error={errors?.tenantEmail}
            required
            className="w-full"
          />
        </div>

        {/* Move-in Date */}
        <div>
          <Input
            label="Move-in Date"
            type="date"
            description="Select the date when the tenant will move into the unit"
            value={formData?.moveInDate}
            onChange={(e) => handleInputChange('moveInDate', e?.target?.value)}
            error={errors?.moveInDate}
            min={getTomorrowDate()}
            required
            className="w-full"
          />
        </div>

        {/* Welcome Message */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Welcome Message <span className="text-error">*</span>
          </label>
          <textarea
            value={formData?.welcomeMessage}
            onChange={(e) => handleInputChange('welcomeMessage', e?.target?.value)}
            placeholder="Enter a personalized welcome message for the tenant..."
            rows={6}
            className={`w-full px-3 py-2 border rounded-md text-sm transition-smooth resize-none ${
              errors?.welcomeMessage 
                ? 'border-error focus:border-error focus:ring-error/20' :'border-border focus:border-primary focus:ring-primary/20'
            } focus:outline-none focus:ring-2`}
          />
          {errors?.welcomeMessage && (
            <p className="mt-1 text-sm text-error">{errors?.welcomeMessage}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            This message will be included in the invitation email ({formData?.welcomeMessage?.length} characters)
          </p>
        </div>

        {/* Lease Terms Preview */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
            <Icon name="FileText" size={16} className="mr-2" />
            Lease Terms Preview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Monthly Rent:</span>
              <span className="ml-2 font-medium text-foreground">
                NAD {selectedUnit?.rentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Security Deposit:</span>
              <span className="ml-2 font-medium text-foreground">
                NAD {selectedUnit?.depositAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Lease Start:</span>
              <span className="ml-2 font-medium text-foreground">
                {formData?.moveInDate ? new Date(formData.moveInDate)?.toLocaleDateString('en-GB') : 'Not selected'}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">First Payment Due:</span>
              <span className="ml-2 font-medium text-foreground">
                {formData?.moveInDate ? new Date(formData.moveInDate)?.toLocaleDateString('en-GB') : 'Not selected'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isLoading}
            iconName="Send"
            iconPosition="left"
            className="flex-1"
          >
            {isLoading ? 'Sending Invitation...' : 'Send Invitation'}
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Preview Email
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvitationForm;