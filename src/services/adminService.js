import { supabase } from '../config/supabase';

/**
 * Admin service for managing platform operations
 */

// ==================== USER MANAGEMENT ====================

/**
 * Get all users (landlords and tenants)
 */
export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, created_at, last_login, active');
    if (error) return { data: null, error };
    const mapped = (data || []).map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      name: u.name,
      createdAt: u.created_at,
      lastLogin: u.last_login || u.created_at,
      status: u.active ? 'active' : 'inactive'
    }));
    return { data: mapped, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Update user status (active/suspended)
 */
export const updateUserStatus = async (userId, status) => {
  try {
    const active = status === 'active';
    const { data, error } = await supabase
      .rpc('admin_set_active', { p_user_id: userId, p_active: active });
    if (error) return { data: null, error };
    return { data: { success: true, user: data }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (userId) => {
  try {
    // Soft-deactivate instead of hard-delete
    const { data, error } = await supabase
      .rpc('admin_set_active', { p_user_id: userId, p_active: false });
    if (error) return { data: null, error };
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// ==================== USER INVITATIONS & ROLES ====================

export const inviteUser = async (email, role) => {
  try {
    const { data, error } = await supabase
      .rpc('invite_user', { p_email: email, p_role: role });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const setUserRole = async (userId, role) => {
  try {
    const { data, error } = await supabase
      .rpc('admin_set_role', { p_user_id: userId, p_role: role });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

// ==================== PROPERTY MANAGEMENT ====================

/**
 * Get all properties across the platform
 */
export const getAllProperties = async () => {
  try {
    return {
      data: [
        {
          id: '1',
          name: 'Sunset Apartments',
          landlord: 'John Doe',
          address: '123 Independence Ave, Windhoek',
          type: 'apartment',
          unitsCount: 24,
          occupancyRate: 83,
          monthlyRevenue: 28800,
          status: 'active',
          createdAt: '2024-01-15'
        },
        {
          id: '2',
          name: 'University Hostel',
          landlord: 'Mary Johnson',
          address: '456 Robert Mugabe Ave, Windhoek',
          type: 'hostel',
          unitsCount: 48,
          occupancyRate: 94,
          monthlyRevenue: 36000,
          status: 'active',
          createdAt: '2024-02-10'
        }
      ],
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Get platform statistics
 */
export const getPlatformStats = async () => {
  try {
    return {
      data: {
        totalUsers: 156,
        totalLandlords: 24,
        totalTenants: 132,
        totalProperties: 48,
        totalUnits: 312,
        occupiedUnits: 264,
        monthlyRevenue: 125600,
        activeMaintenanceRequests: 8,
        pendingPayments: 24500,
        systemUptime: 99.9,
        lastBackup: '2024-10-28T06:00:00Z'
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

// ==================== SYSTEM SETTINGS ====================

/**
 * Get system settings
 */
export const getSystemSettings = async () => {
  try {
    return {
      data: {
        platformName: 'Property Management Platform',
        maintenanceMode: false,
        registrationEnabled: true,
        paymentProcessingEnabled: true,
        emailNotificationsEnabled: true,
        maxPropertiesPerLandlord: 50,
        maxUnitsPerProperty: 100,
        currency: 'NAD',
        timezone: 'Africa/Windhoek'
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

/**
 * Update system settings
 */
export const updateSystemSettings = async (settings) => {
  try {
    console.log('Updating system settings:', settings);
    return { data: { success: true }, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// ==================== AUDIT LOGS ====================

/**
 * Get audit logs
 */
export const getAuditLogs = async (limit = 50) => {
  try {
    return {
      data: [
        {
          id: '1',
          action: 'user_login',
          user: 'admin@example.com',
          details: 'Admin logged in',
          timestamp: '2024-10-28T10:30:00Z',
          ipAddress: '192.168.1.100'
        },
        {
          id: '2',
          action: 'property_created',
          user: 'landlord@example.com',
          details: 'Created property: Sunset Apartments',
          timestamp: '2024-10-28T09:15:00Z',
          ipAddress: '192.168.1.101'
        }
      ],
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

// ==================== REPORTS ====================

/**
 * Get revenue report
 */
export const getRevenueReport = async (startDate, endDate) => {
  try {
    return {
      data: {
        totalRevenue: 125600,
        transactions: 156,
        averageTransaction: 805.13,
        chartData: [
          { month: 'Jan', revenue: 110000 },
          { month: 'Feb', revenue: 120000 },
          { month: 'Mar', revenue: 125000 },
          { month: 'Apr', revenue: 130000 },
          { month: 'May', revenue: 128000 },
          { month: 'Jun', revenue: 125600 }
        ]
      },
      error: null
    };
  } catch (error) {
    return { data: null, error };
  }
};

