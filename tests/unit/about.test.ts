import { describe, it, expect } from "vitest";
import { ABOUT_DATA } from "@/data/about";

describe("ABOUT_DATA", () => {
  it("has required string fields that are non-empty", () => {
    expect(ABOUT_DATA.eyebrow.length).toBeGreaterThan(0);
    expect(ABOUT_DATA.heading.length).toBeGreaterThan(0);
  });

  it("has bio array with 3 non-empty strings", () => {
    expect(ABOUT_DATA.bio).toHaveLength(3);
    ABOUT_DATA.bio.forEach((paragraph) => {
      expect(paragraph.length).toBeGreaterThan(0);
    });
  });

  it("bio[2] contains 'Segovia' not 'Madrid'", () => {
    expect(ABOUT_DATA.bio[2]).toContain("Segovia");
    expect(ABOUT_DATA.bio[2]).not.toContain("Madrid");
  });
});
