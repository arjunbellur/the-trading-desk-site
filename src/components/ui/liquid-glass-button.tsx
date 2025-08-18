import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidGlassButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50 group cursor-pointer relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-white",
        secondary: "text-white/90",
        outline: "text-white border border-white/20",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LiquidGlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidGlassButtonVariants> {
  asChild?: boolean;
}

const LiquidGlassButton = React.forwardRef<HTMLButtonElement, LiquidGlassButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          liquidGlassButtonVariants({ variant, size, className }),
          // Apple-style hover with subtle scale and no translation
          "hover:scale-[1.02] active:scale-[0.98]"
        )}
        ref={ref}
        style={{
          // Apple-style glass material background
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          // Apple-style shadow system
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.1),
            0 1px 0 rgba(255, 255, 255, 0.15) inset,
            0 8px 25px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.05)
          `,
        }}
        {...props}
      >
        {/* Apple-style glass material layers */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none">
          {/* Primary translucent material layer */}
          <div className="absolute inset-0 bg-white/[0.05] backdrop-blur-lg rounded-[inherit] transition-all duration-300 group-hover:bg-white/[0.08]"></div>
          
          {/* Apple-style edge highlights */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-all duration-300 group-hover:via-white/40"></div>
          <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transition-all duration-300 group-hover:via-white/30"></div>
          
          {/* Inner material glow */}
          <div className="absolute inset-[0.5px] rounded-[inherit] bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none transition-all duration-300 group-hover:from-white/[0.12] group-hover:via-white/[0.04]"></div>
          
          {/* Apple-style noise texture for realism */}
          <div 
            className="absolute inset-0 rounded-[inherit] opacity-[0.015] pointer-events-none mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.8'/%3E%3C/svg%3E")`,
            }}
          ></div>
          
          {/* Press state feedback */}
          <div className="absolute inset-0 rounded-[inherit] opacity-0 group-active:opacity-100 transition-opacity duration-100 pointer-events-none bg-black/[0.1]"></div>
        </div>
        
        {/* Content with Apple-style typography */}
        <span className="relative z-10 font-medium tracking-[-0.01em] flex items-center gap-2">
          {children}
        </span>
      </Comp>
    );
  }
);
LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton, liquidGlassButtonVariants };
