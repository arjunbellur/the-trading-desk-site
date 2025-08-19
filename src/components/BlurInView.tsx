import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BlurInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amount?: number;
}

export function BlurInView({ 
  children, 
  className = "", 
  delay = 0, 
  duration = 0.6,
  amount = 0.1
}: BlurInViewProps) {
  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        filter: "blur(4px)",
        y: 15
      }}
      whileInView={{ 
        opacity: 1, 
        filter: "blur(0px)",
        y: 0
      }}
      viewport={{ 
        once: true,
        amount: amount,
        margin: "0px 0px -100px 0px"
      }}
      transition={{ 
        duration: duration,
        delay: delay,
        ease: [0.23, 1, 0.32, 1],
        type: "tween"
      }}
    >
      {children}
    </motion.div>
  );
}
