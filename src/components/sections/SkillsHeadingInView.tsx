"use client";
// Justified: motion.div whileInView requires IntersectionObserver (browser API)
import { motion, useReducedMotion } from "motion/react";

export function SkillsHeadingInView({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-16 text-center"
    >
      {children}
    </motion.div>
  );
}
