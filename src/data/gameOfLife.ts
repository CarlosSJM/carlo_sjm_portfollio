import { type GameOfLifeData } from "@/types";

export const GAME_OF_LIFE_DATA: GameOfLifeData = {
  eyebrow: "INTERACTIVE",
  heading: "CONWAY'S GAME OF LIFE",
  description:
    "Conway's Game of Life is a cellular automaton: a grid of cells that live, die, or are born each generation following four simple rules about their neighbors. No player, no strategy — just an initial pattern left to evolve on its own. Watch it unfold below, create your own, or explore classic configurations.",
} as const;
