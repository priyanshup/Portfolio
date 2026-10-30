# DESIGN.md — how this site stays good as it grows

The rules below exist so that adding content never needs a redesign. If a change
breaks one of them, change the change — or update this file on purpose.

## 1. What the site is for
A recruiter, a peer, or a curious visitor should understand **who this is, what
they've shipped, and how to reach them** within the first two screens (about
2,000px — that is where ~74% of viewing time goes). Everything below is reference.

Audiences, in priority order: **recruiters/hiring managers** (skim, outcomes first,
often through an AI screener that reads page text) → casual visitors on a phone →
colleagues (credit shared, no over-claiming) → the "trophy cabinet" (proof that
can be verified).

## 2. Section budgets — the homepage length is constant
Every section has a fixed size and **one** overflow rule. Adding content promotes or
demotes items; it never lengthens the homepage.

| Section | Budget on the homepage | Overflow rule | Knob |
|---|---|---|---|
| Hero | 1 screen: role, name, one plain line, 3 proof points, 2 actions | none | `featured` items' `metric` in `data/work.js` |
| Work | The featured items only (keep to 3) + up to 5 more titles as links | "All work (N)" → `/work` page (with filters) | `featured`, `MORE_WORK_PREVIEW` |
| Experience | One collapsed row per role; newest open | Roles beyond the newest 5 fold under "Earlier roles" | `EXPERIENCE_VISIBLE` |
| What I bring | Static grid, no autoplay | none (edit `data/dna.js`) | — |
| Recognition | 3 recommendations (one-line highlight), credentials strip, open-source card | "Show all N" expands inline; a recommendation opens in a wide panel under its row on desktop (one at a time, cards keep their height), inside the card on phones; credentials wrap | `RECOMMENDATIONS_VISIBLE` |
| Currently | 2–4 short lines, dated | none | `data/currently.js` |

Overflow is always a **page or an inline expand — never a modal, never a
carousel**. Reasons: pages are linkable and readable by screeners; carousels hide
content (most people look at 3–4 items); modals cost scroll-lock hacks.

## 3. Content model — one source of truth
| Data | File | Feeds |
|---|---|---|
| Roles | `src/data/roles.js` | Experience, Hero badge/subtitle, years of experience |
| Work (case studies, projects, impact stories) | `src/data/work.js` | Homepage Work, `/work`, case study pages, Hero proof points, "next case study" |
| Recommendations | `src/data/testimonials.js` | Recognition (`highlight` is a **verbatim** sentence from `text`) |
| Credentials | `src/data/certifications.js` | Recognition |
| Strengths | `src/data/dna.js` | What I bring |
| Now | `src/data/currently.js` | Currently |
| Section budgets, links | `src/config/index.js` | everywhere |

Never type a number that exists in these files somewhere else (years, role names,
metrics). Derive it.

## 4. Visual rules
The look is "workshop hardware": warm paper, ink, one orange. Each section is an
opaque **plate** (panel) with a numbered tab; buttons are **keys** that press down;
social links are **knobs**. Spacing is generous and every section has its own
arrangement (columns, a log with big years, a hairline grid), so the page reads like
one person laid it out, not a stack of identical cards.

- **Surfaces are opaque.** No `backdrop-filter` anywhere. Content sits on `.plate`
  (`globals.css` §5); recessed areas inside a plate use the `sunk` utility. The
  closing CTA and the case-study "Want to talk" block use `.plate--contrast` (black in
  light mode, paper in dark mode; it swaps the tokens inside it, so token classes just
  work). `.plate--screwed` adds the four corner screws: hero, header plates and
  contrast plates only.
- **Section anatomy:** `<SectionHeader num title meta lede subtitle />` draws the tab
  (orange number block, the `<h2>` as a wide label, dotted grille, optional meta
  reading) and an optional big `lede` line. Number sections in page order (01 Work …
  05 Currently).
- **Type:** Zalando Sans Expanded (display: name, headings, ledes, metrics, labels),
  Inter (body), IBM Plex Mono (short IDs, dates, tags). Self-hosted via `@fontsource`;
  the latin display file is preloaded in `index.html` (it is wide, and swapping it in
  late shifts the hero). **Nothing below 12px** (use `text-xs` or larger; never
  `text-[10px]`). Sizes stay rem-based. Headings use weight 800–850 with tight tracking.
- **Labels:** upper-case wide text is `.silk` (12px, tracked): section tabs, meta,
  eyebrows, button text. `.silk--strong` for ink, `.silk--accent` for orange.
  `.label-key` is the small outlined orange label (Current, CSPO, Step 1). Tags and
  chips are normal case.
