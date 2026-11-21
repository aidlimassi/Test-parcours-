import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  await page.goto('https://www.auto-doc.fr/');

  await page.getByRole('button', { name: 'Accepter' }).click();

  await page.getByRole('textbox', { name: 'kba1' }).click();

  await page.getByRole('link', { name: 'Black Friday' }).click();
  
});