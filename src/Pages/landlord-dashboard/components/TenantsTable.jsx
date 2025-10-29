import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TenantsTable = ({ tenants }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedTenants = [...tenants]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getLeaseStatusBadge = (status) => {
    const styles = {
      active: 'bg-success/10 text-success border-success/20',
      expiring: 'bg-warning/10 text-warning border-warning/20',
      expired: 'bg-error/10 text-error border-error/20'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles?.[status]}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const styles = {
      paid: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      overdue: 'bg-error/10 text-error border-error/20'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles?.[status]}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-smooth"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon 
          name={sortBy === field ? (sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
          size={14} 
        />
      </div>
    </th>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden elevation-1">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/30">
            <tr>
              <SortableHeader field="name">Tenant</SortableHeader>
              <SortableHeader field="unit">Unit</SortableHeader>
              <SortableHeader field="rent">Rent</SortableHeader>
              <SortableHeader field="leaseStart">Lease Start</SortableHeader>
              <SortableHeader field="leaseEnd">Lease End</SortableHeader>
              <SortableHeader field="leaseStatus">Lease Status</SortableHeader>
              <SortableHeader field="paymentStatus">Payment</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedTenants?.map((tenant) => (
              <tr key={tenant?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Icon name="User" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{tenant?.name}</div>
                      <div className="text-sm text-muted-foreground">{tenant?.email}</div>
                      <div className="text-sm text-muted-foreground">{tenant?.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">{tenant?.unit}</div>
                  <div className="text-sm text-muted-foreground">{tenant?.building}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">NAD {tenant?.rent?.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Monthly</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{formatDate(tenant?.leaseStart)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{formatDate(tenant?.leaseEnd)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getLeaseStatusBadge(tenant?.leaseStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentStatusBadge(tenant?.paymentStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MessageSquare"
                      title="Send Message"
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="FileText"
                      title="View Lease"
                    >
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Eye"
                      title="View Details"
                      onClick={() => navigate(`/tenant-details/${tenant?.id}`)}
                    >
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantsTable;