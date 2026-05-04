export function PhotoPlaceholder(): React.JSX.Element {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
      >
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          opacity="0.3"
          transform="rotate(90 100 100)"
        />
      </svg>

      <div
        role="img"
        aria-label="Profile photo placeholder"
        className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]"
        style={{ clipPath: "circle(40% at 50% 50%)" }}
      >
        <div className="text-white/20 text-sm font-mono tracking-widest text-center">
          PROFILE
          <br />
          IMAGE
        </div>
      </div>
    </div>
  );
}
