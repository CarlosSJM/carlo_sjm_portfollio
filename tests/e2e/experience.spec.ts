import { test, expect } from "@playwright/test";

test.describe("Experience section", () => {
  test('section has id="experience"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#experience")).toBeVisible();
  });

  test('eyebrow "JOURNEY" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator("#experience h2")).toContainText("JOURNEY");
  });

  test('heading "EXPERIENCE" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "EXPERIENCE", exact: true })
    ).toBeVisible();
  });

  test("all 4 company names are visible", async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    const companies = ["BravePay", "ICARUS", "Ust-Global", "Datmean"];
    for (const company of companies) {
      await expect(
        page.locator("#experience").getByText(company, { exact: true })
      ).toBeVisible();
    }
  });

  test("known tech tags are visible within their item", async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(page.locator("#experience").getByText("Next.js", { exact: true })).toBeVisible();
    await expect(page.locator("#experience").getByText("Kubernetes", { exact: true })).toBeVisible();
    await expect(page.locator("#experience").getByText("PostgreSQL", { exact: true })).toBeVisible();
    await expect(page.locator("#experience").getByText("Material UI", { exact: true })).toBeVisible();
  });

  test("timeline markers are aria-hidden", async ({ page }) => {
    await page.goto("/");
    const hiddenMarkers = page.locator('#experience [aria-hidden="true"]');
    expect(await hiddenMarkers.count()).toBeGreaterThanOrEqual(4);
  });

  test.describe("responsive layout", () => {
    // Scoped to #experience's own bounding box (not document-wide scrollWidth),
    // matching the approach in skills.spec.ts — an unrelated pre-existing
    // overflow in Hero/About backgrounds is tracked separately in docs/roadmap.md.
    test("no horizontal overflow at 375px", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("/");
      await page.locator("#experience").scrollIntoViewIfNeeded();
      const box = await page.locator("#experience").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test("no horizontal overflow at 768px", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/");
      await page.locator("#experience").scrollIntoViewIfNeeded();
      const box = await page.locator("#experience").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(768);
    });

    test("no horizontal overflow at 1280px", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto("/");
      await page.locator("#experience").scrollIntoViewIfNeeded();
      const box = await page.locator("#experience").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(1280);
    });
  });

  test("content visible after scrolling into view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "EXPERIENCE", exact: true })
    ).toBeVisible();
    await expect(
      page.locator("#experience").getByText("BravePay", { exact: true })
    ).toBeVisible();
  });
});
