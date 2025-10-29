import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ProfileManagement = ({ tenantData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: tenantData?.name || '',
    email: tenantData?.email || '',
    phone: tenantData?.phone || '',
    emergencyContactName: tenantData?.emergencyContact?.name || '',
    emergencyContactRelationship: tenantData?.emergencyContact?.relationship || '',
    emergencyContactPhone: tenantData?.emergencyContact?.phone || ''
  });
  
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.emergencyContactName?.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required';
    }

    if (!formData?.emergencyContactPhone?.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: tenantData?.name || '',
      email: tenantData?.email || '',
      phone: tenantData?.phone || '',
      emergencyContactName: tenantData?.emergencyContact?.name || '',
      emergencyContactRelationship: tenantData?.emergencyContact?.relationship || '',
      emergencyContactPhone: tenantData?.emergencyContact?.phone || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  const relationshipOptions = [
    'Spouse',
    'Parent',
    'Sibling',
    'Child',
    'Friend',
    'Colleague',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Profile Information</h3>
          {!isEditing ? (
            <Button
              variant="outline"
              iconName="Edit"
              iconPosition="left"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Save"
                iconPosition="left"
                onClick={handleSave}
                loading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-6">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted">
              {tenantData?.profileImage ? (
                <Image
                  src={tenantData?.profileImage}
                  alt={tenantData?.profileImageAlt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="User" size={32} className="text-muted-foreground" />
                </div>
              )}
              {isEditing && (
                <button className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Icon name="Camera" size={20} className="text-white" />
                </button>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name *
                </label>
                {isEditing ? (
                  <Input
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    error={errors?.name}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-foreground">{formData?.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address *
                </label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    error={errors?.email}
                    placeholder="Enter your email address"
                  />
                ) : (
                  <p className="text-foreground">{formData?.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Phone Number *
                </label>
                {isEditing ? (
                  <Input
                    type="tel"
                    value={formData?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    error={errors?.phone}
                    placeholder="+264 81 123 4567"
                  />
                ) : (
                  <p className="text-foreground">{formData?.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-error" />
          <h3 className="text-lg font-semibold text-foreground">Emergency Contact</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Contact Name *
            </label>
            {isEditing ? (
              <Input
                value={formData?.emergencyContactName}
                onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
                error={errors?.emergencyContactName}
                placeholder="Emergency contact full name"
              />
            ) : (
              <p className="text-foreground">{formData?.emergencyContactName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Relationship
            </label>
            {isEditing ? (
              <select
                value={formData?.emergencyContactRelationship}
                onChange={(e) => handleInputChange('emergencyContactRelationship', e?.target?.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select relationship</option>
                {relationshipOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-foreground">{formData?.emergencyContactRelationship}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone Number *
            </label>
            {isEditing ? (
              <Input
                type="tel"
                value={formData?.emergencyContactPhone}
                onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
                error={errors?.emergencyContactPhone}
                placeholder="+264 81 765 4321"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <p className="text-foreground">{formData?.emergencyContactPhone}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Phone"
                  onClick={() => window.location.href = `tel:${formData?.emergencyContactPhone}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Account Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Password</h4>
              <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
            </div>
            <Button variant="outline" iconName="Key" iconPosition="left">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" iconName="Shield" iconPosition="left">
              Setup 2FA
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <h4 className="font-medium text-foreground">Privacy Settings</h4>
              <p className="text-sm text-muted-foreground">Control your data and privacy</p>
            </div>
            <Button variant="outline" iconName="Settings" iconPosition="left">
              Manage Privacy
            </Button>
          </div>
        </div>
      </div>
      {/* Data Export */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Icon name="Download" size={20} className="text-primary mt-1" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">Export Your Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download a copy of your account data including lease information, payment history, and communication records.
              </p>
              <Button variant="outline" iconName="Download" iconPosition="left">
                Request Data Export
              </Button>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <div className="flex items-start space-x-3">
              <Icon name="Trash2" size={20} className="text-error mt-1" />
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="outline" className="text-error border-error hover:bg-error hover:text-error-foreground">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;