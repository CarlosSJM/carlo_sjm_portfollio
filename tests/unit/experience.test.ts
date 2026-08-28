import { describe, it, expect } from "vitest";
import { EXPERIENCE_DATA } from "@/data/experience";

describe("EXPERIENCE_DATA", () => {
  it("has exactly 4 items", () => {
    expect(EXPERIENCE_DATA).toHaveLength(4);
  });

  it("each item has non-empty company, role, period, description", () => {
    EXPERIENCE_DATA.forEach((item) => {
      expect(item.company.length).toBeGreaterThan(0);
      expect(item.role.length).toBeGreaterThan(0);
      expect(item.period.length).toBeGreaterThan(0);
      expect(item.description.length).toBeGreaterThan(0);
    });
  });

  it("each item has a non-empty technologies array", () => {
    EXPERIENCE_DATA.forEach((item) => {
      expect(item.technologies.length).toBeGreaterThan(0);
      item.technologies.forEach((tech) => {
        expect(tech.length).toBeGreaterThan(0);
      });
    });
  });

  it("items are in the expected reverse-chronological order", () => {
    const companies = EXPERIENCE_DATA.map((item) => item.company);
    expect(companies).toEqual(["BravePay", "ICARUS", "Ust-Global", "Datmean"]);
  });
});
