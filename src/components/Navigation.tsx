/**
 * Enhanced Navigation Component
 * Implements WCAG accessibility standards, proper TypeScript types, and clean architecture
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Internal imports
import { Button } from "@/components/ui/button";
import SmoothScrollLink from "./SmoothScrollLink";
import AccessibleButton from "./AccessibleButton";
import { NAVIGATION_ITEMS, MOBILE_MENU_ID } from "@/lib/constants";
import { NavigationItem, VoidFunction } from "@/lib/types";
import { handleKeyboardNavigation, manageFocusTrap } from "@/lib/navigation-utils";

// Icons
interface IconProps {
  readonly className?: string;
}

/**
 * Discord icon component with proper accessibility
 */
const DiscordIcon: React.FC<IconProps> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

/**
 * Main Navigation Component
 */
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const focusTrapCleanup = useRef<VoidFunction | null>(null);

  /**
   * Closes the mobile menu
   */
  const closeMobileMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  /**
   * Toggles the mobile menu state
   */
  const toggleMobileMenu = useCallback((): void => {
    setIsOpen(prevState => !prevState);
  }, []);

  /**
   * Handles keyboard navigation for accessibility
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      handleKeyboardNavigation(event, closeMobileMenu);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      
      // Set up focus trap
      if (mobileMenuRef.current) {
        focusTrapCleanup.current = manageFocusTrap(mobileMenuRef.current, true);
      }
    } else {
      document.body.style.overflow = 'unset';
      // Clean up focus trap
      focusTrapCleanup.current?.();
      focusTrapCleanup.current = null;
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      focusTrapCleanup.current?.();
    };
  }, [isOpen, closeMobileMenu]);

  /**
   * Handles scroll behavior for hiding/showing navigation
   */
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Minimum scroll distance to trigger hide/show
      
      // Don't hide if we're at the top of the page
      if (currentScrollY < scrollThreshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  /**
   * Renders a navigation item with proper accessibility
   */
  const renderNavigationItem = (item: NavigationItem): React.ReactElement => (
    <SmoothScrollLink
      key={item.name}
      href={item.href}
      ariaLabel={item.ariaLabel}
      className="tm-ui-button tm-ui-button--nav whitespace-nowrap"
    >
      {item.name}
    </SmoothScrollLink>
  );

  return (
    <nav 
      className={`tm-layout-nav tm-layout-nav--transparent transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="tm-layout-nav__container px-4 sm:px-6 lg:px-8">
        {/* TTD Logo */}
        <Link 
          to="/" 
          className="tm-layout-nav__brand flex items-center gap-3"
          aria-label="The Trading Desk - Go to homepage"
        >
          <span className="text-lg md:text-xl font-bold text-white tracking-tight">
            TTD
          </span>
          <span className="tm-ui-text--large font-semibold text-white/90 group-hover:text-white transition-colors hidden sm:block">
            The Trading Desk
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="tm-layout-nav__links hidden md:flex" role="menubar">
          {NAVIGATION_ITEMS.map(renderNavigationItem)}
        </div>

        {/* Desktop CTA */}
        <div className="tm-layout-nav__links hidden md:flex">
          <a 
            href="#discord" 
            className="tm-ui-button tm-ui-button--nav flex items-center gap-2 whitespace-nowrap"
            aria-label="Join our Discord community"
          >
            <DiscordIcon className="w-4 h-4" />
            Discord
          </a>
          <Link 
            to="/login" 
            className="tm-ui-button tm-ui-button--nav hidden lg:inline-flex whitespace-nowrap"
            aria-label="Login to your account"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <AccessibleButton
          onClick={toggleMobileMenu}
          ariaLabel={isOpen ? "Close navigation menu" : "Open navigation menu"}
          ariaExpanded={isOpen}
          ariaControls={MOBILE_MENU_ID}
          className="tm-ui-button tm-ui-button--nav md:hidden p-3 min-h-[48px] w-12 flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </AccessibleButton>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          
          {/* Menu Content */}
          <div 
            ref={mobileMenuRef}
            id={MOBILE_MENU_ID}
            className="relative bg-black/90 backdrop-blur-xl border-r border-white/10 w-full h-full flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-white tracking-tight">
                  TTD
                </span>
                <span 
                  id="mobile-menu-title"
                  className="text-lg font-semibold text-white/90"
                >
                  The Trading Desk
                </span>
              </div>
              <AccessibleButton
                onClick={closeMobileMenu}
                ariaLabel="Close navigation menu"
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-6 h-6 text-white/70" aria-hidden="true" />
              </AccessibleButton>
            </div>
            
            {/* Main Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <nav role="navigation" aria-labelledby="mobile-nav-heading">
                <h3 
                  id="mobile-nav-heading"
                  className="text-sm font-medium text-white/50 uppercase tracking-wide mb-4"
                >
                  Navigation
                </h3>
                <div className="space-y-2" role="menu">
                  {NAVIGATION_ITEMS.map((item) => (
                    <SmoothScrollLink
                      key={item.name}
                      href={item.href}
                      ariaLabel={item.ariaLabel}
                      className="block w-full text-left py-4 px-4 rounded-xl text-lg font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 min-h-[56px] flex items-center"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </SmoothScrollLink>
                  ))}
                </div>
              </nav>
              
              {/* CTA Section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-sm font-medium text-white/50 uppercase tracking-wide mb-4">
                  Community & Account
                </h3>
                <div className="space-y-2">
                  <a 
                    href="#discord" 
                    onClick={closeMobileMenu} 
                    className="block w-full text-left py-4 px-4 rounded-xl text-lg font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 min-h-[56px] flex items-center gap-3"
                    aria-label="Join our Discord community"
                  >
                    <DiscordIcon className="w-5 h-5 text-white/70" />
                    Join Discord
                  </a>
                  <Link 
                    to="/login" 
                    onClick={closeMobileMenu} 
                    className="block w-full text-left py-4 px-4 rounded-xl text-lg font-medium text-white/90 hover:text-white hover:bg-white/5 transition-all duration-200 min-h-[56px] flex items-center"
                    aria-label="Login to your account"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <AccessibleButton
                onClick={closeMobileMenu}
                ariaLabel="Get started for free"
                className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 rounded-xl text-white/70 hover:text-white transition-all duration-200 font-medium"
              >
                Get Started for Free
              </AccessibleButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
