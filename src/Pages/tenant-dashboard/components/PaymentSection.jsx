import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSection = ({ paymentData, onMakePayment }) => {
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer');

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-NA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(paymentData?.nextPaymentDue);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDue = getDaysUntilDue();
  const isOverdue = daysUntilDue < 0;
  const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;

  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      icon: 'CreditCard',
      description: 'Direct transfer to landlord account',
      processingTime: 'Instant'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      icon: 'Smartphone',
      description: 'Pay using MTC Mobile Money or TN Mobile',
      processingTime: 'Instant'
    },
    {
      id: 'debit_card',
      name: 'Debit Card',
      icon: 'CreditCard',
      description: 'Pay with your bank debit card',
      processingTime: 'Instant'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Payment Status Alert */}
      {isOverdue && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5" />
            <div>
              <h4 className="font-semibold text-error mb-1">Payment Overdue</h4>
              <p className="text-sm text-foreground">
                Your rent payment is {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''} overdue. 
                Please make payment immediately to avoid late fees.
              </p>
            </div>
          </div>
        </div>
      )}

      {isDueSoon && !isOverdue && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="text-warning mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning mb-1">Payment Due Soon</h4>
              <p className="text-sm text-foreground">
                Your rent payment is due in {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''}. 
                Make payment now to avoid late fees.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Current Payment Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Current Payment</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Amount Due</p>
                <p className="text-2xl font-bold text-primary">
                  NAD {paymentData?.nextPaymentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Icon name="DollarSign" size={32} className="text-primary" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="text-lg font-semibold text-foreground">
                  {formatDate(paymentData?.nextPaymentDue)}
                </p>
              </div>
              <Icon name="Calendar" size={24} className="text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-success/5 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-lg font-semibold text-success">
                  NAD {paymentData?.currentBalance?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <p className="text-lg font-semibold text-foreground">
                  {paymentData?.paymentMethod}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {paymentData?.autopayEnabled && (
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Repeat" size={16} />
                    <span className="text-xs">Auto</span>
                  </div>
                )}
                <Icon name="CreditCard" size={24} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button
            variant="default"
            size="lg"
            iconName="CreditCard"
            iconPosition="left"
            onClick={onMakePayment}
            fullWidth
          >
            Make Payment Now
          </Button>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Available Payment Methods</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {paymentMethods?.map((method) => (
            <div
              key={method?.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                paymentMethod === method?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:bg-muted/30'
              }`}
              onClick={() => setPaymentMethod(method?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentMethod === method?.id ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={method?.icon} 
                      size={20} 
                      className={paymentMethod === method?.id ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{method?.name}</h4>
                    <p className="text-sm text-muted-foreground">{method?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{method?.processingTime}</p>
                  <p className="text-xs text-muted-foreground">Processing</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autopay Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Automatic Payments</h3>
            <p className="text-sm text-muted-foreground">Never miss a payment with autopay</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors ${
            paymentData?.autopayEnabled ? 'bg-primary' : 'bg-muted'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
              paymentData?.autopayEnabled ? 'translate-x-6' : 'translate-x-1'
            } mt-0.5`} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Payments automatically processed 3 days before due date</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Secure and encrypted payment processing</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <Icon name="Mail" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Email confirmation sent after each payment</span>
          </div>
        </div>

        <div className="mt-4">
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Manage Autopay Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;