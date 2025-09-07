import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useSession } from './useSession';

export function useEntitlements() {
  const { user, error: sessionError } = useSession();
  const [entitlements, setEntitlements] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || sessionError) {
      setEntitlements([]);
      setLoading(false);
      return;
    }

    // Check if Supabase is properly configured
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      console.warn('Supabase not configured - returning empty entitlements');
      setEntitlements([]);
      setLoading(false);
      return;
    }

    const fetchEntitlements = async () => {
      try {
        const { data, error } = await supabase
          .from('user_entitlements')
          .select(`
            status,
            entitlements!inner(slug)
          `)
          .eq('user_id', user.id)
          .eq('status', 'active');

        if (error) {
          console.error('Error fetching entitlements:', error);
          setError(error.message);
          setEntitlements([]);
        } else {
          const slugs = data?.map((item: any) => item.entitlements.slug) || [];
          setEntitlements(slugs);
        }
      } catch (error) {
        console.error('Error fetching entitlements:', error);
        setError('Failed to fetch entitlements');
        setEntitlements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntitlements();
  }, [user, sessionError]);

  const hasEntitlement = (requiredEntitlement: string): boolean => {
    if (!requiredEntitlement || requiredEntitlement === 'free') {
      return true;
    }
    
    return entitlements.includes(requiredEntitlement) || 
           entitlements.includes('membership:all-access');
  };

  const hasAnyEntitlement = (requiredEntitlements: string[]): boolean => {
    return requiredEntitlements.some(entitlement => hasEntitlement(entitlement));
  };

  return {
    entitlements,
    loading,
    error,
    hasEntitlement,
    hasAnyEntitlement,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Trigger re-fetch by updating user dependency
    },
  };
}
