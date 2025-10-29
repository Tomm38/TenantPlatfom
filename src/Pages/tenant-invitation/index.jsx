import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PropertyContextBreadcrumbs from '../../components/ui/PropertyContextBreadcrumbs';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import components
import UnitContextCard from './components/UnitContextCard';
import InvitationForm from './components/InvitationForm';
import ExistingTenantSearch from './components/ExistingTenantSearch';
import InvitationPreview from './components/InvitationPreview';
import InvitationSuccess from './components/InvitationSuccess';

const TenantInvitation = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [activeTab, setActiveTab] = useState('new'); // 'new' or 'existing'
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [successData, setSuccessData] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  useEffect(() => {
    // Check if unit was passed from building management
    const state = location?.state;
    if (state && state?.selectedUnit) {
      setSelectedUnit(state?.selectedUnit);
    } else {
      // Load landlord units from Supabase
      (async () => {
        setLoadingUnits(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.id) {
          const { data } = await supabase
            .from('units')
            .select('id, number, type, rent_amount, deposit_amount, status, property:properties(id, name, address)')
            .in('property_id', (
              await supabase.from('properties').select('id').eq('landlord_id', user.id)
            ).data?.map(p => p.id) || []);
          const mapped = (data || []).map(u => ({
            id: u.id,
            buildingName: u.property?.name,
            unitNumber: u.number,
            unitType: u.type,
            rentAmount: u.rent_amount,
            depositAmount: u.deposit_amount,
            address: u.property?.address,
            status: u.status
          }));
          setUnits(mapped);
          setSelectedUnit(mapped?.[0] || null);
        }
        setLoadingUnits(false);
      })();
    }
  }, [location?.state]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleUnitSelection = (unit) => {
    setSelectedUnit(unit);
    setSelectedTenant(null);
  };

  const handleTenantSelection = (tenant) => {
    setSelectedTenant(tenant);
    setActiveTab('existing');
  };

  const handleSendInvitation = (invitationData) => {
    setSuccessData(invitationData);
    setShowSuccess(true);
  };

  const handlePreviewEmail = (invitationData) => {
    setPreviewData(invitationData);
    setShowPreview(true);
  };

  const handleSendAnother = () => {
    setShowSuccess(false);
    setSuccessData(null);
    setSelectedTenant(null);
    setActiveTab('new');
  };

  const handleSelectDifferentUnit = () => {
    navigate('/building-management');
  };

  const customBreadcrumbs = [
    {
      label: 'Dashboard',
      path: '/landlord-dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Buildings',
      path: '/building-management',
      icon: 'Building2'
    },
    {
      label: 'Tenant Invitation',
      path: '/tenant-invitation',
      icon: 'UserPlus'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="landlord" 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={handleToggleSidebar}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleToggleSidebar}
        userRole="landlord"
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pt-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <PropertyContextBreadcrumbs customBreadcrumbs={customBreadcrumbs} />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="UserPlus" size={20} color="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Tenant Invitation</h1>
                  <p className="text-muted-foreground">
                    Invite tenants to units and manage the onboarding process
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <NotificationIndicator userRole="landlord" />
              <Button
                variant="outline"
                onClick={handleSelectDifferentUnit}
                iconName="Building2"
                iconPosition="left"
              >
                Select Different Unit
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Unit Context */}
            <div className="xl:col-span-1">
              <UnitContextCard selectedUnit={selectedUnit} />

              {/* Available Units */}
              {units?.length > 1 && (
                <div className="mt-6 bg-card border border-border rounded-lg p-4 elevation-1">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Other Available Units</h3>
                  <div className="space-y-2">
                    {units?.filter(unit => unit?.id !== selectedUnit?.id)?.slice(0, 3)?.map((unit) => (
                      <button
                        key={unit?.id}
                        onClick={() => handleUnitSelection(unit)}
                        className="w-full text-left p-3 rounded-md border border-border hover:bg-muted/50 transition-smooth"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-foreground">{unit?.buildingName}</p>
                            <p className="text-xs text-muted-foreground">Unit {unit?.unitNumber}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-foreground">
                              NAD {unit?.rentAmount?.toLocaleString('en-NA')}
                            </p>
                            <p className="text-xs text-success">Available</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Invitation Forms */}
            <div className="xl:col-span-2 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-card border border-border rounded-lg p-1 elevation-1">
                <div className="flex space-x-1">
                  <button
                    onClick={() => setActiveTab('new')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                      activeTab === 'new' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name="UserPlus" size={16} />
                    <span>New Tenant Invitation</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('existing')}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                      activeTab === 'existing' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name="Search" size={16} />
                    <span>Search Existing Tenants</span>
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === 'new' ? (
                <InvitationForm 
                  selectedUnit={selectedUnit}
                  onSendInvitation={handleSendInvitation}
                  onPreviewEmail={handlePreviewEmail}
                />
              ) : (
                <ExistingTenantSearch 
                  onSelectTenant={handleTenantSelection}
                />
              )}

              {/* Selected Tenant Display */}
              {selectedTenant && activeTab === 'existing' && (
                <div className="bg-card border border-border rounded-lg p-6 elevation-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                      <Icon name="CheckCircle" size={20} color="white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Selected Tenant</h3>
                      <p className="text-sm text-muted-foreground">Ready to send invitation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <img
                        src={selectedTenant?.avatar}
                        alt={selectedTenant?.avatarAlt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{selectedTenant?.name}</h4>
                      <p className="text-sm text-muted-foreground">{selectedTenant?.email}</p>
                      <p className="text-sm text-muted-foreground">{selectedTenant?.phone}</p>
                    </div>
                  </div>

                  <InvitationForm 
                    selectedUnit={selectedUnit}
                    selectedTenant={selectedTenant}
                    onSendInvitation={handleSendInvitation}
                    onPreviewEmail={handlePreviewEmail}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      {showPreview && (
        <InvitationPreview
          invitationData={previewData}
          selectedUnit={selectedUnit}
          onClose={() => setShowPreview(false)}
        />
      )}
      {showSuccess && (
        <InvitationSuccess
          invitationData={successData}
          onSendAnother={handleSendAnother}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default TenantInvitation;