import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { 
  getNotifications, 
  getUnreadNotificationCount, 
  markNotificationAsRead,
  markAllNotificationsAsRead,
  subscribeToNotifications
} from '../../services/notificationService';

const NotificationIndicator = ({ 
  userRole = 'landlord',
  userId = 'tenant1',
  position = 'header' // 'header' | 'sidebar' | 'standalone'
}) => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      const [{ data: list }, { data: unread }] = await Promise.all([
        getNotifications(userId),
        getUnreadNotificationCount(userId)
      ]);
      if (!isMounted) return;
      // map optional icon by type
      const withIcons = (list || []).map(n => ({
        ...n,
        icon: n.icon || (n.type === 'payment' ? 'DollarSign' : n.type === 'maintenance' ? 'Wrench' : 'Bell'),
        timestamp: new Date(n.createdAt)
      }));
      setNotifications(withIcons);
      setUnreadCount(unread?.count || 0);
    };
    load();
    const unsubscribe = subscribeToNotifications(userId, (n) => {
      setNotifications(prev => [{
        ...n,
        icon: n.icon || (n.type === 'payment' ? 'DollarSign' : n.type === 'maintenance' ? 'Wrench' : 'Bell'),
        timestamp: new Date(n.createdAt)
      }, ...(prev || [])]);
      setUnreadCount(prev => prev + 1);
    });
    return () => { isMounted = false; unsubscribe?.(); };
  }, [userId]);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const markAsRead = async (notificationId) => {
    await markNotificationAsRead(notificationId);
    setNotifications(prev => prev?.map(n => n?.id === notificationId ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = async () => {
    await markAllNotificationsAsRead(userId);
    setNotifications(prev => prev?.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  if (position === 'standalone') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </div>
        <div className="space-y-3">
          {notifications?.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No notifications
            </p>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-3 rounded-md border transition-smooth cursor-pointer ${
                  notification?.read 
                    ? 'bg-muted/30 border-border' :'bg-card border-primary/20 hover:bg-muted/50'
                }`}
                onClick={() => markAsRead(notification?.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-1.5 rounded-full ${getPriorityColor(notification?.priority)}`}>
                    <Icon name={notification?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      notification?.read ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {notification?.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatTimestamp(notification?.timestamp)}
                    </p>
                  </div>
                  {!notification?.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Dropdown */}
          <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-md elevation-3 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-popover-foreground">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications?.length === 0 ? (
                <div className="p-8 text-center">
                  <Icon name="Bell" size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications?.map((notification) => (
                  <div
                    key={notification?.id}
                    className={`p-4 border-b border-border last:border-b-0 cursor-pointer transition-smooth ${
                      notification?.read 
                        ? 'hover:bg-muted/50' :'bg-primary/5 hover:bg-primary/10'
                    }`}
                    onClick={() => {
                      markAsRead(notification?.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-1.5 rounded-full ${getPriorityColor(notification?.priority)}`}>
                        <Icon name={notification?.icon} size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          notification?.read ? 'text-muted-foreground' : 'text-popover-foreground'
                        }`}>
                          {notification?.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {notification?.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {formatTimestamp(notification?.timestamp)}
                        </p>
                      </div>
                      {!notification?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications?.length > 0 && (
              <div className="p-3 border-t border-border bg-muted/30">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/notifications');
                  }}
                >
                  View all notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationIndicator;