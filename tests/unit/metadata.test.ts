import { describe, it, expect } from "vitest";
import { buildMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

describe("buildMetadata", () => {
  it("returns default title and description from SITE", () => {
    const meta = buildMetadata();
    expect(meta.title).toEqual({
      default: SITE.defaultTitle,
      template: `%s — ${SITE.name}`,
    });
    expect(meta.description).toBe(SITE.defaultDescription);
  });

  it("returns canonical pointing to root", () => {
    const meta = buildMetadata();
    expect(meta.alternates?.canonical).toBe("/");
  });

  it("returns metadataBase as a URL", () => {
    const meta = buildMetadata();
    expect(meta.metadataBase).toBeInstanceOf(URL);
    expect(meta.metadataBase?.toString()).toContain(new URL(SITE.url).origin);
  });

  it("returns Open Graph with image 1200x630", () => {
    const meta = buildMetadata();
    const og = meta.openGraph as Record<string, unknown> | undefined;
    expect(og?.["type"]).toBe("website");
    expect(og?.["title"]).toBe(SITE.defaultTitle);
    expect(og?.["description"]).toBe(SITE.defaultDescription);
    expect(og?.["siteName"]).toBe(SITE.name);
    const images = og?.["images"];
    const image = Array.isArray(images) ? images[0] : images;
    if (typeof image !== "object" || image === null) {
      throw new Error("Expected OG image object");
    }
    const imageObj = image as { width?: number; height?: number };
    expect(imageObj.width).toBe(1200);
    expect(imageObj.height).toBe(630);
  });

  it("returns Twitter card summary_large_image", () => {
    const meta = buildMetadata();
    const tw = meta.twitter as Record<string, unknown> | undefined;
    expect(tw?.["card"]).toBe("summary_large_image");
    expect(tw?.["title"]).toBe(SITE.defaultTitle);
    expect(tw?.["description"]).toBe(SITE.defaultDescription);
  });

  it("supports overriding title and description per page", () => {
    const meta = buildMetadata({
      title: "Projects",
      description: "Selected projects",
    });
    expect(meta.title).toBe("Projects");
    expect(meta.description).toBe("Selected projects");
    // Defaults preserved for other fields
    expect(meta.alternates?.canonical).toBe("/");
  });
});
