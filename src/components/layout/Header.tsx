import Link from "next/link";
import { NAV_LINKS } from "@/data/navigation";
import { SITE } from "@/lib/site";

export function Header(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-black/60 border-b border-white/10">
      <nav
        aria-label="Main"
        className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8"
      >
        <Link
          href="/"
          className="font-display font-bold text-sm tracking-[0.2em] text-white whitespace-nowrap"
          aria-label={`${SITE.name} — Home`}
        >
          {SITE.name.split(" ").map((w) => w[0]).join("")}
        </Link>
        <ul className="flex items-center gap-6 flex-wrap">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
              >
                {link.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
