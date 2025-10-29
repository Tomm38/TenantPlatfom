import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Uses env if present, falls back to provided project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ducyompeclwhecrcpjir.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Y3lvbXBlY2x3aGVjcmNwamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MjIwODYsImV4cCI6MjA3NzE5ODA4Nn0.FdlB90BZeqjFxs-l0xEqF64BQPrm0_RWJwSXKKfeNTU';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Export auth functions for convenience
export const auth = supabase.auth;

// Export storage for file uploads
export const storage = supabase.storage;

// Export realtime for live updates
export const realtime = supabase.realtime;

export default supabase;

