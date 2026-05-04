import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test("renders h1 with name", async ({ page }) => {
    await page.goto("/");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("CARLOS SJM");
  });

  test("renders role text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("FULL STACK DEVELOPER")).toBeVisible();
  });

  test("renders tagline", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("From biology to code")
    ).toBeVisible();
  });

  test("renders location badge with Segovia", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Segovia")).toBeVisible();
  });

  test("VIEW PROJECTS CTA links to #projects", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: "VIEW PROJECTS" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#projects");
  });

  test("CONTACT ME CTA links to #contact", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: "CONTACT ME" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "#contact");
  });

  test("clicking VIEW PROJECTS updates URL hash", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "VIEW PROJECTS" }).click();
    await expect(page).toHaveURL(/#projects/);
  });

  test("clicking CONTACT ME updates URL hash", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "CONTACT ME" }).click();
    await expect(page).toHaveURL(/#contact/);
  });

  test("scroll chevron links to #about", async ({ page }) => {
    await page.goto("/");
    const chevron = page.getByRole("link", { name: "Scroll to about section" });
    await expect(chevron).toBeVisible();
    await expect(chevron).toHaveAttribute("href", "#about");
  });

  test("background SVG containers are aria-hidden", async ({ page }) => {
    await page.goto("/");
    const ariaHidden = page.locator('#hero [aria-hidden="true"]');
    expect(await ariaHidden.count()).toBeGreaterThanOrEqual(1);
  });
});
