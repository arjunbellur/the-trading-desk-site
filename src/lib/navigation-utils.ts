/**
 * Navigation utility functions following clean code principles
 * Single responsibility, proper error handling, and early returns
 */

import { NAVIGATION_OFFSET, SCROLL_DURATION, ERROR_CODES } from './constants';
import { NavigationError, ScrollToElementParams } from './types';

/**
 * Scrolls to a specific element using Lenis smooth scrolling
 * @param params - Scroll configuration parameters
 * @throws {NavigationError} When element is not found or Lenis is unavailable
 */
export const scrollToElement = ({ 
  elementId, 
  offset = NAVIGATION_OFFSET, 
  duration = SCROLL_DURATION 
}: ScrollToElementParams): void => {
  const targetElement = document.getElementById(elementId);
  
  if (!targetElement) {
    throw new NavigationError(
      `Element with id "${elementId}" not found`, 
      ERROR_CODES.ELEMENT_NOT_FOUND
    );
  }
  
  if (!window.lenis) {
    // Fallback to native scrolling on mobile or when Lenis is not available
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    return;
  }
  
  window.lenis.scrollTo(targetElement, { offset, duration });
};

/**
 * Determines if a URL is an internal anchor link
 * @param href - The URL to check
 * @returns True if the URL is an internal anchor link
 */
export const isAnchorLink = (href: string): boolean => {
  return href.startsWith('#');
};

/**
 * Determines if a URL is external
 * @param href - The URL to check
 * @returns True if the URL is external
 */
export const isExternalLink = (href: string): boolean => {
  try {
    const url = new URL(href);
    return url.origin !== window.location.origin;
  } catch {
    return false; // Relative URLs are internal
  }
};

/**
 * Extracts the anchor ID from a URL hash
 * @param href - The URL containing the hash
 * @returns The anchor ID without the # symbol
 */
export const extractAnchorId = (href: string): string => {
  if (!isAnchorLink(href)) {
    return '';
  }
  return href.substring(1);
};

/**
 * Handles keyboard navigation for accessibility
 * @param event - The keyboard event
 * @param onEscape - Function to call when Escape key is pressed
 */
export const handleKeyboardNavigation = (
  event: KeyboardEvent, 
  onEscape: () => void
): void => {
  if (event.key === 'Escape') {
    event.preventDefault();
    onEscape();
  }
};

/**
 * Manages focus trapping within a container
 * @param container - The container element to trap focus within
 * @param isActive - Whether focus trapping is active
 */
export const manageFocusTrap = (container: HTMLElement, isActive: boolean): (() => void) => {
  if (!isActive) {
    return () => {};
  }

  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  const handleTabKey = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  };

  document.addEventListener('keydown', handleTabKey);
  firstElement?.focus();

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleTabKey);
  };
};
