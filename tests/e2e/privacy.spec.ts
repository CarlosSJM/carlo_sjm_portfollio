import { test, expect } from "@playwright/test";

const FORBIDDEN_DOMAINS = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "cdnjs.cloudflare.com",
  "unpkg.com",
  "cdn.jsdelivr.net",
  "googletagmanager.com",
  "google-analytics.com",
  "facebook.net",
  "facebook.com",
  "linkedin.com",
  "x.com",
  "twitter.com",
];

test.describe("Privacy: zero third-party requests on initial load", () => {
  test("homepage does not request any forbidden domain", async ({ page }) => {
    const observedHosts: string[] = [];

    page.on("request", (req) => {
      const url = new URL(req.url());
      observedHosts.push(url.host);
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const violations = observedHosts.filter((host) =>
      FORBIDDEN_DOMAINS.some((forbidden) => host.includes(forbidden)),
    );

    expect(violations, `Unexpected requests to: ${violations.join(", ")}`).toEqual([]);
  });
});
