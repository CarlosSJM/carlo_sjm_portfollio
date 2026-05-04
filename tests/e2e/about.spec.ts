import { test, expect } from "@playwright/test";

test.describe("About section", () => {
  test('section has id="about"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#about")).toBeVisible();
  });

  test('eyebrow "ABOUT" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    const eyebrow = page.locator("#about h2");
    await expect(eyebrow).toBeVisible();
    await expect(eyebrow).toContainText("ABOUT");
  });

  test('heading "From Nature to Code" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "From Nature to Code" })).toBeVisible();
  });

  test("3 bio paragraphs are visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    const paragraphs = page.locator("#about .space-y-4 p");
    expect(await paragraphs.count()).toBe(3);
  });

  test("background SVGs are aria-hidden", async ({ page }) => {
    await page.goto("/");
    const ariaHidden = page.locator('#about [aria-hidden="true"]');
    expect(await ariaHidden.count()).toBeGreaterThanOrEqual(1);
  });

  test("photo placeholder is visible with accessible label", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    const placeholder = page.getByRole("img", { name: "Profile photo placeholder" });
    await expect(placeholder).toBeVisible();
  });

  test("content is visible after scrolling into view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "From Nature to Code" })).toBeVisible();
    const paragraphs = page.locator("#about .space-y-4 p");
    expect(await paragraphs.count()).toBe(3);
  });
});
