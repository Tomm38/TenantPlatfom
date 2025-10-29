import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [filter, setFilter] = useState('all');
  const [notificationList, setNotificationList] = useState(notifications || []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    } else {
      return date?.toLocaleDateString('en-NA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment':
        return 'CreditCard';
      case 'maintenance':
        return 'Wrench';
      case 'lease':
        return 'FileText';
      case 'announcement':
        return 'Megaphone';
      case 'emergency':
        return 'AlertTriangle';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'payment':
        return 'text-primary';
      case 'maintenance':
        return 'text-warning';
      case 'lease':
        return 'text-success';
      case 'announcement':
        return 'text-info';
      case 'emergency':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getNotificationBgColor = (type) => {
    switch (type) {
      case 'payment':
        return 'bg-primary/10';
      case 'maintenance':
        return 'bg-warning/10';
      case 'lease':
        return 'bg-success/10';
      case 'announcement':
        return 'bg-info/10';
      case 'emergency':
        return 'bg-error/10';
      default:
        return 'bg-muted/10';
    }
  };

  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case 'payment':
        return 'Payment';
      case 'maintenance':
        return 'Maintenance';
      case 'lease':
        return 'Lease';
      case 'announcement':
        return 'Announcement';
      case 'emergency':
        return 'Emergency';
      default:
        return 'Notification';
    }
  };

  const filterNotifications = () => {
    if (filter === 'all') return notificationList;
    if (filter === 'unread') return notificationList?.filter((n) => !n?.read);
    return notificationList?.filter((n) => n?.type === filter);
  };

  const markAsRead = (notificationId) => {
    setNotificationList((prev) =>
      prev?.map((notification) =>
        notification?.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList((prev) =>
      prev?.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotificationList((prev) =>
      prev?.filter((notification) => notification?.id !== notificationId)
    );
  };

  const filteredNotifications = filterNotifications();
  const unreadCount = notificationList?.filter((n) => !n?.read)?.length || 0;

  const notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'unread', label: 'Unread' },
    { value: 'payment', label: 'Payment' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'lease', label: 'Lease' },
    { value: 'announcement', label: 'Announcements' },
    { value: 'emergency', label: 'Emergency' }
  ];

  return (
    <div className="space-y-6">
      {/* Notification Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              iconName="CheckCheck"
              iconPosition="left"
              onClick={markAllAsRead}
            >
              Mark All Read
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {notificationTypes?.map((type) => (
            <button
              key={type?.value}
              onClick={() => setFilter(type?.value)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                filter === type?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {type?.label}
              {type?.value === 'unread' && unreadCount > 0 && (
                <span className="ml-1 bg-error text-error-foreground text-xs rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Bell" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {filter === 'all' ? 'No Notifications' : `No ${filter} Notifications`}
            </h3>
            <p className="text-muted-foreground">
              {filter === 'unread' ?'All caught up! You have no unread notifications.' :'You haven\'t received any notifications yet.'
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-6 transition-colors ${
                  !notification?.read ? 'bg-primary/5' : 'hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    getNotificationBgColor(notification?.type)
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification?.type)} 
                      size={20} 
                      className={getNotificationColor(notification?.type)} 
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{notification?.title}</h4>
                        {!notification?.read && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(notification?.date)}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => deleteNotification(notification?.id)}
                        />
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification?.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-md ${getNotificationBgColor(notification?.type)} ${getNotificationColor(notification?.type)}`}>
                        {getNotificationTypeLabel(notification?.type)}
                      </span>
                      
                      {!notification?.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification?.id)}
                          className="text-xs"
                        >
                          Mark as Read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive notifications via email</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full">
              <div className="w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-6 mt-0.5" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full">
              <div className="w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-1 mt-0.5" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Payment Reminders</p>
              <p className="text-sm text-muted-foreground">Get reminders before rent is due</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full">
              <div className="w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-6 mt-0.5" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Maintenance Updates</p>
              <p className="text-sm text-muted-foreground">Updates on maintenance request status</p>
            </div>
            <div className="w-12 h-6 bg-primary rounded-full">
              <div className="w-5 h-5 bg-white rounded-full shadow-sm transform translate-x-6 mt-0.5" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button variant="outline" iconName="Settings" iconPosition="left">
            Manage All Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;