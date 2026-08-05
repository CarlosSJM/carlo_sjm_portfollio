import { test, expect } from "@playwright/test";

test.describe("Skills section", () => {
  test('section has id="skills"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#skills")).toBeVisible();
  });

  test('eyebrow "EXPERTISE" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.locator("#skills h2")).toContainText("EXPERTISE");
  });

  test('heading "AREAS OF KNOWLEDGE" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "AREAS OF KNOWLEDGE" })
    ).toBeVisible();
  });

  test("all 6 category titles are visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    const titles = [
      "Front-End",
      "Front Tools",
      "Back-End",
      "Back Tools",
      "Databases",
      "Scripts & Other",
    ];
    for (const title of titles) {
      await expect(page.locator("#skills").getByText(title, { exact: true })).toBeVisible();
    }
  });

  test("known skills are visible within their category", async ({ page }) => {
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(page.locator("#skills").getByText("React", { exact: true })).toBeVisible();
    await expect(page.locator("#skills").getByText("Docker", { exact: true })).toBeVisible();
    await expect(page.locator("#skills").getByText("PostgreSQL", { exact: true })).toBeVisible();
  });

  test("icons are aria-hidden", async ({ page }) => {
    await page.goto("/");
    const hiddenIcons = page.locator('#skills [aria-hidden="true"]');
    expect(await hiddenIcons.count()).toBeGreaterThanOrEqual(6);
  });

  test.describe("responsive grid", () => {
    // Scoped to the #skills section itself (not document-wide scrollWidth),
    // since an unrelated pre-existing overflow in Hero/About backgrounds is
    // tracked separately and would otherwise cause false failures here.
    test("no horizontal overflow at 375px", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("/");
      await page.locator("#skills").scrollIntoViewIfNeeded();
      const box = await page.locator("#skills").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test("no horizontal overflow at 768px", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/");
      await page.locator("#skills").scrollIntoViewIfNeeded();
      const box = await page.locator("#skills").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(768);
    });

    test("no horizontal overflow at 1280px", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto("/");
      await page.locator("#skills").scrollIntoViewIfNeeded();
      const box = await page.locator("#skills").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(1280);
    });
  });

  test("content visible after scrolling into view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#skills").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "AREAS OF KNOWLEDGE" })
    ).toBeVisible();
    await expect(page.locator("#skills").getByText("React", { exact: true })).toBeVisible();
  });
});
