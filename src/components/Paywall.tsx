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
      className="max-w-md mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center"
    >
      <div className="mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      {metadata && (
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <h4 className="text-white font-medium mb-2">{metadata.name}</h4>
          <p className="text-gray-300 text-sm">{metadata.description}</p>
        </div>
      )}

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Shield className="w-4 h-4 text-green-400" />
          <span>Secure payment processing</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span>Instant access after purchase</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <CreditCard className="w-4 h-4 text-blue-400" />
          <span>Cancel anytime</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={handlePurchase}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          `Unlock ${metadata?.name || 'Content'}`
        )}
      </Button>

      <p className="text-xs text-gray-400 mt-4">
        By purchasing, you agree to our terms of service and privacy policy.
      </p>
    </motion.div>
  );
}
