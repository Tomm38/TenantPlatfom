import React, { useEffect, useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DEFAULT_FORM = {
  id: null,
  name: '',
  address: '',
  type: 'apartment',
  description: '',
  totalUnits: 0,
  occupiedUnits: 0,
  monthlyRevenue: 0,
  image: '',
  imageAlt: ''
};

const AddBuildingForm = ({ onSubmit, onCancel, editingBuilding }) => {
  const [formValues, setFormValues] = useState(DEFAULT_FORM);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingBuilding) {
      setFormValues({
        ...DEFAULT_FORM,
        ...editingBuilding
      });
    } else {
      setFormValues(DEFAULT_FORM);
    }
  }, [editingBuilding]);

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleNumberChange = (key, value) => {
    const parsed = Number(value);
    handleChange(key, Number.isFinite(parsed) ? parsed : 0);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      ...formValues,
      id: editingBuilding?.id ?? Date.now(),
      createdAt: editingBuilding?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      await onSubmit?.(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="bg-card border rounded-lg p-4 space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          placeholder="e.g. Sunset Apartments"
          value={formValues.name}
          onChange={(e) => handleChange('name', e?.target?.value)}
          required
        />

        <Select
          label="Type"
          value={formValues.type}
          onChange={(e) => handleChange('type', e?.target?.value)}
          options={[
            { label: 'Apartment', value: 'apartment' },
            { label: 'Hostel', value: 'hostel' },
            { label: 'Compound', value: 'compound' },
            { label: 'House', value: 'house' }
          ]}
        />

        <Input
          label="Total Units"
          type="number"
          min={0}
          value={formValues.totalUnits}
          onChange={(e) => handleNumberChange('totalUnits', e?.target?.value)}
        />

        <Input
          label="Occupied Units"
          type="number"
          min={0}
          value={formValues.occupiedUnits}
          onChange={(e) => handleNumberChange('occupiedUnits', e?.target?.value)}
        />

        <Input
          label="Monthly Revenue (N$)"
          type="number"
          min={0}
          step="0.01"
          value={formValues.monthlyRevenue}
          onChange={(e) => handleNumberChange('monthlyRevenue', e?.target?.value)}
        />

        <Input
          label="Image URL"
          placeholder="https://..."
          value={formValues.image}
          onChange={(e) => handleChange('image', e?.target?.value)}
        />

        <Input
          label="Image Alt"
          placeholder="Building image description"
          value={formValues.imageAlt}
          onChange={(e) => handleChange('imageAlt', e?.target?.value)}
        />

        <div className="md:col-span-2">
          <Input
            label="Address"
            placeholder="Street, Suburb, City"
            value={formValues.address}
            onChange={(e) => handleChange('address', e?.target?.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Input
            label="Description"
            placeholder="Short description"
            value={formValues.description}
            onChange={(e) => handleChange('description', e?.target?.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="default" disabled={submitting}>
          {editingBuilding ? 'Save Changes' : 'Add Building'}
        </Button>
      </div>
    </form>
  );
};

export default AddBuildingForm;


