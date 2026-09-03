export interface NavLink {
  readonly label: string;
  readonly href: `#${string}`;
}

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

export interface CtaLink {
  readonly label: string;
  readonly href: `#${string}`;
}

export interface HeroData {
  readonly name: string;
  readonly role: string;
  readonly tagline: string;
  readonly location: string;
  readonly ctaPrimary: CtaLink;
  readonly ctaSecondary: CtaLink;
  readonly scrollTarget: `#${string}`;
}

export interface AboutData {
  readonly eyebrow: string;
  readonly heading: string;
  readonly bio: readonly [string, string, string];
  readonly photoSrc: `/${string}`;
  readonly photoAlt: string;
}

export interface SkillCategory {
  readonly title: string;
  readonly iconName: "Layout" | "Settings" | "Server" | "Terminal" | "Database" | "Code2";
  readonly skills: readonly string[];
}

export interface ExperienceItem {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly description: string;
  readonly technologies: readonly string[];
}

export interface GameOfLifeData {
  readonly eyebrow: string;
  readonly heading: string;
  readonly description: string;
}

export interface PersonSchemaData {
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly string[];
}
