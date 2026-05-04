import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";

const PLACEHOLDER_SECTIONS = [
  "skills",
  "experience",
  "projects",
  "education",
  "gameoflife",
  "contact",
] as const;

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />

      {PLACEHOLDER_SECTIONS.map((id) => (
        <section
          key={id}
          id={id}
          className="relative min-h-[60vh] flex items-center justify-center px-6 border-t border-white/5"
        >
          <p className="font-mono text-xs tracking-[0.2em] text-white/30 uppercase">
            {id} — coming soon
          </p>
        </section>
      ))}
    </>
  );
}
