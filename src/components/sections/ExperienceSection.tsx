import { EXPERIENCE_DATA } from "@/data/experience";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { ExperienceHeadingInView } from "@/components/sections/ExperienceHeadingInView";

export function ExperienceSection(): React.JSX.Element {
  return (
    <section id="experience" className="relative py-20 px-6 bg-[#0a0a0a]">
      <div className="relative z-10 max-w-5xl mx-auto">
        <ExperienceHeadingInView>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-white/20" />
            <h2 className="text-sm tracking-[0.2em] text-white/60 font-mono">
              JOURNEY
            </h2>
          </div>
          <h3 className="text-4xl tracking-[0.1em] font-bold font-display">
            EXPERIENCE
          </h3>
        </ExperienceHeadingInView>

        <div className="space-y-0">
          {EXPERIENCE_DATA.map((item, index) => (
            <TimelineItem key={item.company} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
