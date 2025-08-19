import React from "react";
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import Lenis from 'lenis';
import './index.css';
// Removed legacy global styles per cleanup

// Initialize Lenis smooth scrolling with unified configuration
const lenis = new Lenis({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
  syncTouch: true,
  syncTouchLerp: 0.1,
  normalizeWheel: false,
});

// Hook Lenis into requestAnimationFrame
function raf(time: number): void {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Make Lenis globally available for anchor links
(window as unknown as { lenis: typeof lenis }).lenis = lenis;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
