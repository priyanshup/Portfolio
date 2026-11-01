# Priyanshu Portfolio — CLAUDE.md

Read **DESIGN.md** first: it holds the section budgets, content model, visual rules and
the "adding things" playbook. This file covers architecture and the non-obvious bits.

## Tech Stack

- **React 19** + **React Router 7** (BrowserRouter, basename `/Portfolio`; real paths, every page prerendered to static HTML at build time)
- **Tailwind CSS 4** + **Vite 8**
- Fonts self-hosted via `@fontsource` (Zalando Sans Expanded, Inter, IBM Plex Mono) — no Google Fonts requests
- **Deployed** to GitHub Pages by GitHub Actions on every push to `main` (`.github/workflows/deploy.yml`: `npm ci` → `npm run verify` → `npm run build` → `gh-pages` branch). Pull requests run the same checks plus a Lighthouse accessibility gate (≥ 95, `.lighthouserc.json`) and never deploy. `npm run deploy` is a manual fallback — never run both for the same commit.
- **Hosted at**: https://priyanshup.github.io/Portfolio/

### Dev commands
```
npm run dev       # local dev server (http://localhost:5173/Portfolio/ — note the /Portfolio/ base)
npm run build     # client build + SSR bundle + prerender → dist/ (one HTML file per page, sitemap.xml, llms.txt, 404.html)
npm run preview   # serve dist/ at http://localhost:4173/Portfolio/ (smoke/a11y with BASE_URL=… test the prerendered build)
npm run verify    # resume-file check + content check + ESLint (the gate CI and predeploy both run)
npm run smoke     # 86 end-to-end checks in a headless browser (desktop + phone); needs the dev server running
npm run a11y      # axe-core audit in dark + light, desktop + mobile; needs the dev server running
npm run copy      # flags AI-writing tells (dashes, stock words, "not just") in the site's prose
npm run deploy    # manual fallback: verify + build + push to gh-pages (CI normally does this)
```

---

## Project Structure

```
src/
├── App.jsx                        # Router + HomePage composition. No content, no styles.
├── main.jsx                       # Browser entry: fonts, CSS, BrowserRouter; renders over the prerendered markup
├── entry-server.jsx               # Build-only: render(path) for scripts/prerender.mjs
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
│   ├── registry.js                # Loads/caches case-study bodies (prerender + direct loads render with no skeleton)
│   └── <slug>/index.jsx (+ assets/)
├── sections/                      # Homepage sections (order set in App.jsx > HomePage)
│   ├── Hero.jsx  Work.jsx  Experience.jsx  WhatIBring.jsx  Recognition.jsx  Currently.jsx
├── pages/
│   ├── CaseStudyPage.jsx          # /case-studies/:slug
│   └── WorkPage.jsx               # /work (all work, filter chips via ?domain=)
├── components/
│   ├── layout/                    # Nav, Footer
│   ├── work/WorkRow.jsx           # One row of the work list (homepage + /work)
│   └── ui/                        # BrandLogo, CompanyLogo, Emph (**bold** in data strings), PageBar, Icons, ScrollToTop, SectionHeader, Tag (Tag + Chip)
├── hooks/                         # useScrollReveal, useScrollTracking, useSectionTracking, useActiveSection, useDocumentMeta, useTheme, useMediaQuery, useScrollDirection
├── utils/                         # analytics (GA4 events), pageMeta (title/description/path per page), asset (public-file URLs), scroll, …
├── styles/globals.css             # Custom CSS (focus ring, reduced motion, reveal, accordion, buttons, print)
└── index.css                      # Tailwind + theme tokens
└── assets/logos/                 # Original employer SVGs, unmodified (Heineken, VidaXL, Techmojo, UHG)
scripts/  prerender.mjs (build step) · check-resume.js + check-content.js (verify) · generate-og-image.ps1 (rebuilds public/og-image.png) · smoke-test.mjs · a11y-audit.mjs · copy-check.mjs
```

---

## Routing (real paths + prerender)

| Route | Renders |
|---|---|
| `/` | Homepage (Hero, Work, Experience, What I bring, Recognition, Currently) |
| `/work` | All work; `?domain=Healthcare` filters (shareable) |
| `/case-studies/:slug` | Case study page |
| `/*` | Falls back to the homepage (GitHub Pages serves the generated `404.html`) |

**How a page is served.** `npm run build` writes `dist/<path>/index.html` for every
entry in `src/utils/pageMeta.js` (home, `/work/`, each case study) with the page
rendered inside `#root` and its own title, description, canonical, `og:*` and
`twitter:*`. That HTML is for crawlers, link previews and no-JS readers: it is
**not hydrated**. `#root[data-prerendered]` is hidden, `main.jsx` renders the live
app over it and removes the attribute. Hydrating would flash, because
`useMediaQuery` picks the layout on the first render (the prerender uses the
desktop layout). Adding a case study needs no routing or sitemap edits.

**Rules that follow from real paths:**
- Public files (`/public`) go through `asset('file')` (`src/utils/asset.js`). A bare
  `src="me.jpg"` resolves against the page's folder and 404s on inner pages.
- Code that runs during render must not touch `window`/`document`/`localStorage`
  unguarded: it also runs in Node at build time. Effects are fine.
- Old `/#/…` links (the site used HashRouter until Nov 2026) are rewritten to real
  paths by a script at the top of `index.html`. Keep it; those links are out in the world.

**Case-study links carry `state={{ from }}`** (`'home'` or `'work-page'`); the sticky PageBar's trail follows it (Portfolio / Work / page, or Portfolio / All work / page). Use `<WorkRow from=…>` and pass `state={{ from }}` on any other link into a case study.