- **Colour:** semantic tokens in `src/index.css` (`bg-page`, `bg-plate`, `bg-sunk`,
  `text-ink`, `text-body`, `text-muted`, `border-line`, `border-edge`, `bg-accent`,
  `text-accent-ink`, `text-on-accent`). They swap under `html.dark`, so token classes
  need no `dark:` twin. A raw colour class still needs both values. Orange
  `#fa5b01` is a **fill** (ink on orange 6.2:1); small orange text is
  `text-accent-ink` (5.2:1 on light paper, 6:1 on dark). Never `text-accent` for
  small text. Muted text is `text-muted` or stronger (5.6:1 or better everywhere).
- **Outlines:** interactive hardware (keys, chips, knobs, arrow knobs, icon boxes,
  credential tiles, the theme switch) gets a 2px `border-edge` outline and a hard ink
  shadow underneath. In dark mode the edge is black and fills carry the contrast.
  Panels themselves use the 1px `border-line` hairline.
- **Buttons are keys:** `.cta-btn-primary` (ink on orange) and `.cta-btn-secondary`
  (ink on plate): 48px, 8px radius, upper-case wide label, 3px ink base; they lift 1px
  on hover and press 3px down on click. Never white text on orange.
- **Cards:** only cards that are links get `card-lift` (they rise and pick up an ink
  outline, and their `.arrow-knob` turns orange).
- **Focus:** one global `:focus-visible` ring, 3px orange (`globals.css`). Never
  `outline: none` without a replacement.
- **Motion:** one gentle reveal per section (`.reveal`); keys press, knobs turn,
  the switch thumb springs. Everything is disabled by `prefers-reduced-motion`. No
  autoplay, no marquees.
