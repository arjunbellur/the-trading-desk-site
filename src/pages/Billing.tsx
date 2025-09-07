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
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'past_due':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'canceled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
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
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">Billing & Subscriptions</h1>
              <p className="text-gray-300 text-lg">
                Manage your subscriptions and billing information
              </p>
            </div>

            {/* User Info */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{user?.email}</h3>
                  <p className="text-gray-400 text-sm">Member since {new Date(user?.created_at || '').toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Current Subscriptions */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Current Subscriptions</h2>
              
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : entitlements.length === 0 ? (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No active subscriptions</p>
                  <p className="text-gray-500 text-sm mt-2">
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
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          {getStatusIcon('active')}
                          <div>
                            <h3 className="text-white font-medium">
                              {metadata?.name || entitlement}
                            </h3>
                            <p className="text-gray-400 text-sm">
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
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Billing Management</h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                  <div>
                    <h3 className="text-white font-medium">Manage Subscription</h3>
                    <p className="text-gray-400 text-sm">
                      Update payment method, view invoices, or cancel subscription
                    </p>
                  </div>
                  <Button
                    onClick={handleManageBilling}
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Manage</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Need Help?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-white font-medium mb-2">Billing Questions</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Have questions about your subscription or billing?
                  </p>
                  <Button className="w-full border border-white/20 text-white hover:bg-white/10">
                    Contact Support
                  </Button>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-white font-medium mb-2">Account Issues</h3>
                  <p className="text-gray-400 text-sm mb-3">
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
