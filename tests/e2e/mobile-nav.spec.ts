import { test, expect } from "@playwright/test";

test.describe("Mobile navigation", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test.describe("mobile viewport (375px)", () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test("hamburger button is visible, desktop nav is hidden", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
      const desktopNav = page.locator('nav[aria-label="Main"] > ul');
      await expect(desktopNav).toBeHidden();
    });

    test("clicking hamburger opens drawer with all nav links", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();

      const dialog = page.getByRole("dialog", { name: "Main menu" });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("link", { name: "ABOUT", exact: true })).toBeVisible();
      await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });

    test("clicking a nav link closes the drawer and navigates", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();
      await page
        .getByRole("dialog", { name: "Main menu" })
        .getByRole("link", { name: "ABOUT", exact: true })
        .click();

      await expect(page).toHaveURL(/#about/);
      await expect(page.getByRole("dialog")).toBeHidden();
    });

    test("pressing Escape closes the drawer and restores focus to toggle button", async ({ page }) => {
      await page.goto("/");
      const toggle = page.getByRole("button", { name: "Open menu" });
      await toggle.click();
      await expect(page.getByRole("dialog")).toBeVisible();

      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toBeHidden();
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    });

    test("focus is trapped inside the open drawer", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Open menu" }).click();

      const dialog = page.getByRole("dialog", { name: "Main menu" });
      const links = dialog.getByRole("link");
      const count = await links.count();
      expect(count).toBeGreaterThan(0);

      for (let i = 0; i < count + 1; i++) {
        await page.keyboard.press("Tab");
      }

      const focusedInDialog = await dialog.evaluate(
        (node, active) => node.contains(active),
        await page.evaluateHandle(() => document.activeElement)
      );
      expect(focusedInDialog).toBe(true);
    });
  });

  test.describe("desktop viewport (1280px)", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("desktop nav is visible, hamburger button is hidden", async ({ page }) => {
      await page.goto("/");
      const desktopNav = page.locator('nav[aria-label="Main"] > ul');
      await expect(desktopNav).toBeVisible();
      await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    });
  });
});
