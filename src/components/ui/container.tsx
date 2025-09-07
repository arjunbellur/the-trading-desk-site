import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
}

const containerSizes = {
  sm: 'max-w-none',
  md: 'max-w-none',
  lg: 'max-w-none',
  xl: 'max-w-none',
  full: 'max-w-none',
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
  centered = true,
}) => {
  return (
    <div
      className={cn(
        'w-full px-3',
        containerSizes[size],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};
