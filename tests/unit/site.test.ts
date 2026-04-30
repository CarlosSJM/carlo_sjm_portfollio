import { describe, it, expect } from "vitest";
import { SITE } from "@/lib/site";

describe("SITE config", () => {
  it("has all required fields", () => {
    expect(SITE.name).toBeTruthy();
    expect(SITE.role).toBeTruthy();
    expect(SITE.tagline).toBeTruthy();
    expect(SITE.location).toBeTruthy();
    expect(SITE.url).toBeTruthy();
    expect(SITE.defaultTitle).toBeTruthy();
    expect(SITE.defaultDescription).toBeTruthy();
    expect(SITE.ogImagePath).toBeTruthy();
  });

  it("defaultTitle length is between 50 and 60 chars (SEO sweet spot)", () => {
    expect(SITE.defaultTitle.length).toBeGreaterThanOrEqual(50);
    expect(SITE.defaultTitle.length).toBeLessThanOrEqual(60);
  });

  it("defaultDescription length is between 150 and 160 chars (SEO sweet spot)", () => {
    expect(SITE.defaultDescription.length).toBeGreaterThanOrEqual(150);
    expect(SITE.defaultDescription.length).toBeLessThanOrEqual(160);
  });

  it("url is a valid URL", () => {
    expect(() => new URL(SITE.url)).not.toThrow();
  });

  it("ogImagePath is root-relative", () => {
    expect(SITE.ogImagePath.startsWith("/")).toBe(true);
  });
});
