import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

async function bookProperty(page: Page) {
  // Log in
  await page.goto("/login");
  await page
    .getByPlaceholder("Enter your email address...")
    .fill("user@example.com");
  await page.getByRole("button", { name: "Log In" }).click();
  await expect(page).toHaveURL(/\/properties/);

  // Select a property — capture the name first for later verification
  const propertyName = await page.getByTestId("name-link").first().innerText();
  await page.getByTestId("reserve-link").first().click();
  await expect(page).toHaveURL(/\/properties\/.+/);

  // Form step 1 — choose dates
  await expect(page.getByText("Choose dates")).toBeVisible();
  const today = new Date().getDate().toString();
  await page
    .locator(".duration-picker button")
    .filter({ hasText: new RegExp(`^${today}$`) })
    .click();
  await page.getByTestId("submit-button").click();

  // Form step 2 — fill personal details
  await expect(page.getByText("Fill your details")).toBeVisible();
  await page.getByPlaceholder("First Name").fill("John");
  await page.getByPlaceholder("Last Name").fill("Doe");
  await page.getByPlaceholder("Enter your phone number...").fill("1234567890");
  await page.getByTestId("country-field").selectOption("AU");
  await page.getByTestId("number-adults-field").selectOption("2");
  await page.getByTestId("number-children-field").selectOption("1");
  await page.getByTestId("submit-button").click();

  // Form step 3 — review summary and confirm
  await expect(page.getByText("Reservation Summary")).toBeVisible();
  await page.getByText("I confirm this reservation.").click();
  await page.getByTestId("submit-button").click();

  // Wait for the post-submission redirect so Redux Persist flushes to
  // localStorage before any subsequent page.goto triggers a full reload.
  await expect(page).toHaveURL(/\/properties/);

  return propertyName;
}

test("should book a property and verify it appears on the bookings page", async ({
  page,
}) => {
  // Steps 1-3: Log in, select a property, and complete the booking form
  const propertyName = await bookProperty(page);

  // Step 4: Navigate to the bookings page
  await page.goto("/bookings");

  // Step 5: Verify the booked property is listed
  await expect(page.getByTestId("booking-card")).toBeVisible();
  await expect(page.getByTestId("name-link").first()).toHaveText(propertyName);
});

test("should delete an existing booking", async ({ page }) => {
  // Steps 1-3: Log in, select a property, and complete the booking form
  const propertyName = await bookProperty(page);

  // Step 4: Navigate to the bookings page
  await page.goto("/bookings");

  // Step 5: Verify the booked property is listed
  await expect(page.getByTestId("booking-card")).toBeVisible();
  await expect(page.getByTestId("name-link").first()).toHaveText(propertyName);

  // Step 6: Delete the booking
  await page.getByTestId("delete-booking-button").click();
  await expect(
    page.getByText("Are you sure you want to delete this booking?"),
  ).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete Booking" })
    .click();

  // Step 7: Verify the booking no longer exists
  await page.goto("/bookings");
  await expect(page.getByTestId("booking-card")).not.toBeVisible();
});

test("should edit an existing booking", async ({ page }) => {
  // Steps 1-3: Log in, select a property, and complete the booking form
  const propertyName = await bookProperty(page);

  // Step 4: Navigate to the bookings page and verify the booking is listed
  await page.goto("/bookings");
  await expect(page.getByTestId("booking-card")).toBeVisible();
  await expect(page.getByTestId("name-link").first()).toHaveText(propertyName);

  // Step 5: Open the edit booking page
  await page.getByTestId("edit-booking-link").click();
  await expect(page).toHaveURL(/\/bookings\/.+/);

  // Step 6: Edit the booking

  // Form step 1 — dates are pre-filled, continue
  await expect(page.getByText("Choose dates")).toBeVisible();
  await page.getByTestId("submit-button").click();

  // Form step 2 — update first and last name
  await expect(page.getByText("Fill your details")).toBeVisible();
  await page.getByPlaceholder("First Name").fill("Jane");
  await page.getByPlaceholder("Last Name").fill("Smith");
  await page.getByTestId("submit-button").click();

  // Form step 3 — confirm the update
  await expect(page.getByText("Reservation Summary")).toBeVisible();
  await page.getByText("I confirm this reservation.").click();
  await page.getByTestId("submit-button").click();
  await expect(page).toHaveURL(/\/properties/);

  // Step 7: Navigate to the bookings page and verify the booking still exists
  await page.goto("/bookings");
  await expect(page.getByTestId("booking-card")).toBeVisible();

  // Step 8: Re-enter the edit page and verify the updated details persisted
  await page.getByTestId("edit-booking-link").click();
  await page.getByTestId("submit-button").click(); // continue past pre-filled dates
  await expect(page.getByText("Fill your details")).toBeVisible();
  await expect(page.getByPlaceholder("First Name")).toHaveValue("Jane");
  await expect(page.getByPlaceholder("Last Name")).toHaveValue("Smith");
});
