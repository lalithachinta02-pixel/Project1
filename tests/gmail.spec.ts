import { test } from '@playwright/test';

test('gmail login safe flow', async ({ page }) => {

  await page.goto('https://www.google.com/');

  const searchBox = page.getByRole('combobox', { name: 'Search' });

  await searchBox.fill('gmail login');
  await searchBox.press('Enter');

  // ⚠️ If CAPTCHA appears, STOP here
  console.log('If CAPTCHA appears, solve it manually, then continue...');

  await page.pause();

  // ❌ DO NOT click "gmail login" search text
  // Instead directly go to Gmail
  await page.goto('https://mail.google.com');

});