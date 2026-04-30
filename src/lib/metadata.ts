import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const base: Metadata = {
    title: {
      default: SITE.defaultTitle,
      template: `%s — ${SITE.name}`,
    },
    description: SITE.defaultDescription,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      url: SITE.url,
      siteName: SITE.name,
      images: [
        {
          url: SITE.ogImagePath,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.defaultTitle,
      description: SITE.defaultDescription,
      images: [SITE.ogImagePath],
    },
    robots: {
      index: true,
      follow: true,
    },
  };

  return { ...base, ...overrides };
}
