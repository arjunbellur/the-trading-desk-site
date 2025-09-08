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
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-black">
      <div className="h-full">
        <div className="grid h-full lg:grid-cols-2">
            
          {/* Left Column - Promotional Section */}
          <motion.div 
            className="relative flex flex-col justify-between bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 p-8 lg:p-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Background Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-full -translate-x-1/4 -skew-x-12 transform bg-gradient-to-br from-green-400/20 via-transparent to-emerald-400/20" />
              <div className="absolute right-0 top-0 h-1/2 w-1/3 translate-x-1/4 skew-x-12 transform bg-gradient-to-bl from-green-600/30 to-transparent" />
            </div>

            <div className="relative z-10">
              {/* Main Headline */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl xl:text-6xl">
                  Navigate the
                  <br />
                  Markets with
                  <br />
                  Confidence
                </h1>
              </motion.div>

              {/* Feature Buttons */}
              <motion.div
                className="mb-8 space-y-3"
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
                    className="block w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-left text-sm text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
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
                <div className="mb-3 text-4xl text-green-300">&quot;</div>
              <blockquote className="mb-4 text-lg leading-relaxed text-white">
                Game changing trading software that helped me <strong>analysis</strong> market trends easily and <strong>make better decisions</strong>
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Aaron O&apos;Donnell</div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-white/80">Pro Account</span>
                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sign-up Form */}
          <motion.div
            className="flex items-center bg-black p-8 lg:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mx-auto w-full max-w-md">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Header */}
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-2xl font-semibold text-white">Welcome Back</h2>
                  <p className="text-sm text-gray-400">Sign in to your account to continue</p>
                </div>

                  {/* Error Message */}
                  {error && (
                    <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">

                  <div>
                    <Label htmlFor="email" className="mb-1 block text-sm text-white/90">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                        className="border-gray-700 bg-gray-900 py-2 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="mb-1 block text-sm text-white/90">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="border-gray-700 bg-gray-900 py-2 pr-10 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <Text className="mt-1 text-xs text-gray-400">
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
                    <Label htmlFor="remember" className="text-sm text-white/90">
                      Remember this device
                    </Label>
                  </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-lg bg-green-500 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-green-600"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
                    <button className="text-green-400 underline hover:text-green-300">
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