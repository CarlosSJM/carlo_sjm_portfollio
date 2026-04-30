import { test, expect } from "@playwright/test";

test("homepage loads with a 200 response", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
});

test("homepage has a document title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.+/);
});
