import React from 'react';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

// Page Headers
export const PageTitle: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'h1' 
}) => (
  <Component className={cn(
    'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    className
  )}>
    {children}
  </Component>
);

export const PageSubtitle: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'h2' 
}) => (
  <Component className={cn(
    'text-xl sm:text-2xl md:text-3xl font-medium tracking-tight',
    className
  )}>
    {children}
  </Component>
);

// Section Headers
export const SectionTitle: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'h2' 
}) => (
  <Component className={cn(
    'text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight',
    className
  )}>
    {children}
  </Component>
);

export const SectionSubtitle: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'h3' 
}) => (
  <Component className={cn(
    'text-lg sm:text-xl md:text-2xl font-medium tracking-tight',
    className
  )}>
    {children}
  </Component>
);

// Content Text
export const Text: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'p' 
}) => (
  <Component className={cn(
    'text-base leading-relaxed',
    className
  )}>
    {children}
  </Component>
);

export const TextLarge: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'p' 
}) => (
  <Component className={cn(
    'text-lg sm:text-xl leading-relaxed',
    className
  )}>
    {children}
  </Component>
);

export const TextSmall: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'p' 
}) => (
  <Component className={cn(
    'text-sm leading-relaxed',
    className
  )}>
    {children}
  </Component>
);

// Specialized Text
export const Caption: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'p' 
}) => (
  <Component className={cn(
    'text-xs leading-relaxed text-muted-foreground',
    className
  )}>
    {children}
  </Component>
);

export const Label: React.FC<TypographyProps> = ({ 
  children, 
  className,
  as: Component = 'span' 
}) => (
  <Component className={cn(
    'text-sm font-medium',
    className
  )}>
    {children}
  </Component>
);
