import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MaintenanceRequests = ({ onNewRequest }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Mock maintenance requests data
    const mockRequests = [
      {
        id: 1,
        title: "Air Conditioning Repair",
        description: "AC unit not cooling properly, making unusual noises",
        category: "HVAC",
        priority: "high",
        status: "in_progress",
        dateSubmitted: "2024-10-18T10:00:00Z",
        dateScheduled: "2024-10-24T14:00:00Z",
        assignedTechnician: "James Wilson",
        technicianPhone: "+264 81 999 8888",
        estimatedCompletion: "2024-10-24T16:00:00Z"
      },
      {
        id: 2,
        title: "Kitchen Sink Leak",
        description: "Small leak under kitchen sink, causing water damage",
        category: "Plumbing",
        priority: "medium",
        status: "scheduled",
        dateSubmitted: "2024-10-20T09:30:00Z",
        dateScheduled: "2024-10-25T10:00:00Z",
        assignedTechnician: "Mike Thompson",
        technicianPhone: "+264 81 777 6666",
        estimatedCompletion: "2024-10-25T12:00:00Z"
      },
      {
        id: 3,
        title: "Bathroom Light Fixture",
        description: "Light flickering intermittently in main bathroom",
        category: "Electrical",
        priority: "low",
        status: "submitted",
        dateSubmitted: "2024-10-22T16:45:00Z",
        dateScheduled: null,
        assignedTechnician: null,
        technicianPhone: null,
        estimatedCompletion: null
      },
      {
        id: 4,
        title: "Window Lock Repair",
        description: "Bedroom window lock is broken, security concern",
        category: "Security",
        priority: "high",
        status: "completed",
        dateSubmitted: "2024-10-10T11:20:00Z",
        dateScheduled: "2024-10-12T13:00:00Z",
        dateCompleted: "2024-10-12T15:30:00Z",
        assignedTechnician: "David Lee",
        technicianPhone: "+264 81 555 4444"
      }
    ];

    setRequests(mockRequests);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-NA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
        return 'Clock';
      case 'scheduled':
        return 'Calendar';
      case 'in_progress':
        return 'Wrench';
      case 'completed':
        return 'CheckCircle';
      default:
        return 'AlertCircle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'text-muted-foreground';
      case 'scheduled':
        return 'text-warning';
      case 'in_progress':
        return 'text-primary';
      case 'completed':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-muted/10';
      case 'scheduled':
        return 'bg-warning/10';
      case 'in_progress':
        return 'bg-primary/10';
      case 'completed':
        return 'bg-success/10';
      default:
        return 'bg-muted/10';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'submitted':
        return 'Submitted';
      case 'scheduled':
        return 'Scheduled';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'hvac':
        return 'Wind';
      case 'plumbing':
        return 'Droplets';
      case 'electrical':
        return 'Zap';
      case 'security':
        return 'Shield';
      case 'appliance':
        return 'Settings';
      default:
        return 'Wrench';
    }
  };

  const activeRequests = requests?.filter((r) => r?.status !== 'completed');
  const completedRequests = requests?.filter((r) => r?.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Maintenance Requests</h3>
            <p className="text-sm text-muted-foreground">Submit and track maintenance issues</p>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onNewRequest}
          >
            New Request
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Requests</p>
                <p className="text-xl font-semibold text-foreground">{activeRequests?.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-warning/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={20} className="text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-xl font-semibold text-foreground">
                  {requests?.filter((r) => r?.status === 'scheduled')?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-success/5 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-semibold text-foreground">{completedRequests?.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Requests */}
      {activeRequests?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Requests</h3>
          <div className="space-y-4">
            {activeRequests?.map((request) => (
              <div key={request?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBgColor(request?.status)}`}>
                      <Icon name={getCategoryIcon(request?.category)} size={20} className={getStatusColor(request?.status)} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{request?.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{request?.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-muted-foreground">Category: {request?.category}</span>
                        <span className={`font-medium capitalize ${getPriorityColor(request?.priority)}`}>
                          {request?.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getStatusBgColor(request?.status)}`}>
                    <Icon name={getStatusIcon(request?.status)} size={14} className={getStatusColor(request?.status)} />
                    <span className={`text-xs font-medium ${getStatusColor(request?.status)}`}>
                      {getStatusLabel(request?.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={14} className="text-muted-foreground" />
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="text-foreground">{formatDate(request?.dateSubmitted)}</span>
                    </div>
                    {request?.dateScheduled && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Scheduled:</span>
                        <span className="text-foreground">{formatDate(request?.dateScheduled)}</span>
                      </div>
                    )}
                  </div>
                  
                  {request?.assignedTechnician && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Technician:</span>
                        <span className="text-foreground">{request?.assignedTechnician}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Phone" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">{request?.technicianPhone}</span>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="Phone"
                          onClick={() => window.location.href = `tel:${request?.technicianPhone}`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {request?.estimatedCompletion && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Clock" size={14} className="text-primary" />
                      <span className="text-muted-foreground">Expected completion:</span>
                      <span className="text-foreground font-medium">{formatDate(request?.estimatedCompletion)}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Completed Requests */}
      {completedRequests?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recently Completed</h3>
          <div className="space-y-4">
            {completedRequests?.slice(0, 3)?.map((request) => (
              <div key={request?.id} className="border border-border rounded-lg p-4 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusBgColor(request?.status)}`}>
                      <Icon name={getCategoryIcon(request?.category)} size={20} className={getStatusColor(request?.status)} />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{request?.title}</h4>
                      <p className="text-sm text-muted-foreground">{request?.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right text-sm">
                    <div className="flex items-center space-x-1 text-success mb-1">
                      <Icon name="CheckCircle" size={14} />
                      <span className="font-medium">Completed</span>
                    </div>
                    <span className="text-muted-foreground">{formatDate(request?.dateCompleted)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {completedRequests?.length > 3 && (
            <div className="mt-4 text-center">
              <Button variant="ghost">
                View All Completed Requests ({completedRequests?.length})
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Emergency Contact */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-error mt-1" />
          <div>
            <h3 className="font-semibold text-error mb-2">Emergency Maintenance</h3>
            <p className="text-sm text-foreground mb-4">
              For urgent issues that require immediate attention (water leaks, electrical hazards, security issues), 
              contact our emergency maintenance hotline.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                iconName="Phone"
                iconPosition="left"
                onClick={() => window.location.href = 'tel:+26461911911'}
                className="border-error text-error hover:bg-error hover:text-error-foreground"
              >
                Call Emergency Line
              </Button>
              <span className="text-sm text-muted-foreground self-center">
                Available 24/7: +264 61 911 911
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* No Active Requests */}
      {activeRequests?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={24} className="text-success" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
          <p className="text-muted-foreground mb-6">
            You have no active maintenance requests. If you notice any issues with your unit, don't hesitate to submit a request.
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={onNewRequest}
          >
            Submit New Request
          </Button>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequests;