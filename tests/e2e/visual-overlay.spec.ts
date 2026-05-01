import { test, expect } from "@playwright/test";

test.describe("Visual identity overlays", () => {
  test("FilmGrain element is present, aria-hidden, and pointer-events-none", async ({ page }) => {
    await page.goto("/");
    const grain = page.locator('div[aria-hidden="true"].fixed.inset-0');
    await expect(grain).toHaveCount(1);

    const pointerEvents = await grain.evaluate(
      (el) => window.getComputedStyle(el).pointerEvents,
    );
    expect(pointerEvents).toBe("none");

    const zIndex = await grain.evaluate((el) =>
      Number(window.getComputedStyle(el).zIndex),
    );
    expect(zIndex).toBeGreaterThanOrEqual(50);
  });

  test("FilmGrain has a background-image (inline SVG noise)", async ({ page }) => {
    await page.goto("/");
    const grain = page.locator('div[aria-hidden="true"].fixed.inset-0').first();
    const bg = await grain.evaluate(
      (el) => window.getComputedStyle(el).backgroundImage,
    );
    expect(bg.startsWith("url(")).toBe(true);
    expect(bg).toContain("data:image/svg+xml");
  });

  test("body has crosshair cursor", async ({ page }) => {
    await page.goto("/");
    const cursor = await page.evaluate(
      () => window.getComputedStyle(document.body).cursor,
    );
    expect(cursor).toBe("crosshair");
  });

  test("nav links have pointer cursor", async ({ page }) => {
    await page.goto("/");
    const cursor = await page.evaluate(() => {
      const link = document.querySelector("header nav a");
      if (!link) return null;
      return window.getComputedStyle(link).cursor;
    });
    expect(cursor).toBe("pointer");
  });
});
