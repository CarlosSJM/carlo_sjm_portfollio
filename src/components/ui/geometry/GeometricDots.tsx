interface GeometricDotsProps {
  className?: string;
}

// Deterministic pseudo-random to avoid SSR/hydration mismatch
function seededRandom(seed: number): number {
  return ((seed * 9301 + 49297) % 233280) / 233280;
}

export function GeometricDots({
  className,
}: GeometricDotsProps): React.JSX.Element {
  const rows = 20;
  const cols = 30;
  const total = rows * cols;

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden opacity-20 pointer-events-none select-none ${className ?? ""}`}
    >
      <div className="grid grid-cols-[repeat(30,1fr)] gap-x-12 gap-y-12 w-full h-full p-8">
        {Array.from({ length: total }).map((_, i) => {
          const duration = (2 + seededRandom(i) * 3).toFixed(2);
          const delay = (seededRandom(i + total) * 2).toFixed(2);
          return (
            <div
              key={i}
              className="w-0.5 h-0.5 bg-white rounded-full"
              style={{
                animation: `pulse ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
