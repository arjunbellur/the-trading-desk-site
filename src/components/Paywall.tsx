import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ENTITLEMENT_METADATA } from '@/config/entitlements';

interface PaywallProps {
  entitlementSlug: string;
  title?: string;
  description?: string;
  onSuccess?: () => void;
}

export function Paywall({ 
  entitlementSlug, 
  title = "Premium Content", 
  description = "This content is available to members only.",
  onSuccess 
}: PaywallProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const metadata = ENTITLEMENT_METADATA[entitlementSlug];

  const handlePurchase = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entitlementSlug }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-lg"
    >
      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      {metadata && (
        <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <h4 className="mb-2 font-medium text-white">{metadata.name}</h4>
          <p className="text-sm text-gray-300">{metadata.description}</p>
        </div>
      )}

      <div className="mb-6 space-y-3">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Shield className="h-4 w-4 text-green-400" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Zap className="h-4 w-4 text-yellow-400" />
          <span>Instant access after purchase</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <CreditCard className="h-4 w-4 text-blue-400" />
          <span>Cancel anytime</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <Button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            <span>Processing...</span>
          </div>
        ) : (
          `Unlock ${metadata?.name || 'Content'}`
        )}
      </Button>

      <p className="mt-4 text-xs text-gray-400">
        By purchasing, you agree to our terms of service and privacy policy.
      </p>
    </motion.div>
  );
}
