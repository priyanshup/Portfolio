# Tech Debt Log

Tracks identified tech debt, when it was fixed, and what changed.

---

## Resolved

### 2026-06-29

#### 1. Dead file — `MobileMenu.jsx` deleted
- **File:** `src/components/layout/MobileMenu.jsx` (deleted)
- **Problem:** 103-line component that was never imported anywhere. Nav.jsx built its own inline mobile dropdown, leaving MobileMenu as orphaned code. It also had a different `NAV_LINKS` array (different order, included `#testimonials`) — evidence it had drifted from the real nav.
- **Fix:** Deleted the file entirely.

---

#### 2. Light-mode border bug — `CoreDNA.jsx`
- **File:** `src/sections/CoreDNA.jsx:37`
- **Problem:** `border-t border-gray-900` — hardcoded dark-gray border with no `dark:` prefix. In light mode, the section rendered a near-black top border against a white background (wrong).
- **Fix:** `border-t dark:border-gray-900 border-slate-100` — matches every other section.

---

#### 3. Light-mode border bug — `StatsBar.jsx`
- **File:** `src/sections/StatsBar.jsx:16`
- **Problem:** `border-y border-gray-900` — same issue as CoreDNA. No `dark:` prefix meant a very dark border in light mode.
- **Fix:** `border-y dark:border-gray-900 border-slate-100`

---

#### 4. iOS scroll-lock bug — `ViewMoreModal.jsx`
- **File:** `src/components/modals/ViewMoreModal.jsx`
- **Problem:** Used `overflow: hidden` on `body` + `html` to lock background scroll when the modal was open. iOS Safari ignores `overflow: hidden` on `body` for momentum scroll, so the background page scrolled through the modal.
- **Fix:** Adopted the same `position: fixed` + `top: -scrollY` pattern already used in `TestimonialModal.jsx`. On close, styles are restored and `window.scrollTo(0, scrollY)` puts the user back exactly where they were.

---

#### 5. 30-second hover-resume timeout — `Carousel.jsx`
- **File:** `src/components/ui/Carousel.jsx`
- **Problem:** `onMouseLeave` for discrete carousels set `hovPaused = false` after a 30-second `setTimeout`. This meant hovering a discrete carousel would pause autoplay, and after the mouse left it would take 30 seconds to resume. The `hoverRef` was only used to hold this timer ID.
- **Fix:** Removed the timeout entirely — `onMouseLeave` now calls `setHovPaused(false)` directly. Removed the now-unused `hoverRef` ref. Also cleaned up the `clearTimeout(hoverRef.current)` call in `onMouseEnter`.
- **Note:** In practice no discrete carousel currently uses `autoPlay={true}`, so this never fired. But it was a silent trap for future additions.

---

