import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const BuildingFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  buildingCount 
}) => {
  const buildingTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment Complex' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'compound', label: 'Residential Compound' },
    { value: 'house', label: 'Single House' }
  ];

  const occupancyOptions = [
    { value: '', label: 'All Occupancy' },
    { value: 'high', label: 'High (80%+)' },
    { value: 'medium', label: 'Medium (50-79%)' },
    { value: 'low', label: 'Low (<50%)' },
    { value: 'vacant', label: 'Vacant (0%)' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'occupancy', label: 'Occupancy (High to Low)' },
    { value: 'occupancy_desc', label: 'Occupancy (Low to High)' },
    { value: 'revenue', label: 'Revenue (High to Low)' },
    { value: 'revenue_desc', label: 'Revenue (Low to High)' },
    { value: 'created', label: 'Recently Added' },
    { value: 'created_desc', label: 'Oldest First' }
  ];

  const hasActiveFilters = filters?.search || filters?.type || filters?.occupancy || filters?.sort !== 'name';

  return (
    <div className="bg-card border border-border rounded-lg p-4 elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Filter Buildings</h3>
            <p className="text-sm text-muted-foreground">
              {buildingCount} {buildingCount === 1 ? 'building' : 'buildings'} found
            </p>
          </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Search buildings..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
        />

        {/* Building Type */}
        <Select
          placeholder="Filter by type"
          options={buildingTypeOptions}
          value={filters?.type}
          onChange={(value) => onFilterChange('type', value)}
        />

        {/* Occupancy Level */}
        <Select
          placeholder="Filter by occupancy"
          options={occupancyOptions}
          value={filters?.occupancy}
          onChange={(value) => onFilterChange('occupancy', value)}
        />

        {/* Sort By */}
        <Select
          placeholder="Sort by"
          options={sortOptions}
          value={filters?.sort}
          onChange={(value) => onFilterChange('sort', value)}
        />
      </div>
      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          {filters?.search && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <Icon name="Search" size={14} />
              <span>"{filters?.search}"</span>
              <button
                onClick={() => onFilterChange('search', '')}
                className="ml-1 hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.type && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <Icon name="Building2" size={14} />
              <span>{buildingTypeOptions?.find(opt => opt?.value === filters?.type)?.label}</span>
              <button
                onClick={() => onFilterChange('type', '')}
                className="ml-1 hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          
          {filters?.occupancy && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
              <Icon name="Users" size={14} />
              <span>{occupancyOptions?.find(opt => opt?.value === filters?.occupancy)?.label}</span>
              <button
                onClick={() => onFilterChange('occupancy', '')}
                className="ml-1 hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BuildingFilters;