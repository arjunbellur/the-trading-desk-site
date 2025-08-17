import * as React from "react";
import { twMerge } from "tailwind-merge";

/**
 * The Trading Desk iOS 26 Liquid Glass Button Component
 * Two standardized variants following navigation button styling:
 * - nav: Compact buttons for navigation (like the nav bar)
 * - regular: Standard buttons for actions and CTAs
 * 
 * Both use consistent iOS 26 liquid glass styling
 */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
  variant?: 'nav' | 'regular';
  asChild?: boolean; // For Link compatibility
};

export function Button({
  className,
  children,
  disabled,
  fullWidth,
  variant = 'regular',
  asChild,
  ...props
}: ButtonProps) {
  const baseClasses = [
    // Core button styling
    "tm-ui-button",
    
    // Variant-specific classes
    variant === 'nav' ? "tm-ui-button--nav" : "tm-ui-button--regular",
    
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