"use client";
// Justified: motion.div whileInView requires IntersectionObserver (browser API)
import { motion, useReducedMotion } from "motion/react";

interface AboutInViewProps {
  children: React.ReactNode;
  slideX?: boolean;
}

export function AboutInView({ children, slideX = false }: AboutInViewProps): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  if (slideX) {
    return (
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