**In-app links to a homepage section** never use `#section` anchors (the scroll needs
the 80px nav offset and must work from inner pages). They use `<Link to="/" state={{ scrollTo: '<section id>' }}>`; `HomePage`
performs the scroll (80px nav offset). Back links from inner pages pass
`state={{ scrollTo: 'work' }}`. Section ids: `about`, `work`, `experience`,
`what-i-bring`, `recognition`, `currently`.

**Per-role links:** `/Portfolio/#role-<role id>` opens that Experience row (unfolding
"Earlier roles" if needed) and scrolls to it; an open row has "Copy link to this role".

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
`text`; `npm run verify` fails if it isn't (`scripts/check-content.js`).

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

- `RouteTracker` in `App.jsx` fires `page_view` when the path or query changes (not on
  state-only navigations like nav clicks within the homepage); it renders after
  `<Routes>` so the hit carries the new page's title
- `useScrollTracking` fires `scroll_depth` at 25 / 50 / 75 / 100%
- `useSectionTracking` fires `view_section` as each section enters the viewport (ids in that hook must match the section ids)
- Events live in `src/utils/analytics.js`; `trackViewMoreOpen('work')` fires when "All work" is clicked

**Important:** the initial `gtag('config', ...)` in `index.html` uses `send_page_view: false`
so the snippet does NOT send an automatic page_view. All page views come from
`RouteTracker`. Without this the first load is double-counted.

**GA is required and loads late on purpose.** `gtag()` is defined inline and queues
into `dataLayer` immediately; `gtag.js` (~165 KB) is injected after `load` + idle.
Queued hits are sent when it arrives, so nothing is lost unless a visitor leaves
before the page finishes loading. Don't move it back to an `async` tag in the head.
In the GA4 property, "Page changes based on browser history events" (Enhanced
measurement) should be **off**, or every in-app navigation is counted twice.

---

## Theme system (dark / light)

Class-based on `<html>`: `dark` = dark mode. Priority: `localStorage 'theme'` → system
`prefers-color-scheme` → default dark. `index.html` has an inline script that sets the
class before first paint (no flash). `useTheme` returns `[theme, toggleTheme]`; `App`
passes them to `<Nav />`. Printing removes the `dark` class for the print job (App.jsx).

### Colour: use the semantic tokens
Components use token classes that swap under `html.dark` (defined in `src/index.css`):
```jsx
className="bg-plate text-ink border-line"      // panel, heading, hairline
className="text-body" / "text-muted"           // running text / meta (both pass AA)
className="bg-accent text-on-accent"           // orange fill, ink text
className="text-accent-ink"                    // small orange text (never text-accent)
```
Raised surfaces on a dark plate use `dark:bg-tile` (metric tiles, process steps,
credential cards) and `dark:bg-key` (chips, knobs, small keys); light mode uses
`bg-plate`. Prefer a token to a raw colour; a raw colour class still needs a `dark:` twin. Custom CSS
classes can't use `dark:`; put dark overrides next to them in `globals.css` using
`html.dark`. Custom classes that set `display` (`.label-key`, `.plate-tab__meta`,
buttons) beat Tailwind's responsive `hidden`: hide a wrapper element instead.

---

## Design system (summary — full rules in DESIGN.md)

- Logos: `CompanyLogo` inlines the SVGs from `src/assets/logos/` and recolours only the neutral parts to the theme colour (brand colours kept); three placements only (Hero strip, Experience rows, case-study header). See DESIGN.md §4.
- Sticky PageBar under the nav on inner pages (nav is a fixed `h-16`; the bar is `top-16`). `html, body` use `overflow-x: clip` — `hidden` would break `position: sticky`.
- Each section is a `.plate` with a `<SectionHeader num title meta lede />` tab; recessed areas use `sunk`; buttons are keys (`.cta-btn-*`), social links are knobs. `card-lift` only on clickable cards. No `backdrop-filter` anywhere.
- Nothing below 12px (`text-xs`+); no `text-[10px]`.
- Global `:focus-visible` ring; `prefers-reduced-motion` disables all motion.
- Hero: a screwed plate in CSS Grid; the photo column has an explicit pixel width so text never bleeds into it. The photo is a framed print with the current role as a sticker (md+); phones show the role as a line above the name and a round face crop. Mobile order is text → proof → actions, and the hero isn't forced to full height so the proof lands in the first screen. Never an "available for" pill. Location line: "Hyderabad, India · Open to conversations". The "Worked at" logo strip sits under the plate.
- Footer: the CTA is a contrast plate (eyebrow "Open to conversations", headline "Want to talk?"); then the social knobs and a colour stripe. CTAs use `<ArrowUpRight />` / `<ArrowRight />` (SVG, not the `↗` character — iOS renders it as an emoji).

---

## Current Employer Content (Heineken) — confidentiality rules

The Heineken role (Jun 2026 – present) is described at a deliberately high level:

- **Scope, not results.** No outcome metrics until real, publicly shareable ones exist.
- **Credit accurately.** The platform was built by another team; the role contributed SIT, UAT, pilot launch and hypercare, and now shapes roadmap and analytics alongside a Senior Product Owner and a Business Analyst. Never phrase it as sole ownership.
- **Don't name internal tools/vendors** (e.g. the analytics product) until cleared.
- **Logo:** only the official Heineken asset, exact to the original — none in the repo yet.
- The homepage OG image is intentionally employer-free so it never goes stale.
- `data/currently.js` is illustrative — the owner should review and edit it.
