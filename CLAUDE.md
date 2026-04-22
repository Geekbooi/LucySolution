# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start Vite dev server (HMR)
npm run build     # production build → dist/
npm run preview   # serve production build locally
npm run lint      # ESLint — strict (--max-warnings 0, will fail on any warning)
```

No test framework is configured.

## Architecture

Static marketing/company site for **Kaldilabs** — React 18 + Vite, no backend or API calls.

### Routing (`src/App.jsx`)
React Router DOM v7 wraps all routes in a shared `Layout` (Navbar + Footer). A `ScrollReset` component fires `window.scrollTo(0,0)` on every navigation. Routes: `/`, `/solutions`, `/solutions/:slug`, `/services`, `/services/:slug`, `/pricing`, `/about`, `/contact`.

### Data (`src/data/`)
All content is statically defined in two files:
- `services.js` — exports `services` array and `getService(slug)` helper (3 services: software-development, training-consultancy, support-maintenance)
- `solutions.js` — exports `solutions` array and `getSolution(slug)` helper (6 solutions: erp-systems, hr-management, cost-management, school-management, project-management, custom-web-apps)

Detail pages (`ServiceDetail.jsx`, `SolutionDetail.jsx`) use the `useParams` slug to look up entries from these files.

### Animation system (`src/components/Animate.jsx`)
All scroll-triggered animations use Framer Motion's `whileInView`. Available named exports to use throughout pages:
- `FadeUp` / `FadeIn` — accept optional `delay` prop
- `SlideLeft` / `SlideRight` / `ScaleIn`
- `StaggerContainer` + `StaggerItem` — pair together for list animations
- `PressScale` — hover/tap micro-interaction wrapper

### Design system
**"Modern Dark Cinema"** — glassmorphism, near-black backgrounds, blue-indigo-violet accent. Font: **Plus Jakarta Sans**.

CSS design tokens (CSS vars defined in `src/index.css`, also mirrored as Tailwind tokens in `tailwind.config.js`):
- Surfaces: `--surface-base` (#050506) → `--surface-high` (#141419), Tailwind: `surface-base`, `surface-raised`, `surface-overlay`, `surface-high`
- Foreground: `--fg` / `--fg-muted` / `--fg-faint`, Tailwind: `ink`, `ink-muted`, `ink-faint`
- Accents: `--accent-blue` (#3B82F6) / `--accent-indigo` / `--accent-violet`, Tailwind: `accent-blue`, `accent-indigo`, `accent-violet`

Global CSS utility classes (use these — do not re-implement):
- `.btn-primary` / `.btn-secondary` — CTA buttons
- `.card-dark` / `.card-glass` — content card surfaces
- `.section-tag` — uppercase pill badge for section labels
- `.gradient-text` / `.gradient-text-blue` / `.gradient-text-vivid` — gradient text
- `.blob` + `.blob-blue` / `.blob-violet` / `.blob-indigo` — ambient glow background decorations
- `.stat-card` — metric callout block
- `.divider` — horizontal rule with fade edges
- `.focus-ring` — accessible focus outline

Custom Tailwind tokens: `glow-sm`, `glow`, `glow-lg` box shadows; `spring` / `smooth` easing; `hero-glow`, `card-glow`, `cta-glow`, `grid-lines` background images; `float`, `blob-slow`, `shine`, `gradient-x`, `fade-in` animations.
