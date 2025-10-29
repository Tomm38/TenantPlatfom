import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import NotificationIndicator from '../../components/ui/NotificationIndicator';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { getPlatformStats } from '../../services/adminService';
import PlatformStats from './components/PlatformStats';
import UserManagement from './components/UserManagement';
import PropertyOverview from './components/PropertyOverview';
import SystemSettings from './components/SystemSettings';
import AuditLogs from './components/AuditLogs';
import RevenueChart from './components/RevenueChart';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [platformStats, setPlatformStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession');
    const userRole = localStorage.getItem('userRole');
    
    if (!adminSession || userRole !== 'admin') {
      navigate('/admin-login');
      return;
    }

    loadPlatformStats();
  }, [navigate]);

  // Update active tab from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) setActiveTab(tab);
  }, [location.search]);

  const loadPlatformStats = async () => {
    setLoading(true);
    try {
      const result = await getPlatformStats();
      if (result.data) {
        setPlatformStats(result.data);
      }
    } catch (error) {
      console.error('Error loading platform stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('userRole');
    navigate('/admin-login');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'users', label: 'User Management', icon: 'Users' },
    { id: 'properties', label: 'Properties', icon: 'Building2' },
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'settings', label: 'Settings', icon: 'Settings' },
    { id: 'logs', label: 'Audit Logs', icon: 'FileText' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        userRole="admin"
        isCollapsed={isSidebarCollapsed}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        userRole="admin"
      />

      <main className={`
        transition-all duration-300 ease-in-out pt-4 pb-8
        ${isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your platform, users, and system settings
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <NotificationIndicator userRole="admin" />
              <Button
                variant="outline"
                icon={<Icon name="LogOut" size={16} />}
                iconPosition="left"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2 rounded-t-lg font-medium transition-smooth
                  flex items-center space-x-2
                  ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {loading && activeTab === 'overview' ? (
              <div className="text-center py-12">
                <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary mb-4" />
                <p className="text-muted-foreground">Loading platform data...</p>
              </div>
            ) : (
              <>
                {activeTab === 'overview' && <PlatformStats stats={platformStats} />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'properties' && <PropertyOverview />}
                {activeTab === 'revenue' && <RevenueChart />}
                {activeTab === 'settings' && <SystemSettings onUpdate={loadPlatformStats} />}
                {activeTab === 'logs' && <AuditLogs />}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

