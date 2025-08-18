import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
}

export const AnimatedBeam = forwardRef<HTMLDivElement, AnimatedBeamProps>(
  (
    {
      className,
      duration = 8,
      delay = 0,
        gradientStartColor = "#10b981",
  gradientStopColor = "#34d399",
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[inherit]",
          className
        )}
        style={{
          background: `linear-gradient(45deg, ${gradientStartColor}, ${gradientStopColor})`,
          animation: `pulse ${duration}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  }
);

AnimatedBeam.displayName = "AnimatedBeam";
