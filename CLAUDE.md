# Priyanshu Portfolio — CLAUDE.md

## Tech Stack

- **React 19** + **React Router 7** (HashRouter — routes use `/#/...`)
- **Tailwind CSS 4** + **Vite 8**
- **Deployed** to GitHub Pages via `npm run deploy` (runs build then `gh-pages -d dist`)
- **Hosted at**: https://priyanshup.github.io/Portfolio/

### Dev commands
```
npm run dev       # local dev server
npm run build     # production build → dist/
npm run deploy    # build + push to gh-pages
```

---

## Project Structure

```
src/
├── App.jsx                        # Root router — no content, no styles
├── config/index.js                # Site-wide settings (resume URL, social links, VIEW_MORE_THRESHOLD)
├── data/                          # All content data (edit these to change what's shown)
│   ├── caseStudies.js             # Case study metadata + published flag
│   ├── impactStories.js           # Impact Stories card data (reverse chronological)
│   ├── experience.js
│   ├── projects.js
│   ├── testimonials.js
│   ├── certifications.js
│   ├── stats.js
│   ├── dna.js
│   └── timeline.js
├── content/
│   └── case-studies/              # Full written content for published case studies
│       ├── components.jsx         # Shared styled components (H2, P, Callout, MetricRow, etc.)
│       ├── vidaxl-ai-content-automation/
│       │   ├── index.jsx
│       │   └── assets/
│       ├── techmojo-sportsbook-gtm/
│       │   ├── index.jsx
│       │   └── assets/
│       ├── uhg-zero-downtime-migration/
│       │   └── index.jsx
│       ├── uhg-qa-cycle-automation/
│       │   └── index.jsx
│       └── uhg-claims-transformation/
│           └── index.jsx
├── sections/                      # Homepage sections (reorder in App.jsx > HomePage)
│   ├── Hero.jsx
│   ├── StatsBar.jsx
│   ├── WorkExperience.jsx
│   ├── CareerJourney.jsx
│   ├── Projects.jsx
│   ├── ImpactStories.jsx
│   ├── CaseStudies.jsx
│   ├── CoreDNA.jsx                # Pre-close: "who I am, not just what I did"
│   ├── Testimonials.jsx
│   └── Certifications.jsx
├── pages/
│   └── CaseStudyPage.jsx          # Renders individual case study at /case-studies/:slug
├── components/
│   ├── layout/                    # Nav, Footer, MobileMenu
│   ├── modals/                    # TestimonialModal, ViewMoreModal
│   └── ui/                        # BrandLogo, Carousel, Icons, ScrollToTop, etc.
└── hooks/                         # useScrollReveal, useScrollTracking, useSectionTracking, useTheme
```

---

## Routing

| Route | Renders |
|---|---|
| `/` | Full portfolio (all sections) |
| `/case-studies/:slug` | Individual case study page |
| `/*` | Falls back to HomePage |

Uses **HashRouter**, so all URLs are `/#/case-studies/...`. This is required for GitHub Pages compatibility.

---

## Case Studies System

### How it works

Case studies have two layers:

1. **Metadata** in `src/data/caseStudies.js` — controls what appears on the card and whether it's published
2. **Content** in `src/content/case-studies/<slug>/index.jsx` — the full page content

The `published` boolean is the gate:
- `published: true` + content file → clickable card, full page at `/case-studies/<slug>`
- `published: false` → locked overlay with "Publishing Soon", URL returns 404

### Current status

All 5 case studies are published. Listed in reverse chronological order (most recent first):

| Slug | Company | Status |
|---|---|---|
| `vidaxl-ai-content-automation` | VidaXL · E-commerce | Published |
| `techmojo-sportsbook-gtm` | Techmojo · Gaming | Published |
| `uhg-zero-downtime-migration` | UnitedHealth Group | Published |
| `uhg-qa-cycle-automation` | UnitedHealth Group | Published |
| `uhg-claims-transformation` | UnitedHealth Group | Published |

### To add a new case study

1. Add an entry to `src/data/caseStudies.js` with `published: true`
2. Create `src/content/case-studies/<slug>/index.jsx` with the full content
3. Drop images in `src/content/case-studies/<slug>/assets/`

Use `src/content/case-studies/components.jsx` for all content formatting — it exports `H2`, `H3`, `P`, `Callout`, `MetricRow`, `ImageFull`, `ImageHalf`, `BulletList`, `Divider`.

### Case study content structure

Each `index.jsx` follows this section order:
1. `<MetricRow>` — 3–4 headline metrics at the top
2. `<Divider />`
3. **The Problem** — context, stakes, and the core challenge (`<Callout label="The Core Challenge" accent>`)
4. **Understanding the Landscape / Discovery** — what was learned before building (`<Callout label="Key Insight">`)
5. **My Approach** — numbered `<H3>` sub-sections, one per strategic thread
6. **What Was Delivered / What We Built** — concrete outputs as `<BulletList>`
7. **Results** — outcomes with `<BulletList>`, no fabricated metrics
8. **What I'd Do Differently** — `<H3>` sub-sections, genuine retrospective
9. **Key Takeaways** — closing `<P>` + `<BulletList>` of durable lessons

---

## Impact Stories System

### How it works

Impact Stories are compact single-moment cards that sit between the Key Projects and Case Studies sections on the homepage. They share the exact card design as the Projects section but have no tech stack row.

