import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { getAllProperties } from '../../../services/adminService';

const PropertyOverview = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const result = await getAllProperties();
      if (result.data) {
        setProperties(result.data);
      }
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">All Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-foreground mb-2">{property.name}</h4>
              <p className="text-sm text-muted-foreground mb-2">{property.address}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Units: {property.unitsCount}</span>
                <span className="text-primary font-medium">NAD {property.monthlyRevenue.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;

