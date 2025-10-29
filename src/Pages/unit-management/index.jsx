import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PropertyContextBreadcrumbs from '../../components/ui/PropertyContextBreadcrumbs';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UnitCard from './components/UnitCard';
import AddUnitForm from './components/AddUnitForm';
import UnitFilters from './components/UnitFilters';
import UnitStats from './components/UnitStats';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const UnitManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUnit, setEditingUnit] = useState(null);
  const [units, setUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, unitId: null, unitNumber: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    occupancy: '',
    rentRange: '',
    building: '',
    sort: 'unit_number'
  });

  // Mock units data
  useEffect(() => {
    const mockUnits = [
    {
      id: 1,
      unitNumber: "A101",
      building: "Sunset Apartments",
      buildingId: 1,
      rentAmount: 1200.00,
      deposit: 2400.00,
      squareFootage: 650,
      bedrooms: 1,
      bathrooms: 1,
      description: "Modern studio apartment with city view and balcony",
      amenities: ["Air Conditioning", "Balcony", "City View", "Parking"],
      status: "occupied",
      tenant: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        phone: "+264 81 123 4567",
        leaseStart: "2024-03-01",
        leaseEnd: "2025-02-28"
      },
      image: "https://images.unsplash.com/photo-1631048730596-010b70c1e8e3",
      imageAlt: "Modern apartment interior with living room and kitchen area",
      lastUpdated: "2024-10-20T10:30:00Z",
      leaseExpiration: "2025-02-28",
      rentCollectionStatus: "current"
    },
    {
      id: 2,
      unitNumber: "A102",
      building: "Sunset Apartments",
      buildingId: 1,
      rentAmount: 1400.00,
      deposit: 2800.00,
      squareFootage: 800,
      bedrooms: 2,
      bathrooms: 1,
      description: "Spacious two-bedroom apartment with modern kitchen",
      amenities: ["Air Conditioning", "Dishwasher", "Parking", "Storage"],
      status: "vacant",
      tenant: null,
      image: "https://images.unsplash.com/photo-1631048730593-ca60afc95eb7",
      imageAlt: "Two-bedroom apartment with open floor plan and modern fixtures",
      lastUpdated: "2024-10-15T14:20:00Z",
      leaseExpiration: null,
      rentCollectionStatus: null
    },
    {
      id: 3,
      unitNumber: "B205",
      building: "University Hostel",
      buildingId: 2,
      rentAmount: 800.00,
      deposit: 1600.00,
      squareFootage: 400,
      bedrooms: 1,
      bathrooms: 1,
      description: "Student-friendly unit near campus with study area",
      amenities: ["WiFi", "Study Desk", "Shared Kitchen", "Laundry"],
      status: "occupied",
      tenant: {
        name: "Michael Peters",
        email: "michael.peters@unam.na",
        phone: "+264 81 234 5678",
        leaseStart: "2024-01-15",
        leaseEnd: "2024-12-15"
      },
      image: "https://images.unsplash.com/photo-1671508191629-33e2e5a4732f",
      imageAlt: "Student accommodation with single bed and study area",
      lastUpdated: "2024-10-22T09:15:00Z",
      leaseExpiration: "2024-12-15",
      rentCollectionStatus: "overdue"
    },
    {
      id: 4,
      unitNumber: "C301",
      building: "Garden Compound",
      buildingId: 3,
      rentAmount: 1800.00,
      deposit: 3600.00,
      squareFootage: 1200,
      bedrooms: 3,
      bathrooms: 2,
      description: "Family home with garden access and garage",
      amenities: ["Garden", "Garage", "Swimming Pool", "Security", "Air Conditioning"],
      status: "maintenance",
      tenant: null,
      image: "https://images.unsplash.com/photo-1633109741715-59b57495bbdc",
      imageAlt: "Three-bedroom house with garden and outdoor seating area",
      lastUpdated: "2024-10-18T16:45:00Z",
      leaseExpiration: null,
      rentCollectionStatus: null
    },
    {
      id: 5,
      unitNumber: "D101",
      building: "City Center Flats",
      buildingId: 5,
      rentAmount: 1600.00,
      deposit: 3200.00,
      squareFootage: 900,
      bedrooms: 2,
      bathrooms: 2,
      description: "Downtown apartment with retail access",
      amenities: ["City View", "Elevator", "Parking", "24/7 Security"],
      status: "occupied",
      tenant: {
        name: "Anna Williams",
        email: "anna.williams@email.com",
        phone: "+264 81 345 6789",
        leaseStart: "2024-06-01",
        leaseEnd: "2025-05-31"
      },
      image: "https://images.unsplash.com/photo-1631049552178-437cbf15aadc",
      imageAlt: "Modern downtown apartment with city skyline view",
      lastUpdated: "2024-10-21T11:30:00Z",
      leaseExpiration: "2025-05-31",
      rentCollectionStatus: "current"
    }];


    setUnits(mockUnits);
    setFilteredUnits(mockUnits);
  }, []);

  // Filter and sort units
  useEffect(() => {
    let filtered = [...units];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter((unit) =>
      unit?.unitNumber?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      unit?.building?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      unit?.tenant?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Occupancy filter
    if (filters?.occupancy) {
      filtered = filtered?.filter((unit) => unit?.status === filters?.occupancy);
    }

    // Rent range filter
    if (filters?.rentRange) {
      filtered = filtered?.filter((unit) => {
        switch (filters?.rentRange) {
          case 'low':
            return unit?.rentAmount < 1000;
          case 'medium':
            return unit?.rentAmount >= 1000 && unit?.rentAmount <= 1500;
          case 'high':
            return unit?.rentAmount > 1500;
          default:
            return true;
        }
      });
    }

    // Building filter
    if (filters?.building) {
      filtered = filtered?.filter((unit) => unit?.buildingId === parseInt(filters?.building));
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'unit_number':
          return a?.unitNumber?.localeCompare(b?.unitNumber);
        case 'unit_number_desc':
          return b?.unitNumber?.localeCompare(a?.unitNumber);
        case 'rent':
          return b?.rentAmount - a?.rentAmount;
        case 'rent_desc':
          return a?.rentAmount - b?.rentAmount;
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'lease_expiration':
          const aDate = a?.leaseExpiration ? new Date(a?.leaseExpiration) : new Date(2099, 12, 31);
          const bDate = b?.leaseExpiration ? new Date(b?.leaseExpiration) : new Date(2099, 12, 31);
          return aDate - bDate;
        default:
          return 0;
      }
    });

    setFilteredUnits(filtered);
  }, [units, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      occupancy: '',
      rentRange: '',
      building: '',
      sort: 'unit_number'
    });
  };

  const handleAddUnit = async (unitData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingUnit) {
      setUnits((prev) => prev?.map((unit) =>
      unit?.id === editingUnit?.id ? { ...unitData, id: editingUnit?.id } : unit
      ));
      setEditingUnit(null);
    } else {
      const newUnit = { ...unitData, id: Date.now() };
      setUnits((prev) => [...prev, newUnit]);
    }

    setShowAddForm(false);
  };

  const handleEditUnit = (unit) => {
    setEditingUnit(unit);
    setShowAddForm(true);
  };

  const handleDeleteUnit = (unitId) => {
    const unit = units?.find((u) => u?.id === unitId);
    setDeleteModal({
      isOpen: true,
      unitId,
      unitNumber: unit?.unitNumber || ''
    });
  };

  const confirmDelete = async () => {
    setIsDeleting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setUnits((prev) => prev?.filter((unit) => unit?.id !== deleteModal?.unitId));
    setDeleteModal({ isOpen: false, unitId: null, unitNumber: '' });
    setIsDeleting(false);
  };

  const handleViewTenant = (unit) => {
    if (unit?.tenant) {
      navigate(`/tenant-profile/${unit?.tenant?.id || unit?.id}`);
    }
  };

  const handleManageLease = (unit) => {
    navigate(`/lease-management/${unit?.id}`);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingUnit(null);
  };

  const handleSelectUnit = (unitId, selected) => {
    setSelectedUnits((prev) => {
      if (selected) {
        return [...prev, unitId];
      } else {
        return prev?.filter((id) => id !== unitId);
      }
    });
  };

  const handleSelectAll = (selected) => {
    if (selected) {
      setSelectedUnits(filteredUnits?.map((unit) => unit?.id));
    } else {
      setSelectedUnits([]);
    }
  };

  const handleBulkRentAdjustment = () => {
    // Navigate to bulk rent adjustment
    navigate(`/bulk-rent-adjustment?units=${selectedUnits?.join(',')}`);
  };

  const handleBulkMaintenanceSchedule = () => {
    // Navigate to bulk maintenance scheduling
    navigate(`/bulk-maintenance?units=${selectedUnits?.join(',')}`);
  };

  useEffect(() => {
    setShowBulkActions(selectedUnits?.length > 0);
  }, [selectedUnits]);

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="landlord"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />


      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="landlord" />


      <main className={`
        transition-all duration-300 ease-in-out pt-4 pb-8
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <PropertyContextBreadcrumbs />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Unit Management
              </h1>
              <p className="text-muted-foreground">
                Configure and manage individual rental units within your properties
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationIndicator userRole="landlord" />
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowAddForm(true)}>

                Add Unit
              </Button>
            </div>
          </div>

          {/* Unit Stats */}
          <UnitStats units={units} />

          {/* Bulk Actions Bar */}
          {showBulkActions &&
          <div className="mb-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-foreground">
                    {selectedUnits?.length} unit{selectedUnits?.length !== 1 ? 's' : ''} selected
                  </span>
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedUnits([])}>

                    Clear Selection
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                  variant="outline"
                  size="sm"
                  iconName="DollarSign"
                  iconPosition="left"
                  onClick={handleBulkRentAdjustment}>

                    Adjust Rent
                  </Button>
                  <Button
                  variant="outline"
                  size="sm"
                  iconName="Wrench"
                  iconPosition="left"
                  onClick={handleBulkMaintenanceSchedule}>

                    Schedule Maintenance
                  </Button>
                </div>
              </div>
            </div>
          }

          {/* Add/Edit Unit Form */}
          {showAddForm &&
          <div className="mb-8">
              <AddUnitForm
              onSubmit={handleAddUnit}
              onCancel={handleCancelForm}
              editingUnit={editingUnit} />

            </div>
          }

          {/* Filters */}
          <UnitFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            unitCount={filteredUnits?.length}
            onSelectAll={handleSelectAll}
            allSelected={selectedUnits?.length === filteredUnits?.length && filteredUnits?.length > 0}
            someSelected={selectedUnits?.length > 0} />


          {/* Units Grid */}
          {filteredUnits?.length === 0 ?
          <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Home" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {units?.length === 0 ? 'No Units Yet' : 'No Units Found'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {units?.length === 0 ?
              'Start by adding your first rental unit to begin managing tenants and leases.' : 'Try adjusting your filters or search terms to find the units you\'re looking for.'
              }
              </p>
              {units?.length === 0 &&
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddForm(true)}>

                  Add Your First Unit
                </Button>
            }
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnits?.map((unit) =>
            <UnitCard
              key={unit?.id}
              unit={unit}
              onEdit={handleEditUnit}
              onViewTenant={handleViewTenant}
              onManageLease={handleManageLease}
              onDelete={handleDeleteUnit}
              onSelect={handleSelectUnit}
              isSelected={selectedUnits?.includes(unit?.id)} />

            )}
            </div>
          }
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, unitId: null, unitNumber: '' })}
        onConfirm={confirmDelete}
        unitNumber={deleteModal?.unitNumber}
        isDeleting={isDeleting} />

    </div>);

};

export default UnitManagement;