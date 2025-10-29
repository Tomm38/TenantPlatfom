import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UnitCard = ({ unit, onEdit, onViewTenant, onManageLease, onDelete, onSelect, isSelected }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied':
        return 'Users';
      case 'vacant':
        return 'Home';
      case 'maintenance':
        return 'Wrench';
      default:
        return 'Home';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'text-success';
      case 'vacant':
        return 'text-warning';
      case 'maintenance':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-success/10';
      case 'vacant':
        return 'bg-warning/10';
      case 'maintenance':
        return 'bg-error/10';
      default:
        return 'bg-muted/10';
    }
  };

  const getRentCollectionColor = (status) => {
    switch (status) {
      case 'current':
        return 'text-success';
      case 'overdue':
        return 'text-error';
      case 'partial':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const isLeaseExpiringSoon = () => {
    if (!unit?.leaseExpiration) return false;
    
    const today = new Date();
    const expirationDate = new Date(unit?.leaseExpiration);
    const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
    
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  };

  const formatLeaseExpiration = () => {
    if (!unit?.leaseExpiration) return null;
    
    const expirationDate = new Date(unit?.leaseExpiration);
    return expirationDate?.toLocaleDateString('en-NA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-card border rounded-lg p-6 elevation-1 hover:elevation-2 transition-smooth ${
      isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border'
    }`}>
      {/* Header with Checkbox and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onSelect(unit?.id, checked)}
          />
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Unit {unit?.unitNumber}
            </h3>
            <p className="text-sm text-muted-foreground">{unit?.building}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getStatusBgColor(unit?.status)}`}>
          <Icon name={getStatusIcon(unit?.status)} size={14} className={getStatusColor(unit?.status)} />
          <span className={`text-xs font-medium capitalize ${getStatusColor(unit?.status)}`}>
            {unit?.status}
          </span>
        </div>
      </div>

      {/* Unit Image */}
      <div className="relative mb-4 overflow-hidden rounded-md h-40">
        <Image
          src={unit?.image}
          alt={unit?.imageAlt}
          className="w-full h-full object-cover"
        />
        {isLeaseExpiringSoon() && (
          <div className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
            Lease Expiring Soon
          </div>
        )}
      </div>

      {/* Unit Details */}
      <div className="space-y-3">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Bed" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{unit?.bedrooms} Bed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Bath" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{unit?.bathrooms} Bath</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Square" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{unit?.squareFootage} sqft</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="DollarSign" size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium">
              NAD {unit?.rentAmount?.toLocaleString('en-NA')}
            </span>
          </div>
        </div>

        {/* Rent and Deposit */}
        <div className="bg-muted/30 rounded-md p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Monthly Rent</span>
            <span className="text-sm font-semibold text-foreground">
              NAD {unit?.rentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Security Deposit</span>
            <span className="text-sm text-foreground">
              NAD {unit?.deposit?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Tenant Information */}
        {unit?.status === 'occupied' && unit?.tenant && (
          <div className="bg-primary/5 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name="User" size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {unit?.tenant?.name}
                </span>
              </div>
              {unit?.rentCollectionStatus && (
                <span className={`text-xs font-medium capitalize ${getRentCollectionColor(unit?.rentCollectionStatus)}`}>
                  {unit?.rentCollectionStatus}
                </span>
              )}
            </div>
            {unit?.leaseExpiration && (
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Lease expires: {formatLeaseExpiration()}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Amenities */}
        {unit?.amenities?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-1">
              {unit?.amenities?.slice(0, 3)?.map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
              {unit?.amenities?.length > 3 && (
                <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                  +{unit?.amenities?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          {unit?.status === 'occupied' && unit?.tenant ? (
            <Button
              variant="default"
              size="sm"
              iconName="User"
              iconPosition="left"
              onClick={() => onViewTenant(unit)}
              className="flex-1"
            >
              View Tenant
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => onManageLease(unit)}
              className="flex-1"
            >
              Assign Tenant
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(unit)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(unit?.id)}
            className="text-error hover:text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default UnitCard;