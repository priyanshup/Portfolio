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

---

## Carousel Behavior Conventions

`src/components/ui/Carousel.jsx` has two modes:

### Continuous carousels (`autoPlay=true`) — Testimonials desktop, CoreDNA desktop
- **Auto-scroll**: rAF loop driven by `speedRef` (px/s)
- **Hover-slow**: `onMouseEnter` halves speed; `onMouseLeave` restores instantly
- **Drag-to-scrub** (`draggable={true}` prop): desktop mouse grab (`cursor-grab`/`cursor-grabbing`) + mobile touch drag scrub in real time; auto-scroll resumes 1.5s after release

> **Note:** StatsBar is no longer a carousel. It is a static `grid grid-cols-2 md:grid-cols-3` of glass cards (`bg-cardBg rounded-2xl`). No Carousel component involved.

### Card carousels on mobile (discrete, `autoPlay=false`)
- Swipeable with live drag-follow and smooth snap on release
- **Infinite loop via triple-clone**: `extended = [...items, ...items, ...items]`; starts at copy-B (`cur = len`); `onTransEnd` silently snaps from copy-A/C back to copy-B after each wrap animation
- **Seamless wrap**: `onTransitionEnd` filtered by `e.propertyName === 'transform'`; transition re-enabled via `setTimeout(50)` (more reliable than double-rAF on mobile)
- `peek={true}` shows a sliver of the next card (`peekIpv = ipv + 0.15`)

---

## Testimonial Modal Behavior

`src/components/modals/TestimonialModal.jsx`

**Props:** `{ testimonials, startIndex, onClose }` — full array + starting index (not a single object)

**Navigation:**
- Left `‹` / right `›` arrows (hidden when `testimonials.length <= 1`)
  - **Mobile:** small centred button (`w-10 h-12`, `left-2`/`right-2`) — swipe is the primary input
  - **Desktop (`md+`):** full card-height edge strip (`h-full`, `left-0`/`right-0`, `w-12`) — entire left/right edge is clickable
  - Header and dots carry `relative z-20` so they stay interactive above the `z-10` arrow buttons
- Keyboard: `ArrowLeft` / `ArrowRight` navigate; `Escape` closes
- Touch swipe: `touchstart` + `touchend` on the **backdrop** (not the card), so swiping anywhere on the overlay works; `|dx| > 50px` triggers prev/next
- Dot indicators at the bottom; clicking a dot jumps directly to that testimonial

**Transition:** 150ms opacity fade (`visible` state) — content fades out, index updates, content fades in. Rapid consecutive navigations are debounced via `navigating` ref.

**Scroll lock:** Uses `position: fixed` + saved `scrollY` (not just `overflow: hidden`) because iOS Safari ignores `overflow: hidden` on `body` for momentum scroll. On close, restores styles and calls `window.scrollTo(0, scrollY)`.

---

## WorkExperience Accordion Scroll

`src/sections/WorkExperience.jsx`

**Pattern:** call `setOpen(i)` first, then in a `setTimeout(400)` call `scrollIntoView({ behavior: 'smooth', block: 'start' })` on the card element. Waiting for the `grid-template-rows` transition to settle (~380ms) means `scrollIntoView` reads the final DOM layout — the scroll target is always accurate.

`scrollMarginTop: (NAV_HEIGHT + TOP_MARGIN) + 'px'` on each card wrapper keeps the header 16px below the fixed nav.

**Do not** try to capture `rect.top` before `setOpen` and fire `window.scrollTo` simultaneously — the expansion shifts the card mid-scroll, jerking the page in the wrong direction.

---

## Design System (modernize-design branch)

### Font stack

| Role | Family | Class |
|---|---|---|
| Display / headings | Plus Jakarta Sans | `font-display` |
| Body | Inter | default (no class needed) |
| Monospace / labels | IBM Plex Mono | `font-mono-pp` |

Google Fonts import lives in `src/styles/globals.css`. The old Syne + DM Sans stack has been replaced — do not reintroduce them.

### Card conventions

All content cards use this base pattern:

```jsx
<div className="bg-cardBg rounded-2xl border dark:border-gray-800 border-slate-200 card-lift">
```

- `card-lift` — CSS class in `globals.css` §23: `transform: translateY(-5px)` + shadow escalation on hover. Apply to every interactive card.
- `rounded-2xl` — standard card radius. Do not use `rounded-3xl` (too bubbly).
- No internal gradient accent bars at the top of cards — they add visual noise. Hierarchy is carried by spacing and typography.

### Section layout patterns

| Section | Desktop layout | Mobile layout |
|---|---|---|
| StatsBar | `grid-cols-3` static glass cards | `grid-cols-2` static glass cards |
| CareerJourney | `grid-cols-4` glass cards (Acts I–IV) | single-column stack |
| Projects | `grid-cols-2` static grid + ViewMoreModal | swipeable Carousel |
| ImpactStories | `grid-cols-2` static grid + ViewMoreModal | swipeable Carousel |
| CaseStudies | single-column full-width editorial stack | swipeable Carousel |
| Testimonials | static `grid-cols-2` pull-quote grid | swipeable Carousel |

### CareerJourney scaling

Currently 4 Acts (`lg:grid-cols-4`). When a 5th role is added, convert to a **horizontally scrollable strip** — cards in a single `flex-row` with `overflow-x-auto` and drag-to-scrub on desktop, swipeable carousel on mobile. The card design stays identical; only the container changes.

### Hero layout

CSS Grid, not flexbox. The photo column has an explicit pixel width so the text column can never bleed into it:

```
md: grid-cols-[1fr_300px]
lg: grid-cols-[1fr_360px]
```

Photo is visible on all viewports — stacks below text on mobile (`flex justify-center md:justify-end`). Ambient glow and accent line are `hidden md:block` (desktop only).

The subtitle line ("Technical Product Leader · 10 Years") uses two spans to prevent wrapping on narrow screens:
- Mobile (`sm:hidden`): shorter variant — "Product Leader · 10 Years"
- Desktop (`hidden sm:inline`): full string

### Footer CTA copy

- Eyebrow: "Open to Opportunities"
- Headline: "Ready to build something ambitious?"
- Subtext: "Senior product roles where engineering depth meets commercial scale."
- CTAs: Connect on LinkedIn ↗ · Download Resume
