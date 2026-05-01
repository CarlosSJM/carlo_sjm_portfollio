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

export interface PersonSchemaData {
  readonly name: string;
  readonly jobTitle: string;
  readonly url: string;
  readonly sameAs: readonly string[];
  readonly knowsAbout: readonly string[];
}
