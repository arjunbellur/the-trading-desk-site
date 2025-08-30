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
        "grid auto-rows-fr",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
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
          background: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
        }}
      >
        {/* Border beam container */}
        <div
          className={cn(
            "pointer-events-none absolute inset-[1px] border-transparent z-[100]",
            "[mask-clip:padding-box,border-box] [mask-composite:intersect]",
            "[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
          style={{
            borderRadius: `${borderRadius - 1}px`,
            borderWidth: "1px",
          }}
        >
          {/* Animated border beam */}
          <div
            className="absolute aspect-square bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent animate-border-beam"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              filter: "blur(3px)",
              offsetPath: `rect(2px auto auto 2px round ${borderRadius - 2}px)`,
              offsetAnchor: "center",
              offsetRotate: "0deg",
              "--color-from": neonColors.firstColor,
              "--color-to": neonColors.secondColor,
            } as React.CSSProperties}
          />
        </div>
        
        {/* Apple-quality glass content container */}
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
          {/* Apple-style translucent glass effect with hover */}
          <div className="absolute inset-0 z-5" style={{ borderRadius: `${borderRadius}px` }}>
            {/* Primary dark layer with subtle hover enhancement */}
            <div 
              className="absolute inset-0 transition-all duration-500 group-hover:bg-white/[0.02]"
              style={{ 
                borderRadius: `${borderRadius}px`,
                background: '#1a1a1a'
              }}
            ></div>
            
            {/* Subtle inner glow on hover */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-0"
              style={{ 
                borderRadius: `${borderRadius}px`,
                background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.03), transparent 70%)'
              }}
            ></div>
            
            {/* Subtle top edge highlight */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            {/* Subtle left edge highlight */}
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent"></div>
          </div>
          
          {/* Content with proper layering */}
          <div className="relative z-10 p-4 h-full">
            {children}
          </div>
          
          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.005] pointer-events-none mix-blend-soft-light"
            style={{
              borderRadius: `${borderRadius}px`,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
