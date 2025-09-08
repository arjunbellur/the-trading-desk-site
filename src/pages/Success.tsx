import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEntitlements } from '@/hooks/useEntitlements';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { refetch } = useEntitlements();
  const [isLoading, setIsLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Refetch entitlements to get the latest data
    const updateEntitlements = async () => {
      try {
        await refetch();
        setIsLoading(false);
      } catch (error) {
        console.error('Error updating entitlements:', error);
        setIsLoading(false);
      }
    };

    updateEntitlements();
  }, [refetch]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20"
          >
            <CheckCircle className="h-10 w-10 text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="mb-4 text-2xl font-bold text-white">
              Payment Successful!
            </h1>
            <p className="mb-6 text-gray-300">
              Thank you for your purchase. Your subscription has been activated and you now have access to premium content.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />
                <span className="text-sm">Updating your access...</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={() => navigate('/courses')}
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-purple-700"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Browse Courses</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full rounded-xl border-white/20 py-3 text-white transition-all duration-200 hover:bg-white/10"
            >
              <div className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </div>
            </Button>
          </motion.div>

          {/* Session Info (for debugging) */}
          {sessionId && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-gray-400">
                Session ID: {sessionId}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
