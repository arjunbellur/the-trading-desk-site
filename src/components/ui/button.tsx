import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * The Trading Desk Liquid Glass Button Component
 * Standardized variants following liquid glass styling:
 * - base: Base liquid glass button
 * - green: Green variant for primary actions
 * - ghost: Ghost variant for secondary actions
 * - discord: Discord variant with purple glow
 * 
 * All use consistent liquid glass styling
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  variant?: 'base' | 'green' | 'ghost' | 'discord';
  asChild?: boolean; // For Link compatibility
};

export function Button({
  className,
  children,
  disabled,
  fullWidth,
  variant = 'base',
  asChild,
  ...props
}: ButtonProps) {
  const baseClasses = [
    // Core button styling
    variant === 'base' ? "liquid-glass-btn" :
    variant === 'green' ? "liquid-glass-btn--green" :
    variant === 'ghost' ? "liquid-glass-btn--ghost" :
    variant === 'discord' ? "liquid-glass-discord-btn" : "liquid-glass-btn",
    
    // Width
    fullWidth ? "w-full" : "",
  ].filter(Boolean).join(" ");

  if (asChild) {
    return (
      <span className={twMerge(baseClasses, className)} {...props}>
        {children}
      </span>
    );
  }

  return (
    <button
      disabled={disabled}
      className={twMerge(baseClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;