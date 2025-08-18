/**
 * Enhanced Smooth Scroll Link Component
 * Provides accessible navigation with proper error handling and TypeScript types
 */

import React from 'react';
import { SmoothScrollLinkProps } from '@/lib/types';
import { 
  scrollToElement, 
  isAnchorLink, 
  isExternalLink, 
  extractAnchorId 
} from '@/lib/navigation-utils';

declare global {
  interface Window {
    lenis?: {
      scrollTo: (target: Element, options?: { offset?: number; duration?: number }) => void
    }
  }
}

/**
 * A smooth scrolling link component with enhanced accessibility and error handling
 * @param props - Link properties including href, children, and accessibility attributes
 */
const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ 
  href, 
  children, 
  className, 
  ariaLabel,
  isExternal = false,
  onClick 
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    // Don't prevent default for external links
    if (isExternal || isExternalLink(href)) {
      if (onClick) {
        onClick();
      }
      return;
    }

    // Handle anchor links with smooth scrolling
    if (isAnchorLink(href)) {
      event.preventDefault();
      
      try {
        const targetId = extractAnchorId(href);
        scrollToElement({ elementId: targetId });
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to default browser behavior
        window.location.hash = href;
      }
    }
    
    if (onClick) {
      onClick();
    }
  };

  const linkProps = {
    href,
    className,
    onClick: handleClick,
    ...(ariaLabel && { 'aria-label': ariaLabel }),
    ...(isExternal && { 
      target: '_blank', 
      rel: 'noopener noreferrer',
      'aria-describedby': 'external-link-description' 
    }),
  };

  return (
    <>
      <a {...linkProps}>
        {children}
        {isExternal && (
          <span className="sr-only"> (opens in new tab)</span>
        )}
      </a>
      {isExternal && (
        <span id="external-link-description" className="sr-only">
          External links open in a new tab
        </span>
      )}
    </>
  );
};

export default SmoothScrollLink;
