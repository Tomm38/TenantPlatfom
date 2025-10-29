import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    numberOfProperties: '',
    propertyTypes: [],
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const propertyTypeOptions = [
    { value: 'apartment', label: 'Apartment Complex' },
    { value: 'hostel', label: 'Hostel/Student Housing' },
    { value: 'compound', label: 'Residential Compound' },
    { value: 'house', label: 'Single Family Houses' },
    { value: 'commercial', label: 'Commercial Properties' },
    { value: 'mixed', label: 'Mixed-Use Properties' }
  ];

  const numberOfPropertiesOptions = [
    { value: '1-5', label: '1-5 Properties' },
    { value: '6-10', label: '6-10 Properties' },
    { value: '11-25', label: '11-25 Properties' },
    { value: '26-50', label: '26-50 Properties' },
    { value: '50+', label: '50+ Properties' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return 'bg-error';
    if (strength < 50) return 'bg-warning';
    if (strength < 75) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/?.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Number of properties validation
    if (!formData?.numberOfProperties) {
      newErrors.numberOfProperties = 'Please select number of properties';
    }

    // Property types validation
    if (formData?.propertyTypes?.length === 0) {
      newErrors.propertyTypes = 'Please select at least one property type';
    }

    // Terms and privacy validation
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Calculate password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to success page or dashboard
      navigate('/landlord-dashboard');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getCompletionPercentage = () => {
    const fields = ['fullName', 'email', 'phoneNumber', 'password', 'confirmPassword', 'numberOfProperties'];
    const completed = fields?.filter(field => formData?.[field])?.length;
    const hasPropertyTypes = formData?.propertyTypes?.length > 0;
    const hasAgreements = formData?.agreeToTerms && formData?.agreeToPrivacy;
    
    return Math.round(((completed + (hasPropertyTypes ? 1 : 0) + (hasAgreements ? 1 : 0)) / 8) * 100);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Registration Progress</span>
          <span className="text-sm text-muted-foreground">{getCompletionPercentage()}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
      </div>
      {/* Personal Information Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="User" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
            className="md:col-span-2"
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            description="We'll use this for account verification and notifications"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+264 81 123 4567"
            description="For important account and property notifications"
            value={formData?.phoneNumber}
            onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
            error={errors?.phoneNumber}
            required
          />
        </div>
      </div>
      {/* Account Security Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Account Security</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData?.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                error={errors?.password}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
              </Button>
            </div>
            
            {formData?.password && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Password Strength</span>
                  <span className={`font-medium ${
                    passwordStrength < 50 ? 'text-error' : 
                    passwordStrength < 75 ? 'text-warning' : 'text-success'
                  }`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
              error={errors?.confirmPassword}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-8"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Property Management Details Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Building2" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Property Management Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Number of Properties"
            placeholder="Select property count"
            description="How many properties do you currently manage?"
            options={numberOfPropertiesOptions}
            value={formData?.numberOfProperties}
            onChange={(value) => handleInputChange('numberOfProperties', value)}
            error={errors?.numberOfProperties}
            required
          />
          
          <Select
            label="Property Types"
            placeholder="Select property types"
            description="What types of properties do you manage?"
            options={propertyTypeOptions}
            value={formData?.propertyTypes}
            onChange={(value) => handleInputChange('propertyTypes', value)}
            error={errors?.propertyTypes}
            multiple
            searchable
            required
          />
        </div>
      </div>
      {/* Legal Agreements Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Legal Agreements</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="I agree to the Terms of Service"
            description="By checking this box, you agree to our terms and conditions for using TenantPlatform"
            checked={formData?.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
            error={errors?.agreeToTerms}
            required
          />
          
          <Checkbox
            label="I agree to the Privacy Policy"
            description="You consent to our collection and use of your data as described in our privacy policy"
            checked={formData?.agreeToPrivacy}
            onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
            error={errors?.agreeToPrivacy}
            required
          />
        </div>
      </div>
      {/* Submit Button */}
      <div className="space-y-4">
        {errors?.submit && (
          <div className="bg-error/10 border border-error/20 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <span className="text-sm text-error">{errors?.submit}</span>
            </div>
          </div>
        )}
        
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={getCompletionPercentage() < 100}
          fullWidth
          iconName="UserPlus"
          iconPosition="left"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button
              variant="link"
              size="sm"
              onClick={() => navigate('/tenant-login')}
              className="p-0 h-auto"
            >
              Sign in here
            </Button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;