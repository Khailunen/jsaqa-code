const { test, expect } = require ('@playwright/test');
const { email, password, invalidPassword } = require ('../user');
const { loginNetology } = "https://netology.ru/?modal=sign_in";

test('validLoginUser', async ({ page }) => {
  await page.goto(loginNetology);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill(password);
  await page.getByTestId('login-submit-btn').click();

  await expect(page.url('https://netology.ru/profile/9330256')).toBe('https://netology.ru/profile/9330256');
});

test('invalidLoginUser', async ({ page }) => {
  await page.goto(loginNetology);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Пароль' }).click();
  await page.getByRole('textbox', { name: 'Пароль' }).fill(invalidPassword);
  await page.getByTestId('login-submit-btn').click();

  await  expect (page.getByTestId('login-error-hint')).toHaveText("Вы ввели неправильно логин или пароль.");
});