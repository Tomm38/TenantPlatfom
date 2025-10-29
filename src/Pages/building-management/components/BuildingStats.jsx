import React from 'react';
import Icon from '../../../components/AppIcon';

const BuildingStats = ({ buildings }) => {
  const totalBuildings = buildings?.length;
  const totalUnits = buildings?.reduce((sum, building) => sum + building?.totalUnits, 0);
  const occupiedUnits = buildings?.reduce((sum, building) => sum + building?.occupiedUnits, 0);
  const totalRevenue = buildings?.reduce((sum, building) => sum + building?.monthlyRevenue, 0);
  
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const averageRevenue = totalBuildings > 0 ? totalRevenue / totalBuildings : 0;

  const stats = [
    {
      id: 'buildings',
      label: 'Total Buildings',
      value: totalBuildings,
      icon: 'Building2',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'units',
      label: 'Total Units',
      value: totalUnits,
      icon: 'Home',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'occupancy',
      label: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: 'Users',
      color: occupancyRate >= 80 ? 'text-success' : occupancyRate >= 60 ? 'text-warning' : 'text-error',
      bgColor: occupancyRate >= 80 ? 'bg-success/10' : occupancyRate >= 60 ? 'bg-warning/10' : 'bg-error/10'
    },
    {
      id: 'revenue',
      label: 'Monthly Revenue',
      value: `NAD ${totalRevenue?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}`,
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card border border-border rounded-lg p-6 elevation-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
          </div>
          
          {/* Additional Info */}
          {stat?.id === 'occupancy' && totalUnits > 0 && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Occupied</span>
                <span>{occupiedUnits} / {totalUnits}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    occupancyRate >= 80 ? 'bg-success' :
                    occupancyRate >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
            </div>
          )}
          
          {stat?.id === 'revenue' && totalBuildings > 0 && (
            <div className="mt-3">
              <p className="text-xs text-muted-foreground">
                Avg per building: NAD {averageRevenue?.toLocaleString('en-NA', { minimumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BuildingStats;