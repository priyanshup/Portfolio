# Priyanshu Portfolio — CLAUDE.md

Read **DESIGN.md** first: it holds the section budgets, content model, visual rules and
the "adding things" playbook. This file covers architecture and the non-obvious bits.

## Tech Stack

- **React 19** + **React Router 7** (HashRouter — routes use `/#/...`)
- **Tailwind CSS 4** + **Vite 8**
- Fonts self-hosted via `@fontsource` (Plus Jakarta Sans, Inter, IBM Plex Mono) — no Google Fonts requests
- **Deployed** to GitHub Pages by GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`: `npm ci` → `npm run verify` → `npm run build` → `gh-pages` branch). Pull requests run the same checks plus a Lighthouse accessibility gate (≥ 95, `.lighthouserc.json`) and never deploy. `npm run deploy` is a manual fallback — never run both for the same commit.
- **Hosted at**: https://priyanshup.github.io/Portfolio/

### Dev commands
```
npm run dev       # local dev server (http://localhost:5173/Portfolio/ — note the /Portfolio/ base)
npm run build     # production build → dist/
npm run verify    # resume-file check + ESLint (the gate CI and predeploy both run)
npm run smoke     # 76 end-to-end checks in a headless browser (desktop + phone); needs the dev server running
npm run a11y      # axe-core audit in dark + light, desktop + mobile; needs the dev server running
npm run copy      # flags AI-writing tells (dashes, stock words, "not just") in the site's prose
npm run deploy    # manual fallback: verify + build + push to gh-pages (CI normally does this)
```

---

## Project Structure

```
src/
├── App.jsx                        # Router + HomePage composition. No content, no styles.
├── main.jsx                       # Entry: fonts, CSS, HashRouter
├── config/index.js                # CONFIG (resume, socials, site meta) + SECTION BUDGET constants
├── data/                          # ALL content. Single source of truth — edit these
│   ├── roles.js                   # Career roles (newest first) → Experience, Hero, years
│   ├── work.js                    # Case studies + projects + impact stories → Work, /work, case pages, Hero proofs
│   ├── testimonials.js            # Recommendations (with verbatim `highlight`)
│   ├── certifications.js
│   ├── dna.js                     # "What I bring" items
│   └── currently.js               # "Currently" lines + updated date
├── content/case-studies/          # Full written case studies
│   ├── components.jsx             # H2, H3, P, Callout, MetricRow, Snapshot, Collapsible, ProcessFlow, ImageFull, ImageHalf, BulletList, Divider
│   └── <slug>/index.jsx (+ assets/)
├── sections/                      # Homepage sections (order set in App.jsx > HomePage)
│   ├── Hero.jsx  Work.jsx  Experience.jsx  WhatIBring.jsx  Recognition.jsx  Currently.jsx
├── pages/
│   ├── CaseStudyPage.jsx          # /case-studies/:slug
│   └── WorkPage.jsx               # /work (all work, filter chips via ?domain=)
├── components/
│   ├── layout/                    # Nav, Footer
│   ├── work/WorkRow.jsx           # One row of the work list (homepage + /work)
│   └── ui/                        # BrandLogo, CompanyLogo, PageBar, Icons, ScrollToTop, SectionHeader, Tag (Tag + Chip)
├── hooks/                         # useScrollReveal, useScrollTracking, useSectionTracking, useActiveSection, useDocumentMeta, useTheme, useMediaQuery, useScrollDirection
├── styles/globals.css             # Custom CSS (focus ring, reduced motion, reveal, accordion, buttons, print)
└── index.css                      # Tailwind + theme tokens
└── assets/logos/                 # Original employer SVGs, unmodified (Heineken, VidaXL, Techmojo, UHG)
scripts/  check-resume.js (deploy guard) · generate-og-image.ps1 (rebuilds public/og-image.png) · smoke-test.mjs · a11y-audit.mjs
```

---

## Routing (HashRouter — required for GitHub Pages)

| Route | Renders |
|---|---|
| `/` | Homepage (Hero, Work, Experience, What I bring, Recognition, Currently) |
| `/work` | All work; `?domain=Healthcare` filters (shareable) |
| `/case-studies/:slug` | Case study page |
| `/*` | Falls back to the homepage |

**Case-study links carry `state={{ from }}`** (`'home'` or `'work-page'`); the sticky PageBar's trail follows it (Portfolio / Work / page, or Portfolio / All work / page). Use `<WorkRow from=…>` and pass `state={{ from }}` on any other link into a case study.

**In-app links to a homepage section** never use `#section` anchors (they fight the
HashRouter). They use `<Link to="/" state={{ scrollTo: '<section id>' }}>`; `HomePage`
performs the scroll (80px nav offset). Back links from inner pages pass
`state={{ scrollTo: 'work' }}`. Section ids: `about`, `work`, `experience`,
`what-i-bring`, `recognition`, `currently`.

**Shareable per-role links are not possible** until routing is path-based (BACKLOG #12).

---

## Content system

### Work (`data/work.js`)
One list for everything under "Work". `featured: true` items (keep to 3) appear on the
homepage with their `metric`; the Hero proof strip is built from the featured metrics.
Items with a `slug` have a case study page (`src/content/case-studies/<slug>/index.jsx`,
`readMinutes` ≈ words/240). Items without a slug (impact stories, projects) show on
`/work` only. `published: false` hides an item everywhere.

Case study content order (each `index.jsx`): `<Snapshot>` ("the short version": plain-language
line, problem, what I did, result, takeaway, then role/team/timeline/tech — distilled from the
study's own text, "I" not "we", **the headline metric is not repeated there**) → `<MetricRow>` (3–4
metrics; the grid handles 1–4 and never leaves an orphan) → Divider → The Problem →
Discovery (`<Callout label="Key Insight">`) → My Approach (numbered `<H3>`, mirrored by
`<ProcessFlow>`) → What Was Delivered → Results (no fabricated metrics) → What I'd Do
Differently → Key Takeaways.

### Roles (`data/roles.js`)
Newest first. Fields include `headline` (the result, shown on the collapsed row) and
`note` ("How it fits"). Years of experience and the Hero badge are derived — never hard-coded.

### Writing voice
All site prose follows DESIGN.md §4c (plain first person, British spelling, no dashes as connectors, no "not X but Y", no forced triads, sentence-case headings). Run `npm run copy` after editing copy. When rewriting prose, use the humanizer skill (`~/.claude/skills/humanizer`) and never add a fact that isn't in the source.

### Recommendations (`data/testimonials.js`)
`text` is verbatim LinkedIn content. `highlight` must be a **verbatim sentence** from
`text` (the build doesn't check this — keep it exact).

---

## Section budgets (see DESIGN.md §2)
Constants in `src/config/index.js`: `EXPERIENCE_VISIBLE` (5), `RECOMMENDATIONS_VISIBLE`
(3), `MORE_WORK_PREVIEW` (5). Overflow is a page or an inline expand — never a modal or
carousel. There are no carousels or modals in this codebase; don't reintroduce them.

---

## Experience accordion scroll

`src/sections/Experience.jsx`: call `setOpen(i)` first, then in a `setTimeout(400)` call
`scrollIntoView({ behavior: 'smooth', block: 'start' })` on the row. Waiting for the
`grid-template-rows` transition to settle means `scrollIntoView` reads the final layout.
`scrollMarginTop` keeps the row 16px below the fixed nav. **Do not** capture `rect.top`
before `setOpen` and scroll simultaneously — the expansion shifts the row mid-scroll.
The collapsed panel is `inert` (skipped by keyboard/screen readers; text stays in the DOM).

---

## Analytics (GA4)

- `RouteTracker` in `App.jsx` fires `page_view` on every route change
- `useScrollTracking` fires `scroll_depth` at 25 / 50 / 75 / 100%
- `useSectionTracking` fires `view_section` as each section enters the viewport (ids in that hook must match the section ids)
- Events live in `src/utils/analytics.js`; `trackViewMoreOpen('work')` fires when "All work" is clicked

**Important:** the initial `gtag('config', ...)` in `index.html` uses `send_page_view: false`
so the snippet does NOT send an automatic page_view. All page views come from
`RouteTracker`. Without this the first load is double-counted.

---

## Theme system (dark / light)

Class-based on `<html>`: `dark` = dark mode. Priority: `localStorage 'theme'` → system
`prefers-color-scheme` → default dark. `index.html` has an inline script that sets the
class before first paint (no flash). `useTheme` returns `[theme, toggleTheme]`; `App`
passes them to `<Nav />`. Printing removes the `dark` class for the print job (App.jsx).

### Strict colour convention
**Every hard-coded colour class needs both a dark and a light value.**
```jsx
className="dark:text-white text-slate-900"
className="dark:border-gray-800 border-slate-200"
className="dark:hover:text-white hover:text-slate-900"
```
Exception: token classes (`bg-darkBg`, `bg-cardBg`, `text-accent`) adapt automatically.
Contrast floors: small text `dark:text-gray-400 text-slate-600` or stronger; text on
accent-tinted pills `dark:text-accent text-emerald-800`; primary buttons use dark text
on emerald in dark mode (see DESIGN.md §4). Custom CSS classes can't use `dark:` — put
light overrides next to them in `globals.css` using `html:not(.dark)`.

---

## Design system (summary — full rules in DESIGN.md)

- Logos: `CompanyLogo` inlines the SVGs from `src/assets/logos/` and recolours only the neutral parts to the theme colour (brand colours kept); three placements only (Hero strip, Experience rows, case-study header). See DESIGN.md §4.
- Sticky PageBar under the nav on inner pages (nav is a fixed `h-16`; the bar is `top-16`). `html, body` use `overflow-x: clip` — `hidden` would break `position: sticky`.
- Opaque cards: `bg-cardBg rounded-2xl border dark:border-gray-800 border-slate-200`; `card-lift` only on clickable cards. No `backdrop-filter` on content.
- Nothing below 12px (`text-xs`+); no `text-[10px]`.
- Global `:focus-visible` ring; `prefers-reduced-motion` disables all motion.
- Hero: CSS Grid, photo column has an explicit pixel width so text never bleeds into it. Mobile order is text → proof → actions, and the hero isn't forced to full height so the proof lands in the first screen. Badge = current role (from `roles.js`), never an "available for" pill. Location line: "Hyderabad, India · Open to conversations".
- Footer CTA: eyebrow "Open to Conversations"; headline "Ready to build something ambitious?"; subtext "Currently building digital commerce at Heineken. Always glad to talk product with teams where engineering depth meets commercial scale."; CTAs use `<ArrowUpRight />` (SVG, not the `↗` character — iOS renders it as an emoji).

---

## Current Employer Content (Heineken) — confidentiality rules

The Heineken role (Jun 2026 – present) is described at a deliberately high level:

- **Scope, not results.** No outcome metrics until real, publicly shareable ones exist.
- **Credit accurately.** The platform was built by another team; the role contributed SIT, UAT, pilot launch and hypercare, and now shapes roadmap and analytics alongside a Senior Product Owner and a Business Analyst. Never phrase it as sole ownership.
- **Don't name internal tools/vendors** (e.g. the analytics product) until cleared.
- **Logo:** only the official Heineken asset, exact to the original — none in the repo yet.
- The homepage OG image is intentionally employer-free so it never goes stale.
- `data/currently.js` is illustrative — the owner should review and edit it.
