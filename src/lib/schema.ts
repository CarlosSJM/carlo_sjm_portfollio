import { SITE } from "@/lib/site";
import type { PersonSchemaData } from "@/types";

const PERSON_DATA: PersonSchemaData = {
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  sameAs: [
    // TODO: replace with real URLs (task #23)
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

export interface PersonSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "Person";
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly string[];
}

export interface WebSiteSchema {
  readonly "@context": "https://schema.org";
  readonly "@type": "WebSite";
  readonly name: string;
  readonly url: string;
}

export function buildPersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_DATA.name,
    jobTitle: PERSON_DATA.jobTitle,
    url: PERSON_DATA.url,
    sameAs: PERSON_DATA.sameAs,
    knowsAbout: PERSON_DATA.knowsAbout,
  };
}

export function buildWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  };
}
