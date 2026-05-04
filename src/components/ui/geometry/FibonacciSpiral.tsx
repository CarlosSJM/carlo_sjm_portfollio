interface FibonacciSpiralProps {
  opacity?: number;
  className?: string;
}

export function FibonacciSpiral({
  opacity = 0.1,
  className,
}: FibonacciSpiralProps): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full animate-slow-spin pointer-events-none select-none ${className ?? ""}`}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g transform="translate(500, 500)">
        {/* Seed of Life — center + 6 circles */}
        <circle cx="0" cy="0" r="80" fill="none" stroke="white" strokeWidth="2" opacity={opacity} filter="url(#glow)" />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <circle
              key={`seed-${i}`}
              cx={Math.cos(rad) * 80}
              cy={Math.sin(rad) * 80}
              r="80"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity={opacity}
              filter="url(#glow)"
            />
          );
        })}

        {/* Outer Flower of Life ring */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <circle
              key={`flower-${i}`}
              cx={Math.cos(rad) * 160}
              cy={Math.sin(rad) * 160}
              r="80"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              opacity={opacity * 0.7}
            />
          );
        })}

        {/* Vesica Piscis — vertical and horizontal */}
        <ellipse cx="0" cy="0" rx="120" ry="250" fill="none" stroke="white" strokeWidth="1" opacity={opacity * 0.5} />
        <ellipse cx="0" cy="0" rx="250" ry="120" fill="none" stroke="white" strokeWidth="1" opacity={opacity * 0.5} />
        <ellipse cx="0" cy="0" rx="120" ry="250" fill="none" stroke="white" strokeWidth="1" opacity={opacity * 0.5} transform="rotate(45)" />
        <ellipse cx="0" cy="0" rx="250" ry="120" fill="none" stroke="white" strokeWidth="1" opacity={opacity * 0.5} transform="rotate(45)" />

        {/* Concentric cosmic rings */}
        {[120, 200, 280, 360, 440].map((r, i) => (
          <circle
            key={`ring-${i}`}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity={opacity * 0.4}
            strokeDasharray={i % 2 === 0 ? "10,10" : "5,5"}
          />
        ))}

        {/* Star tetrahedron (Merkaba) */}
        <path d="M 0,-180 L 156,90 L -156,90 Z" fill="none" stroke="white" strokeWidth="1.5" opacity={opacity * 0.6} />
        <path d="M 0,180 L 156,-90 L -156,-90 Z" fill="none" stroke="white" strokeWidth="1.5" opacity={opacity * 0.6} />

        {/* Radial sacred geometry lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`radial-${i}`}
              x1={Math.cos(rad) * 60}
              y1={Math.sin(rad) * 60}
              x2={Math.cos(rad) * 350}
              y2={Math.sin(rad) * 350}
              stroke="white"
              strokeWidth="0.5"
              opacity={opacity * 0.3}
            />
          );
        })}

        {/* Sri Yantra inspired triangles */}
        {[0, 72, 144, 216, 288].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 40;
          const y = Math.sin(rad) * 40;
          return (
            <g key={`sri-${i}`}>
              <circle cx={x} cy={y} r="8" fill="none" stroke="white" strokeWidth="1" opacity={opacity} />
              <line x1="0" y1="0" x2={x} y2={y} stroke="white" strokeWidth="0.5" opacity={opacity * 0.6} />
            </g>
          );
        })}

        {/* Center — source */}
        <circle cx="0" cy="0" r="12" fill="none" stroke="white" strokeWidth="2" opacity={opacity} filter="url(#glow)" />
        <circle cx="0" cy="0" r="6" fill="white" opacity={opacity * 1.2} />
        <circle cx="0" cy="0" r="3" fill="white" opacity={1} />

        {/* Outer dodecagon frame */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const nextRad = ((angle + 30) * Math.PI) / 180;
          return (
            <g key={`frame-${i}`}>
              <circle cx={Math.cos(rad) * 420} cy={Math.sin(rad) * 420} r="8" fill="none" stroke="white" strokeWidth="1" opacity={opacity * 0.5} />
              <line
                x1={Math.cos(rad) * 420}
                y1={Math.sin(rad) * 420}
                x2={Math.cos(nextRad) * 420}
                y2={Math.sin(nextRad) * 420}
                stroke="white"
                strokeWidth="0.5"
                opacity={opacity * 0.3}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
