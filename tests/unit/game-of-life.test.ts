import { describe, it, expect } from "vitest";
import { GAME_OF_LIFE_DATA } from "@/data/gameOfLife";
import {
  createEmptyGrid,
  createRandomGrid,
  countNeighbors,
  nextGeneration,
  toggleCell,
  applyPattern,
  countPopulation,
  GLIDER_PATTERN,
  PULSAR_PATTERN,
  type Grid,
} from "@/lib/gameOfLife";

/** Test-only helper: set a cell alive, tolerating `noUncheckedIndexedAccess` without `!`. */
function setAlive(grid: boolean[][], row: number, col: number): void {
  const gridRow = grid[row];
  if (!gridRow) throw new Error(`row ${row} out of bounds`);
  gridRow[col] = true;
}

/** Test-only helper: read a cell, tolerating `noUncheckedIndexedAccess` without `!`. */
function isAlive(grid: Grid, row: number, col: number): boolean {
  return grid[row]?.[col] ?? false;
}

describe("GAME_OF_LIFE_DATA", () => {
  it("has non-empty eyebrow, heading, and description", () => {
    expect(GAME_OF_LIFE_DATA.eyebrow.length).toBeGreaterThan(0);
    expect(GAME_OF_LIFE_DATA.heading.length).toBeGreaterThan(0);
    expect(GAME_OF_LIFE_DATA.description.length).toBeGreaterThan(0);
  });
});

describe("createEmptyGrid", () => {
  it("creates a grid with the right dimensions, all dead", () => {
    const grid = createEmptyGrid(5, 8);
    expect(grid).toHaveLength(5);
    grid.forEach((row) => {
      expect(row).toHaveLength(8);
      expect(row.every((cell) => cell === false)).toBe(true);
    });
  });
});

describe("createRandomGrid", () => {
  it("creates a grid with the right dimensions", () => {
    const grid = createRandomGrid(6, 6, 0.5);
    expect(grid).toHaveLength(6);
    grid.forEach((row) => expect(row).toHaveLength(6));
  });

  it("respects probability 0 (all dead) and 1 (all alive)", () => {
    const empty = createRandomGrid(4, 4, 0);
    expect(empty.every((row) => row.every((cell) => cell === false))).toBe(true);

    const full = createRandomGrid(4, 4, 1);
    expect(full.every((row) => row.every((cell) => cell === true))).toBe(true);
  });
});

describe("countNeighbors", () => {
  it("counts live neighbors correctly in the middle of the grid", () => {
    const grid = [
      [false, true, false],
      [true, true, true],
      [false, true, false],
    ];
    expect(countNeighbors(grid, 1, 1)).toBe(4);
  });

  it("wraps around edges (toroidal)", () => {
    // Only the top-left and bottom-right corners are alive on a 3x3 grid.
    const grid = [
      [true, false, false],
      [false, false, false],
      [false, false, true],
    ];
    // Neighbors of (0,0) wrap to include (2,2) diagonally.
    expect(countNeighbors(grid, 0, 0)).toBe(1);
  });

  it("returns 0 for an all-dead grid", () => {
    const grid = createEmptyGrid(4, 4);
    expect(countNeighbors(grid, 2, 2)).toBe(0);
  });
});

describe("nextGeneration — Conway's rules", () => {
  it("kills a live cell with fewer than 2 neighbors (underpopulation)", () => {
    const grid = createEmptyGrid(5, 5);
    setAlive(grid, 2, 2); // lone cell, 0 neighbors
    const next = nextGeneration(grid);
    expect(isAlive(next, 2, 2)).toBe(false);
  });

  it("keeps a live cell alive with 2 or 3 neighbors (survival)", () => {
    const grid = createEmptyGrid(5, 5);
    setAlive(grid, 2, 2);
    setAlive(grid, 1, 2);
    setAlive(grid, 3, 2); // 2 neighbors
    const next = nextGeneration(grid);
    expect(isAlive(next, 2, 2)).toBe(true);
  });

  it("kills a live cell with more than 3 neighbors (overpopulation)", () => {
    const grid = createEmptyGrid(5, 5);
    setAlive(grid, 2, 2);
    setAlive(grid, 1, 1);
    setAlive(grid, 1, 2);
    setAlive(grid, 1, 3);
    setAlive(grid, 3, 1); // 4 neighbors
    const next = nextGeneration(grid);
    expect(isAlive(next, 2, 2)).toBe(false);
  });

  it("brings a dead cell to life with exactly 3 neighbors (reproduction)", () => {
    const grid = createEmptyGrid(5, 5);
    setAlive(grid, 1, 2);
    setAlive(grid, 3, 2);
    setAlive(grid, 2, 1); // 3 neighbors around (2,2), which is dead
    const next = nextGeneration(grid);
    expect(isAlive(next, 2, 2)).toBe(true);
  });

  it("a blinker oscillator flips orientation after one generation", () => {
    const grid = createEmptyGrid(5, 5);
    setAlive(grid, 2, 1);
    setAlive(grid, 2, 2);
    setAlive(grid, 2, 3); // horizontal blinker
    const next = nextGeneration(grid);
    expect(isAlive(next, 1, 2)).toBe(true);
    expect(isAlive(next, 2, 2)).toBe(true);
    expect(isAlive(next, 3, 2)).toBe(true);
    expect(isAlive(next, 2, 1)).toBe(false);
    expect(isAlive(next, 2, 3)).toBe(false);
  });
});

describe("toggleCell", () => {
  it("flips a dead cell to alive without mutating the original grid", () => {
    const grid = createEmptyGrid(3, 3);
    const next = toggleCell(grid, 1, 1);
    expect(isAlive(next, 1, 1)).toBe(true);
    expect(isAlive(grid, 1, 1)).toBe(false); // original untouched
  });

  it("flips an alive cell back to dead", () => {
    const grid = createEmptyGrid(3, 3);
    setAlive(grid, 0, 0);
    const next = toggleCell(grid, 0, 0);
    expect(isAlive(next, 0, 0)).toBe(false);
  });

  it("does not affect other cells", () => {
    const grid = createEmptyGrid(3, 3);
    setAlive(grid, 0, 0);
    const next = toggleCell(grid, 1, 1);
    expect(isAlive(next, 0, 0)).toBe(true);
  });
});

describe("applyPattern", () => {
  it("places GLIDER_PATTERN centered, all cells within bounds", () => {
    const grid = applyPattern(20, 20, GLIDER_PATTERN, 10, 10);
    expect(countPopulation(grid)).toBe(GLIDER_PATTERN.length);
  });

  it("places PULSAR_PATTERN centered, all cells within bounds", () => {
    const grid = applyPattern(30, 30, PULSAR_PATTERN, 15, 15);
    expect(countPopulation(grid)).toBe(PULSAR_PATTERN.length);
  });

  it("clips out-of-bounds cells instead of throwing when centered near an edge", () => {
    expect(() => applyPattern(5, 5, PULSAR_PATTERN, 0, 0)).not.toThrow();
    const grid = applyPattern(5, 5, PULSAR_PATTERN, 0, 0);
    expect(countPopulation(grid)).toBeLessThanOrEqual(PULSAR_PATTERN.length);
  });
});

describe("countPopulation", () => {
  it("counts all live cells across the grid", () => {
    const grid = createEmptyGrid(4, 4);
    setAlive(grid, 0, 0);
    setAlive(grid, 3, 3);
    setAlive(grid, 1, 2);
    expect(countPopulation(grid)).toBe(3);
  });

  it("returns 0 for an all-dead grid", () => {
    expect(countPopulation(createEmptyGrid(5, 5))).toBe(0);
  });
});
