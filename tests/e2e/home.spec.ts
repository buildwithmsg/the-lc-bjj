import { test, expect } from '@playwright/test';

test('homepage loads with hero, schedule, and visit sections', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/The LC/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Burn The Boats/i);

  // Five program cards
  await expect(page.locator('#programs a[href^="/"]')).toHaveCount(5);

  // Schedule grid has the six known classes (3 chip styles)
  await expect(page.locator('#schedule')).toBeVisible();
  await expect(page.locator('#schedule span.block.bg-blood')).toHaveCount(1);   // Gi BJJ x1 (Sat)
  await expect(page.locator('#schedule span.block.bg-iron')).toHaveCount(2);    // Combined x2
  await expect(page.locator('#schedule span.block.bg-stone')).toHaveCount(2);   // Kids x2

  // Visit section visible
  await expect(page.locator('#visit')).toBeVisible();

  // Facebook feed surfaced in its own section
  await expect(page.locator('#facebook iframe[title*="Facebook"]')).toBeVisible();

  // JSON-LD present
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  expect(ld).toContain('SportsActivityLocation');
  expect(ld).toContain('Walnut Ridge');
});
