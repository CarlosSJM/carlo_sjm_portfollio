"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Shuffle, Grid3x3, Zap } from "lucide-react";
import {
  type Grid,
  createEmptyGrid,
  createRandomGrid,
  nextGeneration,
  toggleCell,
  applyPattern,
  countPopulation,
  GLIDER_PATTERN,
  PULSAR_PATTERN,
} from "@/lib/gameOfLife";

interface GameOfLifeProps {
  readonly width?: number;
  readonly height?: number;
}

export function GameOfLife({ width = 1200, height = 500 }: GameOfLifeProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cellSize, setCellSize] = useState(8);
  const [speed, setSpeed] = useState(100);

  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(rows, cols));
  const [generation, setGeneration] = useState(0);
  const population = countPopulation(grid);

  // Reset the grid whenever the resolution (cell size / canvas dimensions)
  // changes. Adjusting state during render (React's documented pattern for
  // "resetting state when a prop changes") instead of in an effect, so it
  // doesn't trigger a cascading extra render.
  const gridKey = `${width}x${height}x${cellSize}`;
  const [prevGridKey, setPrevGridKey] = useState(gridKey);
  if (gridKey !== prevGridKey) {
    setPrevGridKey(gridKey);
    setGrid(createEmptyGrid(rows, cols));
    setGeneration(0);
    setIsPlaying(false);
  }

  // Game loop.
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setGrid((current) => nextGeneration(current));
      setGeneration((gen) => gen + 1);
    }, speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  // Draw the grid on the canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    grid.forEach((row, r) => {
      row.forEach((alive, c) => {
        if (!alive) return;
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
        ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
        ctx.shadowBlur = 0;
      });
    });

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 0.5;
    for (let r = 0; r <= rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellSize);
      ctx.lineTo(width, r * cellSize);
      ctx.stroke();
    }
    for (let c = 0; c <= cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellSize, 0);
      ctx.lineTo(c * cellSize, height);
      ctx.stroke();
    }
  }, [grid, cellSize, width, height, rows, cols]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    if (isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // The canvas is rendered at a CSS size that can differ from its internal
    // pixel resolution (responsive `w-full h-auto`) — scale click coordinates
    // to the canvas's actual resolution before mapping them to a cell.
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (event.clientX - rect.left) * scaleX;
    const canvasY = (event.clientY - rect.top) * scaleY;
    const col = Math.floor(canvasX / cellSize);
    const row = Math.floor(canvasY / cellSize);

    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      setGrid((current) => toggleCell(current, row, col));
    }
  };

  const reset = (): void => {
    setGrid(createEmptyGrid(rows, cols));
    setGeneration(0);
    setIsPlaying(false);
  };

  const randomize = (): void => {
    setGrid(createRandomGrid(rows, cols));
    setGeneration(0);
    setIsPlaying(false);
  };

  const loadPattern = (pattern: typeof GLIDER_PATTERN): void => {
    setGrid(applyPattern(rows, cols, pattern, Math.floor(rows / 2), Math.floor(cols / 2)));
    setGeneration(0);
    setIsPlaying(false);
  };

  return (
    <div className="w-full">
      <div className="relative mb-8 border border-white/20 overflow-hidden group">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          onClick={handleCanvasClick}
          role="img"
          aria-label={`Conway's Game of Life grid, generation ${generation}, population ${population}. Click cells to toggle them while paused.`}
          className="w-full h-auto cursor-crosshair bg-black"
          style={{ maxHeight: "600px" }}
        />

        <div className="absolute top-4 left-4 bg-black/80 border border-white/20 px-4 py-2 font-mono text-xs">
          <div className="text-white/60 tracking-wider">
            GENERATION: <span className="text-white">{generation}</span>
          </div>
          <div className="text-white/60 tracking-wider">
            POPULATION: <span className="text-white">{population}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-white tracking-[0.15em] text-sm font-mono flex items-center gap-2">
            <Play className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            PLAYBACK
          </h4>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="flex-1 px-4 py-3 border border-white/20 text-white hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wider font-mono"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Play className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
              )}
              {isPlaying ? "PAUSE" : "PLAY"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="px-4 py-3 border border-white/20 text-white hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Reset grid"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={randomize}
              className="px-4 py-3 border border-white/20 text-white hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Randomize grid"
            >
              <Shuffle className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>

          <div>
            <label className="block text-xs text-white/60 tracking-[0.15em] mb-2 font-mono flex items-center gap-2">
              <Zap className="w-3 h-3" strokeWidth={1.5} aria-hidden="true" />
              SPEED: {(1000 / speed).toFixed(1)} gen/s
            </label>
            <input
              type="range"
              min="20"
              max="500"
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, white ${((500 - speed) / 480) * 100}%, rgba(255,255,255,0.1) ${((500 - speed) / 480) * 100}%)`,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-white tracking-[0.15em] text-sm font-mono flex items-center gap-2">
            <Grid3x3 className="w-4 h-4" strokeWidth={1.5} aria-hidden="true" />
            CONFIGURATION
          </h4>

          <div>
            <label className="block text-xs text-white/60 tracking-[0.15em] mb-2 font-mono">
              CELL SIZE: {cellSize}px
            </label>
            <input
              type="range"
              min="4"
              max="16"
              value={cellSize}
              onChange={(event) => setCellSize(Number(event.target.value))}
              className="w-full h-1 bg-white/10 appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, white ${((cellSize - 4) / 12) * 100}%, rgba(255,255,255,0.1) ${((cellSize - 4) / 12) * 100}%)`,
              }}
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 tracking-[0.15em] mb-3 font-mono">PRESETS</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => loadPattern(GLIDER_PATTERN)}
                className="px-3 py-2 border border-white/20 text-white hover:border-white/50 transition-all duration-300 text-xs tracking-wider font-mono"
              >
                GLIDER
              </button>
              <button
                type="button"
                onClick={() => loadPattern(PULSAR_PATTERN)}
                className="px-3 py-2 border border-white/20 text-white hover:border-white/50 transition-all duration-300 text-xs tracking-wider font-mono"
              >
                PULSAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-white/40 font-mono leading-relaxed border-l-2 border-white/10 pl-4">
        Click cells to toggle them • Conway&apos;s Game of Life follows simple rules: Any live cell
        with 2-3 neighbors survives • Any dead cell with exactly 3 neighbors becomes alive • All
        other cells die or stay dead
      </div>
    </div>
  );
}
