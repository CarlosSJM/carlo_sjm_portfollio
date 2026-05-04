import { ABOUT_DATA } from "@/data/about";
import { SpiralPetals } from "@/components/ui/geometry/SpiralPetals";
import { GridOverlay } from "@/components/ui/geometry/GridOverlay";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { AboutInView } from "@/components/sections/AboutInView";

export function AboutSection(): React.JSX.Element {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center py-20 px-6 bg-[#0d0d0d]"
    >
      <SpiralPetals opacity={0.2} />
      <GridOverlay />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <AboutInView>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <PhotoPlaceholder />
            </div>

            <div>
              <AboutInView slideX>
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px w-12 bg-white/20" />
                    <h2 className="text-sm tracking-[0.2em] text-white/60 font-mono">
                      {ABOUT_DATA.eyebrow}
                    </h2>
                  </div>
                  <h3 className="text-4xl mb-6 tracking-[0.1em] font-bold font-display">
                    {ABOUT_DATA.heading}
                  </h3>
                </div>

                <div className="space-y-4 text-[#A0A0A0] leading-relaxed">
                  {ABOUT_DATA.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </AboutInView>
            </div>
          </div>
        </AboutInView>
      </div>
    </section>
  );
}
