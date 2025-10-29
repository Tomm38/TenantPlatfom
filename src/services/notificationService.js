import { supabase } from '../config/supabase';

/**
 * Notification service to manage in-app notifications.
 * Uses mock storage by default and is ready for Supabase integration.
 */

// Fallback in-memory storage if Supabase table isn't ready
let inMemoryNotifications = [];

export const getNotifications = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .or(`user_id.eq.${userId},user_id.eq.all`)
      .order('created_at', { ascending: false });
    if (!error && data) {
      // Map DB fields to UI model
      const mapped = data.map(row => ({
        id: row.id,
        userId: row.user_id,
        title: row.title,
        message: row.message,
        type: row.type,
        priority: row.priority,
        read: row.read,
        createdAt: row.created_at
      }));
      return { data: mapped, error: null };
    }

    const fallbackData = inMemoryNotifications
      .filter(n => n.userId === userId || n.userId === 'all')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { data: fallbackData, error: null };
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return { data: [], error };
  }
};

export const getUnreadNotificationCount = async (userId) => {
  try {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .or(`user_id.eq.${userId},user_id.eq.all`)
      .eq('read', false);
    if (!error && typeof count === 'number') {
      return { data: { count }, error: null };
    }
    const { data } = await getNotifications(userId);
    const fallbackCount = (data || []).filter(n => !n.read).length;
    return { data: { count: fallbackCount }, error: null };
  } catch (error) {
    return { data: { count: 0 }, error };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();
    if (!error) return { data, error: null };

    inMemoryNotifications = inMemoryNotifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    );
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const markAllNotificationsAsRead = async (userId) => {
  try {
    await supabase
      .from('notifications')
      .update({ read: true })
      .or(`user_id.eq.${userId},user_id.eq.all`);
    inMemoryNotifications = inMemoryNotifications.map(n =>
      n.userId === userId || n.userId === 'all' ? { ...n, read: true } : n
    );
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createNotification = async (notification) => {
  try {
    const newNotification = {
      user_id: notification.userId || 'all',
      title: notification.title,
      message: notification.message,
      type: notification.type || 'system',
      priority: notification.priority || 'info',
      read: false
    };

    const { data, error } = await supabase
      .from('notifications')
      .insert([newNotification])
      .select()
      .single();
    if (!error) {
      return { data, error: null };
    }

    const fallback = {
      id: `notif_${Date.now()}`,
      userId: newNotification.user_id,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      priority: newNotification.priority,
      read: false,
      createdAt: new Date().toISOString()
    };
    inMemoryNotifications = [fallback, ...inMemoryNotifications];
    return { data: fallback, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const sendBroadcastNotification = async ({ title, message, type = 'system', priority = 'info' }) => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{ user_id: 'all', title, message, type, priority, read: false }])
      .select()
      .single();
    if (!error) return { data, error: null };

    return await createNotification({ userId: 'all', title, message, type, priority });
  } catch (error) {
    return { data: null, error };
  }
};

export const subscribeToNotifications = (userId, onNewNotification) => {
  const channel = supabase
    .channel('notifications')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications'
    }, (payload) => {
      const row = payload.new;
      if (row && (row.user_id === userId || row.user_id === 'all')) {
        onNewNotification?.({
          id: row.id,
          userId: row.user_id,
          title: row.title,
          message: row.message,
          type: row.type,
          priority: row.priority,
          read: row.read,
          createdAt: row.created_at
        });
      }
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

export default {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  createNotification,
  sendBroadcastNotification,
  subscribeToNotifications
};


