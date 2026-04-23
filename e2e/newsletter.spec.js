import { test, expect } from '@playwright/test'

test.describe('Newsletter signup — home page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // ── Section visibility ──────────────────────────────────────────────────────

  test('newsletter section is visible on the home page', async ({ page }) => {
    await expect(page.getByRole('region', { name: /newsletter/i })).toBeVisible()
  })

  test('email input is present', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible()
  })

  test('subscribe button is present', async ({ page }) => {
    await expect(page.getByRole('button', { name: /subscribe/i })).toBeVisible()
  })

  // ── Validation errors ───────────────────────────────────────────────────────

  test('shows required error when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert')).toContainText(/email.*required/i)
  })

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByRole('textbox', { name: /email/i }).fill('not-an-email')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert')).toContainText(/valid email/i)
  })

  test('error disappears once user starts correcting the input', async ({ page }) => {
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await page.getByRole('textbox', { name: /email/i }).fill('a')
    await expect(page.getByRole('alert')).not.toBeVisible()
  })

  // ── Success flow ────────────────────────────────────────────────────────────

  test('shows success state after a valid submission', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ message: 'Subscribed!' }) })
    )
    await page.getByRole('textbox', { name: /email/i }).fill('user@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('status')).toContainText(/subscribed|thank you|you're in/i)
  })

  test('form disappears and success message is shown after submission', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ message: 'Subscribed!' }) })
    )
    await page.getByRole('textbox', { name: /email/i }).fill('user@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('textbox', { name: /email/i })).not.toBeVisible()
    await expect(page.getByRole('status')).toBeVisible()
  })

  // ── Error flow ──────────────────────────────────────────────────────────────

  test('shows error message on API failure', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) })
    )
    await page.getByRole('textbox', { name: /email/i }).fill('user@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
  })

  test('submit button is re-enabled after an error', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) })
    )
    await page.getByRole('textbox', { name: /email/i }).fill('user@example.com')
    await page.getByRole('button', { name: /subscribe/i }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByRole('button', { name: /subscribe/i })).toBeEnabled()
  })

  // ── Accessibility ───────────────────────────────────────────────────────────

  test('form is keyboard navigable', async ({ page }) => {
    const input = page.getByRole('textbox', { name: /email/i })
    const button = page.getByRole('button', { name: /subscribe/i })
    await input.focus()
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
  })

  test('can submit by pressing Enter in the input', async ({ page }) => {
    await page.route('**/api/newsletter', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify({ message: 'Subscribed!' }) })
    )
    await page.getByRole('textbox', { name: /email/i }).fill('user@example.com')
    await page.keyboard.press('Enter')
    await expect(page.getByRole('status')).toBeVisible()
  })
})

// ── Newsletter teaser in Footer ─────────────────────────────────────────────

test.describe('Newsletter teaser — footer', () => {
  test('footer contains a newsletter signup teaser', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded()
    await expect(page.getByRole('contentinfo').getByRole('textbox', { name: /email/i })).toBeVisible()
  })
})
