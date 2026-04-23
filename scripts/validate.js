// @ts-check
/* eslint-env node */
import { chromium } from '@playwright/test'
import { existsSync, mkdirSync } from 'fs'
import { resolve, join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SCREENSHOTS_DIR = join(ROOT, 'scripts', 'screenshots')

const ROUTES = [
  '/',
  '/solutions',
  '/solutions/erp-systems',
  '/solutions/hr-management',
  '/solutions/cost-management',
  '/solutions/school-management',
  '/solutions/project-management',
  '/solutions/custom-web-apps',
  '/services',
  '/services/software-development',
  '/services/training-consultancy',
  '/services/support-maintenance',
  '/pricing',
  '/about',
  '/contact',
]

const VIEWPORTS = [
  { name: 'mobile',  width: 390,  height: 844 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
]

const BASE_URL = 'http://localhost:5174'

async function run() {
  if (!existsSync(SCREENSHOTS_DIR)) mkdirSync(SCREENSHOTS_DIR, { recursive: true })

  const browser = await chromium.launch({ headless: true })
  const errors = []

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
    })
    const page = await context.newPage()

    const consoleErrors = []
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', err => consoleErrors.push(err.message))

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route}`
      const slug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '')

      try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 })

        if (!response || response.status() >= 400) {
          errors.push({ route, viewport: viewport.name, type: 'http', message: `HTTP ${response?.status()}` })
          continue
        }

        // Wait for React root to render
        await page.waitForSelector('#root > *', { timeout: 8000 }).catch(() => {
          errors.push({ route, viewport: viewport.name, type: 'render', message: 'React root did not render (#root is empty)' })
        })

        // Capture screenshot
        await page.screenshot({
          path: join(SCREENSHOTS_DIR, `${slug}-${viewport.name}.png`),
          fullPage: false,
        })

        // Collect any console errors that fired during this page load
        if (consoleErrors.length) {
          errors.push(...consoleErrors.map(msg => ({ route, viewport: viewport.name, type: 'console', message: msg })))
          consoleErrors.length = 0
        }

      } catch (e) {
        errors.push({ route, viewport: viewport.name, type: 'exception', message: e.message })
      }
    }

    await context.close()
  }

  await browser.close()

  if (errors.length === 0) {
    console.log('PASS: All routes rendered cleanly across all viewports.')
    console.log(`Screenshots saved to scripts/screenshots/ (${ROUTES.length * VIEWPORTS.length} total)`)
    process.exit(0)
  } else {
    console.error(`FAIL: ${errors.length} error(s) found:\n`)
    errors.forEach(e => console.error(`  [${e.viewport}] ${e.route} — ${e.type}: ${e.message}`))
    process.exit(1)
  }
}

run()
