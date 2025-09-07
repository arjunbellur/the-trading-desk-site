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
    measureElement.style.fontSize = 'clamp(2.5rem, 7vw, 5.5rem)'; // Reduced hero title font size
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
      
      {/* Hero Section - Modern Content Spacing */}
      <section id="home" className="tm-layout-hero relative z-40 flex min-h-screen items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-32 md:pb-20 md:pt-40">
        {/* Transparent background */}
        <div className="tm-layout-hero__background absolute inset-0 bg-transparent" />
        
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
              <div className="absolute bottom-0 left-0 z-20 h-32 w-[100%] bg-black [mask-image:linear-gradient(to_top,white,transparent)] md:h-40" />
              <div className="absolute bottom-0 left-0 z-20 h-[100%] w-32 bg-black [mask-image:linear-gradient(to_right,white,transparent)] md:w-40" />
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
              <div className="absolute bottom-0 right-0 z-20 h-[100%] w-32 bg-black [mask-image:linear-gradient(to_left,white,transparent)] md:w-40" />
              <div className="absolute bottom-0 right-0 z-20 h-32 w-[100%] bg-black [mask-image:linear-gradient(to_top,white,transparent)] md:h-40" />
            </motion.div>
            
            {/* Background blur layers - optimized */}
            <div className="absolute top-1/2 h-32 w-full translate-y-8 scale-x-100 bg-black blur-xl md:h-48 md:translate-y-12 md:scale-x-150 md:blur-2xl"></div>
            <div className="absolute top-1/2 z-50 h-32 w-full bg-transparent opacity-5 backdrop-blur-md md:h-48 md:opacity-10"></div>
            
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
            
            {/* Top mask - responsive positioning */}
            <div className="absolute inset-auto z-40 h-32 w-full -translate-y-[8rem] bg-black md:h-44 md:-translate-y-[10rem]"></div>
          </div>
        </div>
        
        <div className="tm-layout-container relative z-50 mx-auto w-full px-6 text-center sm:px-8 lg:px-12">
          <div className="tm-layout-hero__content mx-auto max-w-7xl">
            {/* Beta pill */}
            <div className="tm-layout-hero__badge mb-12 sm:mb-16">
              <span className="tm-ui-badge tm-ui-badge--glass beta-pill">The Trading Desk</span>
            </div>

            {/* Main Headline - Modern spacing */}
            <h1 className="tm-layout-hero__title mb-8 text-center text-white sm:mb-12">
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
                    className="tm-apple-3d-text mr-2 sm:mr-3 md:mr-4"
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
                      className="tm-theme-text-gradient--brand absolute inset-0 ml-2 flex items-center justify-start whitespace-nowrap sm:ml-3 md:ml-5"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                </div>
              </div>
            </h1>

            {/* Subtitle - Modern Documentary Typography */}
            <p className="tm-layout-hero__description text-lead mx-auto mb-10 max-w-6xl text-white/70 sm:mb-12 md:mb-16">
              Elite trading education with live mentorship, advanced strategies, and a community of professional traders.
            </p>

            {/* CTA Button - Modern spacing */}
            <div className="tm-layout-hero__actions mb-16 sm:mb-20 md:mb-24">
              <button className="btn-glass--green min-h-[52px] px-8 py-4 text-lg sm:min-h-[60px] sm:px-12 sm:py-5 sm:text-xl">
                Get Started
              </button>
            </div>

            {/* Hero Image - Optimized glow effects */}
            <div className="tm-layout-hero__image relative mt-16 sm:mt-20 md:mt-24">
              {/* Optimized glow background - reduced complexity for mobile */}
              <div className="absolute left-0 right-0 top-0 flex h-4/5 items-start justify-center">
                <div className="absolute -top-16 -z-10 h-[140%] w-[200%]">
                  {/* Primary glow - optimized opacity */}
                  <div 
                    className="opacity-4 md:opacity-6 animate-pulse-glow absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(ellipse 120% 90% at center 20%, #22c55e 0%, transparent 60%)`,
                      filter: 'blur(100px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Secondary glow - optimized */}
                  <div 
                    className="opacity-3 animate-pulse-glow-secondary absolute inset-8 rounded-full md:opacity-5"
                    style={{
                      background: `radial-gradient(ellipse 100% 75% at center 15%, #4ade80 0%, transparent 50%)`,
                      filter: 'blur(80px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Core glow - optimized */}
                  <div 
                    className="opacity-6 animate-pulse-glow-tertiary absolute inset-16 rounded-full md:opacity-10"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at center 10%, #86efac 0%, transparent 40%)`,
                      filter: 'blur(60px)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Ambient glow - desktop only for performance */}
                  <div 
                    className="opacity-3 absolute inset-4 hidden rounded-full md:block"
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
              <div className="relative z-[50] flex items-center justify-center">
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
            </div>
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
        <div className="relative z-10 mb-12 text-center sm:mb-16">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 px-6 py-3 backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></div>
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald-300">
              Trusted Globally
            </span>
          </div>
          <h2 className="mb-4 text-2xl font-light text-white sm:text-3xl md:text-4xl">
            Powering <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text font-medium text-transparent">World-Class</span> Trading Teams
          </h2>
        </div>

        {/* Single Line Logo Marquee - Full Width */}
        <div className="relative z-10 w-full">
          <Marquee pauseOnHover className="[--duration:40s]">
            <div className="flex items-center gap-8 px-4 sm:gap-12">
              {[
                { name: "Goldman Sachs", logo: "GS", color: "from-yellow-400 to-yellow-600", glow: "shadow-yellow-500/20" },
                { name: "Citadel", logo: "CT", color: "from-purple-400 to-purple-600", glow: "shadow-purple-500/20" },
                { name: "JPMorgan Chase", logo: "JPM", color: "from-blue-400 to-blue-600", glow: "shadow-blue-500/20" },
                { name: "BlackRock", logo: "BLK", color: "from-green-400 to-green-600", glow: "shadow-green-500/20" },
                { name: "Bridgewater", logo: "BW", color: "from-orange-400 to-orange-600", glow: "shadow-orange-500/20" },
                { name: "Two Sigma", logo: "TS", color: "from-pink-400 to-pink-600", glow: "shadow-pink-500/20" },
                { name: "Renaissance", logo: "RT", color: "from-cyan-400 to-cyan-600", glow: "shadow-cyan-500/20" },
                { name: "DE Shaw", logo: "DS", color: "from-indigo-400 to-indigo-600", glow: "shadow-indigo-500/20" },
                { name: "Millennium", logo: "MM", color: "from-red-400 to-red-600", glow: "shadow-red-500/20" },
                { name: "Point72", logo: "P72", color: "from-teal-400 to-teal-600", glow: "shadow-teal-500/20" },
                { name: "Man Group", logo: "MG", color: "from-amber-400 to-amber-600", glow: "shadow-amber-500/20" },
                { name: "Wellington", logo: "WM", color: "from-violet-400 to-violet-600", glow: "shadow-violet-500/20" },
                { name: "AllianceBernstein", logo: "AB", color: "from-rose-400 to-rose-600", glow: "shadow-rose-500/20" },
                { name: "T. Rowe Price", logo: "TRP", color: "from-lime-400 to-lime-600", glow: "shadow-lime-500/20" },
                { name: "Capital Group", logo: "CG", color: "from-sky-400 to-sky-600", glow: "shadow-sky-500/20" }
              ].map((company, index) => (
                <motion.div
                  key={company.name}
                  className="group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <div className={`relative bg-gradient-to-br ${company.color} rounded-2xl p-5 shadow-2xl sm:p-6 ${company.glow} hover:shadow-3xl min-w-[140px] transition-all duration-500 group-hover:rotate-1 group-hover:scale-105 sm:min-w-[160px]`}>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"></div>

                    {/* Logo */}
                    <div className="relative text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/20 backdrop-blur-sm sm:h-14 sm:w-14">
                        <span className="text-lg font-black tracking-tighter text-white sm:text-xl">
                          {company.logo}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold leading-tight text-white sm:text-base">
                        {company.name}
                      </h3>
                      <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-white/40 transition-all duration-300 group-hover:w-12"></div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Marquee>
        </div>
      </section>












      {/* Featured Courses Section */}
      <section id="courses" className="tm-layout-section relative z-40 border-t border-border/30 py-8 sm:py-12 md:py-16">

        <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          {/* Header - Modern Documentary Typography */}
          <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-12">
            <h2 className="text-2xl font-light tracking-tight md:text-3xl lg:text-4xl">
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
      <section id="livestream" className="tm-layout-section relative z-40 overflow-hidden border-t border-border/30 py-8 sm:py-12 md:py-16">
        {/* Dark cinematic background - optimized */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-20 md:opacity-30">
            <div className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-2xl md:h-96 md:w-96 md:blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 h-48 w-48 rounded-full bg-accent/10 blur-2xl md:h-64 md:w-64 md:blur-3xl"></div>
          </div>
        </div>

        <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-8 max-w-7xl text-center sm:mb-12">
            <h2 className="mb-4 text-2xl font-light tracking-tight sm:mb-6 md:text-3xl">
              Live Trading
            </h2>
            <p className="mx-auto mb-6 max-w-6xl text-base text-muted-foreground sm:mb-8 sm:text-lg">
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
                  <p className="mb-1 text-sm font-semibold sm:text-base">Live Session Preview</p>
                  <p className="text-xs text-muted-foreground sm:text-sm">Watch our latest trading session</p>
                </div>
              </div>
              
              {/* Live indicator - optimized */}
              <div className="absolute left-3 top-3 flex items-center gap-1 sm:left-4 sm:top-4 sm:gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-red-500 sm:h-3 sm:w-3" style={{ animationDuration: '2s' }}></div>
                <span className="rounded bg-black/60 px-3 py-1 text-xs font-medium text-white sm:text-sm">LIVE</span>
              </div>
              
              {/* Viewer count - optimized */}
              <div className="absolute right-3 top-3 rounded bg-black/60 px-3 py-1 text-xs text-white sm:right-4 sm:top-4 sm:px-3 sm:text-sm">
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
                  <h3 className="mb-2 text-lg font-bold sm:mb-3 sm:text-xl">Next Live Session</h3>
                  <p className="mb-3 text-sm text-muted-foreground sm:mb-4 sm:text-base">
                    "Advanced Options Income Strategies" 
                    <br />
                    <span className="text-xs sm:text-sm">Wednesday, December 18th • 2:00 PM EST</span>
                  </p>
                  
                  <div className="mb-4 space-y-1.5 sm:mb-6 sm:space-y-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Real-time trade execution</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Live Q&A with expert traders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-primary sm:h-4 sm:w-4" />
                      <span className="text-xs sm:text-sm">Market analysis and insights</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <button className="btn-glass--green w-full text-sm sm:text-base">
                    <Play className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    Join Live
                  </button>
                  <button className="btn-glass--ghost w-full py-3 text-sm sm:py-4 sm:text-base">
                    View Schedule
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    Free for all students • Premium features for members
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Modern spacing */}
      <section className="tm-layout-section relative z-40 border-t border-border/30 py-20 sm:py-24 md:py-28">
        <div className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-16 max-w-7xl text-center sm:mb-20">
            <h2 className="mb-6 text-3xl font-light tracking-tight sm:mb-8 md:text-4xl">Pricing Plans</h2>
            <p className="text-lead mx-auto max-w-6xl text-muted-foreground">Flexible plans designed for traders at every level. Upgrade anytime.</p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-3 lg:gap-10">
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
                <Card className={`glass-card rounded-2xl p-6 sm:p-8 ${tier.featured ? 'scale-105 border-white/30' : ''}`}>
                  <CardHeader className="pb-4 text-center sm:pb-6">
                    <CardTitle className="mb-3 text-lg sm:text-xl">{tier.name}</CardTitle>
                    <div className="mb-2 text-2xl font-bold sm:text-3xl">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="mb-6 space-y-2.5 text-sm sm:mb-8 sm:space-y-3 sm:text-base">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="h-1 w-1 rounded-full bg-primary sm:h-1.5 sm:w-1.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="regular" className="w-full text-sm sm:text-base">Start Learning</Button>
                  </CardContent>
                </Card>
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
              <h3 className="mb-3 text-2xl font-normal tracking-tight sm:mb-4 sm:text-3xl">Expert Instructors</h3>
              <p className="text-body mb-4 text-muted-foreground">Our instructors are seasoned traders with institutional and proprietary trading experience. They teach exactly how they trade in real markets—no theory, no fluff.</p>
              <div className="grid gap-4 text-center sm:grid-cols-3">
                <div>
                  <div className="text-xl font-medium tracking-tight sm:text-2xl">15+ yrs</div>
                  <div className="text-label text-muted-foreground">Experience</div>
                </div>
                <div>
                  <div className="text-xl font-medium tracking-tight sm:text-2xl">$50M+</div>
                  <div className="text-label text-muted-foreground">Profits</div>
                </div>
                <div>
                  <div className="text-xl font-medium tracking-tight sm:text-2xl">10K+</div>
                  <div className="text-label text-muted-foreground">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern spacing */}
      <section id="testimonials" className="tm-layout-section relative z-40 border-t border-border/50 py-20 sm:py-24 md:py-28">
        <div className="mx-auto px-6 sm:px-8 lg:px-12 xl:px-16" style={{ maxWidth: '100%' }}>
          <div className="mx-auto mb-20 max-w-7xl text-center sm:mb-24 md:mb-28">
            <h2 className="mb-8 text-3xl font-light tracking-tight sm:mb-10 md:text-4xl">
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
                    <p className="text-body mb-6 italic text-muted-foreground sm:mb-8">"{testimonial.content}"</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-base font-medium tracking-tight">{testimonial.name}</p>
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
