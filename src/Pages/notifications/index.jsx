import React from 'react';
import NotificationIndicator from '../../components/ui/NotificationIndicator';

const NotificationsPage = ({ userRole = 'landlord', userId = 'tenant1' }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-foreground mb-4">Notifications</h1>
      <NotificationIndicator userRole={userRole} userId={userId} position="standalone" />
    </div>
  );
};

export default NotificationsPage;


