import React from 'react';
import MetricsCard from '../../landlord-dashboard/components/MetricsCard';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PlatformStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertCircle" size={48} className="text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const chartData = [
    { name: 'Landlords', value: stats.totalLandlords },
    { name: 'Tenants', value: stats.totalTenants },
    { name: 'Properties', value: stats.totalProperties },
    { name: 'Units', value: stats.totalUnits }
  ];

  const occupancyRate = stats.totalUnits > 0 
    ? ((stats.occupiedUnits / stats.totalUnits) * 100).toFixed(1) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle="Registered platform users"
          icon="Users"
          trend="up"
          trendValue="+5% this month"
        />
        <MetricsCard
          title="Total Properties"
          value={stats.totalProperties}
          subtitle="Active buildings"
          icon="Building2"
          trend="up"
          trendValue="+2 this month"
        />
        <MetricsCard
          title="Occupancy Rate"
          value={`${occupancyRate}%`}
          subtitle={`${stats.occupiedUnits} of ${stats.totalUnits} units`}
          icon="Home"
          trend={occupancyRate > 80 ? 'up' : 'warning'}
          trendValue={`${stats.totalUnits - stats.occupiedUnits} vacant`}
          priority={occupancyRate > 80 ? 'success' : 'warning'}
        />
        <MetricsCard
          title="Monthly Revenue"
          value={`NAD ${stats.monthlyRevenue?.toLocaleString()}`}
          subtitle="October 2024"
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Activity" size={20} className="text-success" />
                <span className="text-muted-foreground">System Uptime</span>
              </div>
              <span className="font-semibold text-foreground">{stats.systemUptime}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Database" size={20} className="text-primary" />
                <span className="text-muted-foreground">Last Backup</span>
              </div>
              <span className="font-semibold text-foreground">
                {new Date(stats.lastBackup).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Wrench" size={20} className="text-warning" />
                <span className="text-muted-foreground">Active Maintenance</span>
              </div>
              <span className="font-semibold text-foreground">{stats.activeMaintenanceRequests}</span>
            </div>
          </div>
        </div>

        {/* Overview Chart */}
        <div className="bg-card border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Platform Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStats;
