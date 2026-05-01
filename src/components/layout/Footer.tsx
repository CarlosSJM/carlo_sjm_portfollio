import { SITE } from "@/lib/site";

export function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-black px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-xs font-mono tracking-wider">
          © {year} {SITE.name.toUpperCase()}
        </p>
        <p className="text-white/40 text-xs font-mono tracking-wider">
          DESIGNED WITH PRECISION · BUILT WITH PASSION
        </p>
      </div>
    </footer>
  );
}
