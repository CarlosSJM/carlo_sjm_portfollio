import { test, expect } from "@playwright/test";

const NAV_ANCHORS = [
  "#about",
  "#skills",
  "#experience",
  "#projects",
  "#education",
  "#gameoflife",
  "#contact",
] as const;

test.describe("Anchor navigation", () => {
  test("each section ID has a matching DOM target", async ({ page }) => {
    await page.goto("/");
    for (const anchor of NAV_ANCHORS) {
      const id = anchor.slice(1);
      const target = page.locator(`section#${id}`);
      await expect(target).toBeAttached();
    }
  });

  test("clicking a nav link updates the URL hash", async ({ page }) => {
    await page.goto("/");
    const aboutLink = page.locator('header nav a[href="#about"]');
    await aboutLink.click();
    await expect(page).toHaveURL(/#about$/);
  });

  test("loading a section URL directly works without errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    const response = await page.goto("/#projects");
    expect(response?.status()).toBe(200);
    expect(consoleErrors).toEqual([]);
  });
});

test.describe("sitemap and robots", () => {
  test("/sitemap.xml is served with valid XML", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("<?xml");
    expect(body).toContain("<urlset");
  });

  test("/robots.txt is served with allow rule", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body.toLowerCase()).toContain("user-agent");
    expect(body.toLowerCase()).toContain("allow");
    expect(body.toLowerCase()).toContain("sitemap");
  });
});
