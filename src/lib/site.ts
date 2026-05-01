import type { SiteConfig } from "@/types";

export const SITE: SiteConfig = {
  name: "Carlos San Juan Martin",
  role: "Full Stack Developer",
  tagline: "From biology to code — building end-to-end digital experiences",
  location: "Madrid",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultTitle: "Carlos San Juan Martin — Full Stack Developer in Madrid",
  defaultDescription:
    "Full Stack Developer with a biology background. Building scalable web apps with Next.js, TypeScript, NestJS, and modern infrastructure. Based in Madrid.",
  ogImagePath: "/og-image.png",
} as const;
