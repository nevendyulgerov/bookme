import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("should display properties after login", async ({ page }) => {
  // Step 1: Log in
  await page.goto("/login");
  await page
    .getByPlaceholder("Enter your email address...")
    .fill("user@example.com");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page).toHaveURL(/\/properties/);

  // Step 2: Verify there are properties available on the page
  await expect(page.getByTestId("property-card").first()).toBeVisible();
  expect(await page.getByTestId("property-card").count()).toBeGreaterThan(0);
});
