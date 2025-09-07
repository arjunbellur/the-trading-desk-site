import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/typography";
import { supabase } from "@/lib/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Sign in only
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      // Redirect to intended page or home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="h-full">
        <div className="grid lg:grid-cols-2 h-full">
            
          {/* Left Column - Promotional Section */}
          <motion.div 
            className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 p-8 lg:p-12 flex flex-col justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/20 via-transparent to-emerald-400/20 transform -skew-x-12 -translate-x-1/4" />
              <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-green-600/30 to-transparent transform skew-x-12 translate-x-1/4" />
            </div>

            <div className="relative z-10">
              {/* Main Headline */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Navigate the
                  <br />
                  Markets with
                  <br />
                  Confidence
                </h1>
              </motion.div>

              {/* Feature Buttons */}
              <motion.div
                className="space-y-3 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {[
                  "Advanced Technical Analysis/Charting Tools",
                  "Community Feeds",
                  "Customizable UI for Your Trading Style",
                  "Customer Support"
                ].map((feature, index) => (
                  <motion.button
                    key={index}
                    className="block w-full text-left px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {feature}
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Testimonial */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
                <div className="text-4xl text-green-300 mb-3">&quot;</div>
              <blockquote className="text-lg text-white mb-4 leading-relaxed">
                Game changing trading software that helped me <strong>analysis</strong> market trends easily and <strong>make better decisions</strong>
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Aaron O&apos;Donnell</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-white/80">Pro Account</span>
                    <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sign-up Form */}
          <motion.div
            className="bg-black p-8 lg:p-12 flex items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-full max-w-md mx-auto">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
                </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <Label htmlFor="email" className="text-white/90 mb-1 block text-sm">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20 py-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-white/90 mb-1 block text-sm">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20 pr-10 py-2"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <Text className="text-xs text-gray-400 mt-1">
                      At least 8 characters, with numbers and symbols.
                    </Text>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberDevice}
                      onChange={(e) => setRememberDevice(e.target.checked)}
                      className="rounded border-gray-700 bg-gray-900 text-blue-400 focus:ring-blue-400/20"
                    />
                    <Label htmlFor="remember" className="text-white/90 text-sm">
                      Remember this device
                    </Label>
                  </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                </form>

                <div className="text-center">
                  <Text className="text-xs text-gray-400">
                    Don't have an account?{" "}
                    <button className="text-green-400 hover:text-green-300 underline">
                      Contact support
                    </button>
                  </Text>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;