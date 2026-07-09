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

---

## Open / Future

_Nothing tracked yet. Add entries here as new debt is identified._
