import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import { NeonGradientCard, Marquee, ShineBorder, BorderBeam } from "@/components/magicui";
import { motion, AnimatePresence } from "framer-motion";
// BlurInView removed for mobile performance
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import LogoLoop from "@/components/LogoLoop";
import { 
  SiGoldmansachs, 
  SiBankofamerica, 
  SiCommerzbank, 
  SiDeutschebank, 
  SiTradingview,
  SiRocket,
  SiGroupme,
  SiPointy,
  SiScrumalliance,
  SiSitepoint
} from "react-icons/si";
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
  Zap,
  ThumbsUp,
  TrendingUp
} from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { coursesData } from "@/data/courses";
import { useCourseActions } from "@/hooks/useCourseActions";

const Index = () => {
  const rotatingWords = useMemo(() => ["trading", "markets", "strategy"], []);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWordWidth, setCurrentWordWidth] = useState(0);
  const { handlePreRegister, handleExplore } = useCourseActions();
  
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
    measureElement.style.fontSize = 'clamp(2.5rem, 7vw, 5.5rem)'; // Restored original hero title font size
    measureElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif';
    measureElement.style.fontWeight = '700';
    measureElement.style.top = '-9999px';
    measureElement.className = 'tm-theme-text-gradient--brand';
    
    document.body.appendChild(measureElement);
    
    const updateWidth = () => {
    measureElement.textContent = rotatingWords[wordIndex];
      const width = measureElement.offsetWidth;
      setCurrentWordWidth(width);
    };
    
    updateWidth();
    
    // Cleanup
    return () => {
    document.body.removeChild(measureElement);
    };
  }, [wordIndex, rotatingWords]);

  // Create optimized glow elements with reduced mobile impact
  React.useEffect(() => {
    // Detect mobile to reduce glow complexity
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Remove any existing glow elements
    const existingGlows = document.querySelectorAll('.lamp-glow-element');
    existingGlows.forEach(el => el.remove());

    // Only create glows if not on mobile to improve performance
    if (!isMobile) {
      // Create simplified central glow (top glow hidden)
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
      
      document.body.appendChild(centralGlow);
    }

    return () => {
      // Cleanup on unmount
      const glowElements = document.querySelectorAll('.lamp-glow-element');
      glowElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Particle background removed per spec */}
      
      <Navigation />
      
      {/* Preload hero background image */}
      <img 
        src="https://www.dropbox.com/scl/fi/j8g0nsdec5z94h14jwavk/Fractal-20Maze-20-2060.jpg?rlkey=hyg38ssqftjx1bw9vv97ya7s6&st=a05lpa4b&dl=1" 
        alt="Hero background preload" 
        style={{ display: 'none' }}
        onLoad={() => {/* Hero background image loaded */}}
      />
      
      {/* Hero Section - Modern Content Spacing */}
      <section id="home" className="tm-layout-hero relative z-40 flex min-h-screen items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-32 md:pb-20 md:pt-40">
        {/* Fractal Maze Background - Immediate Load */}
        <div 
          className="tm-layout-hero__background absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://www.dropbox.com/scl/fi/j8g0nsdec5z94h14jwavk/Fractal-20Maze-20-2060.jpg?rlkey=hyg38ssqftjx1bw9vv97ya7s6&st=a05lpa4b&dl=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed'
          }}
        />
        {/* Balanced gradient overlay for smooth transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/90" />
        {/* Bottom fade for seamless section transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
        
        {/* Optimized neon lamp effect - responsive and performant */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
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
              className="absolute inset-auto right-1/2 h-40 w-[20rem] overflow-visible bg-gradient-conic from-transparent via-transparent to-transparent [--conic-position:from_70deg_at_center_top] md:h-56 md:w-[35rem]"
            >
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
              className="absolute inset-auto left-1/2 h-40 w-[20rem] bg-gradient-conic from-transparent via-transparent to-transparent [--conic-position:from_290deg_at_center_top] md:h-56 md:w-[35rem]"
            >
            </motion.div>
            
            
            {/* Central glow - optimized for mobile */}
            <div className="absolute left-0 right-0 top-1/2 z-50 h-24 w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-transparent to-transparent blur-2xl md:h-36 md:blur-3xl"></div>
            
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
              className="absolute left-0 right-0 top-0 z-30 hidden h-36 w-full -translate-y-[6rem] bg-gradient-to-r from-transparent via-transparent to-transparent blur-2xl md:block"
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
              className="absolute left-0 right-0 top-0 z-[100] h-0.5 origin-center bg-green-400"
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
              className="absolute left-0 right-0 top-0 z-[101] h-px origin-center translate-y-px bg-green-300"
            />
            
          </div>
        </div>
        
        <div className="tm-layout-container relative z-50 mx-auto w-full text-center">
          <div className="tm-layout-hero__content mx-auto" style={{ maxWidth: 'var(--container-max)' }}>
            

            {/* Notification Banner - Inspired by reference */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                
                <span>The Trading Desk</span>
              </div>
            </div>

            {/* Main Headline - Blur to Focus Animation */}
            <h1 className="tm-layout-hero__title mb-4 text-center text-white sm:mb-6">
              <div className="tm-layout-hero__title-container flex flex-col items-center justify-center">
                <div className="flex items-center justify-center whitespace-nowrap">
                  <motion.span
                    initial={{ opacity: 0, x: -20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 1.2,
                      delay: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                      type: "tween"
                    }}
                    className="tm-apple-3d-text mr-2 sm:mr-3 md:mr-4"
                  >
                    Master your
                  </motion.span>
                  <span
                    className="tm-layout-hero__rotating-word relative inline-block h-[1.2em] overflow-visible transition-all duration-500 ease-out"
                    style={{ width: currentWordWidth > 0 ? `${currentWordWidth + 20}px` : 'auto' }}
                  >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                      transition={{
                        duration: 0.8,
                        ease: [0.23, 1, 0.32, 1],
                        type: "tween"
                      }}
                      className="tm-theme-text-gradient--brand absolute inset-0 ml-1 flex items-center justify-start whitespace-nowrap sm:ml-2"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                </div>
              </div>
            </h1>

            {/* Subtitle - Blur to Focus Animation */}
            <motion.p 
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.0,
                delay: 0.6,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="tm-layout-hero__description mx-auto mb-8 max-w-6xl text-body text-white/70 sm:mb-10"
            >
              Elite trading education with live mentorship, advanced strategies, and a community of professional traders.
            </motion.p>

            {/* Feature Highlights - Lazy Load with Blur */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.0,
                delay: 0.9,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="mb-10 flex flex-wrap justify-center gap-8 sm:gap-12"
            >
              <div className="flex items-center gap-3">
                <div className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                  {/* Subtle glow for icon container */}
                  <div
                    className="absolute inset-0 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      background: `radial-gradient(ellipse 120% 100% at center, rgba(34, 197, 94, 0.3) 0%, rgba(74, 222, 128, 0.15) 70%, transparent 90%)`,
                      filter: 'blur(3px)',
                    }}
                  />
                  <svg className="relative h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white drop-shadow-sm">Expert Mentorship</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                  {/* Subtle glow for icon container */}
                  <div
                    className="absolute inset-0 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      background: `radial-gradient(ellipse 120% 100% at center, rgba(34, 197, 94, 0.3) 0%, rgba(74, 222, 128, 0.15) 70%, transparent 90%)`,
                      filter: 'blur(3px)',
                    }}
                  />
                  <svg className="relative h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white drop-shadow-sm">Live Trading Sessions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                  {/* Subtle glow for icon container */}
                  <div
                    className="absolute inset-0 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                    style={{
                      background: `radial-gradient(ellipse 120% 100% at center, rgba(34, 197, 94, 0.3) 0%, rgba(74, 222, 128, 0.15) 70%, transparent 90%)`,
                      filter: 'blur(3px)',
                    }}
                  />
                  <svg className="relative h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white drop-shadow-sm">Trading Community</span>
              </div>
            </motion.div>

            {/* CTA Buttons - Lazy Load with Blur */}
            <motion.div 
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.0,
                delay: 1.2,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="tm-layout-hero__actions mb-8 flex flex-col items-center justify-center gap-4 sm:mb-10 sm:flex-row"
            >
              <button className="liquid-glass-btn--green flex min-h-[44px] items-center gap-2 px-6 py-3 text-body sm:min-h-[48px] sm:px-8 sm:py-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Get Started
              </button>
              <button className="liquid-glass-btn--ghost flex min-h-[44px] items-center gap-2 px-6 py-3 text-body sm:min-h-[48px] sm:px-8 sm:py-3">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Learn More
              </button>
            </motion.div>

            {/* Hero Image - Lazy Load with Blur */}
            <motion.div 
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 1.5,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              className="tm-layout-hero__image relative mt-8 sm:mt-10"
            >
              {/* Premium glow background - high quality lighting */}
              <div className="absolute left-0 right-0 top-0 flex h-4/5 items-start justify-center">
                <div className="absolute -top-20 -z-10 h-[160%] w-[220%]">
                  {/* Base ambient glow - wide and soft */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-10 md:opacity-15"
                    style={{
                      background: `radial-gradient(ellipse 150% 120% at center 30%, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 40%, transparent 70%)`,
                      filter: 'blur(60px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Primary light source - main glow */}
                  <div 
                    className="opacity-12 animate-pulse-glow absolute inset-4 rounded-full md:opacity-20"
                    style={{
                      background: `radial-gradient(ellipse 130% 100% at center 25%, rgba(34, 197, 94, 0.3) 0%, rgba(74, 222, 128, 0.15) 30%, rgba(134, 239, 172, 0.05) 60%, transparent 80%)`,
                      filter: 'blur(40px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Secondary light layer - mid-range */}
                  <div 
                    className="md:opacity-22 animate-pulse-glow-secondary absolute inset-8 rounded-full opacity-15"
                    style={{
                      background: `radial-gradient(ellipse 110% 85% at center 20%, rgba(74, 222, 128, 0.35) 0%, rgba(134, 239, 172, 0.2) 40%, rgba(187, 247, 208, 0.05) 70%, transparent 85%)`,
                      filter: 'blur(30px)',
                    }}
                    aria-hidden="true"
                  />

                  {/* Blue accent glow - for depth and contrast */}
                  <div 
                    className="opacity-8 md:opacity-12 absolute inset-6 rounded-full"
                    style={{
                      background: `radial-gradient(ellipse 120% 90% at center 35%, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 80%)`,
                      filter: 'blur(50px)',
                      animation: 'pulse-glow 12s ease-in-out infinite reverse'
                    }}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Main hero image container */}
              <div className="relative z-[50] flex items-center justify-center">
                {/* Premium glow behind the image */}
                <div className="absolute inset-0 -z-10">
                  {/* Base image glow - wide and soft */}
                  <div
                    className="opacity-12 absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse 130% 110% at center, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 80%)`,
                      filter: 'blur(40px)',
                    }}
                  />
                  {/* Primary image glow - main light */}
                  <div
                    className="opacity-18 absolute inset-0 rounded-2xl"
                    style={{
                      background: `radial-gradient(ellipse 110% 90% at center, rgba(74, 222, 128, 0.3) 0%, rgba(134, 239, 172, 0.15) 40%, rgba(187, 247, 208, 0.05) 70%, transparent 85%)`,
                      filter: 'blur(25px)',
                    }}
                  />
                  {/* Core image glow - bright center */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background: `radial-gradient(ellipse 90% 75% at center, rgba(134, 239, 172, 0.35) 0%, rgba(187, 247, 208, 0.2) 50%, rgba(220, 252, 231, 0.1) 75%, transparent 90%)`,
                      filter: 'blur(15px)',
                    }}
                  />
                </div>
                <NeonGradientCard className="w-full max-w-none p-1" style={{ pointerEvents: 'none' }}>
                  {/* Laptop bezel border - optimized */}
                  <div className="relative overflow-hidden rounded-[11px]">
                    {/* Outer bezel frame */}
                    <div className="absolute inset-0 rounded-[11px] border-2 border-gray-300/80 shadow-inner" aria-hidden="true"></div>
                    {/* Inner bright bezel */}
                    <div className="absolute inset-[2px] rounded-[9px] border border-gray-200/60 shadow-sm" aria-hidden="true"></div>
                    {/* Screen border */}
                    <div className="absolute inset-[4px] rounded-[7px] border border-gray-400/40" aria-hidden="true"></div>
                    
                    <img 
                      src="/Dashboard.png" 
                      alt="Trading Dashboard Preview" 
                      className="relative z-10 h-auto w-full object-contain"
                      loading="eager"
                    />
                  </div>
                </NeonGradientCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Trusted By Section - Single Line Design */}
      <section className="relative z-40 overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-500/5 blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 mb-4 text-center sm:mb-6">
          <p className="text-small text-white/60">
            Trusted by leading financial institutions worldwide
          </p>
        </div>

        {/* Logo Loop - Professional Trading Companies */}
        <div className="relative z-10 w-full">
          <LogoLoop
            logos={[
              { 
                node: <SiGoldmansachs className="text-white" size={32} />,
                title: "Goldman Sachs", 
                href: "https://www.goldmansachs.com" 
              },
              { 
                node: <SiBankofamerica className="text-white" size={32} />,
                title: "Bank of America", 
                href: "https://www.bankofamerica.com" 
              },
              { 
                node: <SiCommerzbank className="text-white" size={32} />,
                title: "Commerzbank", 
                href: "https://www.commerzbank.com" 
              },
              { 
                node: <SiDeutschebank className="text-white" size={32} />,
                title: "Deutsche Bank", 
                href: "https://www.deutschebank.com" 
              },
              { 
                node: <SiTradingview className="text-white" size={32} />,
                title: "TradingView", 
                href: "https://www.tradingview.com" 
              },
              { 
                node: <SiRocket className="text-white" size={32} />,
                title: "Rocket", 
                href: "https://www.rocket.com" 
              },
              { 
                node: <SiGroupme className="text-white" size={32} />,
                title: "GroupMe", 
                href: "https://www.groupme.com" 
              },
              { 
                node: <SiPointy className="text-white" size={32} />,
                title: "Pointy", 
                href: "https://www.pointy.com" 
              },
              { 
                node: <SiScrumalliance className="text-white" size={32} />,
                title: "Scrum Alliance", 
                href: "https://www.scrumalliance.org" 
              },
              { 
                node: <SiSitepoint className="text-white" size={32} />,
                title: "SitePoint", 
                href: "https://www.sitepoint.com" 
              }
            ]}
            speed={20000}
            direction="left"
            logoHeight={80}
            gap={150}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Trusted by leading financial institutions"
            className="h-20"
          />
        </div>
      </section>












      {/* Featured Courses Section */}
      <section id="courses" className="tm-layout-section relative z-40 py-8 sm:py-12 md:py-16">

        <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ maxWidth: '100%' }}>
          {/* Header - Modern Documentary Typography */}
          <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-12">
            <h2 className="text-h2 font-light tracking-tight">
              <span className="text-white">Trading Courses</span>{' '}
              <span className="text-green-400">Expert Training</span>
            </h2>
          </div>
          
          {/* Course Cards */}
          {coursesData.map((course, index) => (
            <React.Fragment key={course.id}>
              <div className="mb-6 sm:mb-8">
                <CourseCard
                  courseNumber={course.courseNumber}
                  subtitle={course.subtitle}
                  title={course.title}
                  description={course.description}
                  price={course.price}
                  features={course.features}
                  level={course.level}
                  onPreRegister={() => handlePreRegister(course.id)}
                  onExplore={() => handleExplore(course.id)}
                />
              </div>
              {index < coursesData.length - 1 && (
                <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

            {/* Live Trading Section - Modern spacing */}
      <section id="livestream" className="tm-layout-section relative z-40 overflow-hidden py-8 sm:py-12 md:py-16">
        {/* Dark cinematic background - optimized */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-2xl md:h-96 md:w-96 md:blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-accent/10 blur-2xl md:h-64 md:w-64 md:blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-12">
            <h2 className="mb-4 text-h2 font-light tracking-tight sm:mb-6">
              Live Trading
            </h2>
            <p className="mx-auto mb-6 max-w-6xl text-body text-muted-foreground sm:mb-8">
              Join live trading sessions where you'll watch expert traders make decisions,
              manage risk, and execute trades in real-time market conditions.
            </p>
          </div>
          
          <div className="mx-auto max-w-none">
            {/* Video Preview Area - Optimized */}
            <motion.div
              className="card-neo card-neo--elevated group relative mb-4 cursor-pointer overflow-hidden sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
            >
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-black/20 to-black/10">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 transition-colors group-hover:bg-primary/30 sm:mb-3 sm:h-16 sm:w-16">
                    <Play className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                  </div>
                  <p className="mb-1 text-small font-semibold">Live Session Preview</p>
                  <p className="text-caption text-muted-foreground">Watch our latest trading session</p>
                </div>
              </div>
              
              {/* Live indicator - optimized */}
              <div className="absolute left-3 top-3 flex items-center gap-1 sm:left-4 sm:top-4 sm:gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 sm:h-3 sm:w-3" style={{ animationDuration: '2s' }}></div>
                <span className="rounded bg-black/60 px-3 py-1 text-caption font-medium text-white">LIVE</span>
              </div>
              
              {/* Viewer count - optimized */}
              <div className="absolute right-3 top-3 rounded bg-black/60 px-3 py-1 text-caption text-white sm:right-4 sm:top-4 sm:px-3">
                <Users className="mr-1 inline h-3 w-3 sm:h-4 sm:w-4" />
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
              <div className="grid items-center gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-h3 font-bold sm:mb-3">Next Live Session</h3>
                  <p className="mb-3 text-small text-muted-foreground sm:mb-4">
                    "Advanced Options Income Strategies" 
                    <br />
                    <span className="text-caption">Wednesday, December 18th • 2:00 PM EST</span>
                  </p>
                  
                  <div className="mb-4 space-y-1.5 sm:mb-6 sm:space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-caption">Real-time trade execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-caption">Live Q&A with expert traders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-caption">Market analysis and insights</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <button className="liquid-glass-btn--green w-full text-small">
                    <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Join Live
                  </button>
                  <button className="liquid-glass-btn--ghost w-full py-3 text-small sm:py-4">
                    View Schedule
                  </button>
                  <p className="text-center text-caption text-muted-foreground">
                    Free for all students • Premium features for members
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Modern Design */}
      <section className="tm-layout-section relative z-40 py-20 sm:py-24 md:py-28">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 xl:px-12" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-16 max-w-7xl text-center sm:mb-20">
            <h2 className="mb-6 text-h1 font-light tracking-tight sm:mb-8">Pricing Plans</h2>
            <p className="mx-auto max-w-4xl text-body text-gray-300">Choose the plan that fits your trading journey. All plans include lifetime access to purchased content.</p>
          </div>

          <div className="grid gap-8 sm:gap-10 md:grid-cols-3 lg:gap-12">
            {[
              { 
                name: 'Starter', 
                price: '$29', 
                period: '/month',
                description: 'Perfect for beginners',
                features: ['Community Access', 'Weekly Market Insights', 'Basic Course Previews', 'Email Support'],
                featured: false,
                popular: false
              },
              { 
                name: 'Student', 
                price: '$79', 
                period: '/month',
                description: 'Most popular choice',
                features: ['All Premium Courses', 'Live Trading Sessions', 'Course Downloads', 'Priority Support', 'Trading Tools Access'],
                featured: true,
                popular: true
              },
              { 
                name: 'Pro', 
                price: '$149', 
                period: '/month',
                description: 'For serious traders',
                features: ['1:1 Mentorship Sessions', 'VIP Community Access', 'Advanced Trading Strategies', 'Custom Analysis', 'Direct Instructor Access'],
                featured: false,
                popular: false
              },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1], type: "tween" }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2">
                    <div className="relative rounded-full bg-gray-600 px-4 py-1.5 text-xs font-medium text-white shadow-lg shadow-gray-600/15">
                      {/* Subtle glow for popular badge */}
                      <div
                        className="absolute inset-0 rounded-full opacity-20"
                        style={{
                          background: `radial-gradient(ellipse 120% 100% at center, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%, transparent 90%)`,
                          filter: 'blur(2px)',
                        }}
                      />
                      <span className="relative">Most Popular</span>
                    </div>
                  </div>
                )}
                <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  tier.featured
                    ? 'border-gray-700/50 bg-gradient-to-b from-gray-800/20 to-transparent shadow-lg shadow-gray-500/10'
                    : 'border-gray-700/50 bg-gradient-to-b from-gray-800/20 to-transparent hover:border-gray-600/50'
                }`}>
                  {/* Subtle Glow Effects for Pricing Cards */}
                  {tier.featured && (
                    <>
                      {/* Base ambient glow for featured card */}
                      <div
                        className="opacity-8 absolute inset-0 rounded-2xl transition-opacity duration-500 hover:opacity-15"
                        style={{
                          background: `radial-gradient(ellipse 130% 110% at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 80%)`,
                          filter: 'blur(6px)',
                        }}
                      />
                      {/* Primary glow for featured card */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-10 transition-opacity duration-500 hover:opacity-20"
                        style={{
                          background: `radial-gradient(ellipse 110% 90% at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 60%, transparent 85%)`,
                          filter: 'blur(4px)',
                        }}
                      />
                    </>
                  )}
                  {/* Subtle glow for all cards */}
                  <div
                    className="opacity-3 hover:opacity-8 absolute inset-0 rounded-2xl transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 120% 100% at center, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 60%, transparent 85%)`,
                      filter: 'blur(5px)',
                    }}
                  />
                  <div className="relative p-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                      <h3 className="mb-2 text-xl font-semibold text-white">{tier.name}</h3>
                      <p className="mb-6 text-sm text-gray-400">{tier.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-white">{tier.price}</span>
                        <span className="ml-1 text-gray-400">{tier.period}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <ul className="mb-8 space-y-4">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="mr-3 mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-500/20">
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className={`liquid-glass-btn--ghost w-full`}>
                      {tier.featured ? 'Get Started' : 'Choose Plan'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section - Modern spacing */}
      <section className="tm-layout-section py-24 sm:py-28 md:py-36">

        <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto grid max-w-7xl items-center gap-16 sm:gap-20 lg:grid-cols-2">
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
                  className="h-48 w-48 rounded-full object-cover sm:h-56 sm:w-56"
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
              <h3 className="mb-3 text-h2 font-normal tracking-tight sm:mb-4">Expert Instructors</h3>
              <p className="mb-4 text-body text-muted-foreground">Our instructors are seasoned traders with institutional and proprietary trading experience. They teach exactly how they trade in real markets—no theory, no fluff.</p>
              <div className="grid gap-4 text-center sm:grid-cols-3">
                <div>
                  <div className="text-h3 font-medium tracking-tight">15+ yrs</div>
                  <div className="text-label text-muted-foreground">Experience</div>
                </div>
                <div>
                  <div className="text-h3 font-medium tracking-tight">$50M+</div>
                  <div className="text-label text-muted-foreground">Profits</div>
                </div>
                <div>
                  <div className="text-h3 font-medium tracking-tight">10K+</div>
                  <div className="text-label text-muted-foreground">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnerships/Sponsors Section */}
      <section className="tm-layout-section relative z-40 py-16 sm:py-20 md:py-24">
        <div className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-12 max-w-7xl text-center sm:mb-16 md:mb-20">
            <h2 className="mb-4 text-h2 font-light tracking-tight sm:mb-6">
              Trusted by Leading Partners
            </h2>
            <p className="text-body text-muted-foreground">
              We work with industry leaders to bring you the best trading education
            </p>
          </div>
          
          <div className="mx-auto max-w-7xl">
            <Marquee
              pauseOnHover
              className="[--duration:20s]"
            >
              {/* Trading Platform Partners */}
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/TradingView-Logo.png" 
                  alt="TradingView" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/Interactive-Brokers-Logo.png" 
                  alt="Interactive Brokers" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/TD-Ameritrade-Logo.png" 
                  alt="TD Ameritrade" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/Charles-Schwab-Logo.png" 
                  alt="Charles Schwab" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/Fidelity-Logo.png" 
                  alt="Fidelity" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/E-Trade-Logo.png" 
                  alt="E*TRADE" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/Robinhood-Logo.png" 
                  alt="Robinhood" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
              <div className="mx-8 flex h-12 w-32 items-center justify-center opacity-60 transition-opacity duration-300 hover:opacity-100 sm:h-16 sm:w-40">
                <img 
                  src="https://logos-world.net/wp-content/uploads/2021/02/Webull-Logo.png" 
                  alt="Webull" 
                  className="h-8 w-auto object-contain brightness-0 invert filter"
                />
              </div>
            </Marquee>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern spacing */}
      <section id="testimonials" className="tm-layout-section relative z-40 py-20 sm:py-24 md:py-28">
        <div className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-20 max-w-7xl text-center sm:mb-24 md:mb-28">
            <h2 className="mb-8 text-h1 font-light tracking-tight sm:mb-10">
              Student Reviews
            </h2>
          </div>
          
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
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
                <Card className="card-cinematic p-6 sm:p-8">
                  <CardContent className="p-0">
                    <Quote className="mb-4 h-6 w-6 text-foreground sm:mb-6 sm:h-8 sm:w-8" />
                    <p className="mb-6 text-body italic text-muted-foreground sm:mb-8">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-body font-medium tracking-tight">{testimonial.name}</p>
                        <p className="text-caption text-muted-foreground">{testimonial.role}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-current text-foreground sm:h-4 sm:w-4" />
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
