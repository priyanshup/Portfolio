# Portfolio Backlog

## How to use this file
Add new ideas here as they come up.
Review and reprioritize before each work session.
Mark items [DONE] when shipped, don't delete them — they serve as a changelog.

---

## 🔴 High Priority (Do Next)

These directly impact hiring manager experience or have highest signal value.

1. **Calendly / booking link in CTA** — Wire up a direct booking link for a 20-min intro call alongside the existing contact options.
   *Why: Removes friction, signals confidence.*

2. **Product teardown section** — A short analysis of 1-2 products (healthcare tech, e-commerce, or gaming domains). What's working, what's broken, what you'd change and why.
   *Why: Most-asked thing in PM interviews. Almost no one puts it in their portfolio.*

3. **"How I work" section** — 3-4 honest paragraphs about working style: how you run discovery, write specs, communicate with engineering. Not a skills list — behaviour description.
   *Why: Recruiters use this for culture fit assessment before a phone screen.*

---

## 🟡 Medium Priority (Do Soon)

Good additions that build trust and polish.

4. **"Currently" section** — 4-5 lines on what you're reading, building, or thinking about in product right now. Update every 1-2 months.
   *Why: Makes portfolio feel alive, not a static CV.*

5. **Password-protected case studies** — A locked card with "Request access" for sensitive work too good to omit but too detailed to publish fully.
   *Why: Lets you share selectively with serious candidates. Relevant for deeper or confidential UHG work.*

6. **Domain filter on case studies** — Filter by domain (Healthcare / E-commerce / Gaming) or skill type (Discovery / GTM / Automation).
   *Why: High utility once 6+ case studies exist. Currently at 5 — build when ready.*

7. **VidaXL product teardown** — Since VidaXL context is freshest, write one teardown of an e-commerce product you know well.
   *Why: Easiest first teardown given recent domain depth. Natural companion to the existing VidaXL case study.*

---

## 🟢 Low Priority (Someday / Maybe)

Worth considering depending on goals.

8. **Video intro** — 60-90 second selfie video. Memorable in a way text isn't.
   *Why: High effort, high payoff — but only for senior/Head of Product applications where presence is explicitly evaluated.*

9. **Writing / essays section** — Short 300-word takes on product topics you have opinions on.
   *Why: Builds authority fast IF maintained. An empty or stale blog is worse than none. Only add if you'll actually write.*

---

## ⚪ Decided Against (and Why)

- **"Tools I use" list** — Reads like a CV, adds no narrative. Skipped.
- **Heavy animations / interactions** — Portfolio is already clean. Over-engineering reads as a designer's portfolio, not a PM's. Skipped.
- **Blog section** — Only if consistently maintained. Risk of stale posts signalling neglect outweighs benefit. Deferred indefinitely.
- **Scroll-spy URL updates** — Dynamically updating the URL hash as user scrolls through sections. HashRouter conflict, browser history noise, no real shareable value for a portfolio. Rejected.

---

## 🔎 Needs Your Review (Not Yet Approved)

Found while working the sprint below. Not implemented — out of the approved scope for that sprint, flagged here for a decision before anyone touches them.

10. **Footer.jsx social links leak referrer** — `src/components/layout/Footer.jsx` still uses `rel="noopener"` (missing `noreferrer`) on the desktop social icon row. `TECH_DEBT.md` #6 recorded this exact issue as fixed, but that fix only touched `Nav.jsx` — `Footer.jsx` was never updated. One-line fix.
    *Why flagged, not fixed: not part of the 7 approved backlog items for the recruiter/UX sprint below.*

11. **Nav's global GitHub icon points to profile root, not Quor** — Since Quor was just made the one Featured/verifiable project (see sprint item 4 below), the Nav/Footer GitHub icon still links to the general GitHub profile rather than deep-linking to the Quor repo. Worth deciding deliberately either way.
    *Why flagged, not fixed: changing Nav's global social link behavior wasn't part of the approved Projects-section-only scope for item 4.*

12. **True social-preview fix for case study links** — `og:title`/`og:description`/`og:image` are still static in `index.html`; the per-page description/canonical added in this sprint only helps on-page correctness and JS-executing crawlers (Googlebot), not link-preview bots (LinkedIn, Slack, X), which don't run JS. Fixing that needs static prerendering or a serverless function per route.
    *Why flagged, not fixed: real infra change, bigger than "low-risk, no UI change."*

13. **Spacing-scale / card-title-size variance across sections** — CareerJourney/Certifications/CoreDNA/CaseStudies/Projects/Testimonials each use a slightly different card padding formula, and CareerJourney's card title (`text-base`) is noticeably smaller than every other section's card title (next smallest is `text-lg`). Real, but fixing it touches many files' sizing choices — closer to a design decision than a bug.
    *Why flagged, not fixed: item 6's brief was "fix only genuine inconsistencies, do not redesign" — this reads more like the latter.*

