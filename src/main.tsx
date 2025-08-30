import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Lenis from 'lenis';
import './index.css';
// Removed legacy global styles per cleanup

// Initialize Lenis smooth scrolling with optimized configuration
// Enable Lenis on all devices with improved settings
const lenis = new Lenis({
  duration: 0.8, // Reduced for faster response
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.5, // Increased for more responsive scrolling
  touchMultiplier: 0.5, // Optimized for mobile touch
  infinite: false,
  syncTouch: true,
  syncTouchLerp: 0.05, // Much tighter control
  lerp: 0.1, // Smoother interpolation
});

// Hook Lenis into requestAnimationFrame
function raf(time: number): void {
  if (lenis) {
    lenis.raf(time);
  }
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Make Lenis globally available for anchor links
if (lenis) {
  (window as unknown as { lenis: Lenis }).lenis = lenis;
}

// Handle resize and orientation changes
let currentIsMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== currentIsMobile) {
    currentIsMobile = newIsMobile;
    // Reload page on significant size change for better performance
    if (Math.abs(window.innerWidth - window.innerHeight) > 100) {
      window.location.reload();
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
