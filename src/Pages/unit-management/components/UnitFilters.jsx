import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UnitFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  unitCount,
  onSelectAll,
  allSelected,
  someSelected
}) => {
  const buildings = [
    { value: '1', label: 'Sunset Apartments' },
    { value: '2', label: 'University Hostel' },
    { value: '3', label: 'Garden Compound' },
    { value: '4', label: 'Executive Villa' },
    { value: '5', label: 'City Center Flats' }
  ];

  const occupancyOptions = [
    { value: '', label: 'All Status' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'vacant', label: 'Vacant' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const rentRangeOptions = [
    { value: '', label: 'All Ranges' },
    { value: 'low', label: 'Under NAD 1,000' },
    { value: 'medium', label: 'NAD 1,000 - 1,500' },
    { value: 'high', label: 'Over NAD 1,500' }
  ];

  const sortOptions = [
    { value: 'unit_number', label: 'Unit Number (A-Z)' },
    { value: 'unit_number_desc', label: 'Unit Number (Z-A)' },
    { value: 'rent', label: 'Rent (High to Low)' },
    { value: 'rent_desc', label: 'Rent (Low to High)' },
    { value: 'status', label: 'Status' },
    { value: 'lease_expiration', label: 'Lease Expiration' }
  ];

  const hasActiveFilters = filters?.search || filters?.occupancy || filters?.rentRange || filters?.building;

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Filter Units
          </h3>
          <p className="text-sm text-muted-foreground">
            {unitCount} unit{unitCount !== 1 ? 's' : ''} found
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={allSelected}
              onCheckedChange={onSelectAll}
              className="data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground"
              ref={(el) => {
                if (el && someSelected && !allSelected) {
                  el.indeterminate = true;
                }
              }}
            />
            <span className="text-sm text-muted-foreground">
              Select All
            </span>
          </div>
          
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              iconName="X"
              iconPosition="left"
              onClick={onClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-1">
            Search Units
          </label>
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              placeholder="Unit number, building, or tenant..."
              value={filters?.search}
              onChange={(e) => onFilterChange('search', e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Building */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Building
          </label>
          <Select
            value={filters?.building}
            onValueChange={(value) => onFilterChange('building', value)}
          >
            <option value="">All Buildings</option>
            {buildings?.map((building) => (
              <option key={building?.value} value={building?.value}>
                {building?.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Occupancy Status */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Status
          </label>
          <Select
            value={filters?.occupancy}
            onValueChange={(value) => onFilterChange('occupancy', value)}
          >
            {occupancyOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Rent Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Rent Range
          </label>
          <Select
            value={filters?.rentRange}
            onValueChange={(value) => onFilterChange('rentRange', value)}
          >
            {rentRangeOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Sort By
          </label>
          <Select
            value={filters?.sort}
            onValueChange={(value) => onFilterChange('sort', value)}
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            
            {filters?.search && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Search: "{filters?.search}"
                <button
                  onClick={() => onFilterChange('search', '')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.building && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Building: {buildings?.find((b) => b?.value === filters?.building)?.label}
                <button
                  onClick={() => onFilterChange('building', '')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.occupancy && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Status: {occupancyOptions?.find((o) => o?.value === filters?.occupancy)?.label}
                <button
                  onClick={() => onFilterChange('occupancy', '')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.rentRange && (
              <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                Rent: {rentRangeOptions?.find((r) => r?.value === filters?.rentRange)?.label}
                <button
                  onClick={() => onFilterChange('rentRange', '')}
                  className="ml-1 hover:bg-primary/20 rounded"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitFilters;