import React, { useState } from 'react';
import { CreditCard, Building2, Smartphone, ArrowLeft, Star } from 'lucide-react';

const PaymentMethodSelector = ({ onMethodSelect, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  
  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      processingTime: 'Instant',
      fee: 'No fee',
      popular: true
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer (ACH)',
      description: 'Direct from your bank account',
      icon: Building2,
      processingTime: '1-3 business days',
      fee: '$2.50 fee',
      popular: false
    },
    {
      id: 'digital-wallet',
      name: 'Digital Wallet',
      description: 'Apple Pay, Google Pay',
      icon: Smartphone,
      processingTime: 'Instant',
      fee: 'No fee',
      popular: true
    }
  ];

  const savedMethods = [
    {
      id: 'saved-card-1',
      type: 'credit-card',
      name: 'Visa ending in 4242',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 'saved-bank-1',
      type: 'bank-transfer',
      name: 'Chase Bank ****1234',
      routingNumber: '****5678',
      isDefault: false
    }
  ];

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      onMethodSelect(selectedMethod);
    }
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
            <h2 className="text-xl font-semibold text-gray-900">Choose Payment Method</h2>
            <p className="text-gray-600">Select how you'd like to pay your rent</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Saved Payment Methods */}
        {savedMethods?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Payment Methods</h3>
            <div className="space-y-3">
              {savedMethods?.map((method) => (
                <div
                  key={method?.id}
                  onClick={() => handleMethodSelect(method)}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedMethod?.id === method?.id
                      ? 'border-blue-600 bg-blue-50' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                        {method?.type === 'credit-card' ? (
                          <CreditCard className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Building2 className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{method?.name}</p>
                          {method?.isDefault && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Star className="w-3 h-3 mr-1" />
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {method?.type === 'credit-card' ? `Expires ${method?.expiry}` : `Routing ${method?.routingNumber}`}
                        </p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedMethod?.id === method?.id
                        ? 'border-blue-600 bg-blue-600' :'border-gray-300'
                    }`}>
                      {selectedMethod?.id === method?.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New Payment Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Payment Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods?.map((method) => {
              const IconComponent = method?.icon;
              return (
                <div
                  key={method?.id}
                  onClick={() => handleMethodSelect({ ...method, isNew: true })}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors relative ${
                    selectedMethod?.id === method?.id
                      ? 'border-blue-600 bg-blue-50' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {method?.popular && (
                    <div className="absolute -top-2 -right-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-600 text-white">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mx-auto">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">{method?.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{method?.description}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Processing:</span>
                        <span className="font-medium text-gray-700">{method?.processingTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Fee:</span>
                        <span className={`font-medium ${method?.fee === 'No fee' ? 'text-green-600' : 'text-gray-700'}`}>
                          {method?.fee}
                        </span>
                      </div>
                    </div>
                    
                    <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                      selectedMethod?.id === method?.id
                        ? 'border-blue-600 bg-blue-600' :'border-gray-300'
                    }`}>
                      {selectedMethod?.id === method?.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Method Information */}
        {selectedMethod && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Selected Payment Method</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-800">
                  {selectedMethod?.isNew ? selectedMethod?.name : selectedMethod?.name}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {selectedMethod?.isNew 
                    ? `Processing time: ${selectedMethod?.processingTime} • Fee: ${selectedMethod?.fee}`
                    : 'Using saved payment method'
                  }
                </p>
              </div>
              {selectedMethod?.isNew && selectedMethod?.fee !== 'No fee' && (
                <span className="text-xs font-medium text-blue-800 bg-blue-100 px-2 py-1 rounded">
                  + {selectedMethod?.fee}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Partial Payment Options */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Payment Options</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment-option" defaultChecked className="text-blue-600" />
              <span className="text-sm text-gray-700">Pay full amount ($1,300.00)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment-option" className="text-blue-600" />
              <span className="text-sm text-gray-700">Set up payment plan (minimum $650.00)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="p-6 border-t bg-gray-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Back to Summary
          </button>
          <button
            onClick={handleContinue}
            disabled={!selectedMethod}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedMethod
                ? 'bg-blue-600 text-white hover:bg-blue-700' :'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;