import type { NavLink } from "@/types";

export const NAV_LINKS: readonly NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Game of Life", href: "#gameoflife" },
  { label: "Contact", href: "#contact" },
] as const;
