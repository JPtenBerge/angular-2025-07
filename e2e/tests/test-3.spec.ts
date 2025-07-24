import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:4200/animals");
  await page.getByRole("textbox", { name: "Soort:" }).fill("yyyyyyyyyyy");
  await expect(page.getByRole("slider", { name: "Max leeftijd:" })).toHaveValue(
    "150"
  );
  await page.getByRole("slider", { name: "Max leeftijd:" }).fill("250");
  await page.getByRole("textbox", { name: "Foto URL:" }).fill("bla");
  await page
    .getByRole("button", { name: "Voeg template-driven dier toe" })
    .click();
  await expect(page.getByRole("cell", { name: "yyyyyyyyyyy" })).toBeVisible();

  // page.route(); // for mocking the backend and essentially making your E2E test a UI test

  await expect(page).toHaveScreenshot();
});
