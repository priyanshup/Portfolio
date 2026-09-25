# Priyanshu Pushpam — Portfolio

Personal portfolio website for Priyanshu Pushpam, Technical Product Leader with 10 years of experience across healthcare, gaming, and e-commerce — currently Product Owner, Digital Commerce at Heineken.

**Live site:** [priyanshup.github.io/Portfolio](https://priyanshup.github.io/Portfolio/)

Design rules, section budgets and the "adding things" playbook are in [DESIGN.md](DESIGN.md). Architecture notes for contributors (and AI assistants) are in [CLAUDE.md](CLAUDE.md).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Routing | React Router v7 (HashRouter) |
| Fonts | Plus Jakarta Sans · Inter · IBM Plex Mono — self-hosted via `@fontsource` |
| Analytics | Google Analytics 4 |
| Deployment | GitHub Pages — GitHub Actions on push to `main` (manual fallback: `npm run deploy`) |

---

## Project Structure

```
src/
├── App.jsx                         # Router + HomePage composition
├── main.jsx                        # Entry — fonts, CSS, HashRouter
├── index.css                       # Tailwind + theme tokens (dark/light)
├── config/index.js                 # Site settings + section budgets
│
├── data/                           # ALL content — edit these to change what's shown
│   ├── roles.js                    # Career roles (newest first)
│   ├── work.js                     # Case studies, projects, impact stories
│   ├── testimonials.js             # Recommendations
│   ├── certifications.js
│   ├── dna.js                      # "What I bring"
│   └── currently.js                # "Currently"
│
├── sections/                       # Homepage sections (order = App.jsx)
│   ├── Hero.jsx  Work.jsx  Experience.jsx  WhatIBring.jsx  Recognition.jsx  Currently.jsx
│
├── pages/
│   ├── CaseStudyPage.jsx           # /#/case-studies/:slug
│   └── WorkPage.jsx                # /#/work
│
├── components/
│   ├── layout/                     # Nav, Footer
│   ├── work/WorkRow.jsx
│   └── ui/                         # BrandLogo, CompanyLogo, PageBar, Icons, ScrollToTop, SectionHeader, Tag
│
├── assets/logos/                   # Original employer SVGs (unmodified)
├── content/case-studies/           # Full written case studies (+ shared components.jsx)
├── hooks/                          # scroll reveal/tracking, active section, document meta, theme
├── utils/                          # analytics, initials
└── styles/globals.css              # Custom CSS

public/                             # me.jpg, logo.png, og-image.png (1200×630), resume PDF, robots, sitemap, 404.html
scripts/                            # check-resume.js · generate-og-image.ps1 · smoke-test.mjs · a11y-audit.mjs
.github/workflows/deploy.yml        # CI: verify → build → (PR: Lighthouse a11y gate) → (push: deploy)
```

---

## Local Development

```bash
npm install --legacy-peer-deps   # install dependencies
npm run dev                      # dev server → http://localhost:5173/Portfolio/  (the /Portfolio/ base matters)
npm run build                    # production build → dist/
npm run preview                  # serve the production build locally (also under /Portfolio/)
npm run verify                   # resume-file check + ESLint (what CI runs)
npm run smoke                    # 46 end-to-end checks in a headless browser (dev server must be running)
npm run a11y                     # axe-core audit, dark + light, desktop + mobile (dev server must be running)
```

`npm run smoke` needs Chrome, Edge or Chromium (set `CHROME_PATH` if it isn't auto-detected) and `BASE_URL` if your dev server isn't on port 5173.

---

## Common Tasks

All content lives in `src/data/`. Section sizes ("budgets") live in `src/config/index.js` — the homepage stays the same length however much you add; extra items go to the `/work` page or an inline expander.

- **Add a role:** put it **first** in `roles.js`; set the previous role's `current: false` and its `end`.
- **Add a case study:** add an item to `work.js` (with `slug` and `readMinutes`) and create `src/content/case-studies/<slug>/index.jsx`. Use `featured: true` only for the 3 flagship items.
- **Add an impact story or project:** an item in `work.js` without a `slug` (shows on `/work`).
- **Add a recommendation:** `testimonials.js` — paste the full text and set `highlight` to one **verbatim** sentence from it.
- **Add a certification:** `certifications.js`.
- **Update "Currently":** `currently.js` (bump `updated`).
- **Change social links / resume path:** `src/config/index.js`; the PDF in `public/` must match `CONFIG.resumeUrl` (the deploy guard checks this).
- **Reorder homepage sections:** the `HomePage` component in `src/App.jsx`.

---

## Theme System

Dark and light mode, stored in `localStorage` under `'theme'`. Priority on load: `localStorage` → system preference → dark. Class-based: the `dark` class on `<html>`; an inline script in `<head>` sets it before first paint. The toggle is in the nav.

When adding theme-aware styles: every hard-coded colour class needs both `dark:` and light values; token classes (`bg-darkBg`, `bg-cardBg`, `text-accent`) adapt automatically. Custom CSS classes can't use `dark:` — add `html:not(.dark)` overrides next to them in `globals.css`.

---

## Interactive Behaviours

- **Experience accordion:** one open at a time, newest role open by default. `setOpen(i)` fires first, then `scrollIntoView` after the 400ms expansion so the row lands cleanly under the nav. Collapsed panels are `inert`.
- **Recommendations:** each card shows a one-line highlight; "Read full recommendation" expands it in place; one "Show all N" button reveals the rest. No modal.
- **Work:** the homepage shows the featured items; "All work (N)" opens `/#/work`, which filters by domain (`?domain=`), so a filtered view is linkable.
- **Inner pages:** a sticky bar under the nav shows the full trail (Portfolio / Work or All work / page) with every level clickable, plus a reading-progress line on case studies. The trail follows where you came from.
- **Case studies** open with "The short version" — a plain-language line, then problem / what I did / result / takeaway — before the long-form detail.
- **Employer logos** are inlined theme-aware SVGs (Hero strip, Experience rows, case-study header); the originals are in `src/assets/logos/`. Logos are trademarks of their owners.
- **Nav:** section links use router state (not `#anchors`) so they work from every page; the link for the section in view is underlined.
- **Accessibility:** skip link, global focus ring, reduced-motion support, 44px tap targets, print stylesheet (always prints dark-on-white).

---

## Deployment

**Normal path — CI.** Every push to `main` runs `.github/workflows/deploy.yml`: `npm ci` → `npm run verify` → `npm run build` → deploy to the `gh-pages` branch. Pull requests run the same checks plus a Lighthouse accessibility gate (≥ 95, see `.lighthouserc.json`) and never deploy. CI is the canonical path.

**Manual fallback.** `npm run deploy` runs `verify`, `build`, then pushes `dist/` via the `gh-pages` package. Don't run both for the same commit — they both write to `gh-pages`.

### Social preview image

`public/og-image.png` must be 1200×630 (the size `index.html` declares) and must not be a copy of `logo.png`. Regenerate it with:

```bash
powershell -ExecutionPolicy Bypass -File scripts/generate-og-image.ps1
```

The card is deliberately evergreen (name, title, domains — no employer or dates). After deploying, force a LinkedIn cache refresh at [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/).

---

## Notes

- **NDA:** No proprietary screenshots, internal dashboards, or client data are included anywhere in this repository. All project descriptions use publicly shareable outcomes and metrics consistent with the resume. For the current employer (Heineken) keep descriptions high-level and role-scoped; do not name internal tools, vendors, or unreleased features without clearance.
- **Image protection:** The profile photo (`me.jpg`) has right-click and drag prevention applied at the component level. This does not prevent access via browser DevTools.
- **HashRouter:** All URLs use the `/#/...` format, required for GitHub Pages compatibility (no server-side routing). Moving to path-based routes plus prerendering is tracked as BACKLOG #12.
- **Peer dependency note:** `@tailwindcss/vite@4.x` declares a peer dependency on `vite@^5–7`. This project runs on `vite@8`, which is functional but triggers a peer resolution warning. Use `--legacy-peer-deps` to install without errors.
