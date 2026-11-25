
import { test, expect } from '@playwright/test';

test.describe('Revolut - site public', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.revolut.com/fr-FR/');

    const accepter = page.getByRole('button', { name: /accept|accepter/i });
    if (await accepter.isVisible({ timeout: 3000 }).catch(() => false)) {
      await accepter.click();
    }
  });

  test('la page d\'accueil se charge', async ({ page }) => {
    await expect(page).toHaveURL(/revolut\.com/);
    await expect(page).toHaveTitle(/Revolut/);
  });


});