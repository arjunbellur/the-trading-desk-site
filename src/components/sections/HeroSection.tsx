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

  /**
   * Manages the rotating words animation
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((currentIndex) => (currentIndex + 1) % rotatingWords.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [rotatingWords.length]);

  return (
    <section 
      id="home" 
      className="tm-layout-hero relative pt-32 pb-24 overflow-hidden z-40"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="tm-layout-hero__background absolute inset-0 bg-transparent" />
      
      <div className="tm-layout-container max-w-7xl mx-auto px-6 text-center relative z-50">
        <div className="tm-layout-hero__content max-w-5xl mx-auto">
          {/* Beta Badge */}
          <div className="tm-layout-hero__badge mb-8">
            <span className="tm-ui-badge tm-ui-badge--glass beta-pill">
              The Trading Desk
            </span>
          </div>

          {/* Main Title with Rotating Words */}
          <h1 
            id="hero-title"
            className="tm-layout-hero__title mb-6 text-white"
          >
            <div className="tm-layout-hero__title-container flex flex-wrap items-center justify-center">
              <span className="mr-3">Master your</span>
              <span className="tm-layout-hero__rotating-word inline-block relative h-[1.2em]">
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
                    className="tm-theme-text-gradient--brand absolute left-0 top-0 whitespace-nowrap"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
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
