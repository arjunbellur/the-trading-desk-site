import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import { NeonGradientCard, Marquee, ShineBorder, BorderBeam } from "@/components/magicui";
import { motion, AnimatePresence } from "framer-motion";
// BlurInView removed for mobile performance
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import Footer from "@/components/Footer";
import React, { useEffect, useState, useMemo } from "react";
import { 
  BookOpen, 
  Star, 
  Quote,
  Clock,
  Play,
  Users,
  Video,
  Award,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Globe,
  Zap
} from "lucide-react";

const Index = () => {
  const rotatingWords = useMemo(() => ["market", "trade", "insights"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWordWidth, setCurrentWordWidth] = useState(0);
  
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, [rotatingWords]);

  // Calculate width for the current word dynamically
  useEffect(() => {
    const measureElement = document.createElement('div');
    measureElement.style.position = 'absolute';
    measureElement.style.visibility = 'hidden';
    measureElement.style.whiteSpace = 'nowrap';
    measureElement.style.fontSize = 'clamp(2.75rem, 8vw, 6rem)'; // Match increased hero title font size
    measureElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif';
    measureElement.style.fontWeight = '700';
    measureElement.style.top = '-9999px';
    measureElement.className = 'tm-theme-text-gradient--brand';
    
    document.body.appendChild(measureElement);
    
    // Measure current word
    measureElement.textContent = rotatingWords[wordIndex];
    const width = measureElement.getBoundingClientRect().width;
    
    // Add small padding and set width
    setCurrentWordWidth(Math.ceil(width) + 5);
    document.body.removeChild(measureElement);
  }, [rotatingWords, wordIndex]);

  // Create optimized glow elements with reduced mobile impact
  React.useEffect(() => {
    // Detect mobile to reduce glow complexity
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Remove any existing glow elements
    const existingGlows = document.querySelectorAll('.lamp-glow-element');
    existingGlows.forEach(el => el.remove());

    // Only create glows if not on mobile to improve performance
    if (!isMobile) {
      // Create simplified primary glow
      const primaryGlow = document.createElement('div');
      primaryGlow.className = 'lamp-glow-element';
      primaryGlow.style.cssText = `
        position: fixed;
        top: 2px;
        left: 50%;
        transform: translateX(-50%);
        width: 100vw;
        height: 16px;
        background: linear-gradient(180deg, rgba(4, 44, 34, 0.008), transparent);
        filter: blur(3px);
        z-index: 10;
        pointer-events: none;
        will-change: transform;
      `;
      
      // Create simplified central glow
      const centralGlow = document.createElement('div');
      centralGlow.className = 'lamp-glow-element';
      centralGlow.style.cssText = `
        position: fixed;
        top: 50vh;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        height: 100px;
        background: linear-gradient(90deg, transparent 0%, rgba(4, 44, 34, 0.005) 50%, transparent 100%);
        filter: blur(40px);
        z-index: 9;
        pointer-events: none;
        will-change: transform;
      `;
      
      document.body.appendChild(primaryGlow);
      document.body.appendChild(centralGlow);
    }

    return () => {
      // Cleanup on unmount
      const glowElements = document.querySelectorAll('.lamp-glow-element');
      glowElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Particle background removed per spec */}
      
      <Navigation />
      
      {/* Hero Section - Optimized Magic UI Layout */}
      <section id="home" className="tm-layout-hero relative pt-20 sm:pt-24 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden z-40">
        {/* Transparent background */}
        <div className="tm-layout-hero__background absolute inset-0 bg-transparent" />
        
        {/* Optimized neon lamp effect - responsive and performant */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
            {/* Left lamp beam - responsive sizing */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "20rem" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto right-1/2 h-40 md:h-56 overflow-visible w-[20rem] md:w-[35rem] bg-gradient-conic from-green-400 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
            >
              <div className="absolute w-[100%] left-0 bg-black h-32 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
              <div className="absolute w-32 md:w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
            </motion.div>
            
            {/* Right lamp beam - responsive sizing */}
            <motion.div
              initial={{ opacity: 0.5, width: "15rem" }}
              whileInView={{ opacity: 1, width: "20rem" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.25,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              style={{
                backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
              }}
              className="absolute inset-auto left-1/2 h-40 md:h-56 w-[20rem] md:w-[35rem] bg-gradient-conic from-transparent via-transparent to-green-400 [--conic-position:from_290deg_at_center_top]"
            >
              <div className="absolute w-32 md:w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
              <div className="absolute w-[100%] right-0 bg-black h-32 md:h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            </motion.div>
            
            {/* Background blur layers - optimized */}
            <div className="absolute top-1/2 h-32 md:h-48 w-full translate-y-8 md:translate-y-12 scale-x-100 md:scale-x-150 bg-black blur-xl md:blur-2xl"></div>
            <div className="absolute top-1/2 z-50 h-32 md:h-48 w-full bg-transparent opacity-5 md:opacity-10 backdrop-blur-md"></div>
            
            {/* Central glow - optimized for mobile */}
            <div className="absolute left-0 right-0 top-1/2 z-50 h-24 md:h-36 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-700/3 md:via-emerald-700/5 to-transparent blur-2xl md:blur-3xl"></div>
            
            {/* Secondary glow layer - desktop only for performance */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0.5 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="hidden md:block absolute left-0 right-0 top-0 z-30 h-36 w-full -translate-y-[6rem] bg-gradient-to-r from-transparent via-emerald-800/3 to-transparent blur-2xl"
            />
            
            {/* Lamp bar - optimized */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="absolute top-0 left-0 right-0 z-[100] h-0.5 bg-emerald-600 shadow-[0_0_4px_#047857] md:shadow-[0_0_6px_#047857] origin-center"
            />
            
            {/* Bright center highlight - optimized */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: 0.35,
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="absolute top-0 left-0 right-0 translate-y-px z-[101] h-px bg-emerald-300 shadow-[0_0_2px_#6ee7b7] md:shadow-[0_0_4px_#6ee7b7] origin-center"
            />
            
            {/* Top mask - responsive positioning */}
            <div className="absolute inset-auto z-40 h-32 md:h-44 w-full -translate-y-[8rem] md:-translate-y-[10rem] bg-black"></div>
          </div>
        </div>
        
        <div className="tm-layout-container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-50">
          <div className="tm-layout-hero__content max-w-full sm:max-w-5xl mx-auto">
            {/* Beta pill */}
            <div className="tm-layout-hero__badge mb-6 sm:mb-8">
              <span className="tm-ui-badge tm-ui-badge--glass beta-pill">The Trading Desk</span>
            </div>

            {/* Main Headline - Optimized animations */}
            <h1 className="tm-layout-hero__title mb-4 sm:mb-6 text-white text-center">
              <div className="tm-layout-hero__title-container flex flex-col items-center justify-center">
                <div className="flex items-center justify-center whitespace-nowrap">
                  <motion.span 
                    initial={{ opacity: 0, x: -20, filter: "blur(2px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2,
                      ease: [0.23, 1, 0.32, 1],
                      type: "tween"
                    }}
                    className="mr-1 sm:mr-2 md:mr-3 tm-apple-3d-text"
                  >
                    Master your
                  </motion.span>
                  <span 
                    className="tm-layout-hero__rotating-word relative inline-block h-[1.2em] overflow-visible transition-all duration-500 ease-out"
                    style={{ width: currentWordWidth > 0 ? `${currentWordWidth}px` : 'auto' }}
                  >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, y: 20, filter: "blur(2px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(2px)" }}
                      transition={{ 
                        duration: 0.5,
                        ease: [0.23, 1, 0.32, 1],
                        type: "tween"
                      }}
                      className="tm-theme-text-gradient--brand absolute inset-0 flex items-center justify-start whitespace-nowrap ml-1 sm:ml-2 md:ml-4"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                </div>
              </div>
            </h1>

            {/* Subtitle - Optimized spacing */}
            <p className="tm-layout-hero__description text-lead text-white/70 mb-8 sm:mb-10 md:mb-12 max-w-xl mx-auto">
              Professional education, live mentorship, and a community built for serious traders.
            </p>

            {/* CTA Button - Optimized spacing */}
            <div className="tm-layout-hero__actions mb-12 sm:mb-14 md:mb-16">
              <Button variant="regular" className="text-base font-semibold">
                Get Started
              </Button>
            </div>

            {/* Hero Image - Optimized glow effects */}
            <div className="tm-layout-hero__image relative">
              {/* Optimized glow background - reduced complexity for mobile */}
              <div className="absolute top-0 left-0 right-0 h-4/5 flex items-start justify-center">
                <div className="absolute w-[200%] h-[140%] -z-10 -top-16">
                  {/* Primary glow - optimized opacity */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-4 md:opacity-6 animate-pulse-glow"
                    style={{
                      background: `radial-gradient(ellipse 120% 90% at center 20%, #22c55e 0%, transparent 60%)`,
                      filter: 'blur(100px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Secondary glow - optimized */}
                  <div 
                    className="absolute inset-8 rounded-full opacity-3 md:opacity-5 animate-pulse-glow-secondary"
                    style={{
                      background: `radial-gradient(ellipse 100% 75% at center 15%, #4ade80 0%, transparent 50%)`,
                      filter: 'blur(80px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Core glow - optimized */}
                  <div 
                    className="absolute inset-16 rounded-full opacity-6 md:opacity-10 animate-pulse-glow-tertiary"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at center 10%, #86efac 0%, transparent 40%)`,
                      filter: 'blur(60px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Ambient glow - desktop only for performance */}
                  <div 
                    className="hidden md:block absolute inset-4 rounded-full opacity-3"
                    style={{
                      background: `radial-gradient(ellipse 140% 100% at center 25%, #22c55e 0%, transparent 70%)`,
                      filter: 'blur(150px)',
                      animation: 'pulse-glow 15s ease-in-out infinite reverse'
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Main hero image container */}
              <div className="flex items-center justify-center relative z-[50]">
                <NeonGradientCard className="w-full max-w-5xl p-1" style={{ pointerEvents: 'none' }}>
                  {/* Laptop bezel border - optimized */}
                  <div className="rounded-[11px] overflow-hidden relative">
                    {/* Outer bezel frame */}
                    <div className="absolute inset-0 rounded-[11px] border-2 border-gray-300/80 shadow-inner" aria-hidden="true"></div>
                    {/* Inner bright bezel */}
                    <div className="absolute inset-[2px] rounded-[9px] border border-gray-200/60 shadow-sm" aria-hidden="true"></div>
                    {/* Screen border */}
                    <div className="absolute inset-[4px] rounded-[7px] border border-gray-400/40" aria-hidden="true"></div>
                    
                    <img 
                      src="/Dashboard.png" 
                      alt="Trading Dashboard Preview" 
                      className="w-full h-auto object-contain relative z-10"
                      loading="eager"
                    />
                  </div>
                </NeonGradientCard>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section - Optimized */}
      <section className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="tm-ui-text--small text-muted-foreground font-semibold tracking-wide uppercase mb-6 sm:mb-8">
              TRUSTED BY TEAMS FROM AROUND THE WORLD
            </p>
            <Marquee pauseOnHover className="[--duration:30s]">
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">Goldman</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">Citadel</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">JP Morgan</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">BlackRock</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">Bridgewater</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-12 sm:h-16 flex items-center justify-center min-w-[100px] sm:min-w-[120px] mx-2 sm:mx-4">
                <span className="font-bold text-base sm:text-lg">Two Sigma</span>
              </div>
            </Marquee>
          </div>
        </div>
      </section>

      {/* Transform Your Trading Section - Better Spacing */}
      <section className="min-h-screen flex flex-col justify-between bg-transparent relative z-40 px-8 py-8">
        <div className="w-full max-w-none">
          {/* Section Header - Top Positioned */}
          <div className="text-center pt-8 sm:pt-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Transform Your{" "}
              <span className="tm-theme-text-gradient--brand">Trading</span>
            </h2>
          </div>

          {/* Three Cards Grid - Bottom Positioned */}
          <div className="grid md:grid-cols-3 gap-2 sm:gap-4 w-full mt-auto mb-8 sm:mb-12">
            {/* Coaching Card - Minimal */}
            <motion.div 
              className="relative group cursor-pointer h-80 sm:h-96 lg:h-[28rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="h-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative">
                {/* Background Image - Professional mentor/coaching */}
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80" 
                  alt="Professional coaching session" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-black/70"></div>
                
                {/* Content Overlay - Minimal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white tracking-wide">Coaching</h3>
                  </div>
                </div>

                {/* Simple Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Courses Card - Minimal */}
            <motion.div 
              className="relative group cursor-pointer h-80 sm:h-96 lg:h-[28rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="h-full overflow-hidden bg-gradient-to-br from-red-800 to-red-900 relative">
                {/* Background Image - Trading charts and analysis */}
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Trading charts and financial analysis" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 to-black/80"></div>
                
                {/* Content Overlay - Minimal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white tracking-wide">Courses</h3>
                  </div>
                </div>

                {/* Simple Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>

            {/* Community Card - Minimal */}
            <motion.div 
              className="relative group cursor-pointer h-80 sm:h-96 lg:h-[28rem]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="h-full overflow-hidden bg-gradient-to-br from-teal-800 to-slate-900 relative">
                {/* Background Image - Team collaboration/community */}
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Team collaboration and community" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-black/70">
                  {/* Mock chat interface elements overlay - minimal */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 space-y-1.5 sm:space-y-2 opacity-20">
                    <div className="h-2 sm:h-2.5 bg-white/20 rounded w-3/4"></div>
                    <div className="h-2 sm:h-2.5 bg-white/15 rounded w-1/2"></div>
                    <div className="h-2 sm:h-2.5 bg-white/10 rounded w-2/3"></div>
                  </div>
                  <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-6 right-4 sm:right-6 space-y-1.5 sm:space-y-2 opacity-15">
                    <div className="h-2 sm:h-2.5 bg-white/15 rounded w-1/2 ml-auto"></div>
                    <div className="h-2 sm:h-2.5 bg-white/20 rounded w-3/4 ml-auto"></div>
                  </div>
                </div>
                
                {/* Content Overlay - Minimal */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-thin text-white tracking-wide">Community</h3>
                  </div>
                </div>

                {/* Simple Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>





      {/* Value Proposition Section - Optimized */}
      <section id="value-proposition" className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
              Why <span className="text-gradient-gold">The Trading Desk</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four pillars that separate professionals from amateurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Award,
                title: "Expert-Led Masterclasses",
                description: "Learn from traders who've generated millions in profits across multiple market cycles."
              },
              {
                icon: Video,
                title: "Live Trading Sessions",
                description: "Watch real trades happen in real-time. See decision-making, risk management, and execution."
              },
              {
                icon: DollarSign,
                title: "Revenue-Focused Strategies",
                description: "Every technique we teach is designed to generate consistent, measurable returns."
              },
              {
                icon: Users,
                title: "Community + Peer Learning",
                description: "Connect with serious traders. Share insights, strategies, and accountability."
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
              >
                <NeonGradientCard className="p-1 text-center hover:scale-105 transition-transform">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                </NeonGradientCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Courses Section - Optimized */}
      <section id="courses" className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
              Featured <span className="text-gradient-gold">Courses</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From beginner fundamentals to advanced strategies. 
              Build skills that generate real profits.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Market Mastery Foundations",
                description: "Complete beginner's guide to profitable trading. Risk management, psychology, and proven strategies.",
                price: "$297",
                originalPrice: "$497",
                duration: "6 weeks",
                lessons: "24 video lessons",
                students: "3,247",
                rating: 4.9,
                level: "Beginner",
                features: ["Live Q&A sessions", "Trading simulator access", "Community access", "Certificate of completion"],
                thumbnail: "gradient-from-blue-600-to-purple-600"
              },
              {
                title: "Advanced Options Strategies",
                description: "Master complex options plays. Income generation, hedging, and advanced Greeks analysis.",
                price: "$597",
                originalPrice: "$897",
                duration: "8 weeks", 
                lessons: "32 video lessons",
                students: "1,893",
                rating: 4.8,
                level: "Advanced",
                features: ["Live trading sessions", "1-on-1 mentorship", "Strategy backtesting", "Lifetime updates"],
                thumbnail: "gradient-from-green-600-to-emerald-600"
              },
              {
                title: "Day Trading Intensive",
                description: "High-frequency strategies for active traders. Scalping, momentum, and intraday techniques.",
                price: "$497",
                originalPrice: "$697",
                duration: "10 weeks",
                lessons: "40 video lessons", 
                students: "2,156",
                rating: 4.9,
                level: "Intermediate",
                features: ["Daily market analysis", "Live trading room", "Discord community", "Mobile app access"],
                thumbnail: "gradient-from-orange-600-to-red-600"
              }
            ].map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
              >
                <Card className="p-1 hover:scale-105 transition-all duration-500 group overflow-hidden bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/30">
                {/* Course Thumbnail - Optimized */}
                <div className={`h-32 sm:h-40 bg-${course.thumbnail} relative overflow-hidden rounded-lg`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <Badge className="bg-primary text-primary-foreground px-2 sm:px-3 py-1 text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 text-white">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">{course.rating}</span>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <div className="text-xs sm:text-sm opacity-90">{course.students} students</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons}
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-3 sm:mb-4">
                    {course.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <span className="text-xl sm:text-2xl font-bold text-foreground">{course.price}</span>
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        {course.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <LiquidGlassButton className="w-full text-xs sm:text-sm">
                    Start course
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                  </LiquidGlassButton>
                </CardContent>
              </Card>
            </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Trading Section - Optimized */}
      <section id="livestream" className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40 overflow-hidden">
        {/* Dark cinematic background - optimized */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 rounded-full blur-2xl md:blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-48 h-48 md:w-64 md:h-64 bg-accent/10 rounded-full blur-2xl md:blur-3xl"></div>
          </div>
        </div>
        
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
              Learn in <span className="text-gradient-gold">Real Time</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
              Join live trading sessions. Watch expert decision-making, 
              risk management, and execution in real market conditions.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {/* Video Preview Area - Optimized */}
            <motion.div 
              className="relative card-neo card-neo--elevated overflow-hidden mb-6 sm:mb-8 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="aspect-video bg-gradient-to-br from-black/20 to-black/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-primary/30 transition-colors">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold mb-1">Live Session Preview</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Watch our latest trading session</p>
                </div>
              </div>
              
              {/* Live indicator - optimized */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
                <span className="text-xs sm:text-sm font-medium text-white bg-black/60 px-2 py-1 rounded">LIVE</span>
              </div>
              
              {/* Viewer count - optimized */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                247 watching
              </div>
            </motion.div>
            
            {/* Session info and CTAs - Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Next Live Session</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">
                    "Advanced Options Income Strategies" 
                    <br />
                    <span className="text-xs sm:text-sm">Wednesday, December 18th • 2:00 PM EST</span>
                  </p>
                  
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm">Real-time trade execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm">Live Q&A with expert traders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span className="text-xs sm:text-sm">Market analysis and insights</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <Button variant="regular" className="w-full text-sm sm:text-base font-semibold">
                    <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    JOIN LIVE SESSION
                  </Button>
                  <Button variant="regular" className="w-full py-3 sm:py-4 text-sm sm:text-base">
                    SEE LIVE SCHEDULE
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Free for all students • Premium features for members
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Optimized */}
      <section className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Flexible plans for every trader. Upgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { name: 'Starter', price: '$29/mo', features: ['Community Access', 'Weekly Insights', 'Select Previews'], featured: false },
              { name: 'Student', price: '$79/mo', features: ['All Courses', 'Live Sessions', 'Downloads'], featured: true },
              { name: 'Pro', price: '$149/mo', features: ['1:1 Mentorship', 'VIP Community', 'Advanced Strategies'], featured: false },
            ].map((tier, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, amount: 0.3 }} 
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
              >
                <Card className={`glass-card rounded-2xl p-4 sm:p-6 ${tier.featured ? 'scale-105 border-white/30' : ''}`}>
                  <CardHeader className="text-center pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl mb-2">{tier.name}</CardTitle>
                    <div className="text-2xl sm:text-3xl font-bold">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="regular" className="w-full text-sm sm:text-base">Get Started</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section - Optimized */}
      <section className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              whileInView={{ scale: 1, opacity: 1 }} 
              viewport={{ once: true, amount: 0.3 }} 
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], type: "tween" }} 
              className="flex justify-center"
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80" 
                  alt="Lead Instructor" 
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full ring-4 ring-white/10" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, amount: 0.3 }} 
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Learn from Proven Professionals</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">Our instructors are seasoned traders with institutional and prop experience. They teach exactly how they trade—no fluff.</p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xl sm:text-2xl font-bold">15+ yrs</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Experience</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">$50M+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Profits</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold">10K+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Optimized */}
      <section id="testimonials" className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/50 relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight">
              What Our <span className="text-gradient-gold">Students Say</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Day Trader",
                content: "The Trading Desk transformed my approach to trading. The live sessions are incredibly valuable.",
                rating: 5
              },
              {
                name: "Michael Chen", 
                role: "Options Trader",
                content: "The advanced course gave me the confidence to trade complex strategies profitably.",
                rating: 5
              },
              {
                name: "David Rodriguez",
                role: "Swing Trader", 
                content: "Amazing community and expert instructors. My portfolio has grown 300% this year.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
              >
                <Card className="card-cinematic p-4 sm:p-6">
                  <CardContent className="p-0">
                    <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-foreground mb-3 sm:mb-4" />
                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm sm:text-base font-semibold">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-foreground fill-current" />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
