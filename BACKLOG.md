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

## ✅ Done

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
