import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add Building',
      description: 'Create a new property in your portfolio',
      icon: 'Building2',
      variant: 'default',
      onClick: () => navigate('/building-management')
    },
    {
      title: 'Invite Tenant',
      description: 'Send invitation to new tenant',
      icon: 'UserPlus',
      variant: 'outline',
      onClick: () => navigate('/tenant-invitation')
    },
    {
      title: 'View Reports',
      description: 'Check financial and occupancy reports',
      icon: 'BarChart3',
      variant: 'outline',
      onClick: () => navigate('/financial-reports')
    },
    {
      title: 'Maintenance',
      description: 'Manage property maintenance requests',
      icon: 'Wrench',
      variant: 'outline',
      onClick: () => navigate('/maintenance')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            size="lg"
            iconName={action?.icon}
            iconPosition="left"
            onClick={action?.onClick}
            className="h-auto p-4 flex-col items-start text-left justify-start space-y-2"
          >
            <div className="w-full">
              <div className="font-medium text-sm">{action?.title}</div>
              <div className="text-xs opacity-80 mt-1">{action?.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;