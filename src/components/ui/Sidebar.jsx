import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, userRole = 'landlord' }) => {
  const [expandedSections, setExpandedSections] = useState({
    properties: true,
    tenants: false,
    reports: false,
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  const navigationSections = {
    landlord: [
      {
        id: 'overview',
        label: 'Overview',
        items: [
          { path: '/landlord-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        ]
      },
      {
        id: 'properties',
        label: 'Property Management',
        expandable: true,
        items: [
          { path: '/building-management', label: 'Buildings', icon: 'Building2' },
          { path: '/units', label: 'Units', icon: 'Home' },
          { path: '/maintenance', label: 'Maintenance', icon: 'Wrench' },
        ]
      },
      {
        id: 'tenants',
        label: 'Tenant Management',
        expandable: true,
        items: [
          { path: '/tenant-invitation', label: 'Invite Tenants', icon: 'UserPlus' },
          { path: '/tenant-list', label: 'All Tenants', icon: 'Users' },
          { path: '/lease-management', label: 'Leases', icon: 'FileText' },
          { path: '/messages', label: 'Messages', icon: 'MessageSquare' },
        ]
      },
      {
        id: 'reports',
        label: 'Reports & Analytics',
        expandable: true,
        items: [
          { path: '/financial-reports', label: 'Financial Reports', icon: 'DollarSign' },
          { path: '/occupancy-reports', label: 'Occupancy', icon: 'BarChart3' },
          { path: '/maintenance-reports', label: 'Maintenance', icon: 'ClipboardList' },
        ]
      }
    ],
    tenant: [
      {
        id: 'tenant-overview',
        label: 'My Dashboard',
        items: [
          { path: '/tenant-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
        ]
      },
      {
        id: 'tenant-lease',
        label: 'My Lease',
        expandable: true,
        items: [
          { path: '/tenant-dashboard?tab=lease', label: 'Lease Details', icon: 'FileText' },
          { path: '/tenant-dashboard?tab=payments', label: 'Payments', icon: 'CreditCard' },
          { path: '/tenant-dashboard?tab=history', label: 'Payment History', icon: 'History' },
        ]
      },
      {
        id: 'tenant-support',
        label: 'Support',
        expandable: true,
        items: [
          { path: '/tenant-dashboard?tab=maintenance', label: 'Maintenance Requests', icon: 'Wrench' },
          { path: '/messages', label: 'Messages', icon: 'MessageSquare' },
          { path: '/tenant-dashboard?tab=notifications', label: 'Notifications', icon: 'Bell' },
        ]
      },
      {
        id: 'tenant-profile',
        label: 'Profile',
        items: [
          { path: '/tenant-dashboard?tab=profile', label: 'My Profile', icon: 'User' },
          { path: '/tenant-dashboard?tab=settings', label: 'Settings', icon: 'Settings' },
        ]
      }
    ],
    admin: [
      {
        id: 'admin-overview',
        label: 'Administration',
        items: [
          { path: '/admin-dashboard', label: 'Admin Dashboard', icon: 'Shield' },
          { path: '/admin-dashboard?tab=users', label: 'User Management', icon: 'Users' },
          { path: '/admin-dashboard?tab=settings', label: 'System Settings', icon: 'Settings' },
        ]
      }
    ]
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev?.[sectionId]
    }));
  };

  const currentSections = navigationSections?.[userRole] || navigationSections?.landlord;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-40
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        hidden lg:block
      `}>
        <div className="flex flex-col h-full">
          {/* Collapse Toggle */}
          <div className="p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="w-full justify-center"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {currentSections?.map((section) => (
              <div key={section?.id} className="space-y-2">
                {/* Section Header */}
                {!isCollapsed && (
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section?.label}
                    </h3>
                    {section?.expandable && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSection(section?.id)}
                        className="h-4 w-4"
                      >
                        <Icon 
                          name={expandedSections?.[section?.id] ? "ChevronDown" : "ChevronRight"} 
                          size={12} 
                        />
                      </Button>
                    )}
                  </div>
                )}

                {/* Section Items */}
                <div className={`space-y-1 ${
                  section?.expandable && !expandedSections?.[section?.id] && !isCollapsed ? 'hidden' : ''
                }`}>
                  {section?.items?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                        transition-smooth group relative
                        ${location?.pathname === item?.path
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                        }
                        ${isCollapsed ? 'justify-center' : 'justify-start'}
                      `}
                      title={isCollapsed ? item?.label : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${
                          location?.pathname === item?.path ? 'text-primary-foreground' : ''
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="truncate">{item?.label}</span>
                      )}
                      
                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="
                          absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground
                          text-xs rounded-md border border-border elevation-2
                          opacity-0 group-hover:opacity-100 transition-opacity duration-200
                          pointer-events-none whitespace-nowrap z-50
                        ">
                          {item?.label}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {userRole === 'admin' ? 'Admin User' : 'Property Manager'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userRole === 'admin' ? 'System Administrator' : 'Landlord Account'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`
        fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden
        transition-opacity duration-300
        ${!isCollapsed ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={onToggle} />
      {/* Mobile Sidebar */}
      <aside className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-card border-r border-border z-40
        transform transition-transform duration-300 ease-in-out lg:hidden
        ${!isCollapsed ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {currentSections?.map((section) => (
              <div key={section?.id} className="space-y-2">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section?.label}
                  </h3>
                  {section?.expandable && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSection(section?.id)}
                      className="h-4 w-4"
                    >
                      <Icon 
                        name={expandedSections?.[section?.id] ? "ChevronDown" : "ChevronRight"} 
                        size={12} 
                      />
                    </Button>
                  )}
                </div>

                {/* Section Items */}
                <div className={`space-y-1 ${
                  section?.expandable && !expandedSections?.[section?.id] ? 'hidden' : ''
                }`}>
                  {section?.items?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium
                        transition-smooth
                        ${location?.pathname === item?.path
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`flex-shrink-0 ${
                          location?.pathname === item?.path ? 'text-primary-foreground' : ''
                        }`}
                      />
                      <span className="truncate">{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-smooth cursor-pointer">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {userRole === 'admin' ? 'Admin User' : 'Property Manager'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole === 'admin' ? 'System Administrator' : 'Landlord Account'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;