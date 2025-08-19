import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Lenis from 'lenis';
import './index.css';
// Removed legacy global styles per cleanup

// Detect mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Only initialize Lenis on desktop - use native scroll on mobile
let lenis: Lenis | null = null;

if (!isMobile) {
  // Desktop-only smooth scrolling
  lenis = new Lenis({
    duration: 1.6,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.2,
    touchMultiplier: 2,
    infinite: false,
    syncTouch: false,
    syncTouchLerp: 0.075,
    normalizeWheel: false,
  });

  // Hook Lenis into requestAnimationFrame - desktop only
  function raf(time: number): void {
    if (lenis) {
      lenis.raf(time);
    }
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Make Lenis globally available for anchor links
  (window as unknown as { lenis: typeof lenis }).lenis = lenis;
} else {
  // Mobile: Use native scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
