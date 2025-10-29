import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import NotificationIndicator from './NotificationIndicator';

const Header = ({ userRole = 'landlord', isCollapsed = false, onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const landlordNavItems = [
    { path: '/landlord-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/building-management', label: 'Buildings', icon: 'Building2' },
    { path: '/tenant-invitation', label: 'Tenants', icon: 'Users' },
  ];

  const moreMenuItems = [
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
    { path: '/profile', label: 'Profile', icon: 'User' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  const handleLogout = () => {
    // Handle logout logic based on user role
    if (userRole === 'tenant') {
      navigate('/tenant-login');
    } else if (userRole === 'admin') {
      navigate('/admin-login');
    } else {
      navigate('/landlord-registration');
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Building2" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">TenantPlatform</span>
    </div>
  );

  if (userRole === 'tenant') {
    return (
      <header className="bg-card border-b border-border sticky top-0 z-50 elevation-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex">
                <NotificationIndicator userRole="tenant" userId="tenant1" />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (userRole === 'admin') {
    return (
      <header className="bg-card border-b border-border sticky top-0 z-50 elevation-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="Shield"
                iconPosition="left"
              >
                Admin Panel
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Landlord Header
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 elevation-1">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {onToggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>
            )}
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {landlordNavItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                iconName={item?.icon}
                iconPosition="left"
                onClick={() => handleNavigation(item?.path)}
                className="transition-smooth"
              >
                {item?.label}
              </Button>
            ))}
            
            <NotificationIndicator userRole="landlord" userId="landlord1" />
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              >
                More
              </Button>
              
              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md elevation-3 py-1 z-50">
                  {moreMenuItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full px-4 py-2 text-left text-sm text-popover-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-error hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="py-4 space-y-2">
              {landlordNavItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-smooth ${
                    location?.pathname === item?.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <hr className="my-2 border-border" />
              
              {moreMenuItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className="w-full px-4 py-3 text-left flex items-center space-x-3 text-muted-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left flex items-center space-x-3 text-error hover:bg-muted transition-smooth"
              >
                <Icon name="LogOut" size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        )}
      </div>
      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      {/* Overlay for more menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;