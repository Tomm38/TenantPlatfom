import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import PaymentSummary from './components/PaymentSummary';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import SecurePaymentForm from './components/SecurePaymentForm';
import TransactionProcessor from './components/TransactionProcessor';
import ReceiptGenerator from './components/ReceiptGenerator';
import SecurityIndicators from './components/SecurityIndicators';

const PaymentProcessing = () => {
  const [currentStep, setCurrentStep] = useState('summary'); // summary, method, form, processing, receipt
  const [paymentData, setPaymentData] = useState({
    amount: 1250.00,
    dueDate: '2025-10-31',
    lateFee: 50.00,
    totalAmount: 1300.00,
    unit: 'Unit 4B',
    property: 'Sunset Apartments'
  });
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentForm, setPaymentForm] = useState({});
  const [transactionId, setTransactionId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setCurrentStep('form');
  };

  const handleFormSubmit = async (formData) => {
    setPaymentForm(formData);
    setCurrentStep('processing');
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      const transId = `TXN${Date.now()}`;
      setTransactionId(transId);
      setPaymentSuccess(true);
      setCurrentStep('receipt');
    } catch (error) {
      setPaymentError('Payment processing failed. Please try again.');
      setCurrentStep('form');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToSummary = () => {
    setCurrentStep('summary');
    setSelectedMethod(null);
    setPaymentForm({});
    setPaymentError(null);
  };

  const handleBackToMethod = () => {
    setCurrentStep('method');
    setPaymentForm({});
    setPaymentError(null);
  };

  useEffect(() => {
    if (currentStep === 'summary') {
      // Auto-advance to method selection after reviewing summary
      const timer = setTimeout(() => {
        setCurrentStep('method');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Payment Processing - Secure Rent Payment</title>
        <meta name="description" content="Secure rent payment processing with multiple payment methods and real-time transaction feedback" />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Payment Processing</h1>
                <p className="text-sm text-gray-600">Secure rent payment for {paymentData?.unit}</p>
              </div>
            </div>
            <SecurityIndicators />
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-2 ${currentStep === 'summary' || currentStep === 'method' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'summary' || currentStep === 'method' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Payment Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment Information</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-4"></div>
            <div className={`flex items-center space-x-2 ${currentStep === 'processing' || currentStep === 'receipt' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep === 'processing' || currentStep === 'receipt' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Content */}
          <div className="lg:col-span-2">
            {currentStep === 'summary' && (
              <div className="space-y-6">
                <PaymentSummary 
                  paymentData={paymentData}
                  onContinue={() => setCurrentStep('method')}
                />
              </div>
            )}

            {currentStep === 'method' && (
              <div className="space-y-6">
                <PaymentMethodSelector 
                  onMethodSelect={handleMethodSelect}
                  onBack={handleBackToSummary}
                />
              </div>
            )}

            {currentStep === 'form' && (
              <div className="space-y-6">
                <SecurePaymentForm 
                  selectedMethod={selectedMethod}
                  paymentData={paymentData}
                  onSubmit={handleFormSubmit}
                  onBack={handleBackToMethod}
                  error={paymentError}
                />
              </div>
            )}

            {currentStep === 'processing' && (
              <div className="space-y-6">
                <TransactionProcessor 
                  isProcessing={isProcessing}
                  paymentData={paymentData}
                  selectedMethod={selectedMethod}
                />
              </div>
            )}

            {currentStep === 'receipt' && (
              <div className="space-y-6">
                <ReceiptGenerator 
                  transactionId={transactionId}
                  paymentData={paymentData}
                  selectedMethod={selectedMethod}
                  paymentForm={paymentForm}
                  onNewPayment={() => {
                    setCurrentStep('summary');
                    setSelectedMethod(null);
                    setPaymentForm({});
                    setTransactionId(null);
                    setPaymentSuccess(false);
                    setPaymentError(null);
                  }}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Security Features */}
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Security Features</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">PCI DSS Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Fraud Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Secure Data Storage</span>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Base Rent</span>
                  <span className="text-sm font-medium text-gray-900">${paymentData?.amount?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Late Fee</span>
                  <span className="text-sm font-medium text-gray-900">${paymentData?.lateFee?.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total Amount</span>
                    <span className="text-base font-semibold text-gray-900">${paymentData?.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-700 mb-4">Our support team is available 24/7 to assist with payment issues.</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;