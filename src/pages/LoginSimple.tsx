/**
 * LoginSimple Page Component - The Trading Desk
 * Lightweight, fast-loading login page for course membership access
 * Simplified version for better performance
 */

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionTitle } from "@/components/ui/typography";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

/**
 * Lightweight login page component for better performance
 */
const LoginSimple: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual authentication logic
      console.log('Login attempt:', formData);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-black">
      {/* Navigation at top */}
      <Navigation />

      {/* Main content area */}
      <main className="flex w-full flex-1 items-center justify-center px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-md">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">
              <PlayCircle className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">Premium Course Access</span>
            </div>

            <SectionTitle className="mb-4 text-3xl text-white sm:text-4xl">
              Access Your Trading Courses
            </SectionTitle>

            <p className="text-lg text-white/70">
              Sign in to unlock unlimited access to expert-led trading education
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white/80">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/40" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-white/20 bg-white/5 pl-10 text-white placeholder-white/40 focus:border-emerald-400/50 focus:ring-emerald-400/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white/80">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-white/40" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12 border-white/20 bg-white/5 pl-10 pr-10 text-white placeholder-white/40 focus:border-emerald-400/50 focus:ring-emerald-400/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-white/40 transition-colors hover:text-white/60"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
                >
                  Forgot your password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="h-12 w-full border-0 bg-emerald-500 font-medium text-white shadow-lg transition-all duration-200 hover:bg-emerald-600 hover:shadow-emerald-500/25"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing In...
                  </div>
                ) : (
                  'Access Your Courses'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mb-6 mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-black px-2 text-white/40">Don't have an account?</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <button
                type="button"
                className="text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300"
              >
                Start your trading journey →
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-white/40">
              🔒 Your data is secure and encrypted
            </p>
          </div>
        </div>
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default LoginSimple;
