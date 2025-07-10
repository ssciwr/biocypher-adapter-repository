import { test, expect } from '@playwright/test';

test('overview page renders with expected content', async ({ page }) => {
  await page.goto('/overview');

  // Check that the main heading text is present in the body
  await expect(page.getByText('BioCypher Adapter Repository')).toBeVisible();

  // Check that the description text is present
  await expect(page.getByText('Discover and integrate data adapters for your BioCypher knowledge graphs')).toBeVisible();

  // Check that adapters are loaded (look for at least one adapter card)
  await expect(page.locator('.ant-card').first()).toBeVisible();
});
