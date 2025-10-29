import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const getOccupancyColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 70) return 'text-warning';
    return 'text-error';
  };

  const handleViewDetails = () => {
    navigate('/building-management');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 transition-smooth hover:elevation-2">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon name={property?.type === 'apartment' ? 'Building2' : 'Home'} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{property?.name}</h3>
            <p className="text-sm text-muted-foreground">{property?.address}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleViewDetails}
        >
          <Icon name="ExternalLink" size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/30 rounded-md">
          <p className="text-lg font-bold text-foreground">{property?.totalUnits}</p>
          <p className="text-xs text-muted-foreground">Total Units</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-md">
          <p className={`text-lg font-bold ${getOccupancyColor(property?.occupancyRate)}`}>
            {property?.occupancyRate}%
          </p>
          <p className="text-xs text-muted-foreground">Occupied</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-muted-foreground">Monthly Revenue</p>
          <p className="text-lg font-bold text-foreground">NAD {property?.monthlyRevenue?.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-lg font-bold text-warning">NAD {property?.pendingPayments?.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Users"
          iconPosition="left"
          onClick={() => navigate('/tenant-invitation')}
          className="flex-1"
        >
          Manage Tenants
        </Button>
        <Button
          variant="default"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={handleViewDetails}
          className="flex-1"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;