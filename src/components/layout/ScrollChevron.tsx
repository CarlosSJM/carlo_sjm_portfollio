"use client";

// 'use client' justified: Framer Motion bounce animation requires DOM;
// useReducedMotion for prefers-reduced-motion compliance.

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface ScrollChevronProps {
  href: string;
  ariaLabel: string;
}

export function ScrollChevron({
  href,
  ariaLabel,
}: ScrollChevronProps): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
    >
      <motion.div
        animate={shouldReduce ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown size={24} aria-hidden="true" />
      </motion.div>
    </a>
  );
}
