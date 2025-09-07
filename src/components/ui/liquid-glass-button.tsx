import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidGlassButtonVariants = cva(
  "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-white",
        destructive: "text-white",
        secondary: "text-white/90",
        outline: "border border-white/20 text-white",
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
          // Matching navigation style hover effects
          "hover:translate-y-[-1px] active:translate-y-[0] transition-all duration-300"
        )}
        ref={ref}
        style={{
          // Matching navigation liquid glass style
          background: 'rgba(255, 255, 255, 0.05)',
          border: '0.5px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '50px',
          minHeight: '38px',
          padding: '6px 14px',
          fontSize: '14px',
          fontWeight: '500',
          color: 'rgba(255, 255, 255, 0.9)',
          overflow: 'visible',
          isolation: 'isolate',
        }}
        {...props}
      >
        {/* Content with proper z-index */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </Comp>
    );
  }
);
LiquidGlassButton.displayName = "LiquidGlassButton";

export { LiquidGlassButton, liquidGlassButtonVariants };
