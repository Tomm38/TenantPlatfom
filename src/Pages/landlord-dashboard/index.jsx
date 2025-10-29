import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PropertyContextBreadcrumbs from '../../components/ui/PropertyContextBreadcrumbs';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import PropertyCard from './components/PropertyCard';
import UnitsTable from './components/UnitsTable';
import TenantsTable from './components/TenantsTable';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const LandlordDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Mock data for dashboard metrics
  const dashboardMetrics = [
    {
      title: 'Total Properties',
      value: '12',
      subtitle: 'Active buildings',
      icon: 'Building2',
      trend: 'up',
      trendValue: '+2 this month'
    },
    {
      title: 'Occupied Units',
      value: '45',
      subtitle: 'Out of 52 units',
      icon: 'Home',
      trend: 'up',
      trendValue: '86.5%'
    },
    {
      title: 'Vacant Units',
      value: '7',
      subtitle: 'Available for rent',
      icon: 'Key',
      priority: 'warning',
      trend: 'down',
      trendValue: '13.5%'
    },
    {
      title: 'Monthly Revenue',
      value: 'NAD 89,400',
      subtitle: 'October 2025',
      icon: 'DollarSign',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Pending Payments',
      value: 'NAD 15,600',
      subtitle: '8 overdue payments',
      icon: 'AlertCircle',
      priority: 'error',
      trend: 'up',
      trendValue: '8 tenants'
    },
    {
      title: 'Maintenance Requests',
      value: '3',
      subtitle: '2 urgent, 1 routine',
      icon: 'Wrench',
      priority: 'warning',
      trend: 'down',
      trendValue: '-2 this week'
    }
  ];

  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Independence Ave, Windhoek',
      type: 'apartment',
      totalUnits: 12,
      occupiedUnits: 10,
      occupancyRate: 83,
      monthlyRevenue: 24000,
      pendingPayments: 4800
    },
    {
      id: 2,
      name: 'Garden View Complex',
      address: '456 Sam Nujoma Drive, Windhoek',
      type: 'apartment',
      totalUnits: 18,
      occupiedUnits: 16,
      occupancyRate: 89,
      monthlyRevenue: 36000,
      pendingPayments: 7200
    },
    {
      id: 3,
      name: 'Student Hostel Central',
      address: '789 University Road, Windhoek',
      type: 'hostel',
      totalUnits: 22,
      occupiedUnits: 19,
      occupancyRate: 86,
      monthlyRevenue: 29400,
      pendingPayments: 3600
    }
  ];

  // Mock data for units
  const units = [
    {
      id: 1,
      unit: 'A101',
      building: 'Sunset Apartments',
      address: '123 Independence Ave',
      type: '2 Bedroom',
      rent: 2400,
      deposit: 2400,
      tenant: 'John Kamati',
      tenantEmail: 'john.kamati@email.com',
      status: 'occupied',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      unit: 'A102',
      building: 'Sunset Apartments',
      address: '123 Independence Ave',
      type: '1 Bedroom',
      rent: 1800,
      deposit: 1800,
      tenant: 'Maria Nghidinwa',
      tenantEmail: 'maria.nghidinwa@email.com',
      status: 'occupied',
      paymentStatus: 'pending'
    },
    {
      id: 3,
      unit: 'B201',
      building: 'Garden View Complex',
      address: '456 Sam Nujoma Drive',
      type: '3 Bedroom',
      rent: 3200,
      deposit: 3200,
      tenant: null,
      tenantEmail: null,
      status: 'vacant',
      paymentStatus: 'n/a'
    },
    {
      id: 4,
      unit: 'C105',
      building: 'Student Hostel Central',
      address: '789 University Road',
      type: 'Single Room',
      rent: 1200,
      deposit: 1200,
      tenant: 'Peter Shikongo',
      tenantEmail: 'peter.shikongo@email.com',
      status: 'occupied',
      paymentStatus: 'overdue'
    }
  ];

  // Mock data for tenants
  const tenants = [
    {
      id: 1,
      name: 'John Kamati',
      email: 'john.kamati@email.com',
      phone: '+264 81 234 5678',
      unit: 'A101',
      building: 'Sunset Apartments',
      rent: 2400,
      leaseStart: '2025-01-01',
      leaseEnd: '2025-12-31',
      leaseStatus: 'active',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      name: 'Maria Nghidinwa',
      email: 'maria.nghidinwa@email.com',
      phone: '+264 81 345 6789',
      unit: 'A102',
      building: 'Sunset Apartments',
      rent: 1800,
      leaseStart: '2025-02-01',
      leaseEnd: '2026-01-31',
      leaseStatus: 'active',
      paymentStatus: 'pending'
    },
    {
      id: 3,
      name: 'Peter Shikongo',
      email: 'peter.shikongo@email.com',
      phone: '+264 81 456 7890',
      unit: 'C105',
      building: 'Student Hostel Central',
      rent: 1200,
      leaseStart: '2025-01-15',
      leaseEnd: '2025-11-15',
      leaseStatus: 'expiring',
      paymentStatus: 'overdue'
    },
    {
      id: 4,
      name: 'Sarah Hamutenya',
      email: 'sarah.hamutenya@email.com',
      phone: '+264 81 567 8901',
      unit: 'B105',
      building: 'Garden View Complex',
      rent: 2800,
      leaseStart: '2024-12-01',
      leaseEnd: '2025-11-30',
      leaseStatus: 'expiring',
      paymentStatus: 'paid'
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      title: 'Rent Payment Received',
      description: 'John Kamati paid rent for Unit A101 - Sunset Apartments',
      amount: 2400,
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance Request',
      description: 'Maria Nghidinwa reported leaky faucet in Unit A102',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: 3,
      type: 'tenant',
      title: 'New Tenant Application',
      description: 'Application received for Unit B201 - Garden View Complex',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
    },
    {
      id: 4,
      type: 'lease',
      title: 'Lease Expiring Soon',
      description: 'Peter Shikongo lease expires in 30 days - Unit C105',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: 5,
      type: 'payment',
      title: 'Payment Overdue',
      description: 'Peter Shikongo payment is 5 days overdue - Unit C105',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'buildings', label: 'Buildings', icon: 'Building2' },
    { id: 'units', label: 'Units', icon: 'Home' },
    { id: 'tenants', label: 'Tenants', icon: 'Users' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole="landlord" 
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={toggleSidebar}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
        userRole="landlord"
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      } pt-16`}>
        <div className="p-6 max-w-7xl mx-auto">
          <PropertyContextBreadcrumbs />

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's what's happening with your properties today.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <NotificationIndicator userRole="landlord" />
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/building-management')}
              >
                Add Building
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardMetrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                trend={metric?.trend}
                trendValue={metric?.trendValue}
                priority={metric?.priority}
              />
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => handleTabChange(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RecentActivity activities={recentActivities} />
                </div>
                <div className="space-y-6">
                  <QuickActions />
                </div>
              </div>
            )}

            {activeTab === 'buildings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Your Buildings</h2>
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => navigate('/building-management')}
                  >
                    Add Building
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties?.map((property) => (
                    <PropertyCard key={property?.id} property={property} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'units' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">All Units</h2>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filter
                    </Button>
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      onClick={() => navigate('/building-management')}
                    >
                      Add Unit
                    </Button>
                  </div>
                </div>
                <UnitsTable units={units} />
              </div>
            )}

            {activeTab === 'tenants' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">All Tenants</h2>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      iconName="Filter"
                      iconPosition="left"
                    >
                      Filter
                    </Button>
                    <Button
                      variant="default"
                      iconName="UserPlus"
                      iconPosition="left"
                      onClick={() => navigate('/tenant-invitation')}
                    >
                      Invite Tenant
                    </Button>
                  </div>
                </div>
                <TenantsTable tenants={tenants} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;