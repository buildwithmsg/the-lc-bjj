import { test, expect } from '@playwright/test';

const slugs = ['bjj-gi', 'bjj-nogi', 'kickboxing', 'kids-bjj', 'mma-fight-team'];

for (const slug of slugs) {
  test(`/${slug} renders with title, hero, sections, and CTA`, async ({ page }) => {
    const response = await page.goto(`/${slug}`);
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/What it is/i)).toBeVisible();
    await expect(page.getByText(/Who it.s for/i)).toBeVisible();
    await expect(page.getByText(/First day|first day/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /First class is FREE/i }).first()).toBeVisible();
  });
}

test('NoGi page links to Kickboxing as combined-class partner', async ({ page }) => {
  await page.goto('/bjj-nogi');
  await expect(page.getByText(/Combined class/i)).toBeVisible();
  await expect(page.locator('a[href="/kickboxing"]')).toBeVisible();
});

test('MMA page shows fighters and results placeholders when data is empty', async ({ page }) => {
  await page.goto('/mma-fight-team');
  await expect(page.getByText(/Fighters/i)).toBeVisible();
  await expect(page.getByText(/Recent results/i)).toBeVisible();
});
