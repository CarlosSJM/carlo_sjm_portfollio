const NOISE_SVG = `<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;

const NOISE_DATA_URL = `url("data:image/svg+xml,${encodeURIComponent(NOISE_SVG)}")`;

export function FilmGrain(): React.JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[60] pointer-events-none mix-blend-overlay opacity-[0.03]"
      style={{ backgroundImage: NOISE_DATA_URL }}
    />
  );
}
