import { expect, test } from '@playwright/test'

test('user can view dashboard and open a satellite detail page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'OrbitalOps Dashboard' })).toBeVisible()

  await expect(page.getByText('LOFT-AURORA-1')).toBeVisible()
  await expect(page.getByText('LOFT-PIONEER-2')).toBeVisible()
  await expect(page.getByText('LOFT-VECTOR-3')).toBeVisible()

  await page.getByRole('link', { name: 'LOFT-VECTOR-3' }).click()

  await expect(page.getByRole('heading', { name: 'LOFT-VECTOR-3' })).toBeVisible()
  await expect(page.getByText('Battery level below operational safety margin.')).toBeVisible()

  await page.getByRole('link', { name: /back to dashboard/i }).click()

  await expect(page.getByRole('heading', { name: 'OrbitalOps Dashboard' })).toBeVisible()
})
