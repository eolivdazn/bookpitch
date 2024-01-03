import {test, expect} from '@playwright/test';
import * as process from "process";
import {availability} from "./data/availability";

test.describe('Reserve card', () => {
    test.beforeEach(async ({page}) => {


    });
    const day = new Date().toISOString().split('T')[0];
    test('Change reserveCard data', async ({page}) => {
        await page.goto(process.env.NEXT_PUBLIC_URL as string);

        await page.locator('id=select_time').selectOption('14:00:00.000Z');
        await page.locator('id=btn_find_slots').click();
        await page.waitForTimeout(1000);
        expect(page.url()).toContain(`/search?sport=football&day=${day}&time=14:00:00.000Z&location=Guimaraes`);

        await page.locator('id=select_sport').selectOption('volleyball');
        await page.locator('id=btn_find_slots').click();
        await page.waitForTimeout(1000);
        expect(page.url()).toContain(`/search?sport=volleyball&day=${day}&time=14:00:00.000Z&location=Guimaraes`);

        await page.locator('id=select_location').selectOption('Braga');
        await page.locator('id=btn_find_slots').click();
        await page.waitForTimeout(1000);
        expect(page.url()).toContain(`/search?sport=volleyball&day=${day}&time=14:00:00.000Z&location=Braga`);

    });

    test.only('Change reserveCard set time', async ({page}) => {
        let count = 0
        await page.goto(process.env.NEXT_PUBLIC_URL + `?sport=football&day=${day}&time=20:00:00.000Z&location=Fafe`);
        await page.locator('id=btn_find_slots').click();
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

        await page.waitForTimeout(1000);
        expect(count).toBe(2);
    });

});