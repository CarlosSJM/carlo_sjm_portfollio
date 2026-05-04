import { describe, it, expect } from "vitest";
import { HERO_DATA } from "@/data/hero";

describe("HERO_DATA", () => {
  it("has required string fields that are non-empty", () => {
    expect(HERO_DATA.name.length).toBeGreaterThan(0);
    expect(HERO_DATA.role.length).toBeGreaterThan(0);
    expect(HERO_DATA.tagline.length).toBeGreaterThan(0);
    expect(HERO_DATA.location.length).toBeGreaterThan(0);
  });

  it("ctaPrimary links to #projects", () => {
    expect(HERO_DATA.ctaPrimary.href).toBe("#projects");
    expect(HERO_DATA.ctaPrimary.label.length).toBeGreaterThan(0);
  });

  it("ctaSecondary links to #contact", () => {
    expect(HERO_DATA.ctaSecondary.href).toBe("#contact");
    expect(HERO_DATA.ctaSecondary.label.length).toBeGreaterThan(0);
  });

  it("scrollTarget links to #about", () => {
    expect(HERO_DATA.scrollTarget).toBe("#about");
  });

  it("all hrefs start with #", () => {
    expect(HERO_DATA.ctaPrimary.href.startsWith("#")).toBe(true);
    expect(HERO_DATA.ctaSecondary.href.startsWith("#")).toBe(true);
    expect(HERO_DATA.scrollTarget.startsWith("#")).toBe(true);
  });
});
