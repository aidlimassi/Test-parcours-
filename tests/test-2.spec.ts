import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('https://www.auto-doc.fr/');

 const accepter = page.getByRole('button', { name: /accepter|accept/i });
try {
  await accepter.click({ timeout: 5000 });
} catch {
  // Pas de bandeau cookies : on continue
};

  await page.getByRole('textbox', { name: 'kba1' }).click();

  await page.getByRole('navigation').getByRole('link', { name: 'Black Friday' }).click();
  
});