import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'payment':
        return 'DollarSign';
      case 'maintenance':
        return 'Wrench';
      case 'lease':
        return 'FileText';
      case 'tenant':
        return 'UserPlus';
      case 'message':
        return 'MessageSquare';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'payment':
        return 'text-success bg-success/10';
      case 'maintenance':
        return 'text-warning bg-warning/10';
      case 'lease':
        return 'text-primary bg-primary/10';
      case 'tenant':
        return 'text-accent bg-accent/10';
      case 'message':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diff = now - activityTime;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-muted-foreground" />
      </div>
      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No recent activity</p>
          </div>
        ) : (
          activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-muted/30 transition-smooth">
              <div className={`p-2 rounded-full ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">
                    {activity?.title}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {activity?.description}
                </p>
                
                {activity?.amount && (
                  <p className="text-sm font-medium text-success mt-1">
                    NAD {activity?.amount?.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {activities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-smooth">
            View All Activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;