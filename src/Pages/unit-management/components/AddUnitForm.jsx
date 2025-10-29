import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AddUnitForm = ({ onSubmit, onCancel, editingUnit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    unitNumber: '',
    building: '',
    buildingId: '',
    rentAmount: '',
    deposit: '',
    squareFootage: '',
    bedrooms: '1',
    bathrooms: '1',
    description: '',
    amenities: [],
    image: '',
    imageAlt: '',
    status: 'vacant'
  });

  const [errors, setErrors] = useState({});

  const buildings = [
    { id: 1, name: 'Sunset Apartments' },
    { id: 2, name: 'University Hostel' },
    { id: 3, name: 'Garden Compound' },
    { id: 4, name: 'Executive Villa' },
    { id: 5, name: 'City Center Flats' }
  ];

  const availableAmenities = [
    'Air Conditioning',
    'Balcony',
    'City View',
    'Parking',
    'Storage',
    'Dishwasher',
    'WiFi',
    'Study Desk',
    'Shared Kitchen',
    'Laundry',
    'Garden',
    'Garage',
    'Swimming Pool',
    'Security',
    'Elevator',
    '24/7 Security'
  ];

  const bedroomOptions = [
    { value: '0', label: 'Studio' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ];

  const bathroomOptions = [
    { value: '1', label: '1 Bathroom' },
    { value: '1.5', label: '1.5 Bathrooms' },
    { value: '2', label: '2 Bathrooms' },
    { value: '2.5', label: '2.5 Bathrooms' },
    { value: '3', label: '3+ Bathrooms' }
  ];

  const statusOptions = [
    { value: 'vacant', label: 'Vacant' },
    { value: 'occupied', label: 'Occupied' },
    { value: 'maintenance', label: 'Under Maintenance' }
  ];

  useEffect(() => {
    if (editingUnit) {
      setFormData({
        unitNumber: editingUnit?.unitNumber || '',
        building: editingUnit?.building || '',
        buildingId: editingUnit?.buildingId?.toString() || '',
        rentAmount: editingUnit?.rentAmount?.toString() || '',
        deposit: editingUnit?.deposit?.toString() || '',
        squareFootage: editingUnit?.squareFootage?.toString() || '',
        bedrooms: editingUnit?.bedrooms?.toString() || '1',
        bathrooms: editingUnit?.bathrooms?.toString() || '1',
        description: editingUnit?.description || '',
        amenities: editingUnit?.amenities || [],
        image: editingUnit?.image || '',
        imageAlt: editingUnit?.imageAlt || '',
        status: editingUnit?.status || 'vacant'
      });
    }
  }, [editingUnit]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleBuildingChange = (buildingId) => {
    const building = buildings?.find((b) => b?.id === parseInt(buildingId));
    setFormData((prev) => ({
      ...prev,
      buildingId,
      building: building?.name || ''
    }));
    if (errors?.buildingId) {
      setErrors((prev) => ({ ...prev, buildingId: null }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev?.amenities?.includes(amenity)
        ? prev?.amenities?.filter((a) => a !== amenity)
        : [...prev?.amenities, amenity]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.unitNumber?.trim()) {
      newErrors.unitNumber = 'Unit number is required';
    }

    if (!formData?.buildingId) {
      newErrors.buildingId = 'Building is required';
    }

    if (!formData?.rentAmount || parseFloat(formData?.rentAmount) <= 0) {
      newErrors.rentAmount = 'Valid rent amount is required';
    }

    if (!formData?.deposit || parseFloat(formData?.deposit) < 0) {
      newErrors.deposit = 'Valid deposit amount is required';
    }

    if (!formData?.squareFootage || parseInt(formData?.squareFootage) <= 0) {
      newErrors.squareFootage = 'Valid square footage is required';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Unit description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const unitData = {
        ...formData,
        rentAmount: parseFloat(formData?.rentAmount),
        deposit: parseFloat(formData?.deposit),
        squareFootage: parseInt(formData?.squareFootage),
        bedrooms: parseInt(formData?.bedrooms),
        bathrooms: parseFloat(formData?.bathrooms),
        buildingId: parseInt(formData?.buildingId),
        lastUpdated: new Date()?.toISOString(),
        tenant: formData?.status === 'occupied' ? formData?.tenant : null,
        leaseExpiration: formData?.status === 'occupied' ? formData?.leaseExpiration : null,
        rentCollectionStatus: formData?.status === 'occupied' ? 'current' : null
      };

      // Generate image if not provided
      if (!unitData?.image) {
        unitData.image = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267";
        unitData.imageAlt = `${unitData?.bedrooms} bedroom unit in ${unitData?.building}`;
      }

      await onSubmit(unitData);
    } catch (error) {
      console.error('Error submitting unit:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Plus" size={20} className="text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            {editingUnit ? 'Edit Unit' : 'Add New Unit'}
          </h3>
        </div>
        <Button variant="ghost" size="sm" iconName="X" onClick={onCancel} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Unit Number *
            </label>
            <Input
              placeholder="e.g., A101, B205"
              value={formData?.unitNumber}
              onChange={(e) => handleInputChange('unitNumber', e?.target?.value)}
              error={errors?.unitNumber}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Building *
            </label>
            <Select
              value={formData?.buildingId}
              onValueChange={handleBuildingChange}
              error={errors?.buildingId}
            >
              <option value="">Select Building</option>
              {buildings?.map((building) => (
                <option key={building?.id} value={building?.id?.toString()}>
                  {building?.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <Select
              value={formData?.status}
              onValueChange={(value) => handleInputChange('status', value)}
            >
              {statusOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Financial Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Monthly Rent (NAD) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                NAD
              </span>
              <Input
                type="number"
                placeholder="1,200.00"
                value={formData?.rentAmount}
                onChange={(e) => handleInputChange('rentAmount', e?.target?.value)}
                className="pl-12"
                min="0"
                step="0.01"
                error={errors?.rentAmount}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Security Deposit (NAD) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                NAD
              </span>
              <Input
                type="number"
                placeholder="2,400.00"
                value={formData?.deposit}
                onChange={(e) => handleInputChange('deposit', e?.target?.value)}
                className="pl-12"
                min="0"
                step="0.01"
                error={errors?.deposit}
              />
            </div>
          </div>
        </div>

        {/* Unit Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Square Footage *
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="650"
                value={formData?.squareFootage}
                onChange={(e) => handleInputChange('squareFootage', e?.target?.value)}
                min="1"
                error={errors?.squareFootage}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                sqft
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Bedrooms
            </label>
            <Select
              value={formData?.bedrooms}
              onValueChange={(value) => handleInputChange('bedrooms', value)}
            >
              {bedroomOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Bathrooms
            </label>
            <Select
              value={formData?.bathrooms}
              onValueChange={(value) => handleInputChange('bathrooms', value)}
            >
              {bathroomOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Unit Description *
          </label>
          <textarea
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            rows="3"
            placeholder="Describe the unit features, layout, and unique selling points..."
            value={formData?.description}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          {errors?.description && (
            <p className="text-sm text-error mt-1">{errors?.description}</p>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableAmenities?.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  checked={formData?.amenities?.includes(amenity)}
                  onCheckedChange={() => handleAmenityToggle(amenity)}
                />
                <span className="text-sm text-foreground">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image URL (Optional) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Unit Image URL (Optional)
          </label>
          <Input
            type="url"
            placeholder="https://example.com/unit-image.jpg"
            value={formData?.image}
            onChange={(e) => handleInputChange('image', e?.target?.value)}
          />
          <p className="text-xs text-muted-foreground mt-1">
            If not provided, a default image will be used
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            iconName="Save"
            iconPosition="left"
          >
            {editingUnit ? 'Update Unit' : 'Add Unit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUnitForm;