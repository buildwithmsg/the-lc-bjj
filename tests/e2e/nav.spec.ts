import { test, expect } from '@playwright/test';

test('header CTA scrolls to schedule on homepage', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /First class is FREE/i }).first().click();
  await expect(page).toHaveURL(/#schedule$/);
});

test('clicking the logo from a program page returns to homepage', async ({ page }) => {
  await page.goto('/bjj-gi');
  await page.getByRole('link', { name: /The LC logo/i }).click();
  await expect(page).toHaveURL('http://localhost:4321/');
});

test('footer Facebook link points to the correct page', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /^Facebook/i }).first();
  await expect(link).toHaveAttribute('href', 'https://www.facebook.com/TheLCFightTeam');
});