- **Tap targets:** at least 44px on mobile for anything a thumb must hit (home logo, breadcrumb and "More work" links, Quor's GitHub/PyPI/Docs chips).
- **Collapsing keeps the reader's place.** Anything that expands in place (recommendations, work summaries, experience rows, case-study sections, "Show fewer") calls `keepInView(el)` (`utils/scroll.js`) when it closes: if the item's top has scrolled off screen it is scrolled back into view, so "Show less" from the bottom of a long card never drops the reader into the next section. Give the element a `scroll-mt-*` class that clears the nav.
- **Phone layout (< 768px, Tailwind `md`):** the phone view is shorter, not a squeezed desktop. Rules: text is list rows rather than cards where it can be; long detail collapses behind a toggle (never a modal); collapsed content is `inert` and its text stays in the DOM (or is `sr-only`) so screeners and screen readers keep it. Meta lines and tags are 13px sentence case (`.meta-line`, `text-[0.8125rem] md:text-xs`); the 12px floor is for true captions only. Use `useMediaQuery(DESKTOP_QUERY)` when state (e.g. `inert`) depends on the breakpoint. **Custom classes in `globals.css` are unlayered and beat Tailwind's `hidden`/`sm:hidden`: hide a wrapper element instead.**
- **Phone budgets:** homepage ≈ 8 screens (about 7,900px), /work ≈ 3,600px, case study ≈ 9 screens; the smoke test fails above 8,500 / 4,200px. Hero: name, role, proof points, main button and a small round photo in the first screen; Resume is a text link; "Worked at" is a 2x2 grid. Work (home): featured rows show metric, company, title only. Experience: all rows collapsed. What I bring: one `short` sentence per item. Recognition: credentials two per row, Quor as a compact row.
- **Floating layer on phones:** the nav (a floating plate) slides away on scroll down and returns on scroll up or keyboard focus (`html[data-nav-hidden]`, Nav.jsx); the PageBar moves to the top meanwhile. Scroll-to-top shows only while scrolling up. `viewport-fit=cover` plus `env(safe-area-inset-*)` keep controls and the footer clear of the iPhone home bar.
- **Buttons, chips, links are one system** (`globals.css` §10): `.cta-btn-primary` / `.cta-btn-secondary` (keys, with pressed + disabled states), `.chip-toggle` (filters, `aria-pressed`: a key that stays pressed while on), `.link-accent` (text links with an orange underline, 44px tall). Don't hand-roll new ones.
- **Icons** (`components/ui/Icons.jsx`): decorative by default (`aria-hidden`), one 2px line weight, 20px standalone / 16px inside buttons and chips; pass `className` to resize. Icon-only controls need an `aria-label` on the button.
- **Employer logos** (`components/ui/CompanyLogo.jsx`): originals live untouched in `src/assets/logos/`. They are inlined and only the *neutral* parts recoloured to the theme text colour; brand colours stay (Heineken red star, TechMojo blue mark). Shown in three places only — the Hero "Worked at" strip, each Experience row, and the case-study header. Not in work rows or recommendations (the company name is already there). Footer carries the trademark note. To add a logo: drop the SVG in `assets/logos/`, add it to the map in `CompanyLogo.jsx`.
- **Inner pages** (`/work`, case studies) get a sticky **PageBar** under the nav (`top-16`): every level of the trail is a link (Portfolio / Work or All work / page) and stays visible; case studies also draw a reading-progress line. The trail follows where the reader came from (`state.from`). There is no floating back button. Because of `position: sticky`, never put `overflow-x: hidden` on `html`/`body` (use `clip`).
- **Delight is optional and earned:** a before → after (`3 weeks → 3 days`) only where
  the data has a real before and after.

## 4b. Every case study opens with "The short version"
`<Snapshot>` (in `content/case-studies/components.jsx`) is mandatory and comes first: one plain-language line for casual readers, then **The problem / What I did / The result / The takeaway**, then role, team, timeline, stack (role, team and timeline collapse into one "Details" line on phones). "What we built" and "What I'd do differently" are wrapped in `<Collapsible>` (open on desktop, collapsed on phones). An "On this page" menu in the PageBar is built from the article's `<H2>` ids. It must be distilled from the case study's own text (never invent), and "What I did" must say *I*, not *we*. The detailed metric tiles (`<MetricRow>`) follow; the headline metric is not repeated inside the snapshot. The long-form sections below it are the depth.

## 4c. Writing voice
The copy should read like one person wrote it, not like a template. Rules distilled from the [humanizer](https://github.com/blader/humanizer) skill (based on Wikipedia's "Signs of AI writing"):

- **Voice:** plain first person ("I ran discovery with four teams"), contractions are fine, British spelling, concrete detail over impressive adjectives. Write for one reader who is skimming.
- **Every sentence adds something.** Cut a closing line that repeats the paragraph, a run-up before the point ("Here's the thing"), and a sentence that only announces importance.
- **No "not X but Y".** State the point. Keep a contrast only when both halves carry information.
- **No forced triads.** Use three items only when there are three real things.
- **No dashes as connectors** (— or –). Use a comma, colon, period or "to" (2 to 3 weeks). Hyphens inside words are fine.
- **No stock vocabulary:** delve, tapestry, testament, pivotal, crucial, landscape, seamless, robust, leverage, showcase, foster, and similar. Say the plain thing.
- **No inflation:** no "key role", "lasting impact", "exciting future", no closing send-off.
- **Formatting:** sentence-case headings, no bold labels or emoji as decoration, no arrows as decoration ("3 weeks to 3 days", not "3 weeks → 3 days"), no horizontal rule between every section. Eyebrow labels only when they carry information (a date, a category).
- **Never invent.** Numbers, names, quotes and claims come from the source. Recommendations in `testimonials.js` are other people's words and stay verbatim (the `highlight` must be an exact sentence).

Check: `npm run copy` flags the mechanical tells (dashes, stock words, "not just", stock phrases). It can't judge rhythm or sense: read new copy aloud.

## 5. Adding things — playbook
- **New role:** add it first in `roles.js`, flip the previous `current`/`end`.
- **New case study:** add an item to `work.js` (with `slug`, `readMinutes`), create
  `src/content/case-studies/<slug>/index.jsx`. Promote to homepage only by setting
  `featured: true` **and demoting another** (keep 3).
- **New impact story / project:** an item without a `slug`; it appears on `/work`.
- **New recommendation:** add to `testimonials.js` with a verbatim `highlight`.
- **New homepage section:** it needs a budget and an overflow rule in the table above.

## 6. Checks (run them)
```
npm run verify     # resume file + ESLint      (also runs in CI and before deploy)
npm run dev        # then, in another terminal:
npm run smoke      # 78 end-to-end checks in a real headless browser (incl. the phone layout)
npm run a11y       # axe-core (WCAG 2.x + best practices), dark AND light, desktop AND mobile
npm run copy       # flags AI-writing tells in the site's prose (no server needed)
```
Accessibility/performance audit (Lighthouse, needs Chrome/Edge):
```
npm run build
npm run preview -- --port 4173
npx lighthouse http://localhost:4173/Portfolio/ --only-categories=accessibility,performance,best-practices,seo
```
CI runs an accessibility gate (≥ 95) on pull requests — see `.lighthouserc.json`.

## 7. Deliberately not done
A CMS, a framework migration, infinite scroll, a bottom tab bar, carousels, modals
for lists, custom cursors. Revisit only with evidence. (The Oct 2026 restyle swapped
the display face and the accent deliberately; see §4.)
