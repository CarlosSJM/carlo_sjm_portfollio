import { describe, it, expect } from "vitest";
import { buildPersonSchema, buildWebSiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

describe("buildPersonSchema", () => {
  it("returns valid Person JSON-LD", () => {
    const schema = buildPersonSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("Person");
    expect(schema["name"]).toBe(SITE.name);
    expect(schema["jobTitle"]).toBe(SITE.role);
    expect(schema["url"]).toBe(SITE.url);
  });

  it("includes sameAs as a string array", () => {
    const schema = buildPersonSchema();
    expect(Array.isArray(schema["sameAs"])).toBe(true);
  });

  it("includes knowsAbout with at least one technology", () => {
    const schema = buildPersonSchema();
    expect(Array.isArray(schema["knowsAbout"])).toBe(true);
    expect((schema["knowsAbout"] as readonly string[]).length).toBeGreaterThan(0);
  });

  it("is JSON-serializable", () => {
    expect(() => JSON.stringify(buildPersonSchema())).not.toThrow();
  });
});

describe("buildWebSiteSchema", () => {
  it("returns valid WebSite JSON-LD", () => {
    const schema = buildWebSiteSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("WebSite");
    expect(schema["name"]).toBe(SITE.name);
    expect(schema["url"]).toBe(SITE.url);
  });

  it("is JSON-serializable", () => {
    expect(() => JSON.stringify(buildWebSiteSchema())).not.toThrow();
  });
});
