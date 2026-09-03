/**
 * Conway's Game of Life — pure grid logic, framework-independent.
 *
 * Kept separate from the canvas/React component so the rules are fully
 * unit-testable in jsdom (which has no real `canvas.getContext('2d')`).
 */

export type Grid = readonly (readonly boolean[])[];

/** Relative [row, col] offsets from a pattern's center cell. */
export type Pattern = readonly (readonly [number, number])[];

function getCell(grid: Grid, row: number, col: number): boolean {
  return grid[row]?.[col] ?? false;
}

export function createEmptyGrid(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));
}

export function createRandomGrid(
  rows: number,
  cols: number,
  aliveProbability = 0.3
): boolean[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < aliveProbability)
  );
}

/** Counts live neighbors with toroidal (wraparound) edges. */
export function countNeighbors(grid: Grid, row: number, col: number): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  let count = 0;

  for (let dRow = -1; dRow <= 1; dRow++) {
    for (let dCol = -1; dCol <= 1; dCol++) {
      if (dRow === 0 && dCol === 0) continue;
      const r = (row + dRow + rows) % rows;
      const c = (col + dCol + cols) % cols;
      if (getCell(grid, r, c)) count++;
    }
  }

  return count;
}

/** Applies Conway's rules to produce the next generation. */
export function nextGeneration(grid: Grid): boolean[][] {
  return grid.map((rowCells, row) =>
    rowCells.map((alive, col) => {
      const neighbors = countNeighbors(grid, row, col);
      return alive ? neighbors === 2 || neighbors === 3 : neighbors === 3;
    })
  );
}

/** Immutably toggles a single cell. */
export function toggleCell(grid: Grid, row: number, col: number): boolean[][] {
  return grid.map((rowCells, r) =>
    r === row ? rowCells.map((alive, c) => (c === col ? !alive : alive)) : [...rowCells]
  );
}

/** Places a pattern centered on (centerRow, centerCol), clipping out-of-bounds cells. */
export function applyPattern(
  rows: number,
  cols: number,
  pattern: Pattern,
  centerRow: number,
  centerCol: number
): boolean[][] {
  const grid = createEmptyGrid(rows, cols);

  for (const [dRow, dCol] of pattern) {
    const row = centerRow + dRow;
    const col = centerCol + dCol;
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      const gridRow = grid[row];
      if (gridRow) gridRow[col] = true;
    }
  }

  return grid;
}

/** Classic 5-cell glider. */
export const GLIDER_PATTERN: Pattern = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

/** Simplified 3x3-symmetric pulsar. */
export const PULSAR_PATTERN: Pattern = [
  [-6, -4], [-6, -3], [-6, -2], [-6, 2], [-6, 3], [-6, 4],
  [-4, -6], [-3, -6], [-2, -6], [-4, 6], [-3, 6], [-2, 6],
  [2, -6], [3, -6], [4, -6], [2, 6], [3, 6], [4, 6],
  [6, -4], [6, -3], [6, -2], [6, 2], [6, 3], [6, 4],
  [-1, -4], [-1, -3], [-1, -2], [-1, 2], [-1, 3], [-1, 4],
  [1, -4], [1, -3], [1, -2], [1, 2], [1, 3], [1, 4],
  [-4, -1], [-3, -1], [-2, -1], [-4, 1], [-3, 1], [-2, 1],
  [2, -1], [3, -1], [4, -1], [2, 1], [3, 1], [4, 1],
];

export function countPopulation(grid: Grid): number {
  return grid.reduce(
    (total, row) => total + row.reduce((rowTotal, alive) => rowTotal + (alive ? 1 : 0), 0),
    0
  );
}
