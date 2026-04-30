import { SITE } from "@/lib/site";

const PLACEHOLDER_SECTIONS = [
  "about",
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
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display font-bold text-5xl md:text-7xl tracking-[0.15em] mb-6">
            {SITE.name.toUpperCase()}
          </h1>
          <p className="font-mono text-sm tracking-[0.2em] text-white/60 mb-2">
            {SITE.role.toUpperCase()}
          </p>
          <p className="font-body text-lg text-white/60 tracking-wide">
            {SITE.tagline}
          </p>
        </div>
      </section>

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
