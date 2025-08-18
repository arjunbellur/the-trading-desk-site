/**
 * Accessible Button Component
 * Follows WCAG guidelines and provides comprehensive accessibility features
 */

import React from 'react';
import { twMerge } from 'tailwind-merge';
import { AccessibleButtonProps } from '@/lib/types';
import { A11Y } from '@/lib/constants';

/**
 * An accessible button component that meets WCAG standards
 * @param props - Button properties including accessibility attributes
 */
const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  ariaExpanded,
  ariaControls,
  className,
  disabled = false,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    onClick();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    // Ensure Enter and Space keys work consistently
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!disabled) {
        onClick();
      }
    }
  };

  const baseClasses = [
    // Accessibility requirements
    `min-h-[${A11Y.MIN_TOUCH_TARGET}px]`,
    'min-w-[44px]', // WCAG minimum touch target
    
    // Focus management
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-current',
    'focus-visible:ring-offset-2',
    
    // Interaction states
    'transition-all',
    'duration-200',
    'ease-in-out',
    
    // Disabled state
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80',
    
    // Base styling
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      disabled={disabled}
      className={twMerge(baseClasses, className)}
    >
      {children}
    </button>
  );
};

export default AccessibleButton;
