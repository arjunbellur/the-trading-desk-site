-- Initial database schema for TradeMasters membership system
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entitlements table (defines what can be purchased)
CREATE TABLE IF NOT EXISTS entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('course', 'membership')),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User entitlements table (tracks what users have access to)
CREATE TABLE IF NOT EXISTS user_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entitlement_id UUID NOT NULL REFERENCES entitlements(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due')),
  expires_at TIMESTAMPTZ,
  source TEXT DEFAULT 'stripe',
  stripe_subscription_id TEXT,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, entitlement_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_entitlements_slug ON entitlements(slug);
CREATE INDEX IF NOT EXISTS idx_user_entitlements_user_id ON user_entitlements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_entitlements_status ON user_entitlements(status);
CREATE INDEX IF NOT EXISTS idx_user_entitlements_expires_at ON user_entitlements(expires_at);

-- Insert default entitlements
INSERT INTO entitlements (slug, kind, name, description) VALUES
  ('membership:all-access', 'membership', 'All Access Membership', 'Unlock all courses and premium content'),
  ('course:orderflow-basics', 'course', 'Order Flow Basics', 'Master the fundamentals of order flow trading'),
  ('course:price-action-pro', 'course', 'Price Action Pro', 'Advanced price action strategies and techniques')
ON CONFLICT (slug) DO NOTHING;

-- Function to automatically create user record when auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user record
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user entitlements
CREATE OR REPLACE FUNCTION get_user_entitlements(p_user_id UUID)
RETURNS TABLE(entitlement_slug TEXT, status TEXT, expires_at TIMESTAMPTZ) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    e.slug as entitlement_slug,
    ue.status,
    ue.expires_at
  FROM user_entitlements ue
  JOIN entitlements e ON ue.entitlement_id = e.id
  WHERE ue.user_id = p_user_id
    AND ue.status = 'active'
    AND (ue.expires_at IS NULL OR ue.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has specific entitlement
CREATE OR REPLACE FUNCTION user_has_entitlement(p_user_id UUID, p_entitlement_slug TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  has_access BOOLEAN := FALSE;
BEGIN
  -- Check if user has the specific entitlement or all-access membership
  SELECT EXISTS(
    SELECT 1 
    FROM user_entitlements ue
    JOIN entitlements e ON ue.entitlement_id = e.id
    WHERE ue.user_id = p_user_id
      AND ue.status = 'active'
      AND (ue.expires_at IS NULL OR ue.expires_at > NOW())
      AND (e.slug = p_entitlement_slug OR e.slug = 'membership:all-access')
  ) INTO has_access;
  
  RETURN has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_entitlements ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Entitlements are public (read-only)
CREATE POLICY "Entitlements are viewable by everyone" ON entitlements
  FOR SELECT USING (true);

-- User entitlements are private
CREATE POLICY "Users can view own entitlements" ON user_entitlements
  FOR SELECT USING (auth.uid() = user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON entitlements TO anon, authenticated;
GRANT SELECT, UPDATE ON users TO authenticated;
GRANT SELECT ON user_entitlements TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_entitlements(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION user_has_entitlement(UUID, TEXT) TO authenticated;

-- Update timestamps function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entitlements_updated_at BEFORE UPDATE ON entitlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_entitlements_updated_at BEFORE UPDATE ON user_entitlements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
