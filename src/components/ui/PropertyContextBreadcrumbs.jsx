import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PropertyContextBreadcrumbs = ({ 
  propertyName = null, 
  unitNumber = null, 
  tenantName = null,
  customBreadcrumbs = null 
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    // Always start with Dashboard
    breadcrumbs?.push({
      label: 'Dashboard',
      path: '/landlord-dashboard',
      icon: 'LayoutDashboard'
    });

    // Generate breadcrumbs based on current path
    if (pathSegments?.includes('building-management')) {
      breadcrumbs?.push({
        label: 'Buildings',
        path: '/building-management',
        icon: 'Building2'
      });

      if (propertyName) {
        breadcrumbs?.push({
          label: propertyName,
          path: `/building-management/${propertyName?.toLowerCase()?.replace(/\s+/g, '-')}`,
          icon: 'Home'
        });

        if (unitNumber) {
          breadcrumbs?.push({
            label: `Unit ${unitNumber}`,
            path: `/building-management/${propertyName?.toLowerCase()?.replace(/\s+/g, '-')}/unit/${unitNumber}`,
            icon: 'Door'
          });

          if (tenantName) {
            breadcrumbs?.push({
              label: tenantName,
              path: `/building-management/${propertyName?.toLowerCase()?.replace(/\s+/g, '-')}/unit/${unitNumber}/tenant`,
              icon: 'User'
            });
          }
        }
      }
    } else if (pathSegments?.includes('tenant-invitation')) {
      breadcrumbs?.push({
        label: 'Tenant Management',
        path: '/tenant-invitation',
        icon: 'Users'
      });

      if (pathSegments?.includes('invite')) {
        breadcrumbs?.push({
          label: 'Invite Tenant',
          path: '/tenant-invitation/invite',
          icon: 'UserPlus'
        });
      }
    } else if (pathSegments?.includes('financial-reports')) {
      breadcrumbs?.push({
        label: 'Reports',
        path: '/financial-reports',
        icon: 'BarChart3'
      });

      if (pathSegments?.includes('financial')) {
        breadcrumbs?.push({
          label: 'Financial Reports',
          path: '/financial-reports',
          icon: 'DollarSign'
        });
      }
    } else if (pathSegments?.includes('maintenance')) {
      breadcrumbs?.push({
        label: 'Maintenance',
        path: '/maintenance',
        icon: 'Wrench'
      });

      if (pathSegments?.includes('requests')) {
        breadcrumbs?.push({
          label: 'Requests',
          path: '/maintenance/requests',
          icon: 'ClipboardList'
        });
      }
    } else if (pathSegments?.includes('settings')) {
      breadcrumbs?.push({
        label: 'Settings',
        path: '/settings',
        icon: 'Settings'
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground/50" 
              />
            )}
            
            {index === breadcrumbs?.length - 1 ? (
              // Current page - not clickable
              (<div className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-muted/50">
                <Icon 
                  name={crumb?.icon} 
                  size={16} 
                  className="text-foreground" 
                />
                <span className="font-medium text-foreground">
                  {crumb?.label}
                </span>
              </div>)
            ) : (
              // Clickable breadcrumb
              (<Button
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(crumb?.path)}
                className="h-auto p-1.5 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <div className="flex items-center space-x-1.5">
                  <Icon 
                    name={crumb?.icon} 
                    size={16} 
                  />
                  <span>{crumb?.label}</span>
                </div>
              </Button>)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default PropertyContextBreadcrumbs;