import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { GameOfLifeSection } from "@/components/sections/GameOfLifeSection";

// Content-brief order: Hero, About, Skills, Experience, Projects, Education,
// Game of Life, Contact. Projects/Education aren't built yet, so their
// placeholders stay before GameOfLifeSection to preserve final section order.
const PRE_GAMEOFLIFE_PLACEHOLDERS = ["projects", "education"] as const;
const POST_GAMEOFLIFE_PLACEHOLDERS = ["contact"] as const;

function PlaceholderSection({ id }: { id: string }): React.JSX.Element {
  return (
    <section
      id={id}
      className="relative min-h-[60vh] flex items-center justify-center px-6 border-t border-white/5"
    >
      <p className="font-mono text-xs tracking-[0.2em] text-white/30 uppercase">
        {id} — coming soon
      </p>
    </section>
  );
}

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />

      {PRE_GAMEOFLIFE_PLACEHOLDERS.map((id) => (
        <PlaceholderSection key={id} id={id} />
      ))}

      <GameOfLifeSection />

      {POST_GAMEOFLIFE_PLACEHOLDERS.map((id) => (
        <PlaceholderSection key={id} id={id} />
      ))}
    </>
  );
}
