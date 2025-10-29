# Admin Dashboard

This document explains the admin dashboard functionality and how to set up Supabase integration.

## Overview

The admin dashboard provides comprehensive platform management capabilities including:
- Platform statistics and metrics
- User management (landlords and tenants)
- Property oversight across all landlords
- Revenue tracking and reports
- System settings configuration
- Audit logs

## Features

### 1. Overview Tab
- Platform-wide statistics (users, properties, occupancy, revenue)
- System health monitoring
- Visual charts showing platform distribution

### 2. User Management
- View all landlords and tenants
- Update user status (active/suspended/inactive)
- Delete users
- Filter by role (all/landlords/tenants)
- Search users by name or email

### 3. Property Overview
- View all properties across the platform
- See property details and revenue
- Monitor property distribution

### 4. Revenue Tracking
- Total platform revenue
- Transaction statistics
- Revenue trends over time
- Interactive charts

### 5. System Settings
- Platform configuration
- Toggle features (registration, maintenance mode)
- Configure currency and timezone
- Manage system limits

### 6. Audit Logs
- Track all platform activities
- View user actions
- Monitor security events
- IP address tracking

## Mock Credentials

For testing, use these credentials:
- **Email:** admin@tenantplatform.com
- **Password:** Admin123!

## Supabase Integration Setup

### 1. Install Supabase (if not already installed)

```bash
npm install @supabase/supabase-js
```

### 2. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose a name and database password
5. Wait for the project to be created

### 3. Get Your Credentials

1. Go to Project Settings > API
2. Copy:
   - Project URL
   - `anon` public key

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Database Schema (Example)

Create these tables in Supabase:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  role VARCHAR NOT NULL, -- 'admin', 'landlord', 'tenant'
  name VARCHAR,
  status VARCHAR DEFAULT 'active', -- 'active', 'suspended', 'inactive'
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP,
  properties_count INTEGER DEFAULT 0,
  tenants_count INTEGER DEFAULT 0
);

-- Properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  landlord_id UUID REFERENCES users(id),
  address VARCHAR,
  type VARCHAR, -- 'apartment', 'house', 'hostel', etc.
  units_count INTEGER,
  occupancy_rate DECIMAL,
  monthly_revenue DECIMAL,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action VARCHAR NOT NULL,
  user_email VARCHAR,
  details TEXT,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip_address VARCHAR
);

-- Platform stats can be created as a view or materialized table
CREATE VIEW platform_stats AS
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM users WHERE role = 'landlord') as total_landlords,
  (SELECT COUNT(*) FROM users WHERE role = 'tenant') as total_tenants,
  (SELECT COUNT(*) FROM properties) as total_properties,
  (SELECT SUM(units_count) FROM properties) as total_units,
  (SELECT SUM(occupied_units) FROM properties) as occupied_units,
  (SELECT SUM(monthly_revenue) FROM properties) as monthly_revenue,
  99.9 as system_uptime,
  NOW() as last_backup
FROM users;
```

### 6. Update Service Files

Replace the mock data in `src/services/adminService.js` with actual Supabase queries:

```javascript
import { supabase } from '../config/supabase';

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const updateUserStatus = async (userId, status) => {
  const { data, error } = await supabase
    .from('users')
    .update({ status })
    .eq('id', userId);
  
  return { data, error };
};

// Add similar functions for other operations
```

## Usage

1. Navigate to `/admin-login`
2. Enter your admin credentials
3. Access all admin features from the dashboard
4. Use tabs to navigate between different sections

## Security

- All admin functions require authentication
- Session is stored in localStorage
- Protect your admin credentials
- Implement row-level security (RLS) in Supabase for production

## Production Considerations

1. Set up Supabase Row Level Security (RLS) policies
2. Use environment variables for sensitive data
3. Implement proper authentication with Supabase Auth
4. Add rate limiting and security headers
5. Regular backups of your database
6. Monitor audit logs regularly
7. Use strong passwords for admin accounts

## Troubleshooting

### Cannot connect to Supabase
- Check your environment variables are set correctly
- Verify your Supabase project is active
- Check network connectivity
- Review browser console for errors

### Data not loading
- Verify your database tables exist
- Check table permissions
- Review Supabase logs
- Ensure RLS policies allow access

### Authentication issues
- Clear localStorage and try again
- Check that admin credentials are correct
- Review authentication flow in LoginForm component

## Support

For issues or questions:
1. Check the console for errors
2. Review Supabase logs
3. Verify database schema matches expectations
4. Check environment configuration

