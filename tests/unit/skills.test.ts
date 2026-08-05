import { describe, it, expect } from "vitest";
import { SKILLS_DATA } from "@/data/skills";

describe("SKILLS_DATA", () => {
  it("has exactly 6 categories", () => {
    expect(SKILLS_DATA).toHaveLength(6);
  });

  it("each category has a non-empty title and iconName", () => {
    SKILLS_DATA.forEach((category) => {
      expect(category.title.length).toBeGreaterThan(0);
      expect(category.iconName.length).toBeGreaterThan(0);
    });
  });

  it("each category has a non-empty skills array", () => {
    SKILLS_DATA.forEach((category) => {
      expect(category.skills.length).toBeGreaterThan(0);
      category.skills.forEach((skill) => {
        expect(skill.length).toBeGreaterThan(0);
      });
    });
  });

  it("categories are in the expected order", () => {
    const titles = SKILLS_DATA.map((c) => c.title);
    expect(titles).toEqual([
      "Front-End",
      "Front Tools",
      "Back-End",
      "Back Tools",
      "Databases",
      "Scripts & Other",
    ]);
  });
});
