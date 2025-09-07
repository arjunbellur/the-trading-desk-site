/**
 * Design System - Typography, Spacing, and Sizing Standards
 * Following proper documentation and accessibility guidelines
 */

// Typography Scale (8pt grid system)
export const typography = {
  // Font Sizes (rem-based for accessibility)
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
    '8xl': '6rem',     // 96px
    '9xl': '8rem',     // 128px
  },

  // Font Weights - Modern Documentary Hierarchy
  weights: {
    ultralight: '200',  // Hero titles - cinematic feel
    thin: '100',
    extralight: '200',
    light: '300',       // Section headers - elegant
    normal: '400',      // Body text - readable
    medium: '500',      // Component headers - balanced
    semibold: '600',    // Small headers - clear
    bold: '700',        // Labels - maximum contrast
    extrabold: '800',
    black: '900',
  },

  // Line Heights (for optimal readability)
  lineHeights: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Spacing Scale (8pt grid system)
export const spacing = {
  // Base spacing units (8px grid)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
  56: '14rem',    // 224px
  64: '16rem',    // 256px
};

// Component-specific spacing
export const componentSpacing = {
  // Section spacing - Modern standards
  section: {
    py: 'py-16 sm:py-20 md:py-24 lg:py-28',
    px: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
  },

  // Container spacing - Wider layout standards
  container: {
    maxWidth: 'max-w-7xl',
    mx: 'mx-auto',
    px: 'px-6 sm:px-8 lg:px-12 xl:px-16',
  },

  // Wide container for full-width sections
  containerWide: {
    maxWidth: 'max-w-[1408px]',
    mx: 'mx-auto',
    px: 'px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20',
  },

  // Card spacing - Modern standards
  card: {
    p: 'p-8 sm:p-10 md:p-12',
    gap: 'gap-6 sm:gap-8',
  },

  // Form spacing - Modern standards
  form: {
    gap: 'gap-6 sm:gap-8',
    input: 'p-4 sm:p-5 md:p-6',
  },
};

// Typography hierarchy for different content types
export const typographyHierarchy = {
  // Page headers - Modern Documentary Style
  pageHeader: {
    title: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-ultralight tracking-tight',
    subtitle: 'text-xl sm:text-2xl md:text-3xl font-light tracking-tight',
    description: 'text-lead text-muted-foreground leading-relaxed',
  },

  // Section headers - Modern Documentary Style
  sectionHeader: {
    title: 'text-3xl sm:text-4xl md:text-5xl font-light tracking-tight',
    subtitle: 'text-lg sm:text-xl md:text-2xl font-normal tracking-tight',
    description: 'text-base sm:text-lg text-muted-foreground leading-relaxed',
  },

  // Card headers - Modern Documentary Style
  cardHeader: {
    title: 'text-xl sm:text-2xl font-medium tracking-tight',
    subtitle: 'text-base sm:text-lg font-normal',
    description: 'text-sm sm:text-base text-muted-foreground',
  },

  // Content text - Modern Documentary Style
  content: {
    intro: 'text-intro font-light leading-relaxed tracking-tight',
    large: 'text-large font-normal leading-relaxed',
    base: 'text-body font-normal leading-relaxed',
    small: 'text-small font-normal leading-relaxed',
    caption: 'text-caption font-medium leading-relaxed',
    label: 'text-label font-bold tracking-wider uppercase',
  },

  // Navigation
  navigation: {
    primary: 'text-base font-medium',
    secondary: 'text-sm font-medium',
  },

  // Buttons - Modern Documentary Style
  button: {
    large: 'text-lg sm:text-xl font-medium tracking-tight',
    base: 'text-base sm:text-lg font-medium tracking-tight',
    small: 'text-sm sm:text-base font-semibold tracking-tight',
  },
};

// Responsive breakpoints - Enhanced for modern devices
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1920px', // Added for ultra-wide displays
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Animation durations
export const animation = {
  fast: '150ms',
  base: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};
