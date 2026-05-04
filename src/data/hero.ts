import type { HeroData } from "@/types";

export const HERO_DATA: HeroData = {
  name: "CARLOS SJM",
  role: "FULL STACK DEVELOPER",
  tagline: "From biology to code — building end-to-end digital experiences",
  location: "Segovia",
  ctaPrimary: { label: "VIEW PROJECTS", href: "#projects" },
  ctaSecondary: { label: "CONTACT ME", href: "#contact" },
  scrollTarget: "#about",
} as const;
