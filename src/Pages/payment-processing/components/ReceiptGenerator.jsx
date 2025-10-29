import React, { useState } from 'react';
import { CheckCircle, Download, Mail, Printer, Share2, CreditCard, Building2, Smartphone, Calendar, MapPin } from 'lucide-react';

const ReceiptGenerator = ({ transactionId, paymentData, selectedMethod, paymentForm, onNewPayment }) => {
  const [emailSent, setEmailSent] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const handleEmailReceipt = async () => {
    setEmailSent(true);
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleDownloadReceipt = () => {
    setDownloadStarted(true);
    // Simulate download
    setTimeout(() => setDownloadStarted(false), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const getMethodIcon = () => {
    if (selectedMethod?.id === 'credit-card' || selectedMethod?.type === 'credit-card') {
      return <CreditCard className="w-5 h-5 text-blue-600" />;
    }
    if (selectedMethod?.id === 'bank-transfer') {
      return <Building2 className="w-5 h-5 text-blue-600" />;
    }
    if (selectedMethod?.id === 'digital-wallet') {
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    }
    return <CreditCard className="w-5 h-5 text-blue-600" />;
  };

  const getPaymentMethodDisplay = () => {
    if (selectedMethod?.type === 'credit-card' || selectedMethod?.id === 'credit-card') {
      return `${paymentForm?.cardName || 'Card'} ending in ${paymentForm?.cardNumber?.slice(-4) || '****'}`;
    }
    if (selectedMethod?.id === 'bank-transfer') {
      return `${paymentForm?.accountType || 'Bank'} account ending in ${paymentForm?.accountNumber?.slice(-4) || '****'}`;
    }
    return selectedMethod?.name || 'Payment Method';
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      {/* Success Header */}
      <div className="p-6 border-b bg-green-50">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mx-auto">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-green-900">Payment Successful!</h2>
            <p className="text-green-700">Your rent payment has been processed successfully</p>
          </div>
        </div>
      </div>
      {/* Receipt Content */}
      <div className="p-6" id="receipt-content">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Transaction Details */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">Payment Receipt</h3>
            <p className="text-sm text-gray-600">Transaction ID: {transactionId}</p>
            <p className="text-sm text-gray-600">
              {new Date()?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Property</span>
                <span className="font-medium text-gray-900">{paymentData?.property}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Unit</span>
                <span className="font-medium text-gray-900">{paymentData?.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rent</span>
                <span className="font-medium text-gray-900">${paymentData?.amount?.toFixed(2)}</span>
              </div>
              {paymentData?.lateFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Late Fee</span>
                  <span className="font-medium text-gray-900">${paymentData?.lateFee?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total Paid</span>
                  <span className="text-lg font-bold text-green-600">${paymentData?.totalAmount?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Details */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              {getMethodIcon()}
              <span>Payment Method</span>
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium text-gray-900">{getPaymentMethodDisplay()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time</span>
                <span className="font-medium text-gray-900">
                  {selectedMethod?.id === 'bank-transfer' ? '1-3 business days' : 'Instant'}
                </span>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          {paymentForm?.street && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span>Billing Address</span>
              </h4>
              <div className="text-sm text-gray-700">
                <p>{paymentForm?.street}</p>
                <p>{paymentForm?.city}, {paymentForm?.state} {paymentForm?.zipCode}</p>
                <p>{paymentForm?.country}</p>
              </div>
            </div>
          )}

          {/* Next Payment Due */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Next Payment Due</span>
            </h4>
            <p className="text-sm text-blue-700">
              Your next rent payment of ${paymentData?.amount?.toFixed(2)} is due on{' '}
              {new Date(new Date().setMonth(new Date().getMonth() + 1))?.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>

          {/* Important Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Important Information</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Keep this receipt for your records</li>
              <li>• Payment confirmation has been sent to your email</li>
              <li>• Contact support if you have any questions about this transaction</li>
              <li>• Future payments can be scheduled for automatic processing</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Receipt Actions */}
      <div className="p-6 border-t bg-gray-50">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleDownloadReceipt}
            disabled={downloadStarted}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            <Download className="w-4 h-4" />
            <span>{downloadStarted ? 'Downloading...' : 'Download PDF'}</span>
          </button>
          
          <button
            onClick={handleEmailReceipt}
            disabled={emailSent}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:bg-gray-100"
          >
            <Mail className="w-4 h-4" />
            <span>{emailSent ? 'Email Sent!' : 'Email Receipt'}</span>
          </button>
          
          <button
            onClick={handlePrintReceipt}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          
          <button
            onClick={() => {/* Share functionality */}}
            className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onNewPayment}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Make Another Payment
            </button>
            <button
              onClick={() => window.location.href = '/tenant-dashboard'}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptGenerator;