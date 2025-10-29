import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentHistory = ({ paymentHistory, onViewReceipt }) => {
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-NA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPaymentTypeIcon = (type) => {
    switch (type) {
      case 'rent':
        return 'Home';
      case 'utility':
        return 'Zap';
      case 'maintenance':
        return 'Wrench';
      default:
        return 'DollarSign';
    }
  };

  const getPaymentTypeLabel = (type) => {
    switch (type) {
      case 'rent':
        return 'Monthly Rent';
      case 'utility':
        return 'Utilities';
      case 'maintenance':
        return 'Maintenance Fee';
      default:
        return 'Payment';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'bank transfer':
        return 'CreditCard';
      case 'mobile money':
        return 'Smartphone';
      case 'cash':
        return 'Banknote';
      default:
        return 'CreditCard';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10';
      case 'pending':
        return 'bg-warning/10';
      case 'failed':
        return 'bg-error/10';
      default:
        return 'bg-muted/10';
    }
  };

  // Filter payments based on selected period
  const filterByPeriod = (payments) => {
    if (filterPeriod === 'all') return payments;
    
    const now = new Date();
    const periodDate = new Date();
    
    switch (filterPeriod) {
      case '3months':
        periodDate?.setMonth(now?.getMonth() - 3);
        break;
      case '6months':
        periodDate?.setMonth(now?.getMonth() - 6);
        break;
      case '1year':
        periodDate?.setFullYear(now?.getFullYear() - 1);
        break;
      default:
        return payments;
    }
    
    return payments?.filter((payment) => new Date(payment?.date) >= periodDate);
  };

  // Filter payments by type
  const filterByType = (payments) => {
    if (filterType === 'all') return payments;
    return payments?.filter((payment) => payment?.type === filterType);
  };

  const filteredPayments = filterByType(filterByPeriod(paymentHistory || []));

  const calculateTotals = () => {
    const total = filteredPayments?.reduce((sum, payment) => sum + payment?.amount, 0) || 0;
    const rentPayments = filteredPayments?.filter((p) => p?.type === 'rent')?.reduce((sum, payment) => sum + payment?.amount, 0) || 0;
    const utilityPayments = filteredPayments?.filter((p) => p?.type === 'utility')?.reduce((sum, payment) => sum + payment?.amount, 0) || 0;
    
    return { total, rentPayments, utilityPayments };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Payment Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="DollarSign" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-lg font-semibold text-foreground">
                  NAD {totals?.total?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-success/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Home" size={20} className="text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Rent Payments</p>
                <p className="text-lg font-semibold text-foreground">
                  NAD {totals?.rentPayments?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-warning/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={20} className="text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Utility Payments</p>
                <p className="text-lg font-semibold text-foreground">
                  NAD {totals?.utilityPayments?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-2 sm:mb-0">Payment History</h3>
          <p className="text-sm text-muted-foreground">
            {filteredPayments?.length} payment{filteredPayments?.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1">
              Time Period
            </label>
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Time</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-1">
              Payment Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Types</option>
              <option value="rent">Rent Payments</option>
              <option value="utility">Utility Payments</option>
              <option value="maintenance">Maintenance Fees</option>
            </select>
          </div>
        </div>
      </div>
      {/* Payment List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filteredPayments?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Receipt" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Payments Found</h3>
            <p className="text-muted-foreground">
              No payments match your current filter criteria.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredPayments?.map((payment) => (
              <div key={payment?.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusBgColor(payment?.status)}`}>
                      <Icon name={getPaymentTypeIcon(payment?.type)} size={20} className={getStatusColor(payment?.status)} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground">{getPaymentTypeLabel(payment?.type)}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{formatDate(payment?.date)}</span>
                        <div className="flex items-center space-x-1">
                          <Icon name={getPaymentMethodIcon(payment?.method)} size={14} />
                          <span>{payment?.method}</span>
                        </div>
                        <span>Ref: {payment?.reference}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">
                      NAD {payment?.amount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-sm font-medium capitalize ${getStatusColor(payment?.status)}`}>
                        {payment?.status}
                      </span>
                      {payment?.receipt && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Download"
                          onClick={() => onViewReceipt(payment?.receipt)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Export Payment History</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download PDF Report
          </Button>
          <Button variant="outline" iconName="FileSpreadsheet" iconPosition="left">
            Export to Excel
          </Button>
          <Button variant="outline" iconName="Mail" iconPosition="left">
            Email Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;