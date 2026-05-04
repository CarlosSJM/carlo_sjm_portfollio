interface SpiralPetalsProps {
  opacity?: number;
}

export function SpiralPetals({ opacity = 0.1 }: SpiralPetalsProps): React.JSX.Element {
  const numPetals = 8;
  const numLinesPerPetal = 15;
  const spiralTurns = 3;

  const generateSpiralPetal = (petalIndex: number) => {
    const baseAngle = (petalIndex * 360) / numPetals;
    const paths = [];

    for (let i = 0; i < numLinesPerPetal; i++) {
      const t = i / numLinesPerPetal;
      const angle = baseAngle + t * 360 * spiralTurns;
      const rad = (angle * Math.PI) / 180;

      const points: string[] = [];
      for (let j = 0; j <= 20; j++) {
        const s = j / 20;
        const r = 50 + s * 300 * (1 - t * 0.3);
        const a = rad + s * Math.PI * 0.8 - Math.PI * 0.4;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        points.push(`${x},${y}`);
      }

      paths.push(
        <path
          key={`petal-${petalIndex}-${i}`}
          d={`M ${points.join(" L ")}`}
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          opacity={opacity * (0.3 + t * 0.7)}
        />
      );
    }

    return paths;
  };

  const generateSpiralLines = () => {
    const lines = [];
    const numSpirals = 40;

    for (let i = 0; i < numSpirals; i++) {
      const t = i / numSpirals;
      const angle = t * 360 * 5;
      const rad = (angle * Math.PI) / 180;

      const points: string[] = [];
      for (let j = 0; j <= 30; j++) {
        const s = j / 30;
        const r = s * 350;
        const a = rad + s * Math.PI * 10;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        points.push(`${x},${y}`);
      }

      lines.push(
        <path
          key={`spiral-${i}`}
          d={`M ${points.join(" L ")}`}
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity={opacity * 0.6}
        />
      );
    }

    return lines;
  };

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 w-full h-full animate-slow-rotate pointer-events-none select-none"
      viewBox="-500 -500 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="spiral-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#spiral-glow)">
        {Array.from({ length: numPetals }, (_, i) => generateSpiralPetal(i))}
        {generateSpiralLines()}
        {[50, 100, 150, 200, 250, 300, 350].map((r, i) => (
          <circle
            key={`circle-${i}`}
            cx="0"
            cy="0"
            r={r}
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            opacity={opacity * 0.4}
            strokeDasharray="10,10"
          />
        ))}
        {Array.from({ length: numPetals }, (_, i) => {
          const angle = (i * 360) / numPetals;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 380;
          const y = Math.sin(rad) * 380;
          return (
            <line
              key={`radial-${i}`}
              x1="0"
              y1="0"
              x2={x}
              y2={y}
              stroke="white"
              strokeWidth="0.5"
              opacity={opacity * 0.3}
            />
          );
        })}
        <circle cx="0" cy="0" r="15" fill="none" stroke="white" strokeWidth="2" opacity={opacity} />
        <circle cx="0" cy="0" r="8" fill="white" opacity={opacity * 0.8} />
        <circle cx="0" cy="0" r="3" fill="white" opacity="1" />
      </g>
    </svg>
  );
}
