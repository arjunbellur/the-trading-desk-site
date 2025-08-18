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
    <footer className={`bg-black border-t border-border/20 ${className}`}>
      <div className="h-1 w-full gradient-brand" />
      <div className="container-cinematic py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} The Trading Desk. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="/style-guide" className="hover:text-foreground transition-colors">Style Guide</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
