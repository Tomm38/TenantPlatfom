import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PropertyContextBreadcrumbs from '../../components/ui/PropertyContextBreadcrumbs';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BuildingCard from './components/BuildingCard';
import AddBuildingForm from './components/AddBuildingForm';
import BuildingFilters from './components/BuildingFilters';
import BuildingStats from './components/BuildingStats';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

const BuildingManagement = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, buildingId: null, buildingName: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    occupancy: '',
    sort: 'name'
  });

  // Mock buildings data
  useEffect(() => {
    const mockBuildings = [
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Independence Avenue, Windhoek Central, Windhoek",
      type: "apartment",
      description: "Modern apartment complex with 24/7 security and parking",
      totalUnits: 24,
      occupiedUnits: 20,
      monthlyRevenue: 28800.00,
      image: "https://images.unsplash.com/photo-1674400008619-5a52677ce724",
      imageAlt: "Modern apartment complex with glass facade and landscaped entrance courtyard",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-10-20T14:30:00Z"
    },
    {
      id: 2,
      name: "University Hostel",
      address: "456 Robert Mugabe Avenue, Pioneerspark, Windhoek",
      type: "hostel",
      description: "Student accommodation near University of Namibia",
      totalUnits: 48,
      occupiedUnits: 45,
      monthlyRevenue: 36000.00,
      image: "https://images.unsplash.com/photo-1699021563914-0ad4d300e8c8",
      imageAlt: "Multi-story student hostel building with red brick exterior and communal areas",
      createdAt: "2024-02-10T09:15:00Z",
      updatedAt: "2024-10-22T11:45:00Z"
    },
    {
      id: 3,
      name: "Garden Compound",
      address: "789 Sam Nujoma Drive, Klein Windhoek, Windhoek",
      type: "compound",
      description: "Secure residential compound with swimming pool and gym",
      totalUnits: 12,
      occupiedUnits: 8,
      monthlyRevenue: 18000.00,
      image: "https://images.unsplash.com/photo-1728915871127-859f0749aa87",
      imageAlt: "Gated residential compound with white houses and manicured gardens",
      createdAt: "2024-03-05T16:20:00Z",
      updatedAt: "2024-10-21T08:10:00Z"
    },
    {
      id: 4,
      name: "Executive Villa",
      address: "321 Nelson Mandela Avenue, Ludwigsdorf, Windhoek",
      type: "house",
      description: "Luxury single house with private garden and garage",
      totalUnits: 1,
      occupiedUnits: 1,
      monthlyRevenue: 4500.00,
      image: "https://images.unsplash.com/photo-1663864876095-5289b9ee6838",
      imageAlt: "Luxury two-story house with modern architecture and landscaped front yard",
      createdAt: "2024-04-12T12:30:00Z",
      updatedAt: "2024-10-23T09:00:00Z"
    },
    {
      id: 5,
      name: "City Center Flats",
      address: "654 Independence Avenue, Windhoek Central, Windhoek",
      type: "apartment",
      description: "Downtown apartments with city views and retail spaces",
      totalUnits: 18,
      occupiedUnits: 12,
      monthlyRevenue: 21600.00,
      image: "https://images.unsplash.com/photo-1623477104513-d8597d7e6706",
      imageAlt: "High-rise apartment building in city center with glass windows and urban skyline view",
      createdAt: "2024-05-08T14:45:00Z",
      updatedAt: "2024-10-19T16:20:00Z"
    }];


    setBuildings(mockBuildings);
    setFilteredBuildings(mockBuildings);
  }, []);

  // Filter and sort buildings
  useEffect(() => {
    let filtered = [...buildings];

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter((building) =>
      building?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
      building?.address?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Type filter
    if (filters?.type) {
      filtered = filtered?.filter((building) => building?.type === filters?.type);
    }

    // Occupancy filter
    if (filters?.occupancy) {
      filtered = filtered?.filter((building) => {
        const occupancyRate = building?.totalUnits > 0 ?
        building?.occupiedUnits / building?.totalUnits * 100 :
        0;

        switch (filters?.occupancy) {
          case 'high':
            return occupancyRate >= 80;
          case 'medium':
            return occupancyRate >= 50 && occupancyRate < 80;
          case 'low':
            return occupancyRate > 0 && occupancyRate < 50;
          case 'vacant':
            return occupancyRate === 0;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered?.sort((a, b) => {
      switch (filters?.sort) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'name_desc':
          return b?.name?.localeCompare(a?.name);
        case 'occupancy':
          return b?.occupiedUnits / b?.totalUnits - a?.occupiedUnits / a?.totalUnits;
        case 'occupancy_desc':
          return a?.occupiedUnits / a?.totalUnits - b?.occupiedUnits / b?.totalUnits;
        case 'revenue':
          return b?.monthlyRevenue - a?.monthlyRevenue;
        case 'revenue_desc':
          return a?.monthlyRevenue - b?.monthlyRevenue;
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'created_desc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    setFilteredBuildings(filtered);
  }, [buildings, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      type: '',
      occupancy: '',
      sort: 'name'
    });
  };

  const handleAddBuilding = async (buildingData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingBuilding) {
      setBuildings((prev) => prev?.map((building) =>
      building?.id === editingBuilding?.id ? buildingData : building
      ));
      setEditingBuilding(null);
    } else {
      setBuildings((prev) => [...prev, buildingData]);
    }

    setShowAddForm(false);
  };

  const handleEditBuilding = (building) => {
    setEditingBuilding(building);
    setShowAddForm(true);
  };

  const handleDeleteBuilding = (buildingId) => {
    const building = buildings?.find((b) => b?.id === buildingId);
    setDeleteModal({
      isOpen: true,
      buildingId,
      buildingName: building?.name || ''
    });
  };

  const confirmDelete = async () => {
    setIsDeleting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setBuildings((prev) => prev?.filter((building) => building?.id !== deleteModal?.buildingId));
    setDeleteModal({ isOpen: false, buildingId: null, buildingName: '' });
    setIsDeleting(false);
  };

  const handleViewUnits = (buildingId) => {
    // Navigate to units management for this building
    navigate(`/building-management/${buildingId}/units`);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingBuilding(null);
  };

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
                Building Management
              </h1>
              <p className="text-muted-foreground">
                Manage your rental properties, units, and tenant assignments
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationIndicator userRole="landlord" />
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setShowAddForm(true)}>

                Add Building
              </Button>
            </div>
          </div>

          {/* Building Stats */}
          <BuildingStats buildings={buildings} />

          {/* Add/Edit Building Form */}
          {showAddForm &&
          <div className="mb-8">
              <AddBuildingForm
              onSubmit={handleAddBuilding}
              onCancel={handleCancelForm}
              editingBuilding={editingBuilding} />

            </div>
          }

          {/* Filters */}
          <BuildingFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            buildingCount={filteredBuildings?.length} />


          {/* Buildings Grid */}
          {filteredBuildings?.length === 0 ?
          <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Building2" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {buildings?.length === 0 ? 'No Buildings Yet' : 'No Buildings Found'}
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {buildings?.length === 0 ?
              'Start by adding your first rental property to begin managing units and tenants.' : 'Try adjusting your filters or search terms to find the buildings you\'re looking for.'
              }
              </p>
              {buildings?.length === 0 &&
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddForm(true)}>

                  Add Your First Building
                </Button>
            }
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuildings?.map((building) =>
            <BuildingCard
              key={building?.id}
              building={building}
              onEdit={handleEditBuilding}
              onViewUnits={handleViewUnits}
              onDelete={handleDeleteBuilding} />

            )}
            </div>
          }
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal?.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, buildingId: null, buildingName: '' })}
        onConfirm={confirmDelete}
        buildingName={deleteModal?.buildingName}
        isDeleting={isDeleting} />

    </div>);

};

export default BuildingManagement;