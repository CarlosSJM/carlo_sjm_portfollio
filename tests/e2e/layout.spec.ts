import { test, expect } from "@playwright/test";

test.describe("Global layout", () => {
  test('html has lang="en"', async ({ page }) => {
    await page.goto("/");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");
  });

  test("page has a title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Carlos San Juan Martin/);
  });

  test("page has a meta description", async ({ page }) => {
    await page.goto("/");
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description).toBeTruthy();
    expect((description ?? "").length).toBeGreaterThanOrEqual(100);
  });

  test("renders header, main, footer landmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main#main")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test('nav has aria-label="Main"', async ({ page }) => {
    await page.goto("/");
    const nav = page.locator('nav[aria-label="Main"]');
    await expect(nav).toBeVisible();
  });

  test("footer contains copyright text", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toContainText("CARLOS SAN JUAN MARTIN");
  });

  test("Person and WebSite JSON-LD scripts are present", async ({ page }) => {
    await page.goto("/");
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const allContent: string[] = [];
    for (const script of scripts) {
      const text = await script.textContent();
      if (text) allContent.push(text);
    }
    const combined = allContent.join("\n");
    expect(combined).toContain('"@type":"Person"');
    expect(combined).toContain('"@type":"WebSite"');
  });

  test("skip-to-content link is the first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => document.activeElement?.textContent);
    expect(focused).toMatch(/skip to content/i);
  });

  test("Open Graph image tag is present", async ({ page }) => {
    await page.goto("/");
    const ogImage = await page.locator('meta[property="og:image"]').first().getAttribute("content");
    expect(ogImage).toBeTruthy();
  });
});
