/**
 * Enhanced Navigation Component
 * Implements WCAG accessibility standards, proper TypeScript types, and clean architecture
 */

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";

// Internal imports
import { Button } from "@/components/ui/button";
import SmoothScrollLink from "./SmoothScrollLink";
import AccessibleButton from "./AccessibleButton";
import { NAVIGATION_ITEMS, MOBILE_MENU_ID } from "@/lib/constants";
import { NavigationItem, VoidFunction } from "@/lib/types";
import { handleKeyboardNavigation, manageFocusTrap } from "@/lib/navigation-utils";
import { useSession } from "@/hooks/useSession";

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
  const { user, signOut } = useSession();
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
      className="liquid-glass-btn whitespace-nowrap"
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
              <div className="tm-layout-nav__container px-2 sm:px-4">
        {/* Group 1: TTD Logo (Left Column) */}
        <div className="flex justify-start">
          <Link 
            to="/" 
            className="tm-layout-nav__brand flex items-center gap-3"
            aria-label="The Trading Desk - Go to homepage"
          >
            <span className="text-lg font-bold tracking-tight text-white md:text-xl">
              TTD
            </span>
            <span className="tm-ui-text--large hidden font-semibold text-white/90 transition-colors group-hover:text-white sm:block">
              The Trading Desk
            </span>
          </Link>
        </div>

        {/* Group 2: Main Navigation Links (Center Column) */}
        <div className="tm-layout-nav__links hidden justify-center md:flex" role="menubar">
          {NAVIGATION_ITEMS.map(renderNavigationItem)}
        </div>

        {/* Group 3: Action Buttons (Right Column) */}
        <div className="flex justify-end">
          <div className="tm-layout-nav__links hidden gap-2 md:flex">
          <a 
            href="#discord" 
            className="liquid-glass-discord-btn flex items-center gap-2 whitespace-nowrap transition-all duration-300"
            aria-label="Join our Discord community"
          >
            <DiscordIcon className="h-4 w-4 transition-colors duration-300" />
            Discord
          </a>
          {user ? (
            <>
              <Link 
                to="/billing" 
                className="liquid-glass-btn hidden items-center gap-2 whitespace-nowrap lg:inline-flex"
                aria-label="Manage your billing"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
              <button
                onClick={signOut}
                className="liquid-glass-btn hidden items-center gap-2 whitespace-nowrap lg:inline-flex"
                aria-label="Sign out of your account"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="liquid-glass-btn hidden whitespace-nowrap lg:inline-flex"
                aria-label="Login to your account"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="liquid-glass-btn--green hidden whitespace-nowrap lg:inline-flex"
                aria-label="Sign up for a new account"
              >
                Sign Up
              </Link>
            </>
          )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <AccessibleButton
          onClick={toggleMobileMenu}
          ariaLabel={isOpen ? "Close navigation menu" : "Open navigation menu"}
          ariaExpanded={isOpen}
          ariaControls={MOBILE_MENU_ID}
          className="liquid-glass-btn flex min-h-[48px] w-12 items-center justify-center p-3 md:hidden"
        >
          {isOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
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
            className="relative flex h-full w-full flex-col border-r border-white/10 bg-black/90 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between border-b border-white/10 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold tracking-tight text-white">
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
                className="rounded-lg p-2 transition-colors hover:bg-white/10"
              >
                <X className="h-6 w-6 text-white/70" aria-hidden="true" />
              </AccessibleButton>
            </div>
            
            {/* Main Navigation Links */}
            <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
              <nav role="navigation" aria-labelledby="mobile-nav-heading">
                <h3 
                  id="mobile-nav-heading"
                  className="mb-4 text-sm font-medium uppercase tracking-wide text-white/50"
                >
                  Navigation
                </h3>
                <div className="space-y-2" role="menu">
                  {NAVIGATION_ITEMS.map((item) => (
                    <SmoothScrollLink
                      key={item.name}
                      href={item.href}
                      ariaLabel={item.ariaLabel}
                      className="flex min-h-[56px] w-full items-center rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                      onClick={closeMobileMenu}
                    >
                      {item.name}
                    </SmoothScrollLink>
                  ))}
                </div>
              </nav>
              
              {/* CTA Section */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/50">
                  Community & Account
                </h3>
                <div className="space-y-2">
                  <a 
                    href="#discord" 
                    onClick={closeMobileMenu} 
                    className="liquid-glass-discord-btn flex min-h-[56px] w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                    aria-label="Join our Discord community"
                  >
                    <DiscordIcon className="h-5 w-5 text-white/70" />
                    Join Discord
                  </a>
                  {user ? (
                    <>
                      <Link 
                        to="/billing" 
                        onClick={closeMobileMenu} 
                        className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        aria-label="Manage your billing"
                      >
                        <User className="h-5 w-5 text-white/70" />
                        Account
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          closeMobileMenu();
                        }}
                        className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        aria-label="Sign out of your account"
                      >
                        <LogOut className="h-5 w-5 text-white/70" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        onClick={closeMobileMenu} 
                        className="flex min-h-[56px] w-full items-center rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        aria-label="Login to your account"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        onClick={closeMobileMenu} 
                        className="flex min-h-[56px] w-full items-center rounded-xl px-4 py-4 text-left text-lg font-medium text-white/90 transition-all duration-200 hover:bg-white/5 hover:text-white"
                        aria-label="Sign up for a new account"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="border-t border-white/10 p-4 sm:p-6">
              <AccessibleButton
                onClick={closeMobileMenu}
                ariaLabel="Get started for free"
                className="w-full rounded-xl bg-white/5 px-6 py-4 font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                Get Started
              </AccessibleButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
