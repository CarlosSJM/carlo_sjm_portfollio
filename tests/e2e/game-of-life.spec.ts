import { test, expect } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" } });

test.describe("Game of Life section", () => {
  test('section has id="gameoflife"', async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("section#gameoflife")).toBeVisible();
  });

  test('eyebrow "INTERACTIVE" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    const eyebrow = page.locator("#gameoflife h2");
    await expect(eyebrow).toBeVisible();
    await expect(eyebrow).toContainText("INTERACTIVE");
  });

  test('heading "CONWAY\'S GAME OF LIFE" is visible', async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "CONWAY'S GAME OF LIFE" })
    ).toBeVisible();
  });

  test("canvas grid loads and is clickable to toggle a cell", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    const canvas = page.locator("#gameoflife canvas");
    await expect(canvas).toBeVisible();

    await expect(page.locator("#gameoflife")).toContainText("POPULATION: 0");
    await canvas.click({ position: { x: 5, y: 5 } });
    await expect(page.locator("#gameoflife")).toContainText("POPULATION: 1");
  });

  test("Play advances generations automatically, Pause stops it", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    await expect(page.locator("#gameoflife")).toContainText("GENERATION: 0");

    await page.getByRole("button", { name: "PLAY" }).click();
    await expect(page.locator("#gameoflife")).not.toContainText("GENERATION: 0");

    await page.getByRole("button", { name: "PAUSE" }).click();
    const generationText = await page
      .locator("#gameoflife")
      .getByText(/GENERATION:/)
      .textContent();
    await page.waitForTimeout(300);
    await expect(page.locator("#gameoflife").getByText(/GENERATION:/)).toHaveText(
      generationText ?? ""
    );
  });

  test("Randomize seeds a population, Reset clears it", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Randomize grid" }).click();
    await expect(page.locator("#gameoflife")).not.toContainText("POPULATION: 0");

    await page.getByRole("button", { name: "Reset grid" }).click();
    await expect(page.locator("#gameoflife")).toContainText("POPULATION: 0");
    await expect(page.locator("#gameoflife")).toContainText("GENERATION: 0");
  });

  test("Glider and Pulsar presets load a non-empty pattern", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "GLIDER" }).click();
    await expect(page.locator("#gameoflife")).not.toContainText("POPULATION: 0");

    await page.getByRole("button", { name: "PULSAR" }).click();
    await expect(page.locator("#gameoflife")).not.toContainText("POPULATION: 0");
  });

  test("speed slider updates the displayed gen/s label", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    const speedLabel = page.locator("#gameoflife").getByText(/SPEED:/);
    const before = await speedLabel.textContent();

    const speedSlider = page.locator('#gameoflife input[type="range"]').first();
    await speedSlider.fill("500");

    await expect(speedLabel).not.toHaveText(before ?? "");
  });

  test("cell size slider updates the displayed cell size label", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    const cellSizeLabel = page.locator("#gameoflife").getByText(/CELL SIZE:/);
    await expect(cellSizeLabel).toContainText("8px");

    const cellSizeSlider = page.locator('#gameoflife input[type="range"]').nth(1);
    await cellSizeSlider.fill("16");

    await expect(cellSizeLabel).toContainText("16px");
  });

  test.describe("responsive layout", () => {
    test("no horizontal overflow at 375px", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("/");
      await page.locator("#gameoflife").scrollIntoViewIfNeeded();
      const box = await page.locator("#gameoflife").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(375);
    });

    test("no horizontal overflow at 768px", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto("/");
      await page.locator("#gameoflife").scrollIntoViewIfNeeded();
      const box = await page.locator("#gameoflife").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(768);
    });

    test("no horizontal overflow at 1280px", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto("/");
      await page.locator("#gameoflife").scrollIntoViewIfNeeded();
      const box = await page.locator("#gameoflife").boundingBox();
      expect(box?.width).toBeLessThanOrEqual(1280);
    });

    test("click-to-toggle maps to the correct cell at a narrow viewport (scaled canvas)", async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto("/");
      await page.locator("#gameoflife").scrollIntoViewIfNeeded();
      const canvas = page.locator("#gameoflife canvas");
      await canvas.click({ position: { x: 5, y: 5 } });
      await expect(page.locator("#gameoflife")).toContainText("POPULATION: 1");
    });
  });

  test("content visible after scrolling into view", async ({ page }) => {
    await page.goto("/");
    await page.locator("#gameoflife").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("heading", { name: "CONWAY'S GAME OF LIFE" })
    ).toBeVisible();
    await expect(page.locator("#gameoflife canvas")).toBeVisible();
  });
});
