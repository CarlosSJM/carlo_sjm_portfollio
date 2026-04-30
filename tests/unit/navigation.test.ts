import { describe, it, expect } from "vitest";
import { NAV_LINKS } from "@/data/navigation";

describe("NAV_LINKS", () => {
  it("is non-empty", () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty label", () => {
    for (const link of NAV_LINKS) {
      expect(link.label).toBeTruthy();
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it("every entry has an href starting with #", () => {
    for (const link of NAV_LINKS) {
      expect(link.href.startsWith("#")).toBe(true);
    }
  });

  it("hrefs are unique", () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("labels are unique", () => {
    const labels = NAV_LINKS.map((l) => l.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("includes the contact section", () => {
    const hrefs = NAV_LINKS.map((l) => l.href);
    expect(hrefs).toContain("#contact");
  });
});
