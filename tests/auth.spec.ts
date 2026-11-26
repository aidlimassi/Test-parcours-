// spec: specs/saucedemo-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {
  test('Connexion valide avec un utilisateur standard', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/\/inventory\.html/);
    await expect(page.locator('.header_secondary_container')).toContainText('Products');
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('Connexion refusée avec des identifiants invalides', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('inconnu');
    await page.getByPlaceholder('Password').fill('incorrect');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText(/Username and password do not match/)).toBeVisible();
  });

  test('Connexion avec des champs vides', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
  });

  test('Utilisateur verrouillé', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText(/Sorry, this user has been locked out/)).toBeVisible();
  });

  test('Accès direct protégé à l’inventaire', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText(/You can only access.*when you are logged in/)).toBeVisible();
  });

  test('Déconnexion depuis le menu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/\/inventory\.html/);

    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toHaveValue('');
    await expect(page.getByPlaceholder('Password')).toHaveValue('');
  });
});
