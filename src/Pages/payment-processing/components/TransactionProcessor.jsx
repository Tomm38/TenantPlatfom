import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, Shield, CreditCard, Building2, Smartphone } from 'lucide-react';

const TransactionProcessor = ({ isProcessing, paymentData, selectedMethod }) => {
  const [processingStep, setProcessingStep] = useState(0);
  const [processingSteps] = useState([
    'Validating payment information',
    'Verifying billing address',
    'Processing payment',
    'Confirming transaction',
    'Generating receipt'
  ]);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < processingSteps?.length - 1) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 600);

      return () => clearInterval(interval);
    }
  }, [isProcessing, processingSteps?.length]);

  const getMethodIcon = () => {
    if (selectedMethod?.id === 'credit-card' || selectedMethod?.type === 'credit-card') {
      return <CreditCard className="w-8 h-8 text-blue-600" />;
    }
    if (selectedMethod?.id === 'bank-transfer') {
      return <Building2 className="w-8 h-8 text-blue-600" />;
    }
    if (selectedMethod?.id === 'digital-wallet') {
      return <Smartphone className="w-8 h-8 text-blue-600" />;
    }
    return <CreditCard className="w-8 h-8 text-blue-600" />;
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Processing Payment</h2>
        <p className="text-gray-600">Please wait while we securely process your payment</p>
      </div>
      <div className="p-8">
        <div className="max-w-md mx-auto text-center space-y-8">
          {/* Processing Animation */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              {getMethodIcon()}
            </div>
            <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Payment Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Processing ${paymentData?.totalAmount?.toFixed(2)}
            </h3>
            <p className="text-gray-600">
              {selectedMethod?.isNew ? selectedMethod?.name : selectedMethod?.name} payment for {paymentData?.unit}
            </p>
          </div>

          {/* Processing Steps */}
          <div className="space-y-4">
            {processingSteps?.map((step, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  index < processingStep
                    ? 'bg-green-600'
                    : index === processingStep
                    ? 'bg-blue-600' :'bg-gray-200'
                }`}>
                  {index < processingStep ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : index === processingStep ? (
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
                <span className={`text-sm ${
                  index <= processingStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          {/* Security Indicators */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">Secure Processing</span>
            </div>
            <p className="text-xs text-green-700">
              Your payment is being processed through our secure, encrypted payment gateway
            </p>
          </div>

          {/* Processing Time Estimate */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">Estimated processing time</p>
            <p className="text-lg font-semibold text-blue-600">
              {selectedMethod?.id === 'bank-transfer' ? '30-60 seconds' : '10-30 seconds'}
            </p>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="text-left">
                <h4 className="text-sm font-medium text-amber-900">Important</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Please do not close this window or navigate away during payment processing. 
                  This may result in payment errors or duplicate charges.
                </p>
              </div>
            </div>
          </div>

          {/* Processing Indicators */}
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span>PCI Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <span>Bank Grade Security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionProcessor;