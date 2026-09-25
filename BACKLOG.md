# Portfolio Backlog

## How to use this file
Add new ideas here as they come up.
Review and reprioritize before each work session.
Mark items [DONE] when shipped, don't delete them — they serve as a changelog.
Item numbers are **stable IDs** (they're referenced from TECH_DEBT.md and the done-log), so priority is expressed by *which section* an item sits in and its order there — not by renumbering.

## Priorities as of 2026-09-25 (after the design revamp)
The portfolio's job is "currently at Heineken, open to conversations". The revamp (see Done) fixed the accessibility gaps, made the homepage length constant, and merged duplicated content. What's left is mostly **things only you can supply** (resume, logo, real diagrams, your own words) plus discoverability work.

Ranked order (top = next):

| Rank | ID | Item | Blocked on |
|---|---|---|---|
| 1 | 14 | Updated resume PDF | You (latest resume) |
| 2 | 3 | Real "How I work" section (behaviour, not skills) | Your own words |
| 3 | 26 | One NDA-safe diagram or screenshot per case study | You (what's safe to show) |
| 4 | 30–32 | Verify the new "What I did" lines · pick one VidaXL headline number · confirm logo use | You |
| 5 | 4a | Review the illustrative "Currently" lines | You |
| 6 | 17 | AI-PM depth in the VidaXL case study (+ a Quor case study) | — |
| 7 | 12 | Prerender + path-based routes (unlocks link previews for `/work` and case studies, per-role links, `llms.txt` #18) | — |
| 8 | 19 | Custom domain | Domain purchase |
| 9 | 20 | Testimonials: VidaXL + Heineken | Your outreach |
| 10 | 21 | Post-deploy verification (LinkedIn re-scrape, real phone, GA4 review) | Deploy |
| 11 | 27 | Defer/lazy-load the Google Analytics script (biggest perf cost) | — |
| 12 | 2 / 7 | Product teardown (not a Heineken product) | — |
| 13 | 28 | Replace Google Drive certificate links with proper verification links | Where each cert is verifiable |
| 14 | 29 | Decide on the hero photo | You |
| 15 | 1 | Booking link | Only if actively job-hunting again |
| 16 | 25 | Heineken case study / Impact Story + a Heineken hero proof point | ~6–12 months of real outcomes |
| 17 | 36 | Field photos ("In the field"): market and site visits, captioned | Heineken clearance + your photos |
| 18 | 8, 9 | Video intro · Writing section | Someday |

---

## 🔴 High Priority (Do Next)

14. **Updated resume PDF** — Add the Heineken role and drop the filename "Technical_Product_Manager" in favour of one matching the "Technical Product Leader" positioning. Rename the file in `/public`, update `CONFIG.resumeUrl` (`src/config/index.js`); `scripts/check-resume.js` (part of `npm run verify`) will fail CI if the two disagree.
    *Why: the site says Heineken; the downloadable resume must not contradict it.*
    *Blocked: waiting on the latest resume from you.*

3. **A real "How I work" section** — 3–4 honest paragraphs about working style: how you run discovery, write specs, communicate with engineering. Behaviour, not a skills list. The static **"What I bring"** section (formerly Core DNA) is in place and covers the skills/keywords, but "How I work" needs *your* words — it can't be written from the data files.
   *Why: recruiters and hiring managers use this for culture-fit screening before a call.*

26. **One NDA-safe diagram or screenshot per case study** — All five `assets/` folders are empty, so case studies are text-only (the `<ProcessFlow>` is the only visual). A simple redrawn architecture/flow diagram or a sanitised mock per study would help skimmers. `<ImageFull>` / `<ImageHalf>` already exist in `components.jsx`.
    *Why: hiring managers scan for visuals and evidence; you're the only one who knows what's safe to show.*

15. ~~**Official Heineken logo on the role**~~ **[DONE 2026-09-25]** — logos for all four employers were supplied and are now used (Hero "Worked at" strip, Experience rows, case-study header); two follow-ups are in #32 below. Original note: Show the Heineken logo on the Experience row. **Must be the official asset, exact to the original** — no redraw. Confirm you're cleared to use it on a personal site, drop the file in `/public`. There is currently no company-logo pattern, so this may mean adding one for all five roles for consistency.
    *Blocked: need the official file from you.*

4a. **Review the "Currently" section** — `src/data/currently.js` was written from facts already public on the site (Heineken roadmap/analytics work; Quor). Edit it into your own voice and add a "reading/learning" line if you want one. Update every 1–2 months.
    *Why: it was drafted for you; only you know what's true and current.*

---

## 🟡 Medium Priority (Do Soon)

17. **AI-PM depth in the VidaXL case study (+ a Quor case study)** — Hiring managers for AI-flavoured PM roles look for behaviour specs, evals, failure modes, and guardrails. The case study's own "What I'd Do Differently" admits there was no evaluation layer — turn that into a visible "how I'd evaluate and guard AI output" section. A Quor case study fits the same theme.
    *Why: the strongest differentiator for AI-adjacent roles, and the gap is already acknowledged in your own text.*

12. **Prerender + path-based routes** — `og:title`/`og:description`/`og:image` are static in `index.html`; link-preview bots (LinkedIn, Slack, X) and AI crawlers don't run JS, and `/#/work` and case study URLs are hash routes crawlers treat as one page. Fixing it needs static prerendering plus path-based routing (which would also make per-role shareable links possible). The design revamp deliberately keeps the homepage HTML listing the "more work" titles as real links meanwhile.
    18. **Add an `llms.txt`** alongside the prerender work — a short machine-readable summary for AI crawlers.
    *Why: real infra change; it's what makes a shared case-study or `/work` link unfurl correctly.*

19. **Custom domain** — Fixes `robots.txt` / `sitemap.xml` not being at the domain root (they live under `/Portfolio/`, so crawlers ignore them) and gives a cleaner LinkedIn "Featured" link.

20. **Testimonials: VidaXL and Heineken** — Nothing from VidaXL (your most recent ~2-year role) and nothing from Heineken yet; 4 of the 6 quotes are from Techmojo. Ask a VidaXL stakeholder while the relationship is fresh. Then it's a data-file change in `src/data/testimonials.js` (add a verbatim `highlight`).

21. **Post-deploy verification** — After the next deploy: (a) re-scrape the homepage in LinkedIn Post Inspector to show the new 1200×630 card; (b) look at the site on a real phone (Lighthouse and the headless smoke test can't feel the swipe/scroll); (c) look at GA4 to see which sections and case studies actually get opened — and use it to choose the 3 `featured` items. *(Lighthouse was run locally during the revamp: accessibility 100, best-practices 100, SEO 100 on the homepage, `/work` and a case study.)*

27. **Defer/lazy-load the Google Analytics script** — The GA `gtag.js` (≈165 KB) is the largest single cost in the Lighthouse performance breakdown; the site's own JS is ≈94 KB gzipped. Load it after first paint/idle. Keep `send_page_view: false` (see CLAUDE.md › Analytics).

2. **Product teardown section** — A short analysis of 1–2 products. What's working, what's broken, what you'd change and why.
   **#7 VidaXL product teardown (merged)** — an e-commerce product you know well is the easiest first one.
   *Constraint: pick a product that is **not** Heineken's — avoids any conflict-of-interest question.*

28. **Proper verification links for certificates** — Two of the four credentials link to Google Drive files (Product Strategy Micro-Cert, Productsup). A verification URL from the issuer looks more trustworthy than an unbranded Drive link.

---

## 🟢 Low Priority (Someday / Maybe)

29. **Hero photo** — The current photo (sunglasses, snow) is casual for a recruiter-facing page. A professional headshot without sunglasses builds more trust. Your call.

1. **Calendly / booking link in CTA** — Removes friction, but it's an active-job-search tool. Only worth doing if you're actively looking again; LinkedIn covers "open to conversations".

25. **Heineken case study or Impact Story + a Heineken hero proof point** — Publish once a real, shareable outcome lands (about 6–12 months in). Until then the "Currently" section is the safe format. *A case study without an outcome reads as a job description — and risks confidentiality.*

36. **Field photos: market and site visits ("In the field")** — *Idea, to think through later. Discussed 2026-09-26.* Photos from marketplace and on-site visits, as evidence that you work close to distributors and drivers. Verdict so far: good idea **only as a small, curated set with captions**, not a general gallery.
    - *Why it could help:* hard to fake, shows customer proximity for a B2B commerce product role.
    - *Why not a plain gallery:* recruiters spend their time in the first two screens; photos without captions say nothing to a human or a screener; it would break the "each section has a fixed size" rule (DESIGN.md §2); a stale gallery is worse than none.
    - *Format:* 4 to 6 photos, each with a one-line caption: what I saw, and what it changed in the product. The captions carry the value.
    - *Placement:* not a homepage section at first. Use as evidence inside case studies (overlaps #26), or a small `/field` page linked from Experience. Simple captioned grid; no carousel, modal or lightbox (DESIGN.md §2, §7).
    - *Video:* skip. If ever needed, link to a short clip; never autoplay.
    - *Technical:* WebP, lazy-loaded, real alt text, captions as page text; strip EXIF/GPS before upload.
    - *Guardrails (must clear before publishing):* Heineken comms or manager sign-off (brands, prices, internal screens, competitor products, vehicles, facilities); consent from anyone whose face is visible (distributors, drivers); follow the Heineken confidentiality rules in CLAUDE.md (scope not results, no internal tool or vendor names).
    - *Timing:* after clearance and a couple of real outcomes; pairs naturally with #25.
    - *First step when ready:* pick 2 or 3 photos and write the captions. That decides whether it helps or is decoration.

8. **Video intro** — 60–90 second selfie video. High effort, high payoff, only for senior/Head-of-Product applications where presence is evaluated.

9. **Writing / essays section** — Short 300-word takes on product topics. Builds authority IF maintained; a stale blog is worse than none.

---

## 🔎 Needs Your Review (Decisions)

16. **Can the analytics tool used at Heineken be named publicly?** The Heineken role says "in-app analytics" without naming the product. Confirm with Heineken comms / your manager before naming it.

24. **Trim Instagram and Facebook from the nav and footer?** For a corporate-role portfolio, two personal social icons may dilute the signal. Purely `CONFIG.social` + the icon lists in `Nav.jsx` / `Footer.jsx`.

---

30. **Check the new "What I did" lines** — Each case study now opens with "The short version" (plain-language line, problem, what I did, result, takeaway). They were distilled from your own case-study text, in the first person, but the *"what I did"* wording is a claim about your contribution: read all five and tighten anything that overstates or understates your part.

31. **Pick one VidaXL headline number** — The case-study title, the Hero proof point and the impact story say "3 weeks → 3 days"; the case study's own Results section says "2–3 weeks to 2–3 days". Both are defensible (a range vs its top end) but a careful reader will notice. Choose one and make the others match (`data/work.js` `metric`/title, `case study Results`).

32. **Logos — two confirmations** — (a) You said you're happy to show the logos; confirm it's fine to show **UnitedHealth Group, VidaXL and Techmojo** too, not only Heineken. (b) The supplied Heineken logo is white lettering (made for a green background). On the site the *lettering* follows the theme (white on dark, dark on light) while the red star and its outline stay as supplied. If Heineken brand rules require the original green-badge presentation, say so and we'll show it on a green tile instead.

33. **Read the rewritten copy aloud and make it yours** — The whole site's prose was rewritten with the humanizer rules (see the Done log). The facts are unchanged and nothing was invented, but the voice is my best reading of "plain, first person, direct". Read the case studies, the Hero line and the footer, and change anything you'd never say. You're the only one who can tell.

34. **Reconcile one more VidaXL number** — Your role bullet says a *7% conversion lift across all SKUs within 30 days*; the case study says a *7% conversion increase for newly launched products*. Same source of confusion as #31: decide which one is true and align them (`data/roles.js` and the VidaXL case study).

35. **Mobile homepage is longer than before the revamp** — Measured 2026-09-25 at 390px wide: **10,748px (about 13 screens)**, against 9,107px (about 11) before the revamp. Desktop did drop, from 10,878px to 7,099px. The "constant length" budgets work per section, but on a phone several sections stack their cards: Recognition 2,634px, Work 2,208px, Experience 1,909px (newest role starts open), Hero 1,353px, What I bring 1,175px. Ideas, in order of payoff: credentials 2-up on mobile, a compact Quor row, hide the outcome chips on mobile work rows, start Experience collapsed on mobile, 2×2 grid for "What I bring". Re-measure after each change.

    **Other mobile findings (same audit, 390px):** case-study pages are 11,506px (14 screens; the Snapshot alone is about 1.7 screens stacked); /work is 6,493px; the scroll-to-top button covers text at rest (it overlapped a recommendation); the nav plus breadcrumb bar take 14% of the screen on inner pages; tap targets under 44px: home logo 36×36, breadcrumb links 36px wide, "More work" links 35px tall, Quor's GitHub/PyPI/Docs chips 30px tall; 20% of homepage text (34% on /work) is 12px; the logo strip wraps with UHG alone on row two; the hero photo lands below about 1,000px; the case-study title breaks as "3 weeks to 3 / days"; recommendation cards keep an empty attribution gap when stacked one per row. No horizontal overflow or clipped text was found.

## ⚪ Decided Against (and Why)

- **"Tools I use" list** — Reads like a CV, adds no narrative. Skipped.
- **Heavy animations / interactions** — Over-engineering reads as a designer's portfolio, not a PM's. Skipped.
- **Blog section** — Only if consistently maintained. Deferred indefinitely.
- **Scroll-spy URL updates** — Updating the URL hash while scrolling: HashRouter conflict, history noise. Rejected. (A nav-link *highlight* for the section in view is fine and now exists; it never touches the URL.)
- **Nav's global GitHub icon deep-linking to Quor instead of the profile root** — Confirmed working as designed [2026-07-09].
- **Password-protected case studies (was #5)** — GitHub Pages is static, so any "password" is checked in client-side code and the content ships in the JS bundle. Theatre. Use "request the full version" by email or a PDF on request.
- **Reconciling VidaXL scale numbers ("90K SKUs / 12 markets" vs "250K+ SKUs / 30+ markets")** — Different scopes (content-automation pilot vs whole product), both correct. Don't "fix" one to match the other.
- **Carousels, modals for lists, infinite scroll, a bottom tab bar, a CMS** — [2026-09-25] Carousels hide content (most people view only 3–4 items), modals need scroll-lock hacks and aren't readable by screeners, infinite scroll suits goal-less feeds not portfolio browsing. See DESIGN.md §7.

---

## ✅ Done

### Writing Pass (2026-09-25) — implemented locally, not yet pushed

Goal: make the whole site read like a person wrote it, using the [humanizer](https://github.com/blader/humanizer) skill (v3, based on Wikipedia's "Signs of AI writing"), without changing any fact. Installed at `~/.claude/skills/humanizer`.

1. **All five case studies rewritten** — [DONE]. Plain first person, no dashes as connectors, no "not X but Y", no padded triads or repeating closers, British spelling throughout, sentence-case headings (The problem / What I found / How I approached it / What we built / Results / What I'd do differently / What I took from it), "How might we" questions replaced with plain ones, horizontal rules between sections removed, jargon glossed once (PIM, LLM, SKU). About 15% shorter (4 to 6 minute reads). Titles rewritten as plain sentences.
2. **Site copy rewritten** — [DONE]. Hero line, section subtitles, "What I bring", Recognition, Currently, footer ("Want to talk?"), the roles and every work item's summary, outcomes and title, the case-study page furniture, meta descriptions and the no-JavaScript fallback. Empty eyebrow labels ("Track Record", "Selected Work", "Proof", "Strengths") removed. Roles now read "Product Owner, Digital Commerce" with no dash; "3 weeks → 3 days" became "3 weeks to 3 days".
3. **Left untouched on purpose** — the six LinkedIn recommendations and their highlights (other people's exact words), certification names, company and product names, every number.
4. **Guardrail** — [DONE]. `npm run copy` flags dashes, stock AI vocabulary, "not just/only", stock phrases and arrows in the site's prose. Voice rules are in DESIGN.md §4c.
5. **Still needs you:** BACKLOG #33 (read it aloud and make it yours) and #34 (one more VidaXL number to reconcile).

---

### Design Polish Pass (2026-09-25) — implemented locally, not yet pushed

Follow-up to the revamp, from a review of navigation, cards, case-study content, icons/buttons, both themes, and the employer logos.

1. **Sticky page bar + origin-aware trail** — [DONE]. The breadcrumb used to scroll away and the floating "← Portfolio" button only went to the top level. Now a sticky bar under the nav shows the whole trail (Portfolio / Work or All work / page), every level clickable, with a reading-progress line on case studies. The trail follows where you came from (`state.from`). Floating back button and its observers removed. Root cause of an earlier sticky failure fixed: `overflow-x: hidden` on html/body → `clip`.
2. **Equal-height recommendation cards** — [DONE]. Cards stretch to the row's tallest and the attribution lines align.
3. **Case studies optimised for skimmers, casual readers and fans** — [DONE]. New `<Snapshot>` ("The short version") at the top of all five: a plain-language line, then The problem / What I did / The result / The takeaway, then role/team/timeline/stack. The redundant header blurb was removed. The long-form sections are unchanged. (Wording to verify: BACKLOG #30, #31.)
4. **Icons, buttons and chips as one system** — [DONE]. Icons: decorative by default, one 1.75 stroke, 20px/16px sizes, `className` prop (the 12px external-link icon is now 16px). Buttons: pressed and disabled states, 44px touch targets. New `.chip-toggle` (filters), `.link-accent` (text links); "Read full recommendation" is now a 44px-tall control.
5. **Employer logos** — [DONE]. Your four SVGs are stored unmodified in `src/assets/logos/` and inlined by `CompanyLogo`, which recolours only the neutral parts to the theme colour (brand colours kept). Placed in the Hero "Worked at" strip, each Experience row, and the case-study header; trademark note added to the footer.
6. **Both themes verified** — [DONE]. New `npm run a11y` (axe-core, WCAG 2.x A/AA + best practices) across the homepage, `/work` and two case studies at desktop and mobile, dark and light: 0 violations after fixing one real finding (light-mode "Current" badge, 4.32:1). `npm run smoke` grew from 33 to 45 checks (pinned bar, origin-aware trail, logos in both themes, equal heights, unique ids, the short version).

---

### Design Revamp Sprint (2026-09-25) — implemented locally, not yet pushed

Driven by a design review (Apple HIG as one reference, NN/g usage research for evidence, and the constraints: solo maintainer, GitHub Pages, content that keeps growing). Principle: **the homepage stays the same length however much content is added** — each section has a budget and one overflow rule (DESIGN.md §2).

1. **Accessibility baseline** — [DONE]. Hero/footer primary buttons: dark text on emerald in dark mode (was white on `#10b981`, 2.5:1). Nothing below 12px, rem-based (was 38× `text-[10px]`). Global `:focus-visible` ring. `prefers-reduced-motion` disables all motion (BACKLOG #23 done). Tap targets ≥ 44px. Low-contrast greys fixed in both themes. Mobile menu is now a non-modal disclosure (no false `aria-modal`, Escape returns focus). Skip link moves focus without touching the router hash. Real `<main>` landmark and correct heading order on every page. Print stylesheet (always dark-on-white). JS-off fallback with the essentials. Lighthouse (mobile) accessibility: **100** on the homepage, `/work` and a case study.
2. **Single sources of truth** — [DONE]. `roles.js` replaces `experience.js` + `timeline.js`; `work.js` replaces `caseStudies.js` + `projects.js` + `impactStories.js` (VidaXL had appeared in 6 places). Years of experience, the Hero badge and Hero proof points are derived, not hard-coded.
3. **Experience + The Arc merged** — [DONE]. One collapsed row per role (result shown), newest open, one open at a time, "How it fits" note per role, roles beyond 5 fold under "Earlier roles". The horizontal strip is gone.
4. **Work section + `/work` page** — [DONE]. 3 featured rows with a headline metric, up to 5 more titles as real links, and "All work (N)" → `/#/work` (domain filter chips, `?domain=` in the URL — BACKLOG #6 done). The three "View All" modals were deleted along with the scroll-lock hacks and `fromOverlay` router state.
5. **Recognition** — [DONE]. Testimonials + Certifications merged with the open-source project (Quor). Recommendations show a verbatim one-line highlight with inline "Read full recommendation" and one "Show all 6" button; the testimonial modal is gone. Credentials in a wrapping grid.
6. **Hero** — [DONE]. One plain line about what you do; 3 proof points built from the featured work; primary "Read the flagship case study" + Resume; the Stats bar was removed (its numbers moved into the proof strip). On mobile the proof lands in the first screen.
7. **Core DNA → "What I bring"** — [DONE]. Static 2-column grid; the auto-scrolling marquee is gone. (A real "How I work" is still open — BACKLOG #3.)
8. **Currently section** — [DONE, needs your review]. `data/currently.js` was drafted from already-public facts — BACKLOG #4a.
9. **Case study pages** — [DONE]. Breadcrumb, read time, "next case study" card, end-of-page contact block. `MetricRow` handles 1–4 metrics without an orphan; the headline metric is no longer repeated in `AtAGlance`. (One diagram/screenshot per study still needs your input — BACKLOG #26.)
10. **Visual system** — [DONE]. Opaque cards (blur only on the floating layer), noise texture and body gradients removed, `card-lift` only on clickable cards, tags/chips defined once (`Tag.jsx`), plain section names, calmer footer headline, self-hosted fonts (BACKLOG spacing-variance item #13 is largely resolved by the shared components).
11. **Guardrails** — [DONE]. `DESIGN.md`; `npm run smoke` (33 headless-browser checks, all passing); a Lighthouse accessibility gate (≥ 95) on pull requests in CI. *The CI step could not be run locally — check it on the first pull request.*

Files: new `data/roles.js`, `data/work.js`, `data/currently.js`, `sections/{Experience,Work,WhatIBring,Recognition,Currently}.jsx`, `pages/WorkPage.jsx`, `components/work/WorkRow.jsx`, `components/ui/{Breadcrumb,Tag}.jsx`, `hooks/{useActiveSection,useDocumentMeta}.js`, `DESIGN.md`, `scripts/smoke-test.mjs`, `.lighthouserc.json`; rewritten `Hero`, `Nav`, `Footer`, `App`, `CaseStudyPage`, `index.css`, `styles/globals.css`, `CLAUDE.md`, `README.md`; deleted the old sections, both modals, `Carousel`, the old data files and four now-unused hooks.

---

### Role Update & Pipeline Sprint (2026-09-25)

1. **Heineken added, VidaXL closed out** — [DONE]. `experience.js`: new Heineken entry ("Product Owner — Digital Commerce", Jun 2026 – Present, Hyderabad), VidaXL now Sep 2024 – Jun 2026. Bullets are scope-and-contribution only (supported the distributor/driver commerce pilot; SIT, UAT, pilot launch, hypercare; now shaping roadmap and in-app analytics alongside a Senior Product Owner and a Business Analyst) — no invented metrics, no vendor names. Work Experience subtitle "10 years. 4 roles." → "5 roles", "e-commerce" → "commerce".
   Files: `src/data/experience.js`, `src/sections/WorkExperience.jsx`.

2. **Career Journey Act V + scrollable strip** — [DONE]. Added Heineken as Act V ("Current"); VidaXL demoted to "Product Owner" badge and its note put in past tense. Converted the grid to the horizontally scrollable strip CLAUDE.md had planned for the 5th role: peeking cards as a scroll cue, mouse drag-to-scrub, native touch swipe with proximity snap, keyboard-scrollable region.
   Files: `src/sections/CareerJourney.jsx`, `src/data/timeline.js`, `src/styles/globals.css` (horizontal scrollbar height).

3. **Positioning copy** — [DONE]. Hero badge "Available for Strategic Technical Roles" → current-role badge ("Product Owner, Digital Commerce · Heineken"; short form on mobile). Hero subtitle now "Technical Product Leader · Digital Commerce · 10 Years". Location line "Hyderabad · Open to Bangalore & Remote" → "Hyderabad, India · Open to conversations". Footer eyebrow "Open to Opportunities" → "Open to Conversations", subtext no longer asks for "Senior product roles".
   Files: `src/sections/Hero.jsx`, `src/components/layout/Footer.jsx`.

4. **Metadata + structured data** — [DONE]. `<meta description>`, `og:`/`twitter:` descriptions (dropped the stray "Senior"), keywords (+Digital Commerce, B2B Commerce), JSON-LD (`jobTitle` → "Product Owner, Digital Commerce", added `worksFor` Heineken, `homeLocation`, `knowsAbout`, portrait `image`), and `CONFIG.siteDescription` kept in sync.
   Files: `index.html`, `src/config/index.js`.

5. **Stats bar refreshed** — [DONE]. Heineken stat added, VidaXL conversion lift added, mislabelled stats corrected ("Engg. Leaders" → "Team Members Led", "Platform DAU" → "Active Users Acquired"). Grid is now 4 columns × 2 rows on desktop, 2 × 4 on mobile. The Heineken stat is a deliberate placeholder — see #22.
   Files: `src/data/stats.js`, `src/sections/StatsBar.jsx`.

6. **Bug: social preview image** — [DONE]. `og-image.png` was a byte-identical copy of the 96×96 logo; regenerated as a real 1200×630 card, added alt tags and a reproducible generator script. See TECH_DEBT #20.
   Files: `public/og-image.png`, `scripts/generate-og-image.ps1`, `index.html`.

7. **Bug: deploy pipeline holes** — [DONE]. CI now runs the resume guard + lint (`npm run verify`), uses `npm ci`, checks PRs without deploying, and can't race itself. Two lint errors that would have blocked it were fixed first. See TECH_DEBT #21, #22.
   Files: `.github/workflows/deploy.yml`, `package.json`, `src/hooks/*`, `src/components/ui/Carousel.jsx`.

8. **Bug: docs drift** — [DONE]. README fonts, StatsBar/Carousel claims, stale `MobileMenu` mention, layout tables, Hero/Footer copy and the CareerJourney note all corrected; Heineken confidentiality rules added to CLAUDE.md. See TECH_DEBT #23.
   Files: `README.md`, `CLAUDE.md`.

**Deliberately skipped this sprint (per your instructions):** resume PDF update (→ #14), testimonial gap (→ #20), scale-number reconciliation (→ "Decided Against").

---

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

6. **Visual consistency audit** — [DONE]. Fixed 4 genuine inconsistencies found by a full-site grep audit: `CoreDNA.jsx`'s card used `rounded-3xl` (the one card on the site not using the documented `rounded-2xl` convention — CLAUDE.md explicitly calls `rounded-3xl` "too bubbly"); the case-study-page header tag chips used a different text color than the identical chip everywhere else; `Carousel.jsx`'s inactive dot indicator had no light-mode color at all (unguarded `bg-gray-700`, would render too dark on a white card, and didn't match `TestimonialModal`'s already-correct dot); `ViewMoreModal`'s eyebrow was `text-[10px]` where every other section-level eyebrow site-wide uses `text-xs`. Left several lower-confidence items unfixed (items #12 and #13 above — #10 and #11 were resolved as noted in the done-log below) since they read as design decisions, not bugs.
   Files: `src/sections/CoreDNA.jsx`, `src/pages/CaseStudyPage.jsx`, `src/components/ui/Carousel.jsx`, `src/components/modals/ViewMoreModal.jsx`.

7. **Metadata & sharing** — [DONE]. Added `Person` JSON-LD structured data and a default canonical tag to `index.html`; added `public/robots.txt` and `public/sitemap.xml`. `CaseStudyPage.jsx` now updates `<meta name="description">` and `<link rel="canonical">` per case study (in addition to the `document.title` update it already did), and restores the homepage's defaults on unmount. **Bonus fix found while implementing:** `document.title` was never reset when navigating from a case study back to the homepage (`App.jsx`'s title-effect only ran once on initial mount) — the tab kept showing the case study's title. Fixed as part of the same change, since it's the same code path. See #12 (Medium Priority) above for what this does *not* fix (link-preview unfurling, hash-route crawlability).
   Files: `index.html`, `src/config/index.js` (new `siteUrl`/`siteTitle`/`siteDescription`), `src/App.jsx`, `src/pages/CaseStudyPage.jsx`, `public/robots.txt` (new), `public/sitemap.xml` (new).

8. **Footer.jsx referrer leak (approved follow-up, 2026-07-09)** — [DONE]. `rel="noopener"` → `rel="noopener noreferrer"` on the footer's 4 social icon links. This was flagged during the sprint above as item 10 (then in "Needs Your Review"); approved and fixed as a follow-up rather than folded into the original sprint commits. Corrects `TECH_DEBT.md` #6, which had recorded this as already fixed everywhere (it had only been fixed in `Nav.jsx`).
   Files: `src/components/layout/Footer.jsx`.

9. **Resume link 404 guard (approved follow-up, 2026-07-09)** — [DONE]. Looked closer before implementing: `public/404.html` already redirects any unmatched path (including a broken resume link) back into the app, so a filename mismatch was never a true dead end — but it was silent (the resume just never opens, no explanation) and a client-side pre-flight check would need an async fetch before `window.open()`, which risks popup blockers eating the tab. The more valuable, lower-risk fix is catching the mismatch before it ships: added `scripts/check-resume.js`, wired into `predeploy`, which fails the deploy loudly if `CONFIG.resumeUrl` doesn't match a real file in `/public`. Zero runtime behavior changed.
   Files: `scripts/check-resume.js` (new), `package.json` (`predeploy` script).

10. **Stale resume filename in README.md (approved follow-up, 2026-07-09)** — [DONE]. `README.md`'s project-structure tree still listed `Priyanshu_Pushpam_Senior_Product_Manager.pdf`, the pre-rename filename — `CONFIG.resumeUrl` and the actual file in `/public` both already say `..._Technical_Product_Manager.pdf`. Doc-only fix, no code affected.
   Files: `README.md`.

11. **Jargon pass on CoreDNA "Product Strategy" card (approved follow-up, 2026-07-09)** — [DONE]. Four unglossed acronyms back to back (RICE, Kano, OKRs, GTM) was the single densest jargon cluster on the page. Added short parenthetical glosses ("prioritization frameworks (RICE, Kano)", "go-to-market (GTM) strategy") without dropping any of the original keywords, so a PM reader still recognizes them instantly while a non-expert isn't lost. **Deliberately left the Hero tagline untouched** ("I bridge C-suite strategy and high-concurrency engineering...") — it's the site's core brand line and its primary audience (technical recruiters/hiring managers) is fluent in that vocabulary; simplifying it risks diluting punch for the audience that matters most for a marginal gain with a secondary audience.
    Files: `src/data/dna.js`.

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