#### 6. Missing `noreferrer` on external links — `Nav.jsx`
- **File:** `src/components/layout/Nav.jsx`
- **Problem:** Social icon links used `rel="noopener"` without `noreferrer`. `noreferrer` prevents the `Referer` header from being sent to external sites (so LinkedIn/GitHub/etc. don't see the portfolio URL as a referrer). It also implies `noopener` in modern browsers. `Certifications.jsx` already used `noreferrer` — this was an inconsistency.
- **Fix:** Both the desktop social links and the mobile dropdown social links now use `rel="noopener noreferrer"`.
- **Correction (2026-07-09):** this fix only ever touched `Nav.jsx`. `Footer.jsx`'s 4 social icon links had the identical `rel="noopener"` gap and were missed at the time — found during the recruiter/UX sprint's review, approved as a follow-up, and fixed. See session 3, #19 below.

---

#### 7. Resize listener replaced with `matchMedia` — `useIsMobile.js`
- **File:** `src/hooks/useIsMobile.js`
- **Problem:** Listened to `window.resize` which fires on every pixel of resize (very noisy). The hook is called 6+ times independently across sections, each registering its own listener.
- **Fix:** Switched to `window.matchMedia('(max-width: 639px)')` with a `change` listener. The `change` event only fires when the breakpoint is crossed, not on every resize pixel. Each hook instance still has its own listener (no context added — YAGNI), but the frequency of callbacks is dramatically lower.

---

#### 8. Resize listener replaced with `matchMedia` — `useItemsPerView.js`
- **File:** `src/hooks/useItemsPerView.js`
- **Problem:** Same `resize` listener issue. Used a `useCallback` `get()` function that was re-evaluated on every resize event.
- **Fix:** Switched to two `matchMedia` queries (`max-width: 639px` for mobile, `max-width: 1023px` for tablet). A single `handler` re-calls `get()` when either breakpoint crosses. `get` is `useCallback`-wrapped on `[desktop, tablet, mobile]` props so re-registration is correct if props change.

---

#### 9. Third-party fallback image URL — `Hero.jsx`
- **File:** `src/sections/Hero.jsx:98`
- **Problem:** `onError` handler fell back to `https://via.placeholder.com/400x500?...` — a third-party service that could go down. If `me.jpg` ever failed to load, the fallback would also fail (or resolve to a generic placeholder that looks broken in prod).
- **Fix:** `onError` now hides the image element (`e.target.style.display = 'none'`) rather than replacing it with a third-party URL. The photo frame remains visible, which is acceptable given `me.jpg` is a static local asset.

---

#### 10. Hand-rolled section header + stale "Publishing Soon" badge — `CaseStudies.jsx`
- **File:** `src/sections/CaseStudies.jsx`
- **Problem:** Every other section uses `<SectionHeader eyebrow title subtitle>`. CaseStudies built its own header HTML manually, breaking the uniform pattern. It also rendered a yellow "Publishing Soon" badge and the subtitle "Full written case studies are in progress." — both stale since all 5 case studies are now published.
- **Fix:** Replaced the custom header block with `<SectionHeader eyebrow="Deep Dives" title="Case Studies" subtitle="Structured accounts of the problem, the approach, and what actually shipped." />`. Removed the stale badge and outdated subtitle.

---

---

### 2026-06-29 (session 2)

#### 11. Testimonial modal arrow hit area too small on desktop
- **File:** `src/components/modals/TestimonialModal.jsx`
- **Problem:** Prev/next arrow buttons were `w-10 h-12` (40×48px) positioned at `left-2`/`right-2`, vertically centred. Tiny click target, especially on desktop where a mouse cursor requires precision.
- **Fix:** On `md+` screens, buttons expand to full card height (`md:h-full md:top-0 md:translate-y-0`) and anchor flush to the card edges (`md:left-0` / `md:right-0`, `md:w-12`). Mobile behaviour is unchanged (still centred, small, swipe-first).
- **z-index note:** The header div and dots div both received `relative z-20` to stay interactive above the full-height arrow buttons (`z-10`). Without this, the close button and dot indicators would have been blocked by the arrows.

---

### 2026-07-09 (session 3) — found during the recruiter/UX sprint's WCAG + consistency audits

#### 12. WCAG AA contrast failure — `WorkExperience.jsx` "Current" badge
- **File:** `src/sections/WorkExperience.jsx:95`
- **Problem:** `border-green-400/30 text-green-400 bg-green-400/10` had no `dark:`/light: split — the same bright green-400 rendered in both themes. Computed contrast against white cardBg in light mode: ~1.74:1 (needs 4.5:1) — the badge text was nearly invisible in light mode.
- **Fix:** Applied the already-correct `dark:text-green-400 text-green-700 dark:border-green-400/30 border-green-700/40 dark:bg-green-400/10 bg-green-700/10` pairing that `src/data/timeline.js`'s `typeStyle.current` already used for the same "current" concept — computed contrast for green-700 on white: ~5.01:1, passes.

#### 13. WCAG AA contrast failure — accordion `ChevronDown` icon
- **File:** `src/components/ui/Icons.jsx`
- **Problem:** Unguarded `text-gray-400`, no light-mode value. Computed contrast on white cardBg: ~2.54:1 (needs 3:1 for a UI icon) — too faint in light mode.
- **Fix:** `dark:text-gray-400 text-slate-600`, matching the sibling `LockIcon`'s existing pattern two lines above it.

#### 14. Visual inconsistency — `CoreDNA.jsx` card radius
- **File:** `src/sections/CoreDNA.jsx`
- **Problem:** `rounded-3xl` — the only card on the site not using the `rounded-2xl` convention every other section (Projects, ImpactStories, Testimonials, CaseStudies, Certifications, CareerJourney, WorkExperience) uses. CLAUDE.md explicitly documents `rounded-3xl` as rejected ("too bubbly").
- **Fix:** Changed to `rounded-2xl`.

#### 15. Visual inconsistency — case-study-page tag chip color
- **File:** `src/pages/CaseStudyPage.jsx`
- **Problem:** The tag chips in the case study header used `dark:text-white text-slate-800`, while the visually identical chip is used with `dark:text-gray-400 text-slate-600` everywhere else it appears (`CaseStudies.jsx`, `Projects.jsx`, `WorkExperience.jsx`).
- **Fix:** Aligned to `dark:text-gray-400 text-slate-600`.

#### 16. Visual inconsistency + contrast gap — `Carousel.jsx` inactive dot indicator
- **File:** `src/components/ui/Carousel.jsx`
- **Problem:** Unguarded `bg-gray-700 hover:bg-gray-500`, no light-mode value — would render as a dark dot on a white card in light mode, and didn't match the equivalent dot in `TestimonialModal.jsx`, which already correctly uses `dark:bg-gray-700 bg-slate-300`.
- **Fix:** Applied the same `dark:bg-gray-700 bg-slate-300` pairing.

#### 17. Visual inconsistency — `ViewMoreModal` eyebrow size
- **File:** `src/components/modals/ViewMoreModal.jsx`
- **Problem:** `text-[10px]` for the modal's section eyebrow, while every other section-level eyebrow site-wide (`SectionHeader.jsx`, `Footer.jsx`, `CaseStudyPage.jsx`) uses `text-xs`.
- **Fix:** Changed to `text-xs`.

#### 18. `document.title` never reset after leaving a case study page
- **File:** `src/App.jsx`, `src/pages/CaseStudyPage.jsx`
- **Problem:** `App.jsx`'s title-setting effect had an empty dependency array — it ran once on initial mount and never again. `CaseStudyPage.jsx` updated `document.title` per case study but had no cleanup. Net effect: navigating from a case study back to the homepage left the case study's title in the browser tab indefinitely.
- **Fix:** `CaseStudyPage.jsx`'s title effect now has a cleanup function that restores `CONFIG.siteTitle` (and the default meta description/canonical) on unmount. Found while implementing backlog item 7 (metadata); fixed as part of the same change since it's the same code path.

#### 19. `Footer.jsx` social links still missing `noreferrer` (gap in #6's original fix)
- **File:** `src/components/layout/Footer.jsx`
- **Problem:** Entry #6 above (2026-06-29) recorded the `rel="noopener"` → `rel="noopener noreferrer"` fix as covering "desktop social links and mobile dropdown," but that fix only touched `Nav.jsx`. `Footer.jsx`'s 4 footer-zone social icon links (LinkedIn, GitHub, Instagram, Facebook) had the identical gap and were never updated — found during this sprint's review, flagged for approval, approved, and fixed.
- **Fix:** `rel="noopener"` → `rel="noopener noreferrer"` on `Footer.jsx`'s social icon row.

---

### 2026-09-25 (session 4) — post-audit fixes alongside the Heineken role update

#### 20. Social preview image was a 96×96 copy of the logo
- **File:** `public/og-image.png`
- **Problem:** Byte-identical to `logo.png` (96×96) while `index.html` declared 1200×630. Every LinkedIn/Slack/X share would have shown a tiny logo instead of a card.
- **Fix:** Regenerated as a real 1200×630 card (dark theme token background, name, title, domains, URL). Added `scripts/generate-og-image.ps1` so it can be rebuilt reproducibly, added `og:image:alt` / `twitter:image:alt`, and rewrote the stale `index.html` comment (it still told the reader to use the retired Syne font). The card is intentionally employer-free so it never goes stale.
- **After deploy:** force a re-scrape at linkedin.com/post-inspector — LinkedIn caches OG data heavily.

#### 21. CI skipped the resume-file guard and didn't lint
- **Files:** `.github/workflows/deploy.yml`, `package.json`
- **Problem:** The GitHub Action ran only `npm run build`. The `predeploy` guard (`scripts/check-resume.js`) only runs via `npm run deploy`, so the Action — the path that actually ships on every push to `main` — never ran it. Lint wasn't run anywhere. There were also two independent deploy paths (Action and `gh-pages` CLI) both writing to `gh-pages`, and no PR checks.
- **Fix:** New `npm run verify` (`check-resume.js` + `eslint .`), used by both `predeploy` and CI. CI now: `npm ci` (reproducible, was `npm install`) → `verify` → `build` → deploy. Runs on PRs too (deploy step gated to `push`), and a `concurrency` group stops two runs racing on `gh-pages`. CI is documented as the canonical path; `npm run deploy` stays as a manual fallback with a "don't run both" note.

#### 22. Two ESLint errors — refs read during render (`useIsMobile`, `useItemsPerView`)
- **Files:** `src/hooks/useIsMobile.js`, `src/hooks/useItemsPerView.js`, new `src/hooks/useMediaQuery.js`, `src/components/ui/Carousel.jsx`
- **Problem:** Both hooks seeded `useState` from `mediaQuery.current` (react-hooks/refs error), and `useItemsPerView` also had two cleanup-ref warnings. Lint was failing, so it couldn't be made a CI gate.
- **Fix:** Rebuilt on a small `useMediaQuery(query)` hook using `useSyncExternalStore` — no refs, same behaviour (value read at first render, `change` event only fires when a breakpoint is crossed, `false` server snapshot). Removed one unused `eslint-disable` directive in `Carousel.jsx`. `eslint .` now exits clean.

#### 23. Documentation drift
- **Files:** `README.md`, `CLAUDE.md`
- **Problem:** README still listed Syne + DM Sans (CLAUDE.md says never reintroduce them); README listed StatsBar as a continuous carousel with a `disableSwipe` note (it's been a static grid); CLAUDE.md listed the deleted `MobileMenu`; CLAUDE.md's StatsBar/CareerJourney layout rows and Hero/Footer copy were out of date; nothing mentioned Heineken.
- **Fix:** Corrected all of the above, documented the CI/deploy flow and the OG-image script, and added a "Current Employer Content (Heineken) — confidentiality rules" section to CLAUDE.md.

#### 24. Mislabelled stats in `stats.js`
- **File:** `src/data/stats.js`
- **Problem:** "50+ Engg. Leaders" was really the 50+ members across 5 Scrum teams at Techmojo (mostly engineers, not leaders); "25K+ Platform DAU" is "active users acquired after expansion" in the Techmojo case study, not daily-active users; "Rev Growth" omitted its qualifier.
- **Fix:** Relabelled to "Team Members Led", "Active Users Acquired", "Revenue Growth Post-MVP". Grid moved from 6 to 8 stats (4 columns × 2 rows) with the Heineken and VidaXL conversion stats added.

---

### 2026-09-25 (session 5) — design revamp (see BACKLOG › Design Revamp Sprint and DESIGN.md)

#### 25. Accessibility failures across the site
- **Files:** `src/styles/globals.css`, `src/index.css`, most components
- **Problem:** Primary buttons were white text on `#10b981` in dark mode (2.5:1); 38 uses of `text-[10px]` and 3 of `text-[11px]` (px, so they ignored browser text-size settings); no designed focus ring; no `prefers-reduced-motion` handling (auto-scrolling marquee + reveals); 6px carousel/modal dots as tap targets; light-mode `slate-500` (4.3:1) and dark-mode `gray-500` (3.6:1) small text; a mobile menu that claimed `aria-modal` without a focus trap; no `<main>` landmark and an h1→h3 heading jump on inner pages.
- **Fix:** Dark text on emerald in dark mode; a 12px (rem) floor; global `:focus-visible` ring; a reduced-motion block that disables all animation; controls ≥ 44px; contrast-safe greys and `dark:text-accent text-emerald-800` on tinted pills; the menu is a non-modal disclosure that returns focus on Escape; real `<main>` and correct heading levels. The hamburger-to-X morph was also broken (`.hbar:nth-child(n)` outranked `.hbar-n-open`, so the close icon rendered as a chevron) — selectors now `.hbar.hbar-n-open`. Lighthouse (mobile) accessibility: 100 on the homepage, `/work` and a case study.

#### 26. Glass blur on every card
- **Files:** `src/index.css`, `src/styles/globals.css`
- **Problem:** `.bg-cardBg { backdrop-filter: blur(16px) }` (plus a second rule at 18px, a noise overlay and three body gradients) on all 35 cards. Blur on content containers hurts legibility hierarchy and low-end phone performance.
- **Fix:** Opaque card tokens; blur only on the floating layer (nav, mobile menu, scroll-to-top, back button). `globals.css` was rewritten and ~10 unused rule blocks (timeline, acts grid, glass badge/metric, car-arrow, modals, locked overlay…) were deleted.

#### 27. Overlays: scroll-lock hacks and router-state juggling
- **Files:** deleted `ViewMoreModal.jsx`, `TestimonialModal.jsx`, `useFocusTrap.js`; `CaseStudies.jsx` `fromOverlay` logic
- **Problem:** Two modals each carried an iOS `position: fixed` scroll-lock, a focus trap and, for case studies, `fromOverlay` state passed through router history to re-open the overlay. Content in a closed modal is also not in the DOM for screeners.
- **Fix:** Overflow is now a page (`/work`) or an inline expand (recommendations, "Earlier roles"). All of that code is gone.

#### 28. Duplicated content across five data files
- **Files:** deleted `experience.js`, `timeline.js`, `stats.js`, `caseStudies.js`, `projects.js`, `impactStories.js`; added `roles.js`, `work.js`, `currently.js`
- **Problem:** Roles lived in two files and had already drifted ("4 roles" stayed on the page after a fifth was added); VidaXL work was described in 6 places; case studies/projects/impact stories were three parallel lists.
- **Fix:** One `roles` list and one `work` list; years of experience, the Hero badge and the Hero proof points are derived. Section sizes are constants in `src/config/index.js`.

#### 29. Dead code from the carousel era
- **Files:** deleted `Carousel.jsx`, `useItemsPerView.js`, `useIsMobile.js`, `useMediaQuery.js`
- **Problem:** Once every section stopped using carousels, these were unreferenced. (`useIsMobile`/`useItemsPerView` are the hooks whose lint errors were fixed in #22 earlier the same day; they no longer exist, so that fix is moot.) Unused icons (`LockIcon`, `CloseIcon`, `MenuIcon`) were removed too.

#### 30. Case study components
- **File:** `src/content/case-studies/components.jsx` and the 5 case studies
- **Problem:** `MetricRow` used a fixed 3-column grid, so 4 metrics left an orphan; the headline metric was printed in both `<AtAGlance>` and `<MetricRow>` (and the title), so "3 days" appeared three times in the first screen; 10px labels.
- **Fix:** `MetricRow` picks 1–4 columns and spans an odd last item on mobile; `<AtAGlance>` no longer takes `primaryMetric`; labels ≥ 12px.

#### 31. Fonts loaded from Google at runtime
- **Files:** `src/styles/globals.css`, `src/main.jsx`, `package.json`
- **Problem:** A CSS `@import` from fonts.googleapis.com — a third-party request on every visit and a render-blocking chain.
- **Fix:** Self-hosted with `@fontsource` (Plus Jakarta Sans variable, Inter variable, IBM Plex Mono 400/500/700); bundled into `dist/` by Vite.

#### 32. Breadcrumb scrolled away; back button only reached the top level
- **Files:** `src/components/ui/PageBar.jsx` (new, replaces `Breadcrumb.jsx`), `CaseStudyPage.jsx`, `WorkPage.jsx`, `WorkRow.jsx`, `globals.css`
- **Problem:** The trail was static and scrolled off-screen; the only persistent control was a floating button that always went to "Portfolio" (top), never to the Work section or the All-work list.
- **Fix:** A sticky bar under the nav (nav is a fixed `h-16`, bar is `top-16`) with every level linked, plus reading progress. Links into a case study carry `state.from`, so the trail leads back to where the reader came from. The floating button, its IntersectionObserver logic and `.floating-back-btn` CSS were deleted.

#### 33. `overflow-x: hidden` on `html, body` broke `position: sticky`
- **File:** `src/styles/globals.css`
- **Problem:** `overflow-x: hidden` turns the element into a scroll container, so sticky elements never stick. Found because the new PageBar scrolled away in testing.
- **Fix:** `overflow-x: clip` (with a `hidden` fallback for old browsers). Don't reintroduce `hidden` on html/body.

#### 34. Unequal-height recommendation cards
- **File:** `src/sections/Recognition.jsx`
- **Problem:** Cards used `self-start`, so each was as tall as its own text; attribution lines sat at different heights.
- **Fix:** Grid stretch with `flex` cards, attribution pinned to the bottom with a shared minimum height so the hairlines align.

#### 35. Case studies had no skim layer
- **Files:** `src/content/case-studies/components.jsx`, all five `index.jsx`, `CaseStudyPage.jsx`
- **Problem:** `<AtAGlance>` gave role/team/timeline but not the story (problem → what I did → result → takeaway) in one place, and the header blurb duplicated it.
- **Fix:** `<Snapshot>` (plain-language line + the four beats + facts), authored from each study's own text; header blurb removed (it remains the meta description).

#### 36. Icons and buttons were inconsistent
- **Files:** `src/components/ui/Icons.jsx`, `src/styles/globals.css`, several sections
- **Problem:** Icon sizes ranged 12–20px with mixed 2 / 2.5 strokes, no `className` on most, not marked decorative; buttons had no pressed/disabled state; several text buttons and filter chips were under 44px; filter chips and text links were hand-styled in each file.
- **Fix:** One icon convention (decorative, 1.75 stroke, 20/16px, `className`); `.cta-btn-*` gained `:active`/`:disabled`; new `.chip-toggle` and `.link-accent`; touch targets ≥ 44px.

#### 37. Employer logos (new asset handling)
- **Files:** `src/assets/logos/*.svg`, `src/components/ui/CompanyLogo.jsx`
- **Note:** Originals are supplied in one fixed colour each (black, white, or white-on-green) and would vanish on one theme. `CompanyLogo` inlines them (`?raw`), strips ids/titles/clip-paths/global `<style>` (avoids duplicate ids and CSS leaking), and recolours only neutral parts to `currentColor`. Uses `dangerouslySetInnerHTML` on **our own bundled files only** — never feed it user content.

#### 38. Accessibility audit in both themes
- **Files:** `scripts/a11y-audit.mjs`, `package.json` (`axe-core` dev dependency, `npm run a11y`)
- **Finding fixed:** the light-mode "Current" badge on Experience rows was 4.32:1 (`text-green-700` on its tint) → `text-green-800`. Result: 0 axe violations across homepage, `/work` and two case studies at 1280px and 390px in dark and light.

#### 39. Site copy read as machine-written
- **Files:** `src/data/*`, `src/content/case-studies/*`, sections, pages, `index.html`, `scripts/copy-check.mjs`
- **Problem:** Em dashes as connectors everywhere, "not X but Y" and "the most important lesson" constructions, forced triads, Title Case headings, "How might we…" questions, decorative eyebrows and arrows, stock words ("landscape", "leverage", "meets"), and a horizontal rule between every case-study section.
- **Fix:** Rewritten with the humanizer rules, keeping every fact. Role titles no longer use " — " as a separator (`roleShort` splits on ", "). `npm run copy` now flags the mechanical tells; voice rules are in DESIGN.md §4c. Testimonials stay verbatim.

---

## Open / Future

- **`data/currently.js` was drafted, not written by the owner.** Review and edit (BACKLOG #4a).
- **The Lighthouse gate in CI is untested.** It ran fine locally against the same config; the first pull request will show whether the `treosh/lighthouse-ci-action` step behaves on GitHub's runners (it only runs on pull requests, so it can't block a deploy).
- **Google Analytics is the largest performance cost** (~165 KB `gtag.js`). Tracked as BACKLOG #27.
- **`robots.txt` / `sitemap.xml` are not at the domain root** (they live under `/Portfolio/`), so crawlers ignore them. Tracked with prerender/custom domain (BACKLOG #12, #19).
- **`highlight` fields in `testimonials.js` must stay verbatim** — nothing enforces this at build time.
