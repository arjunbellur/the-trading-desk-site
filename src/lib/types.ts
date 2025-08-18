/**
 * Application-wide TypeScript types and interfaces
 * Following clean architecture and strong typing principles
 */

import { ERROR_CODES } from './constants';

// Navigation Types
export interface NavigationItem {
  readonly name: string;
  readonly href: string;
  readonly ariaLabel: string;
}

export interface NavigationState {
  readonly isOpen: boolean;
  readonly isMobile: boolean;
}

// Smooth Scroll Types
export interface ScrollToElementParams {
  readonly elementId: string;
  readonly offset?: number;
  readonly duration?: number;
}

export interface SmoothScrollLinkProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
  readonly isExternal?: boolean;
  onClick?: () => void;
}

// Error Types
export interface ApiError {
  readonly message: string;
  readonly code: keyof typeof ERROR_CODES;
  readonly statusCode?: number;
}

export class NavigationError extends Error {
  public readonly code: string;
  
  constructor(message: string, code: keyof typeof ERROR_CODES) {
    super(message);
    this.name = 'NavigationError';
    this.code = code;
  }
}

// Component Props Types
export interface AccessibleButtonProps {
  readonly children: React.ReactNode;
  readonly onClick: () => void;
  readonly ariaLabel: string;
  readonly ariaExpanded?: boolean;
  readonly ariaControls?: string;
  readonly className?: string;
  readonly disabled?: boolean;
}

export interface MobileNavigationProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly menuId: string;
  readonly navigationItems: readonly NavigationItem[];
}

// Animation Types
export interface AnimationConfig {
  readonly duration: number;
  readonly easing: string;
  readonly delay?: number;
}

// Theme Types
export interface ThemeColors {
  readonly primary: string;
  readonly secondary: string;
  readonly background: string;
  readonly foreground: string;
}

// Utility Types
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Event Handler Types
export type VoidFunction = () => void;
export type KeyboardEventHandler = (event: React.KeyboardEvent) => void;
export type MouseEventHandler = (event: React.MouseEvent) => void;
