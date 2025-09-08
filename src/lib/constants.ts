/**
 * Application-wide constants following TypeScript best practices
 * Using UPPERCASE for constants and avoiding magic numbers
 */

// Navigation Constants
export const NAVIGATION_OFFSET = -100 as const;
export const SCROLL_DURATION = 1200 as const;
export const MOBILE_MENU_ID = 'mobile-navigation-menu' as const;

// Animation Constants
export const ANIMATION_DURATION = {
  SHORT: 200,
  MEDIUM: 300, 
  LONG: 500,
  SCROLL: 1200,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Accessibility Constants
export const A11Y = {
  MIN_TOUCH_TARGET: 44, // WCAG minimum touch target size
  FOCUS_VISIBLE_OUTLINE: '2px solid currentColor',
  FOCUS_VISIBLE_OFFSET: '2px',
} as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: 'How it Works', href: '/#value-proposition', ariaLabel: 'Learn how our trading education works' },
  { name: 'Plans', href: '/courses', ariaLabel: 'View our course plans and pricing' },
  { name: 'Support', href: '/blog', ariaLabel: 'Get support and read our blog' },
] as const;

// Error Codes
export const ERROR_CODES = {
  ELEMENT_NOT_FOUND: 'ELEMENT_NOT_FOUND',
  LENIS_NOT_AVAILABLE: 'LENIS_NOT_AVAILABLE',
  NAVIGATION_ERROR: 'NAVIGATION_ERROR',
} as const;
