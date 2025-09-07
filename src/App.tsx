/**
 * Main App Component with Code Splitting and Performance Optimizations
 * Implements lazy loading for better performance and user experience
 */

import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { DemoModeBanner } from "@/components/DemoModeBanner";

// Lazy load page components for better performance
const Index = React.lazy(() => import("./pages/Index"));
const Courses = React.lazy(() => import("./pages/Courses"));
const CourseDetail = React.lazy(() => import("./pages/CourseDetail"));
const Live = React.lazy(() => import("./pages/Live"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Community = React.lazy(() => import("./pages/Community"));
const StyleGuide = React.lazy(() => import("./pages/StyleGuide"));
const Login = React.lazy(() => import("./pages/Login"));
const Billing = React.lazy(() => import("./pages/Billing"));
const Success = React.lazy(() => import("./pages/Success"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

/**
 * Loading fallback component for lazy-loaded routes
 */
const LoadingFallback: React.FC = () => (
  <div className="flex min-h-screen items-center justify-center bg-black">
    <div className="text-center">
      <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      <p className="text-sm text-white/70">Loading...</p>
    </div>
  </div>
);

/**
 * Query client configuration with proper error handling and caching
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Error handler for the error boundary
 */
const handleGlobalError = (error: Error, errorInfo: React.ErrorInfo): void => {
  // In production, send to error reporting service
  console.error('Global error caught:', error, errorInfo);
  
  // Example: Send to analytics or error reporting
  // analytics.track('Error', { error: error.message, stack: error.stack });
};

/**
 * Main App component with providers and routing
 */
const App: React.FC = () => (
  <ErrorBoundary onError={handleGlobalError}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter 
          future={{
            // Enable React.startTransition for state updates (React Router v7 preparation)
            v7_startTransition: true,
            // Enable new relative route resolution within splat routes (React Router v7 preparation)
            v7_relativeSplatPath: true
          }}
        >
          <DemoModeBanner />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/live" element={<Live />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/community" element={<Community />} />
              <Route path="/login" element={<Login />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/success" element={<Success />} />
              <Route path="/style-guide" element={<StyleGuide />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
