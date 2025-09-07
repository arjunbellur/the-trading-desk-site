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
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-300 mb-6">
              Thank you for your purchase. Your subscription has been activated and you now have access to premium content.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-blue-400">
                <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Browse Courses</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Button>

            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 py-3 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </div>
            </Button>
          </motion.div>

          {/* Session Info (for debugging) */}
          {sessionId && process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
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
