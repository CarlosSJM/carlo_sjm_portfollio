import { MapPin } from "lucide-react";
import { HERO_DATA } from "@/data/hero";
import { GeometricDots } from "@/components/ui/geometry/GeometricDots";
import { FibonacciSpiral } from "@/components/ui/geometry/FibonacciSpiral";
import { HeroAnimations } from "@/components/ui/HeroAnimations";
import { ScrollChevron } from "@/components/layout/ScrollChevron";

export function HeroSection(): React.JSX.Element {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background geometry — matches Figma exactly */}
      <GeometricDots />
      <FibonacciSpiral opacity={0.35} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <HeroAnimations>
          <h1 className="font-display text-6xl md:text-8xl mb-6 tracking-[0.15em] font-bold">
            {HERO_DATA.name}
          </h1>

          <p className="text-[#A0A0A0] tracking-[0.2em] mb-2 text-sm md:text-base font-mono">
            {HERO_DATA.role}
          </p>

          <p className="text-white/60 text-lg md:text-xl mb-12 tracking-wide font-light">
            {HERO_DATA.tagline}
          </p>

          <div className="flex items-center justify-center gap-1 mb-12">
            <MapPin className="w-4 h-4 text-white/40" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-white/40 text-sm font-mono tracking-wider">
              {HERO_DATA.location}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={HERO_DATA.ctaPrimary.href}
              className="px-8 py-4 border border-white text-white tracking-[0.15em] text-sm hover:bg-white hover:text-black transition-all duration-300 font-display"
            >
              {HERO_DATA.ctaPrimary.label}
            </a>
            <a
              href={HERO_DATA.ctaSecondary.href}
              className="px-8 py-4 border border-white/30 text-white tracking-[0.15em] text-sm hover:border-white transition-all duration-300 font-display"
            >
              {HERO_DATA.ctaSecondary.label}
            </a>
          </div>
        </HeroAnimations>
      </div>

      <ScrollChevron
        href={HERO_DATA.scrollTarget}
        ariaLabel="Scroll to about section"
      />
    </section>
  );
}
