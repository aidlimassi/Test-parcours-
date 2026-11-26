// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('Connexion valide avec un utilisateur standard', async ({ page }) => {
    // 1. Ouvrir https://www.saucedemo.com.
    await page.goto('https://www.saucedemo.com');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Saisir standard_user dans Username et secret_sauce dans Password, puis cliquer sur Login.
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(page.locator('.header_secondary_container')).toContainText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});
