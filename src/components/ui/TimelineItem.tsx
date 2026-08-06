"use client";
// Justified: motion.div whileInView requires IntersectionObserver (browser API)
import { motion, useReducedMotion } from "motion/react";
import type { ExperienceItem } from "@/types";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative flex gap-8 pb-12"
    >
      <div aria-hidden="true" className="relative flex flex-col items-center">
        <div className="w-3 h-3 bg-white rotate-45 border border-white z-10" />
        <div className="w-px h-full bg-white/20 mt-2" />
      </div>

      <div className="flex-1 pt-0">
        <div className="mb-2">
          <h4 className="text-white font-bold tracking-[0.1em] mb-1">{item.company}</h4>
          <div className="text-[#A0A0A0] text-sm tracking-[0.15em] uppercase font-mono">
            {item.role}
          </div>
          <div className="text-white/40 text-xs font-mono mt-1">{item.period}</div>
        </div>

        <p className="text-[#A0A0A0] text-sm leading-relaxed mb-4 font-mono max-w-2xl">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {item.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
