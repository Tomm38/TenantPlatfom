import React from 'react';
import Icon from '../../../components/AppIcon';

const UnitContextCard = ({ selectedUnit }) => {
  if (!selectedUnit) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 elevation-1">
        <div className="text-center py-8">
          <Icon name="Home" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Unit Selected</h3>
          <p className="text-muted-foreground">
            Please select a unit from Building Management to send an invitation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Home" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Unit Details</h3>
          <p className="text-sm text-muted-foreground">Selected unit for tenant invitation</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Building</label>
            <p className="text-foreground font-medium">{selectedUnit?.buildingName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Unit Number</label>
            <p className="text-foreground font-medium">{selectedUnit?.unitNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Unit Type</label>
            <p className="text-foreground">{selectedUnit?.unitType}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
            <p className="text-foreground font-semibold text-lg">NAD {selectedUnit?.rentAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Security Deposit</label>
            <p className="text-foreground font-medium">NAD {selectedUnit?.depositAmount?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Status</label>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-success font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Address</span>
        </div>
        <p className="text-sm text-muted-foreground">{selectedUnit?.address}</p>
      </div>
    </div>
  );
};

export default UnitContextCard;