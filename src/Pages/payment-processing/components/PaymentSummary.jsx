import React from 'react';
import { Calendar, DollarSign, AlertTriangle, Clock } from 'lucide-react';

const PaymentSummary = ({ paymentData, onContinue }) => {
  const isOverdue = new Date(paymentData?.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(paymentData?.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">Review your payment information before proceeding</p>
      </div>
      <div className="p-6 space-y-6">
        {/* Property Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Property Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Property</p>
              <p className="text-sm font-medium text-gray-900">{paymentData?.property}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="text-sm font-medium text-gray-900">{paymentData?.unit}</p>
            </div>
          </div>
        </div>

        {/* Due Date Status */}
        <div className={`rounded-lg p-4 ${isOverdue ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'} border`}>
          <div className="flex items-center space-x-2 mb-2">
            {isOverdue ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <Clock className="w-5 h-5 text-blue-600" />
            )}
            <h3 className={`text-sm font-medium ${isOverdue ? 'text-red-900' : 'text-blue-900'}`}>
              Payment Status
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${isOverdue ? 'text-red-700' : 'text-blue-700'}`}>
                Due Date: {new Date(paymentData?.dueDate)?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className={`text-xs ${isOverdue ? 'text-red-600' : 'text-blue-600'} mt-1`}>
                {isOverdue 
                  ? `Payment is ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) !== 1 ? 's' : ''} overdue`
                  : `Payment due in ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''}`
                }
              </p>
            </div>
            <Calendar className={`w-8 h-8 ${isOverdue ? 'text-red-400' : 'text-blue-400'}`} />
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Payment Breakdown</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700">Base Rent</span>
              </div>
              <span className="text-sm font-medium text-gray-900">${paymentData?.amount?.toFixed(2)}</span>
            </div>

            {paymentData?.lateFee > 0 && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">Late Fee</span>
                </div>
                <span className="text-sm font-medium text-red-700">${paymentData?.lateFee?.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t pt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-gray-900">Total Amount Due</span>
                <span className="text-lg font-bold text-gray-900">${paymentData?.totalAmount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Late Fee Notice */}
        {paymentData?.lateFee > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-900">Late Fee Applied</h4>
                <p className="text-sm text-amber-700 mt-1">
                  A late fee of ${paymentData?.lateFee?.toFixed(2)} has been added to your payment due to the overdue status. 
                  Complete your payment now to avoid additional fees.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Options Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">Payment Options Available</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Credit/Debit Cards (Visa, Mastercard, American Express)</li>
            <li>• Bank Transfer (ACH) - Processing fee may apply</li>
            <li>• Digital Wallets (Apple Pay, Google Pay)</li>
            <li>• Partial payment options available</li>
          </ul>
        </div>
      </div>
      <div className="p-6 border-t bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Ready to proceed with payment?</p>
            <p className="text-xs text-gray-500 mt-1">You'll be able to review payment method options next</p>
          </div>
          <button
            onClick={onContinue}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;