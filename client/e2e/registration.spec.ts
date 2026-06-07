import { test, expect } from "@playwright/test";

test("completes the full registration flow", async ({ page }) => {
  await page.goto("/register");
  await page.getByText("Active Member").click();
  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByLabel(/first name/i).fill("Ada");
  await page.getByLabel(/last name/i).fill("Lovelace");
  await page.getByLabel(/email/i).fill("ada@example.com");
  await page.getByLabel(/phone number/i).fill("87654322");
  await page.getByLabel(/birth date/i).fill("1990-01-01");
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByText(/review your registration/i)).toBeVisible();
  await page.getByRole("button", { name: /submit registration/i }).click();
  await expect(page.getByText(/you're all signed up/i)).toBeVisible();
});

test("shows validation errors for empty details", async ({ page }) => {
  await page.goto("/register");
  await page.getByText("Active Member").click();
  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByRole("button", { name: /continue/i }).click();
  await expect(page.getByText(/first name is required/i)).toBeVisible();
});
