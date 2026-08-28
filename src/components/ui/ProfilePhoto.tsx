import Image from "next/image";

interface ProfilePhotoProps {
  readonly src: `/${string}`;
  readonly alt: string;
}

export function ProfilePhoto({ src, alt }: ProfilePhotoProps): React.JSX.Element {
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
        className="absolute inset-0 overflow-hidden bg-[#1a1a1a]"
        style={{ clipPath: "circle(40% at 50% 50%)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 320px, 256px"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
