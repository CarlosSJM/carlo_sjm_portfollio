"use client";
// Justified: motion.div whileInView requires IntersectionObserver (browser API)
import { motion, useReducedMotion } from "motion/react";
import { Layout, Settings, Server, Terminal, Database, Code2 } from "lucide-react";
import type { SkillCategory } from "@/types";

const ICONS = { Layout, Settings, Server, Terminal, Database, Code2 } as const;

interface SkillCardProps {
  category: SkillCategory;
  index: number;
}

export function SkillCard({ category, index }: SkillCardProps): React.JSX.Element {
  const shouldReduce = useReducedMotion();
  const Icon = ICONS[category.iconName];

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-[#0a0a0a] border border-[#1F1F1F] hover:border-white/20 p-6 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 flex items-center justify-center border border-white/10">
          <Icon className="w-4 h-4 text-white" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h4 className="text-white font-bold tracking-[0.15em] text-sm uppercase">
          {category.title}
        </h4>
      </div>

      <div className="space-y-2">
        {category.skills.map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            <div
              aria-hidden="true"
              className="w-1 h-1 bg-white/40"
              style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
            />
            <span className="text-[#A0A0A0] text-sm font-mono">{skill}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
