/**
 * Hero Section Component
 * Focused component following single responsibility principle
 * Contains animated hero content with proper accessibility
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "@/components/magicui";
import { ANIMATION_DURATION } from "@/lib/constants";

interface HeroSectionProps {
  readonly title: string;
  readonly subtitle: string;
  readonly ctaText: string;
  readonly rotatingWords: readonly string[];
  readonly heroImageSrc: string;
  readonly heroImageAlt: string;
  onCtaClick: () => void;
}

/**
 * Hero section with animated rotating words and call-to-action
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  rotatingWords,
  heroImageSrc,
  heroImageAlt,
  onCtaClick,
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWordWidth, setCurrentWordWidth] = useState(0);

  /**
   * Manages the rotating words animation
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % rotatingWords.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [rotatingWords.length]);

  /**
   * Calculate width for the current word dynamically
   */
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

  return (
    <section 
      id="home" 
      className="tm-layout-hero relative pt-32 pb-24 overflow-hidden z-40"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="tm-layout-hero__background absolute inset-0 bg-transparent" />

      {/* Enhanced neon lamp effect */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
          {/* Left lamp beam - wider and brighter */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "35rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[35rem] bg-gradient-conic from-green-400 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
          >
            <div className="absolute w-[100%] left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
            <div className="absolute w-40 h-[100%] left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
          </motion.div>
          
          {/* Right lamp beam - wider and brighter */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "35rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
            }}
            className="absolute inset-auto left-1/2 h-56 w-[35rem] bg-gradient-conic from-transparent via-transparent to-green-400 [--conic-position:from_290deg_at_center_top]"
          >
            <div className="absolute w-40 h-[100%] right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
            <div className="absolute w-[100%] right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          </motion.div>
          
          {/* Background blur layers */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-black blur-2xl"></div>
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
          
          {/* Central glow - tuned down to match bottom glow */}
          <div className="absolute inset-auto z-50 h-36 w-[32rem] -translate-y-1/2 rounded-full bg-green-400 opacity-25 blur-3xl"></div>
          
          {/* Secondary glow layer */}
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "20rem" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-30 h-36 w-80 -translate-y-[6rem] rounded-full bg-green-300 blur-2xl opacity-20"
          />
          
          {/* Full-width neon lamp bar at viewport top - darker mint green */}
          <motion.div
            initial={{ width: "50%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 z-[100] h-0.5 w-full bg-emerald-700 shadow-[0_0_6px_#047857]"
          />
          
          {/* Bright center core of the lamp */}
          <motion.div
            initial={{ width: "50%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 translate-y-px z-[101] h-px w-full bg-emerald-300 shadow-[0_0_3px_#6ee7b7]"
          />
          
          {/* Seamless downward lamp glow - subtle */}
          <motion.div
            initial={{ width: "50%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 translate-y-0.5 z-[90] h-6 w-full bg-gradient-to-b from-emerald-600/12 via-emerald-600/6 to-transparent blur-sm"
          />
          
          {/* Subtle base glow for depth */}
          <motion.div
            initial={{ width: "50%" }}
            whileInView={{ width: "100%" }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute left-0 top-0 translate-y-1 z-[85] h-8 w-full bg-gradient-to-b from-emerald-500/8 via-emerald-500/4 to-transparent blur-md"
          />
          
          {/* Top mask - positioned lower to not hide the lamp */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[10rem] bg-black"></div>
        </div>
      </div>
      
      <div className="tm-layout-container max-w-8xl mx-auto px-4 sm:px-6 text-center relative z-50">
        <div className="tm-layout-hero__content max-w-full sm:max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="tm-layout-hero__badge mb-8">
            <span className="tm-ui-badge tm-ui-badge--glass beta-pill">
              The Trading Desk
            </span>
          </div>

          {/* Main Title with Rotating Words */}
          <h1 
            id="hero-title"
            className="tm-layout-hero__title mb-6 text-white text-center"
          >
            <div className="tm-layout-hero__title-container flex flex-col items-center justify-center">
              <div className="flex items-center justify-center whitespace-nowrap">
                <span className="mr-1 sm:mr-2 md:mr-3">Master your</span>
                <span 
                  className="tm-layout-hero__rotating-word relative inline-block h-[1.2em] overflow-visible transition-all duration-700 ease-out"
                  style={{ width: currentWordWidth > 0 ? `${currentWordWidth}px` : 'auto' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, y: -60 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 60 }}
                      transition={{ 
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1]
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

          {/* Subtitle */}
          <p className="tm-layout-hero__description text-lead text-white/70 mb-12 max-w-xl mx-auto">
            {subtitle}
          </p>

          {/* CTA Button */}
          <div className="tm-layout-hero__actions mb-16">
            <Button 
              variant="regular" 
              onClick={onCtaClick}
              aria-label={ctaText}
            >
              {ctaText}
            </Button>
          </div>

          {/* Hero Image */}
          <div className="tm-layout-hero__image relative">
            {/* Glow Effects */}
            <div className="absolute top-0 left-0 right-0 h-4/5 flex items-start justify-center">
              <div className="absolute w-[200%] h-[140%] -z-10 -top-16">
                {/* Outer diffuse glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-9 animate-pulse-glow"
                  style={{
                    background: `radial-gradient(ellipse 120% 90% at center 20%, #22c55e 0%, transparent 60%)`,
                    filter: 'blur(150px)',
                    animation: 'pulse-glow 12s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                />
                {/* Mid-range neon glow */}
                <div 
                  className="absolute inset-8 rounded-full opacity-7 animate-pulse-glow-secondary"
                  style={{
                    background: `radial-gradient(ellipse 100% 75% at center 15%, #4ade80 0%, transparent 50%)`,
                    filter: 'blur(120px)',
                    animation: 'pulse-glow-secondary 16s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                />
                {/* Inner bright core */}
                <div 
                  className="absolute inset-16 rounded-full opacity-12 animate-pulse-glow-tertiary"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at center 10%, #86efac 0%, transparent 40%)`,
                    filter: 'blur(80px)',
                    animation: 'pulse-glow-tertiary 20s ease-in-out infinite'
                  }}
                  aria-hidden="true"
                />
                {/* Ultra-soft ambient */}
                <div 
                  className="absolute inset-4 rounded-full opacity-5"
                  style={{
                    background: `radial-gradient(ellipse 140% 100% at center 25%, #22c55e 0%, transparent 70%)`,
                    filter: 'blur(200px)',
                    animation: 'pulse-glow 15s ease-in-out infinite reverse'
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Main Hero Image */}
            <div className="flex items-center justify-center relative z-10">
              <NeonGradientCard 
                className="w-full max-w-5xl p-1" 
                style={{ pointerEvents: 'none' }}
              >
                <div className="rounded-[11px] overflow-hidden relative">
                  {/* Bezel Effects */}
                  <div className="absolute inset-0 rounded-[11px] border-2 border-gray-300/80 shadow-inner" aria-hidden="true" />
                  <div className="absolute inset-[2px] rounded-[9px] border border-gray-200/60 shadow-sm" aria-hidden="true" />
                  <div className="absolute inset-[4px] rounded-[7px] border border-gray-400/40" aria-hidden="true" />
                  
                  <img 
                    src={heroImageSrc} 
                    alt={heroImageAlt}
                    className="w-full h-auto object-contain relative z-10"
                    loading="eager" // Hero image should load immediately
                  />
                </div>
              </NeonGradientCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