- **Data**: `src/data/impactStories.js` — each story has `eyebrow`, `company`, `headline`, `context`, and `outcomes` (array of chip strings)
- **Section component**: `src/sections/ImpactStories.jsx`
- **Desktop**: 2-column grid; **Mobile**: swipeable carousel with peek
- **"View All" button** appears automatically if count exceeds `VIEW_MORE_THRESHOLD` (currently 4) — with 5 cards this is already active

### Card fields

| Field | Purpose |
|---|---|
| `eyebrow` | Domain/context label shown above the headline (e.g. `"Conversion & Growth · VidaXL"`) |
| `company` | Company name shown below the headline |
| `headline` | Bold card headline |
| `context` | 1–2 sentence problem/context statement |
| `outcomes` | Array of short strings rendered as accent-coloured chip badges |

### Current cards (5 total, reverse chronological)

| # | Headline | Company |
|---|---|---|
| 1 | 7% Monthly Conversion Lift Through AI-Powered Product Content | VidaXL |
| 2 | 21% Storage Cost Reduction via Shared Compliance Asset Architecture | VidaXL |
| 3 | Automated 92% of Operational Ticket Backlog | UnitedHealth Group |
| 4 | Delivered 4 Compliance Projects Simultaneously, On Deadline | UnitedHealth Group |
| 5 | Built a Cron Automation Engine from Scratch | UnitedHealth Group |

Ordering rule: **reverse chronological by company tenure** — most recent company first, oldest last. Currently: VidaXL (Sep 2024 – Jun 2026) → UHG (Jun 2019 – Mar 2022).

---

## Key Configuration

**`src/config/index.js`** — single source of truth for:
- `CONFIG.resumeUrl` — PDF filename in `/public/`
- `CONFIG.social` — LinkedIn, GitHub, Instagram, Facebook URLs
- `VIEW_MORE_THRESHOLD` — how many cards show before "View All" button appears (currently `4`)

---

## Analytics (GA4)

- `RouteTracker` in `App.jsx` fires `page_view` on every route change
- `useScrollTracking` fires `scroll_depth` events at 25 / 50 / 75 / 100%
- `useSectionTracking` fires `view_section` as each section enters the viewport
- Analytics utility lives in `src/utils/analytics.js`

---

## Theme System (Dark / Light Mode)

### How it works

Class-based on `<html>`: `dark` class = dark mode; absent = light mode.

| Priority | Source |
|---|---|
| 1st | `localStorage.getItem('theme')` (`'dark'` or `'light'`) |
| 2nd | `window.matchMedia('(prefers-color-scheme: dark)')` |
| 3rd | Default to `'dark'` |

**Flash prevention**: `index.html` has an inline `<script>` in `<head>` that sets the class synchronously before the first paint. This prevents the white flash on dark-mode page load.

### Key files

- **`src/hooks/useTheme.js`** — reads localStorage on init, applies/removes `dark` on `<html>`, saves on toggle. Returns `[theme, toggleTheme]`.
- **`src/App.jsx`** — calls `useTheme()` at the root and passes `theme` + `toggleTheme` as props to `<Nav />`.
- **`src/components/layout/Nav.jsx`** — renders a pill-shaped Sun/Moon toggle with ambient glow (left of Resume button). Props: `{ theme, toggleTheme }`. Dark mode: emerald glow. Light mode: amber glow. Glow is always visible at rest; intensifies on hover.
- **`src/index.css`** — `@variant dark` directive + CSS variable overrides for light mode (`--color-darkBg`, `--color-cardBg`, `--color-accent`).
- **`src/styles/globals.css`** — `html { transition: color 300ms, background-color 300ms }` + light mode overrides for all custom CSS classes (§22).

### Adding new theme-aware components

Use the `dark:` Tailwind prefix for anything that should differ between modes:

```jsx
// Headings
<h2 className="dark:text-white text-slate-900">

// Body text
<p className="dark:text-gray-400 text-slate-600">

// Muted / secondary
<p className="dark:text-gray-500 text-slate-500">

// Card borders
<div className="border dark:border-gray-800 border-slate-200">

// Tag chips
<span className="dark:bg-gray-900 bg-slate-100 dark:border-gray-800 border-slate-200 dark:text-gray-400 text-slate-600">

// Accent text (same token, works in both modes automatically)
<p className="text-accent">
```

CSS custom properties (`--color-darkBg`, `--color-cardBg`, `--color-accent`) auto-adapt via `html:not(.dark)` overrides in `index.css` — no `dark:` prefix needed for classes that use these tokens (e.g. `bg-darkBg`, `bg-cardBg`, `text-accent`).

### Strict color convention

**Every hardcoded color class must have both a dark mode and a light mode value.** Never write a single color without a `dark:` counterpart.

```jsx
// CORRECT
className="dark:text-white text-slate-900"
className="dark:border-gray-800 border-slate-200"
className="dark:hover:text-white hover:text-slate-900"
className="dark:group-hover:text-white group-hover:text-slate-900"

// WRONG — breaks in light mode
className="text-white"
className="border-gray-800"
className="hover:text-white"
```

Exception: classes using CSS custom property tokens (`bg-darkBg`, `bg-cardBg`, `text-accent`) auto-adapt and need no `dark:` prefix.

### Custom CSS classes in globals.css

Classes defined in `globals.css` (`.resume-btn`, `.scroll-top-btn`, `.floating-back-btn`, `.cs-locked-overlay`, `.modal-backdrop`, etc.) cannot use Tailwind's `dark:` prefix — they are CSS, not JSX. Light mode overrides go in **§22** of `globals.css` using `html:not(.dark)` selectors:

```css
/* §22. Light mode overrides */
html:not(.dark) .my-custom-class {
  background: #e2e8f0;
  color: #334155;
}
```
