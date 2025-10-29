import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { getRevenueReport } from '../../../services/adminService';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRevenueReport();
  }, []);

  const loadRevenueReport = async () => {
    setLoading(true);
    try {
      const result = await getRevenueReport('2024-01-01', '2024-12-31');
      if (result.data) {
        setReport(result.data);
      }
    } catch (error) {
      console.error('Error loading revenue report:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Icon name="Loader2" size={48} className="animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading revenue data...</p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-foreground">NAD {report.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Transactions</div>
          <div className="text-2xl font-bold text-foreground">{report.transactions}</div>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="text-sm text-muted-foreground mb-2">Average Transaction</div>
          <div className="text-2xl font-bold text-foreground">NAD {report.averageTransaction.toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={report.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `NAD ${value.toLocaleString()}`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;

