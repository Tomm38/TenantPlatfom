import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BuildingCard = ({ building, onEdit, onViewUnits, onDelete }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'apartment':
        return 'Building2';
      case 'hostel':
        return 'Users';
      case 'compound':
        return 'Home';
      case 'house':
        return 'House';
      default:
        return 'Building';
    }
  };

  const getOccupancyColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const occupancyPercentage = building?.totalUnits > 0 
    ? Math.round((building?.occupiedUnits / building?.totalUnits) * 100) 
    : 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1 hover:elevation-2 transition-smooth">
      {/* Building Image */}
      <div className="relative mb-4 overflow-hidden rounded-md h-48">
        <Image
          src={building?.image}
          alt={building?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-card/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
            <Icon name={getTypeIcon(building?.type)} size={16} className="text-primary" />
            <span className="text-xs font-medium text-foreground capitalize">
              {building?.type}
            </span>
          </div>
        </div>
      </div>
      {/* Building Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {building?.name}
          </h3>
          <div className="flex items-start space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {building?.address}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Home" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {building?.totalUnits} Units
              </span>
            </div>
          </div>
          <div className="bg-muted/30 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className={getOccupancyColor(occupancyPercentage)} />
              <span className={`text-sm font-medium ${getOccupancyColor(occupancyPercentage)}`}>
                {occupancyPercentage}% Occupied
              </span>
            </div>
          </div>
        </div>

        {/* Occupancy Details */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Occupied Units</span>
            <span className="text-foreground font-medium">
              {building?.occupiedUnits} / {building?.totalUnits}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                occupancyPercentage >= 90 ? 'bg-success' :
                occupancyPercentage >= 70 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-primary/5 rounded-md p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">Monthly Revenue</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              NAD {building?.monthlyRevenue?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewUnits(building?.id)}
            className="flex-1"
          >
            View Units
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(building)}
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(building?.id)}
            className="text-error hover:text-error"
          />
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;