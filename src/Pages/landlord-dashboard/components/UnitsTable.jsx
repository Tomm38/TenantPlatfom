import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UnitsTable = ({ units }) => {
  const [sortBy, setSortBy] = useState('unit');
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

  const sortedUnits = [...units]?.sort((a, b) => {
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

  const getStatusBadge = (status) => {
    const styles = {
      occupied: 'bg-success/10 text-success border-success/20',
      vacant: 'bg-warning/10 text-warning border-warning/20',
      maintenance: 'bg-error/10 text-error border-error/20'
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
      overdue: 'bg-error/10 text-error border-error/20',
      'n/a': 'bg-muted/10 text-muted-foreground border-muted/20'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles?.[status]}`}>
        {status === 'n/a' ? 'N/A' : status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
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
              <SortableHeader field="unit">Unit</SortableHeader>
              <SortableHeader field="building">Building</SortableHeader>
              <SortableHeader field="rent">Rent</SortableHeader>
              <SortableHeader field="tenant">Tenant</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="paymentStatus">Payment</SortableHeader>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedUnits?.map((unit) => (
              <tr key={unit?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="p-2 rounded-md bg-primary/10 mr-3">
                      <Icon name="Home" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{unit?.unit}</div>
                      <div className="text-sm text-muted-foreground">{unit?.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-foreground">{unit?.building}</div>
                  <div className="text-sm text-muted-foreground">{unit?.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">NAD {unit?.rent?.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">+ NAD {unit?.deposit?.toLocaleString()} deposit</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {unit?.tenant ? (
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Icon name="User" size={14} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-foreground">{unit?.tenant}</div>
                        <div className="text-sm text-muted-foreground">{unit?.tenantEmail}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">No tenant assigned</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(unit?.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPaymentStatusBadge(unit?.paymentStatus)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    {unit?.status === 'vacant' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="UserPlus"
                        onClick={() => navigate('/tenant-invitation')}
                      >
                        Assign Tenant
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="MessageSquare"
                        >
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          iconName="Eye"
                          onClick={() => navigate('/building-management')}
                        >
                        </Button>
                      </>
                    )}
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

export default UnitsTable;