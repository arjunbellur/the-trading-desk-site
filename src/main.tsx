import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Lenis from 'lenis';
import './index.css';
// Removed legacy global styles per cleanup

// Detect mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize Lenis smooth scrolling optimized for mobile
const lenis = new Lenis({
  duration: isMobile ? 1.0 : 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !isMobile, // Disable smooth wheel on mobile to prevent conflicts
  wheelMultiplier: isMobile ? 1.0 : 1.2,
  touchMultiplier: isMobile ? 1.5 : 2,
  infinite: false,
  syncTouch: isMobile, // Only sync touch on mobile
  syncTouchLerp: isMobile ? 0.1 : 0.075, // Faster response on mobile
  normalizeWheel: false, // Disable to reduce processing on mobile
});

// Hook Lenis into requestAnimationFrame with mobile optimization
function raf(time: number): void {
  lenis.raf(time);
  
  // Mobile-specific scroll optimizations
  if (isMobile) {
    // Throttle frame rate on mobile for better performance
    if (time % 2 === 0) {
      requestAnimationFrame(raf);
    } else {
      setTimeout(() => requestAnimationFrame(raf), 8);
    }
  } else {
    requestAnimationFrame(raf);
  }
}
requestAnimationFrame(raf);

// Make Lenis globally available for anchor links
(window as unknown as { lenis: typeof lenis }).lenis = lenis;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
