import type { SiteConfig } from "@/types";

export const SITE: SiteConfig = {
  name: "Carlos SJM",
  role: "Full Stack Developer",
  tagline: "From biology to code — building end-to-end digital experiences",
  location: "Segovia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  defaultTitle: "Carlos SJM — Full Stack Developer | React & Next.js",
  defaultDescription:
    "Full Stack Developer with a biology background. Building scalable web apps with Next.js, TypeScript, NestJS, and modern infrastructure. Based in Segovia.",
  ogImagePath: "/og-image.png",
} as const;
