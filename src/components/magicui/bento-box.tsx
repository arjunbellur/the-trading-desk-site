import { cn } from "@/lib/utils";
import React from "react";

interface BentoBoxProps {
  className?: string;
  children: React.ReactNode;
  columns?: number;
  gap?: string;
}

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
  borderRadius?: number;
}

export function BentoBox({ 
  className, 
  children, 
  columns = 12, 
  gap = "1rem" 
}: BentoBoxProps) {
  return (
    <div 
      className={cn(
        "grid",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gridTemplateRows: 'repeat(2, 180px)',
        gap,
      }}
    >
      {children}
    </div>
  );
}

export function BentoCard({ 
  className, 
  children, 
  colSpan = 1, 
  rowSpan = 1,
  neonColors = { firstColor: "#10b981", secondColor: "#34d399" },
  borderRadius = 12
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative animate-fade-up opacity-0 [--animation-delay:400ms] group cursor-pointer",
        "after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,var(--background)_30%,transparent)]",
        "transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      <div
        className={cn(
          "relative transition-all duration-500 ease-out group-hover:shadow-2xl",
          "before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0",
          "before:[filter:blur(180px)] before:animate-image-glow",
          `before:[background-image:linear-gradient(to_bottom,${neonColors.firstColor},${neonColors.firstColor},transparent_40%)]`
        )}
        style={{
          borderRadius: `${borderRadius}px`,
          background: '#000000',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        }}
      >

        
        {/* Simple content container */}
        <div className="relative flex h-full w-full flex-col overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
          {/* Dark background layer */}
          <div 
            className="absolute inset-0 transition-all duration-300 group-hover:bg-white/[0.02]"
            style={{ 
              borderRadius: `${borderRadius}px`,
              background: '#000000'
            }}
          ></div>
          
          {/* Subtle top edge highlight */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          
          {/* Subtle light gradient overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              borderRadius: `${borderRadius}px`,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)'
            }}
          ></div>
          
          {/* Content with proper layering */}
          <div className="relative z-10 flex-1 p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
