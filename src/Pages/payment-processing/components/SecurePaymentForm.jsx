import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Eye, EyeOff, CreditCard, MapPin, Building2 } from 'lucide-react';

const SecurePaymentForm = ({ selectedMethod, paymentData, onSubmit, onBack, error }) => {
  const [formData, setFormData] = useState({
    // Card information
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardName: '',
    
    // Bank information
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    accountName: '',
    
    // Billing address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Payment settings
    savePaymentMethod: false,
    setAsDefault: false,
    agreeToTerms: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear specific field error when user starts typing
    if (formErrors?.[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (selectedMethod?.id === 'credit-card' || selectedMethod?.type === 'credit-card') {
      if (!formData?.cardNumber || formData?.cardNumber?.replace(/\s/g, '')?.length < 13) {
        errors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData?.expiryMonth || !formData?.expiryYear) {
        errors.expiry = 'Please enter expiry date';
      }
      if (!formData?.cvv || formData?.cvv?.length < 3) {
        errors.cvv = 'Please enter a valid CVV';
      }
      if (!formData?.cardName?.trim()) {
        errors.cardName = 'Please enter the name on card';
      }
    }
    
    if (selectedMethod?.id === 'bank-transfer') {
      if (!formData?.accountNumber || formData?.accountNumber?.length < 8) {
        errors.accountNumber = 'Please enter a valid account number';
      }
      if (!formData?.routingNumber || formData?.routingNumber?.length !== 9) {
        errors.routingNumber = 'Please enter a valid 9-digit routing number';
      }
      if (!formData?.accountName?.trim()) {
        errors.accountName = 'Please enter the account holder name';
      }
    }
    
    // Billing address validation
    if (!formData?.street?.trim()) {
      errors.street = 'Please enter your street address';
    }
    if (!formData?.city?.trim()) {
      errors.city = 'Please enter your city';
    }
    if (!formData?.state?.trim()) {
      errors.state = 'Please enter your state';
    }
    if (!formData?.zipCode?.trim()) {
      errors.zipCode = 'Please enter your ZIP code';
    }
    
    if (!formData?.agreeToTerms) {
      errors.agreeToTerms = 'Please agree to the terms and conditions';
    }
    
    setFormErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsValidating(true);
    
    // Simulate form validation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsValidating(false);
    onSubmit(formData);
  };

  const getCardType = (number) => {
    const cleanNumber = number?.replace(/\s/g, '');
    if (cleanNumber?.startsWith('4')) return 'Visa';
    if (cleanNumber?.startsWith('5') || cleanNumber?.startsWith('2')) return 'Mastercard';
    if (cleanNumber?.startsWith('3')) return 'American Express';
    return 'Card';
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
            <p className="text-gray-600">Enter your {selectedMethod?.name || selectedMethod?.type} details</p>
          </div>
        </div>
      </div>
      {error && (
        <div className="p-4 border-b">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Credit Card Form */}
        {(selectedMethod?.id === 'credit-card' || selectedMethod?.type === 'credit-card') && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Card Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData?.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors?.cardNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute right-3 top-3">
                    <span className="text-xs font-medium text-gray-500">
                      {formData?.cardNumber ? getCardType(formData?.cardNumber) : ''}
                    </span>
                  </div>
                </div>
                {formErrors?.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.cardNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div className="flex space-x-2">
                  <select
                    value={formData?.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e?.target?.value)}
                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors?.expiry ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Month</option>
                    {[...Array(12)]?.map((_, i) => (
                      <option key={i + 1} value={String(i + 1)?.padStart(2, '0')}>
                        {String(i + 1)?.padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData?.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e?.target?.value)}
                    className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors?.expiry ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Year</option>
                    {[...Array(15)]?.map((_, i) => {
                      const year = new Date()?.getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {formErrors?.expiry && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.expiry}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <input
                    type={showCvv ? 'text' : 'password'}
                    value={formData?.cvv}
                    onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.slice(0, 4))}
                    placeholder="123"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      formErrors?.cvv ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCvv(!showCvv)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showCvv ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {formErrors?.cvv && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.cvv}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={formData?.cardName}
                  onChange={(e) => handleInputChange('cardName', e?.target?.value)}
                  placeholder="John Doe"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors?.cardName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formErrors?.cardName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.cardName}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Form */}
        {selectedMethod?.id === 'bank-transfer' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Bank Account Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type
                </label>
                <select
                  value={formData?.accountType}
                  onChange={(e) => handleInputChange('accountType', e?.target?.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Routing Number
                </label>
                <input
                  type="text"
                  value={formData?.routingNumber}
                  onChange={(e) => handleInputChange('routingNumber', e?.target?.value?.replace(/\D/g, '')?.slice(0, 9))}
                  placeholder="123456789"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors?.routingNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formErrors?.routingNumber && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.routingNumber}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData?.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e?.target?.value?.replace(/\D/g, ''))}
                  placeholder="1234567890"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors?.accountNumber ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formErrors?.accountNumber && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.accountNumber}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={formData?.accountName}
                  onChange={(e) => handleInputChange('accountName', e?.target?.value)}
                  placeholder="John Doe"
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    formErrors?.accountName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {formErrors?.accountName && (
                  <p className="mt-1 text-sm text-red-600">{formErrors?.accountName}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Billing Address</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData?.street}
                onChange={(e) => handleInputChange('street', e?.target?.value)}
                placeholder="123 Main Street"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors?.street ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formErrors?.street && (
                <p className="mt-1 text-sm text-red-600">{formErrors?.street}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData?.city}
                onChange={(e) => handleInputChange('city', e?.target?.value)}
                placeholder="New York"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors?.city ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formErrors?.city && (
                <p className="mt-1 text-sm text-red-600">{formErrors?.city}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                value={formData?.state}
                onChange={(e) => handleInputChange('state', e?.target?.value)}
                placeholder="NY"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors?.state ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formErrors?.state && (
                <p className="mt-1 text-sm text-red-600">{formErrors?.state}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData?.zipCode}
                onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
                placeholder="10001"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  formErrors?.zipCode ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {formErrors?.zipCode && (
                <p className="mt-1 text-sm text-red-600">{formErrors?.zipCode}</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Payment Options</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData?.savePaymentMethod}
                onChange={(e) => handleInputChange('savePaymentMethod', e?.target?.checked)}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Save this payment method for future use</span>
            </label>
            
            {formData?.savePaymentMethod && (
              <label className="flex items-center space-x-2 ml-6">
                <input
                  type="checkbox"
                  checked={formData?.setAsDefault}
                  onChange={(e) => handleInputChange('setAsDefault', e?.target?.checked)}
                  className="text-blue-600"
                />
                <span className="text-sm text-gray-700">Set as default payment method</span>
              </label>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={formData?.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
                className="text-blue-600 mt-1"
              />
              <span className="text-sm text-gray-700">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>. 
                I authorize the payment processor to securely process this payment.
              </span>
            </label>
            {formErrors?.agreeToTerms && (
              <p className="mt-2 text-sm text-red-600">{formErrors?.agreeToTerms}</p>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Shield className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-900">Secure Payment Processing</h4>
              <p className="text-sm text-green-700 mt-1">
                Your payment information is encrypted and processed securely. We never store your complete card details.
              </p>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back to Methods
          </button>
          <button
            type="submit"
            disabled={isValidating}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
              isValidating
                ? 'bg-gray-400 text-white cursor-not-allowed' :'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isValidating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Validating...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Process Payment</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecurePaymentForm;