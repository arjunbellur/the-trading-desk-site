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
    'text-display font-bold tracking-tight',
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
    'text-h1 font-medium tracking-tight',
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
    'text-h1 font-bold tracking-tight',
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
    'text-h3 font-medium tracking-tight',
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
    'text-body',
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
    'text-body',
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
    'text-small',
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
    'text-caption text-muted-foreground',
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
    'text-small font-medium',
    className
  )}>
    {children}
  </Component>
);
