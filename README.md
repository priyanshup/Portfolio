# Priyanshu Pushpam — Portfolio

Personal portfolio website for Priyanshu Pushpam, Technical Product Leader with 10 years of experience across e-commerce, gaming, and healthcare.

**Live site:** [priyanshup.github.io/Portfolio](https://priyanshup.github.io/Portfolio/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Routing | React Router v7 (HashRouter) |
| Fonts | Syne · IBM Plex Mono · DM Sans |
| Analytics | Google Analytics 4 |
| Deployment | GitHub Pages via `npm run deploy` |

---

## Project Structure

```
src/
├── App.jsx                         # Root component — routing, layout, theme init
├── main.jsx                        # Entry point — HashRouter wrapper
├── index.css                       # Tailwind directives + theme tokens + light mode vars
│
├── config/
│   └── index.js                    # Social links, resume URL, VIEW_MORE_THRESHOLD
│
├── data/                           # All content — edit these to change what's shown
│   ├── stats.js
│   ├── timeline.js
│   ├── experience.js
│   ├── dna.js
│   ├── projects.js
│   ├── impactStories.js            # Impact Stories cards (reverse chronological)
│   ├── caseStudies.js              # Metadata + published flag — no content here
│   ├── testimonials.js
│   └── certifications.js
│
├── hooks/                          # Custom React hooks
│   ├── useScrollReveal.js
│   ├── useScrollTracking.js
│   ├── useSectionTracking.js
│   ├── useIsMobile.js
│   ├── useTheme.js                 # Dark/light mode — localStorage + system pref
│   └── index.js
│
├── styles/
│   └── globals.css                 # Custom CSS — animations, modals, carousel, §22 light mode
│
├── components/
│   ├── ui/
│   │   ├── Icons.jsx               # All SVG icons — no external icon library
│   │   ├── BrandLogo.jsx
│   │   ├── Carousel.jsx
│   │   ├── SectionHeader.jsx
│   │   └── ScrollToTop.jsx
│   ├── modals/
│   │   ├── TestimonialModal.jsx
│   │   └── ViewMoreModal.jsx
│   └── layout/
│       ├── Nav.jsx                 # Fixed nav — links, social icons, theme toggle, resume CTA
│       └── Footer.jsx
│
├── sections/                       # One component per homepage section (order = App.jsx)
│   ├── Hero.jsx
│   ├── StatsBar.jsx
│   ├── WorkExperience.jsx
│   ├── CareerJourney.jsx
│   ├── Projects.jsx
│   ├── ImpactStories.jsx
│   ├── CaseStudies.jsx
│   ├── CoreDNA.jsx
│   ├── Testimonials.jsx
│   └── Certifications.jsx
│
├── pages/
│   └── CaseStudyPage.jsx           # Full case study page at /#/case-studies/:slug
│
└── content/
    └── case-studies/               # One folder per published case study
        ├── components.jsx          # Shared content components (H2, P, Callout, MetricRow…)
        ├── vidaxl-ai-content-automation/
        │   ├── index.jsx
        │   └── assets/
        ├── techmojo-sportsbook-gtm/
        │   ├── index.jsx
        │   └── assets/
        ├── uhg-zero-downtime-migration/
        │   └── index.jsx
        ├── uhg-qa-cycle-automation/
        │   └── index.jsx
        └── uhg-claims-transformation/
            └── index.jsx

public/
├── me.jpg                          # Profile photo
├── logo.png                        # Brand logo — favicon + nav icon
├── og-image.png                    # Open Graph image for social sharing (1200×630)
└── Priyanshu_Pushpam_Senior_Product_Manager.pdf
```

---

## Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Theme System

The site supports dark and light mode. The active theme is stored in `localStorage` under the key `'theme'`.

**Priority order on load:** `localStorage` → system preference → default dark

Class-based: the `dark` class on `<html>` activates dark mode. Removing it switches to light mode. An inline script in `<head>` sets this synchronously before first paint to prevent a flash.

The theme toggle is in the navigation bar (pill-shaped, left of the Resume button). It shows a Sun icon in dark mode and a Moon icon in light mode, with a colour-matched ambient glow.

**When adding theme-aware styles:**
- Use `dark:[dark-value] [light-value]` on every hardcoded colour class. Never write a single colour without its counterpart.
- Classes using CSS tokens (`bg-darkBg`, `bg-cardBg`, `text-accent`) auto-adapt — no `dark:` prefix needed.
- Custom CSS classes in `globals.css` cannot use Tailwind's `dark:` prefix. Add light mode overrides in **§22** using `html:not(.dark)` selectors.

---

## Common Tasks

### Add or edit content in any section
All content lives in `src/data/`. Find the relevant file and edit the array.

### Add a new project
Open `src/data/projects.js` and add an object. If the total exceeds `VIEW_MORE_THRESHOLD` (in `src/config/index.js`), a "View All" button appears automatically.

### Add an Impact Story
Open `src/data/impactStories.js` and add an object with `eyebrow`, `company`, `headline`, `context`, and `outcomes` (array of strings). Keep reverse chronological order — most recent company first.

### Add a new testimonial
Open `src/data/testimonials.js` and add an object. Paste the full text — the modal handles any length.

### Add a new certification
Open `src/data/certifications.js` and add an object. Set `link: ""` if the certificate URL isn't available yet.

### Publish a case study
1. Open `src/data/caseStudies.js` and set `published: true`
2. Confirm the `slug` matches the folder name in `src/content/case-studies/`
3. Write the content in `src/content/case-studies/<slug>/index.jsx`
4. Drop images into `src/content/case-studies/<slug>/assets/`

The lock overlay disappears and the page goes live at `/#/case-studies/<slug>`.

### Add a case study placeholder (not yet published)
Add an entry to `src/data/caseStudies.js` with `published: false`. The card appears with a "Publishing Soon" lock overlay.

### Reorder homepage sections
Edit the `HomePage` component in `src/App.jsx`. Import order and render order are independent — only the JSX order matters.

### Change social links or resume path
Edit `src/config/index.js`. Update the PDF filename in `/public/` to match.

### Change the colour theme
Edit the `@theme` block in `src/index.css`:

```css
@theme {
  --color-darkBg: #0f172a;   /* page background (dark) */
  --color-cardBg: #1e293b;   /* card surface (dark) */
  --color-accent: #10b981;   /* brand accent */
}
```

Light mode overrides for these same tokens are in `html:not(.dark)` at the bottom of `src/index.css`.

### Change any animation, modal, or layout CSS
Edit `src/styles/globals.css`. Light mode overrides for custom classes live in §22 at the end of that file.

---

## Case Studies

All 5 case studies are published:

| Slug | Company |
|---|---|
| `vidaxl-ai-content-automation` | VidaXL · E-commerce |
| `techmojo-sportsbook-gtm` | Techmojo · Gaming |
| `uhg-zero-downtime-migration` | UnitedHealth Group |
| `uhg-qa-cycle-automation` | UnitedHealth Group |
| `uhg-claims-transformation` | UnitedHealth Group |

Each case study page lives at `/#/case-studies/<slug>`.

---

## Deployment

Build and deploy to GitHub Pages:

```bash
npm run deploy
```

This runs `npm run build` then pushes the `dist/` folder to the `gh-pages` branch via the `gh-pages` package.

After deploying, if you've updated the Open Graph image or meta tags, force a LinkedIn cache refresh at [linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/).

---

## Notes

- **NDA:** No proprietary screenshots, internal dashboards, or client data are included anywhere in this repository. All project descriptions use publicly shareable outcomes and metrics consistent with the resume.

- **Image protection:** The profile photo (`me.jpg`) has right-click and drag prevention applied at the component level. This does not prevent access via browser DevTools.

- **HashRouter:** All URLs use the `/#/...` format, required for GitHub Pages compatibility (no server-side routing).

- **Peer dependency note:** `@tailwindcss/vite@4.x` declares a peer dependency on `vite@^5–7`. This project runs on `vite@8`, which is functional but triggers a peer resolution warning. Use `npm install --legacy-peer-deps` to install without errors.
