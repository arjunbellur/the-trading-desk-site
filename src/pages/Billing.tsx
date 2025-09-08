import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useSession } from '@/hooks/useSession';
import { useEntitlements } from '@/hooks/useEntitlements';
import { ENTITLEMENT_METADATA } from '@/config/entitlements';
import { supabase } from '@/lib/supabase/client';

const Billing: React.FC = () => {
  const { user } = useSession();
  const { entitlements, loading } = useEntitlements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleManageBilling = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to open billing portal');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'past_due':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'canceled':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'past_due':
        return 'Past Due';
      case 'canceled':
        return 'Canceled';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'past_due':
        return 'text-yellow-400';
      case 'canceled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="mb-4 text-4xl font-bold text-white">Billing & Subscriptions</h1>
              <p className="text-lg text-gray-300">
                Manage your subscriptions and billing information
              </p>
            </div>

            {/* User Info */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-lg font-semibold text-white">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{user?.email}</h3>
                  <p className="text-sm text-gray-400">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Current Subscriptions */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="mb-6 text-2xl font-semibold text-white">Current Subscriptions</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                </div>
              ) : entitlements.length === 0 ? (
                <div className="py-8 text-center">
                  <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p className="text-gray-400">No active subscriptions</p>
                  <p className="mt-2 text-sm text-gray-500">
                    Browse our courses to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {entitlements.map((entitlement) => {
                    const metadata = ENTITLEMENT_METADATA[entitlement];
                    return (
                      <div
                        key={entitlement}
                        className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon('active')}
                          <div>
                            <h3 className="font-medium text-white">
                              {metadata?.name || entitlement}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {metadata?.description || 'Premium content access'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${getStatusColor('active')}`}>
                            {getStatusText('active')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Billing Management */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="mb-6 text-2xl font-semibold text-white">Billing Management</h2>
              
              {error && (
                <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                  <div>
                    <h3 className="font-medium text-white">Manage Subscription</h3>
                    <p className="text-sm text-gray-400">
                      Update payment method, view invoices, or cancel subscription
                    </p>
                  </div>
                  <Button
                    onClick={handleManageBilling}
                    disabled={isLoading}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Manage</span>
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
              <h2 className="mb-4 text-2xl font-semibold text-white">Need Help?</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-medium text-white">Billing Questions</h3>
                  <p className="mb-3 text-sm text-gray-400">
                    Have questions about your subscription or billing?
                  </p>
                  <Button className="w-full border border-white/20 text-white hover:bg-white/10">
                    Contact Support
                  </Button>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h3 className="mb-2 font-medium text-white">Account Issues</h3>
                  <p className="mb-3 text-sm text-gray-400">
                    Need help with your account or access?
                  </p>
                  <Button className="w-full border border-white/20 text-white hover:bg-white/10">
                    Get Help
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Billing;
