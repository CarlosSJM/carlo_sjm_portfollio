"use client";
// Justified: canvas/Math.random logic needs the browser (next/dynamic ssr:false,
// only allowed from a Client Component) + motion.div whileInView entrance
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";

const GRID_WIDTH = 1200;
const GRID_HEIGHT = 500;

function GameOfLifeSkeleton(): React.JSX.Element {
  return (
    <div
      className="w-full border border-white/20 bg-black animate-pulse"
      style={{ aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`, maxHeight: "600px" }}
      aria-hidden="true"
    />
  );
}

const GameOfLife = dynamic(
  () => import("@/components/ui/GameOfLife").then((mod) => mod.GameOfLife),
  { ssr: false, loading: GameOfLifeSkeleton }
);

export function GameOfLifeGridInView(): React.JSX.Element {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <GameOfLife width={GRID_WIDTH} height={GRID_HEIGHT} />
    </motion.div>
  );
}
