import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only throw error in production if variables are missing
if (import.meta.env.PROD && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('Missing Supabase environment variables - using placeholder values');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
      };
      entitlements: {
        Row: {
          id: string;
          slug: string;
          kind: 'course' | 'membership';
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          kind: 'course' | 'membership';
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          kind?: 'course' | 'membership';
          created_at?: string;
        };
      };
      user_entitlements: {
        Row: {
          id: string;
          user_id: string;
          entitlement_id: string;
          status: 'active' | 'canceled' | 'past_due';
          expires_at: string | null;
          source: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          entitlement_id: string;
          status: 'active' | 'canceled' | 'past_due';
          expires_at?: string | null;
          source?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          entitlement_id?: string;
          status?: 'active' | 'canceled' | 'past_due';
          expires_at?: string | null;
          source?: string | null;
          created_at?: string;
        };
      };
    };
  };
}
