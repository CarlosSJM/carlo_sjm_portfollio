interface CircuitPatternProps {
  readonly opacity?: number;
}

/** Circuit-board SVG tile pattern, decorative background for the Game of Life section. */
export function CircuitPattern({ opacity = 0.05 }: CircuitPatternProps): React.JSX.Element {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity }} aria-hidden="true">
      <svg className="w-full h-full">
        <defs>
          <pattern id="gameoflife-circuit" width="120" height="120" patternUnits="userSpaceOnUse">
            <path
              d="M 0,60 L 30,60 L 30,30 L 60,30 L 60,0"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <path
              d="M 60,120 L 60,90 L 90,90 L 90,60 L 120,60"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
            <circle cx="30" cy="60" r="3" fill="white" />
            <circle cx="60" cy="30" r="3" fill="white" />
            <circle cx="60" cy="90" r="3" fill="white" />
            <circle cx="90" cy="60" r="3" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gameoflife-circuit)" />
      </svg>
    </div>
  );
}
