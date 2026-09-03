import { GAME_OF_LIFE_DATA } from "@/data/gameOfLife";
import { CircuitPattern } from "@/components/ui/geometry/CircuitPattern";
import { GameOfLifeHeadingInView } from "@/components/sections/GameOfLifeHeadingInView";
import { GameOfLifeGridInView } from "@/components/sections/GameOfLifeGridInView";

export function GameOfLifeSection(): React.JSX.Element {
  return (
    <section id="gameoflife" className="relative py-20 px-6 bg-black">
      <CircuitPattern />

      <div className="relative z-10 max-w-6xl mx-auto">
        <GameOfLifeHeadingInView>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-white/20" />
            <h2 className="text-sm tracking-[0.2em] text-white/60 font-mono">
              {GAME_OF_LIFE_DATA.eyebrow}
            </h2>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h3 className="text-4xl tracking-[0.1em] mb-4 font-bold font-display">
            {GAME_OF_LIFE_DATA.heading}
          </h3>
          <p className="text-[#A0A0A0] text-sm max-w-3xl mx-auto leading-relaxed">
            {GAME_OF_LIFE_DATA.description}
          </p>
        </GameOfLifeHeadingInView>

        <GameOfLifeGridInView />
      </div>
    </section>
  );
}
