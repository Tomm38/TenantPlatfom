import React from 'react';
import Icon from '../../../components/AppIcon';

const UnitStats = ({ units }) => {
  const totalUnits = units?.length || 0;
  const occupiedUnits = units?.filter((unit) => unit?.status === 'occupied')?.length || 0;
  const vacantUnits = units?.filter((unit) => unit?.status === 'vacant')?.length || 0;
  const maintenanceUnits = units?.filter((unit) => unit?.status === 'maintenance')?.length || 0;
  
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  
  const totalMonthlyRevenue = units
    ?.filter((unit) => unit?.status === 'occupied')
    ?.reduce((sum, unit) => sum + (unit?.rentAmount || 0), 0) || 0;
  
  const overdueUnits = units
    ?.filter((unit) => unit?.rentCollectionStatus === 'overdue')?.length || 0;

  const expiringLeases = units?.filter((unit) => {
    if (!unit?.leaseExpiration) return false;
    const today = new Date();
    const expirationDate = new Date(unit?.leaseExpiration);
    const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  })?.length || 0;

  const stats = [
    {
      title: 'Total Units',
      value: totalUnits,
      icon: 'Home',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Occupied',
      value: occupiedUnits,
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10',
      subtitle: `${occupancyRate}% occupancy`
    },
    {
      title: 'Vacant',
      value: vacantUnits,
      icon: 'Home',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Maintenance',
      value: maintenanceUnits,
      icon: 'Wrench',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Monthly Revenue',
      value: `NAD ${totalMonthlyRevenue?.toLocaleString('en-NA')}`,
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Overdue Payments',
      value: overdueUnits,
      icon: 'AlertTriangle',
      color: overdueUnits > 0 ? 'text-error' : 'text-muted-foreground',
      bgColor: overdueUnits > 0 ? 'bg-error/10' : 'bg-muted/10'
    },
    {
      title: 'Expiring Leases',
      value: expiringLeases,
      icon: 'Calendar',
      color: expiringLeases > 0 ? 'text-warning' : 'text-muted-foreground',
      bgColor: expiringLeases > 0 ? 'bg-warning/10' : 'bg-muted/10',
      subtitle: 'Next 30 days'
    }
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-md ${stat?.bgColor} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={16} className={stat?.color} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">
                {stat?.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat?.title}
              </p>
              {stat?.subtitle && (
                <p className="text-xs text-muted-foreground">
                  {stat?.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitStats;