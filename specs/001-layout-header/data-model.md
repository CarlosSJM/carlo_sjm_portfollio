# Phase 1: Data Model — Global Layout and Header

> Entidades typed que viven en `src/types/index.ts` y `src/data/`.

## Types (`src/types/index.ts`)

### `NavLink`

```ts
export interface NavLink {
  /** Display text (e.g., "Projects") */
  readonly label: string;
  /** In-page anchor href (e.g., "#projects") */
  readonly href: `#${string}`;
}
```

**Validation**:
- `label` non-empty string
- `href` MUST start with `#`

### `SiteConfig`

```ts
export interface SiteConfig {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly location: string;
  readonly url: string;
  readonly defaultTitle: string;
  readonly defaultDescription: string;
  readonly ogImagePath: `/${string}`;
}
```

**Validation**:
- `defaultTitle` length 50–60 (SEO best practice)
- `defaultDescription` length 150–160
- `ogImagePath` MUST be a root-relative path
- `url` MUST be a valid URL (http or https) — checked at module load via `new URL()` parse

### `PersonSchemaData`

```ts
export interface PersonSchemaData {
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly string[];
}
```

**Validation**:
- `sameAs` may be empty (placeholders for LinkedIn/GitHub TBD per task #23)
- `knowsAbout` is the curated list of headline technologies (e.g., "Next.js", "TypeScript", "Node.js")

## Data (`src/data/navigation.ts`)

```ts
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
```

## Site Constant (`src/lib/site.ts`)

```ts
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
```

**Note**: `defaultTitle` is 60 chars exactly; `defaultDescription` is 158 chars — within SEO sweet spot.

## Person Schema Data (used inside `src/lib/schema.ts`)

```ts
const PERSON_DATA: PersonSchemaData = {
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  sameAs: [
    // placeholders until task #23 — will be replaced with real URLs
    "https://github.com/TU-USER",
    "https://linkedin.com/in/TU-USER",
  ],
  knowsAbout: [
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "NestJS",
    "Angular",
    "Java Spring",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
  ],
};
```

## Relationships

```
SITE  ──provides url──▶  buildPersonSchema()  ──emits──▶  Person JSON-LD
SITE  ──provides url+name──▶  buildWebSiteSchema()  ──emits──▶  WebSite JSON-LD
SITE  ──provides title/desc/og──▶  buildMetadata()  ──emits──▶  Next.js Metadata object

NAV_LINKS  ──read by──▶  Header component
```

## State transitions

None — this feature has no mutable state at runtime. All values are immutable constants resolved at build time (SSG).
