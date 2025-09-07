import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'hero' | 'featured' | 'dark';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
}

const sectionVariants = {
  default: 'bg-background',
  hero: 'bg-background relative overflow-hidden',
  featured: 'bg-background border-t border-border/30',
  dark: 'bg-background/95 backdrop-blur-sm',
};

const spacingVariants = {
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 md:py-20',
  lg: 'py-16 sm:py-20 md:py-24 lg:py-32',
  xl: 'py-20 sm:py-24 md:py-32 lg:py-40',
};

export const Section: React.FC<SectionProps> = ({
  children,
  className,
  id,
  variant = 'default',
  spacing = 'md',
  container = true,
}) => {
  return (
    <section
      id={id}
      className={cn(
        'relative z-40',
        sectionVariants[variant],
        spacingVariants[spacing],
        className
      )}
    >
      {container ? (
        <div className="mx-auto w-full px-3">
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
};
