import { test, expect } from '@playwright/test';
import * as process from "process";
import {availability} from "./data/availability";

test('Open home page', async ({ page }) => {
  await page.goto(process.env.NEXT_PUBLIC_URL as string);
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100, fullPage: true });
});

test('Open pitch page', async ({ page }) => {
  await page.goto(process.env.NEXT_PUBLIC_URL+ '/pitch/sarc-simple-the-best'as string);
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100, fullPage: true });
});

test('Open reserve page', async ({ page }) => {
  await page.goto(process.env.NEXT_PUBLIC_URL+ '/pitch/sarc-simple-the-best/reserve?day=2023-12-12&time=12:00:00.000Z'as string);
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100, fullPage: true });
});

test('Availability.Mock api request ', async ({page}) => {
  let count = 0
  await page.goto(process.env.NEXT_PUBLIC_URL as string);
  await page.waitForTimeout(1000);
  await page.locator('id=btn_find_slots').dblclick();

  await page.route('**/*', (route, request) => {
    if (route.request().url().includes('availability?')) {
      count = count + 1
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(availability),
      });
    }
  });
  await page.locator('id=btn_find_slots').click();


  expect(count).toBe(2);
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100, fullPage: true });

});
