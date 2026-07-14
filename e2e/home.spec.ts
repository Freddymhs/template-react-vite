import { test, expect } from '@playwright/test'

test('home page loads and shows the template heading', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'template-react-vite' })).toBeVisible()
})
