import { cn } from "@/lib/utils";
import React from "react";

interface NeonColors {
  firstColor: string;
  secondColor: string;
}

const neonColorCombinations: NeonColors[] = [
  { firstColor: "#10b981", secondColor: "#34d399" },
  { firstColor: "#059669", secondColor: "#6ee7b7" },
  { firstColor: "#34d399", secondColor: "#10b981" },
  { firstColor: "#6ee7b7", secondColor: "#059669" },
  { firstColor: "#a7f3d0", secondColor: "#10b981" },
];

interface NeonGradientCardProps {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  borderRadius?: number;
  neonColors?: NeonColors;
  disable3D?: boolean;
  [key: string]: unknown;
}

export function NeonGradientCard({
  className,
  children,
  as: Component = "div",
  borderRadius = 12,
  neonColors = neonColorCombinations[0],
  ...props
}: NeonGradientCardProps) {
  return (
    <Component
      className={cn(
        "relative animate-fade-up opacity-0 [--animation-delay:400ms] group cursor-pointer",
        "after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,var(--background)_30%,transparent)]",
        "transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-xl relative transition-all duration-500 ease-out group-hover:shadow-2xl",
          "before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0",
          "before:[filter:blur(180px)] before:animate-image-glow",
          `before:[background-image:linear-gradient(to_bottom,${neonColors.firstColor},${neonColors.firstColor},transparent_40%)]`
        )}
        style={{
          borderRadius: `${borderRadius}px`,
          background: 'rgba(255, 255, 255, 0.015)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            0 8px 32px rgba(0, 0, 0, 0.7),
            0 16px 64px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.03)
          `,
        }}
      >
        {/* Border beam container */}
        <div
          className={cn(
            "pointer-events-none absolute inset-[1px] rounded-[inherit] border-transparent",
            "[mask-clip:padding-box,border-box] [mask-composite:intersect]",
            "[mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
          )}
          style={{
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
        <div className="relative w-full h-full rounded-[inherit] overflow-hidden">
          {/* Apple-style translucent glass effect with hover */}
          <div className="absolute inset-0 rounded-[inherit]">
            {/* Primary translucent layer with hover enhancement */}
            <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-[inherit] transition-all duration-500 group-hover:bg-white/[0.035]"></div>
            
            {/* Radial darkness overlay for depth */}
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-radial from-transparent via-black/[0.02] to-black/[0.05] transition-opacity duration-500 group-hover:opacity-70"></div>
            
            {/* Secondary subtle depth layer with hover brightening */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] via-white/[0.015] to-transparent rounded-[inherit] transition-all duration-500 group-hover:from-white/[0.1] group-hover:via-white/[0.025]"></div>
            
            {/* Top edge highlight - brighter on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-500 group-hover:via-white/25"></div>
            
            {/* Left edge highlight - brighter on hover */}
            <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transition-all duration-500 group-hover:via-white/18"></div>
            
            {/* Right edge highlight on hover */}
            <div className="absolute top-0 right-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/0 to-transparent transition-all duration-500 group-hover:via-white/12"></div>
            
            {/* Inner translucent glow with hover enhancement */}
            <div className="absolute inset-[1px] rounded-[inherit] bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.01] pointer-events-none transition-all duration-500 group-hover:from-white/[0.04] group-hover:to-white/[0.02]"></div>
            
            {/* Apple-style center darkening with hover reduction */}
            <div className="absolute inset-4 rounded-[inherit] bg-gradient-radial from-black/[0.01] via-black/[0.03] to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-50"></div>
            
            {/* Liquid ripple effect on hover */}
            <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-pulse"></div>
            </div>
          </div>
          
          {/* Content with proper layering */}
          <div className="relative z-10 p-4 h-full">
            {children}
          </div>
          
          {/* Enhanced noise texture with hover effect */}
          <div 
            className="absolute inset-0 rounded-[inherit] opacity-[0.008] pointer-events-none mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </div>
    </Component>
  );
}