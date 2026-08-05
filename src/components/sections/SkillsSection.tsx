import { SKILLS_DATA } from "@/data/skills";
import { SkillCard } from "@/components/ui/SkillCard";
import { SkillsHeadingInView } from "@/components/sections/SkillsHeadingInView";

export function SkillsSection(): React.JSX.Element {
  return (
    <section id="skills" className="relative py-20 px-6 bg-black">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SkillsHeadingInView>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-white/20" />
            <h2 className="text-sm tracking-[0.2em] text-white/60 font-mono">
              EXPERTISE
            </h2>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h3 className="text-4xl tracking-[0.1em] font-bold font-display">
            AREAS OF KNOWLEDGE
          </h3>
        </SkillsHeadingInView>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS_DATA.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
