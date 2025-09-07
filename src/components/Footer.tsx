/**
 * Footer Component - Reusable footer for all pages
 * Maintains consistent branding and navigation across the site
 */

import React from "react";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer className={`border-t border-border/20 bg-black ${className}`}>
      <div className="gradient-brand h-1 w-full" />
      <div className="container-cinematic py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Footer Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.svg" 
              alt="The Trading Desk Logo" 
              className="h-6 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <span className="text-lg font-semibold text-white/90">The Trading Desk</span>
          </div>
          
          {/* Footer Content */}
          <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:gap-6">
            <div>© {new Date().getFullYear()} The Trading Desk. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="/style-guide" className="transition-colors hover:text-foreground">Style Guide</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
