"use client";

// 'use client' justified: Framer Motion entrance animation requires DOM access;
// useReducedMotion for prefers-reduced-motion compliance.

import { motion, useReducedMotion } from "motion/react";

interface HeroAnimationsProps {
  children: React.ReactNode;
}

export function HeroAnimations({
  children,
}: HeroAnimationsProps): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
