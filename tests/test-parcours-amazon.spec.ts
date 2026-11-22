import { test, expect } from '@playwright/test';

test('affiche Google et accepte les cookies', async ({ page }) => {
  await page.goto('https://www.google.com/');

  await page.getByRole('button', { name: 'Tout accepter' }).click();

  await expect(page).toHaveURL(/google\./);
 page.getByRole('combobox', { name: 'Rech.', exact: true })
 await page.getByRole('link', { name: 'Mode IA' }).click();
 await page.getByRole('combobox', { name: 'Rech.' }).fill('massi aidli');
//await page.goto('https://www.google.com/');
});

test('arriver sur Amazon.fr', async ({ page }) => {
  await page.goto('https://www.amazon.fr');
  await expect(page).toHaveURL(/amazon\.fr/);
  await expect(page).toHaveTitle(/Amazon/);
  await page.getByRole('link', { name: 'Best Sellers', exact: true }).click();

  await page
    .getByRole('group', { name: 'Navigation Tree' })
    .getByRole('link', { name: 'Electronics' })
    .click();

    await page
  .locator('#gridItemRoot')
  .filter({ hasText: '#2' })
  .getByRole('link')
  .first()
  .click();

  await expect(page.locator('#productTitle')).toContainText(
    'Amazon Fire TV Stick HD (newest gen), free & live TV, Alexa Voice Remote, powered by the TV, effortless setup'
  );
    await page.getByRole('button', { name: 'Add to basket', exact: true }).click();
await expect(page.getByText('Basket Subtotal: €23.99€')).toBeVisible();

await page.getByRole('button', { name: 'Proceed to Checkout (1 item)' }).click();

  // Amazon redirige vers la page de connexion (utilisateur non connecté)
  await expect(page).toHaveURL(/signin|ap\/signin/);
});