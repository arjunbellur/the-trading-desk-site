"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TradingLampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent w-full z-0",
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        {/* Left lamp beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.8, width: "24rem" }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-48 w-[24rem] overflow-visible bg-gradient-conic from-green-400 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-32 w-[100%] bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-32 bg-black [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        {/* Right lamp beam */}
        <motion.div
          initial={{ opacity: 0.3, width: "12rem" }}
          whileInView={{ opacity: 0.8, width: "24rem" }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-48 w-[24rem] bg-gradient-conic from-transparent via-transparent to-green-400 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-32 bg-black [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-32 w-[100%] bg-black [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* Blur effects */}
        <div className="absolute top-1/2 h-40 w-full translate-y-10 scale-x-150 bg-black opacity-80 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-40 w-full bg-transparent opacity-5 backdrop-blur-md"></div>
        
        {/* Central glow */}
        <div className="absolute inset-auto z-50 h-28 w-[22rem] -translate-y-1/2 rounded-full bg-green-400 opacity-30 blur-3xl"></div>
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "12rem" }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-28 w-48 -translate-y-[5rem] rounded-full bg-green-300 opacity-40 blur-2xl"
        />
        
        {/* Lamp bar */}
        <motion.div
          initial={{ width: "12rem" }}
          whileInView={{ width: "24rem" }}
          transition={{
            delay: 0.2,
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[24rem] -translate-y-[6rem] bg-green-300"
        />

        <div className="absolute inset-auto z-40 h-36 w-full -translate-y-[10rem] bg-black"></div>
      </div>

      <div className="relative z-50 flex -translate-y-64 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
};