---

## ✅ Done

### Recruiter & UX Optimization Sprint (2026-07-09) — branch `recruiter-ux-sprint`

1. **Homepage recruiter experience** — [DONE]. Testimonials was already in `Nav.jsx`'s `NAV_LINKS` (no change needed — confirmed, not re-added). Added a work-preference line to Hero ("Hyderabad · Open to Bangalore & Remote") as its own quiet meta line below the tagline, not folded into the availability badge or credential tags.
   Files: `src/sections/Hero.jsx`, `src/components/ui/Icons.jsx` (new `IconPin`).

2. **Case study readability — "At a Glance" + visual storytelling** — [DONE]. Added two new reusable components, `<AtAGlance>` (recruiter 60-second summary: project summary, business problem, role, team, timeline, primary metric, tech stack) and `<ProcessFlow>` (visual step sequence mirroring each case study's own "My Approach" H3 headings). Applied identically to all 5 case studies. Deliberately did *not* build one of every diagram type listed in the brief (before/after, timeline, decision tree, etc.) per case study — two disciplined, reusable, theme-matched components applied uniformly beats five bespoke one-off diagrams for maintainability and consistency. "Key Results" (plural) was not duplicated inside `<AtAGlance>` — it's covered by the existing `<MetricRow>` that immediately follows, so the two together read as one spec sheet without repeating each other. All facts (team size, timeline, tech) were pulled only from what each case study's own text already states — where no explicit headcount/duration existed, a qualitative description was used instead of an invented number.
   Files: `src/content/case-studies/components.jsx` (new `AtAGlance`, `ProcessFlow`), and all 5 `src/content/case-studies/*/index.jsx`.

3. **Social proof presentation** — [DONE]. Reordered `testimonials.js` by a stated rule (direct-manager attestations first, recency as tiebreak, then decreasing directness of relationship) — no text was rewritten, only order changed. Added a monogram avatar (initials in an accent circle) and bolded the company name for stronger hierarchy, applied identically in both the card grid and the modal.
   Files: `src/data/testimonials.js`, `src/sections/Testimonials.jsx`, `src/components/modals/TestimonialModal.jsx`, `src/utils/initials.js` (new).

4. **Quor visibility** — [DONE]. Added a `featured: true` flag and moved Quor to position 2 in `projects.js` (right after the flagship VidaXL case), guaranteeing it a spot in the always-visible 4 cards instead of sitting behind "View All." Reused the existing `CaseStudyCard` left-accent-border pattern for the "featured" visual treatment instead of inventing a new one. **Trade-off for your review:** this bumps "Script Execution Automation Tool" (UHG) out of the default-visible set into "View All."
   Files: `src/data/projects.js`, `src/sections/Projects.jsx`.

5. **Accessibility** — [DONE]. Keyboard focus trap, focus restoration on modal close, and the skip-to-content link were **already implemented** before this sprint (`src/hooks/useFocusTrap.js`, `src/App.jsx`) — verified, not re-done. Ran a WCAG AA contrast audit and fixed 4 genuine failures: two in code written earlier in this same sprint (`dark:text-gray-500` on the new Hero work-preference line and `<AtAGlance>` field labels, ~3.6–4.0:1, bumped to `dark:text-gray-400`, ~6.9–7.6:1), and two pre-existing: the `WorkExperience.jsx` "Current" badge (`text-green-400` unguarded — ~1.74:1 in light mode, fixed by reusing the already-correct `timeline.js` `green-400`/`green-700` pairing) and the accordion `ChevronDown` icon (unguarded `text-gray-400` — ~2.54:1 in light mode, fixed by matching the sibling `LockIcon`'s pairing). None of the rejected items (pause control, hero image right-click, mobile swipe discoverability, extra nav items) were touched.
   Files: `src/sections/Hero.jsx`, `src/content/case-studies/components.jsx`, `src/sections/WorkExperience.jsx`, `src/components/ui/Icons.jsx`.

6. **Visual consistency audit** — [DONE]. Fixed 4 genuine inconsistencies found by a full-site grep audit: `CoreDNA.jsx`'s card used `rounded-3xl` (the one card on the site not using the documented `rounded-2xl` convention — CLAUDE.md explicitly calls `rounded-3xl` "too bubbly"); the case-study-page header tag chips used a different text color than the identical chip everywhere else; `Carousel.jsx`'s inactive dot indicator had no light-mode color at all (unguarded `bg-gray-700`, would render too dark on a white card, and didn't match `TestimonialModal`'s already-correct dot); `ViewMoreModal`'s eyebrow was `text-[10px]` where every other section-level eyebrow site-wide uses `text-xs`. Left several lower-confidence items unfixed (see "Needs Your Review" above) since they read as design decisions, not bugs.
   Files: `src/sections/CoreDNA.jsx`, `src/pages/CaseStudyPage.jsx`, `src/components/ui/Carousel.jsx`, `src/components/modals/ViewMoreModal.jsx`.

7. **Metadata & sharing** — [DONE]. Added `Person` JSON-LD structured data and a default canonical tag to `index.html`; added `public/robots.txt` and `public/sitemap.xml`. `CaseStudyPage.jsx` now updates `<meta name="description">` and `<link rel="canonical">` per case study (in addition to the `document.title` update it already did), and restores the homepage's defaults on unmount. **Bonus fix found while implementing:** `document.title` was never reset when navigating from a case study back to the homepage (`App.jsx`'s title-effect only ran once on initial mount) — the tab kept showing the case study's title. Fixed as part of the same change, since it's the same code path. See "Needs Your Review" above for what this does *not* fix (link-preview unfurling, hash-route crawlability).
   Files: `index.html`, `src/config/index.js` (new `siteUrl`/`siteTitle`/`siteDescription`), `src/App.jsx`, `src/pages/CaseStudyPage.jsx`, `public/robots.txt` (new), `public/sitemap.xml` (new).

---

## ✅ Done (Previous Sessions)

### Content & Features
- [DONE] Availability status badge — "Available for Strategic Technical Roles" with pulsing green dot in Hero (hardcoded; no data-file toggle added)
- [DONE] All 5 case studies published — VidaXL AI automation, Techmojo sportsbook GTM, UHG zero-downtime migration, UHG QA cycle automation, UHG claims transformation
- [DONE] Impact Stories section added (5 cards, VidaXL + UHG, reverse chronological)
- [DONE] Dark / light mode toggle with persistent glow, localStorage + system preference, flash prevention
- [DONE] Sai Kiran Marripati testimonial added
- [DONE] CLAUDE.md created and maintained as living codebase reference
- [DONE] Experience timeline corrected (VidaXL as most recent)

### UX & Interactions
- [DONE] Testimonial modal — left/right arrows, keyboard nav (ArrowLeft/ArrowRight), touch swipe, 150ms fade transition, dot position indicator
- [DONE] Testimonial modal arrow hit area — full card-height edge strip on desktop (md+); mobile unchanged (small centred button, swipe-first)
- [DONE] Testimonial modal swipe area — touch handlers on backdrop so swipe works anywhere on overlay, not just the card
- [DONE] Stats carousel drag — desktop mouse grab-to-scrub, mobile touch drag, hover-slow; auto-resumes 1.5s after release
- [DONE] Drag-to-scrub extended to Testimonials and CoreDNA desktop carousels
- [DONE] Mobile carousel seamless loop — `onTransitionEnd` property filter fix + `setTimeout(50)` re-enable for reliable silent snap on wrap
- [DONE] Carousel discrete snap jerk (card 1→2) — always use `calc()` form for transform so syntax is consistent between drag and snap states
- [DONE] WorkExperience accordion scroll — `setOpen` first, then `setTimeout(400)` + `scrollIntoView` after transition settles; reads final DOM layout

### Bug Fixes
- [DONE] Background page scroll when modal open on iOS — `position:fixed` + saved `scrollY` restore (replaces broken `overflow:hidden` approach)
- [DONE] Go-to-Top button URL hash not clearing — `replaceState('#/')` on click so a hard refresh after scrolling to top stays at the top

### Tech Debt
- [DONE] Deleted dead `MobileMenu.jsx` (never imported; Nav had its own inline dropdown)
- [DONE] Fixed light-mode border bugs in `CoreDNA.jsx` and `StatsBar.jsx` (missing `dark:` prefix on border classes)
- [DONE] Fixed iOS scroll-lock in `ViewMoreModal` — now uses `position:fixed` pattern, matching `TestimonialModal`
- [DONE] Removed 30-second hover-resume timeout in `Carousel` — resume is now immediate on mouse leave
- [DONE] Added `noreferrer` to all `target=_blank` social links in `Nav.jsx`
- [DONE] Switched `useIsMobile` and `useItemsPerView` from noisy `resize` listeners to `matchMedia` listeners (fire only on breakpoint crossing)
- [DONE] Replaced third-party `via.placeholder.com` fallback in `Hero.jsx` — hides image element on error instead
- [DONE] Replaced hand-rolled `CaseStudies` section header with `<SectionHeader>`; removed stale "Publishing Soon" badge (all 5 now published)
