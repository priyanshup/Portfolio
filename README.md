# Priyanshu Pushpam — Portfolio

Personal portfolio website for Priyanshu Pushpam, Technical Product Leader with 10 years of experience across e-commerce, gaming, and healthcare.

**Live site:** [priyanshup.github.io/Portfolio](https://priyanshup.github.io/Portfolio/)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 (Vite plugin) |
| Routing | React Router v6 (HashRouter) |
| Fonts | Syne · IBM Plex Mono · DM Sans |
| Deployment | GitHub Pages via GitHub Actions |

---

## Project Structure

```
src/
├── App.jsx                         # Root component — routing and layout
├── main.jsx                        # Entry point — BrowserRouter wrapper
├── index.css                       # Tailwind directives + theme tokens
│
├── config/
│   └── index.js                    # Social links, resume URL, thresholds
│
├── data/                           # All content — one file per section
│   ├── stats.js
│   ├── timeline.js
│   ├── experience.js
│   ├── dna.js
│   ├── projects.js
│   ├── caseStudies.js              # Metadata only — no content here
│   ├── testimonials.js
│   └── certifications.js
│
├── hooks/                          # Custom React hooks
│   ├── useScrollReveal.js
│   ├── useItemsPerView.js
│   ├── useIsMobile.js
│   └── index.js
│
├── styles/
│   └── globals.css                 # Custom CSS — animations, modals, carousel
│
├── components/
│   ├── ui/                         # Reusable primitives
│   │   ├── Icons.jsx
│   │   ├── BrandLogo.jsx
│   │   ├── Carousel.jsx
│   │   ├── SectionHeader.jsx
│   │   └── ScrollToTop.jsx
│   ├── modals/
│   │   ├── TestimonialModal.jsx
│   │   └── ViewMoreModal.jsx
│   └── layout/
│       ├── Nav.jsx
│       ├── MobileMenu.jsx
│       └── Footer.jsx
│
├── sections/                       # One component per page section
│   ├── Hero.jsx
│   ├── StatsBar.jsx
│   ├── CareerJourney.jsx
│   ├── WorkExperience.jsx
│   ├── CoreDNA.jsx
│   ├── Projects.jsx
│   ├── CaseStudies.jsx
│   ├── Testimonials.jsx
│   └── Certifications.jsx
│
├── pages/
│   └── CaseStudyPage.jsx           # Full case study page at /#/case-studies/:slug
│
└── content/
    └── case-studies/               # One folder per case study
        ├── components.jsx          # Shared content components (H2, P, MetricRow…)
        ├── vidaxl-ai-content-automation/
        │   ├── index.jsx           # Full case study content
        │   └── assets/             # Images and gifs for this case study
        └── techmojo-sportsbook-gtm/
            ├── index.jsx
            └── assets/

public/
├── me.jpg                          # Profile photo
├── logo.png                        # Brand logo — used as favicon + nav icon
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

# Preview production build
npm run preview
```

---

## Common Tasks

### Add a new stat
Open `src/data/stats.js` and add an object to the array.
The carousel handles any count automatically.

### Add a new project
Open `src/data/projects.js` and add an object to the array.
If the total count exceeds `VIEW_MORE_THRESHOLD` (set in `src/config/index.js`),
a "View All" button appears automatically.

### Add a new testimonial
Open `src/data/testimonials.js` and add an object.
Paste the full text — the modal handles any length.

### Add a new certification
Open `src/data/certifications.js` and add an object.
Set `link: ""` if the certificate URL isn't available yet.

### Publish a case study
1. Open `src/data/caseStudies.js`
2. Set `published: true` on the entry
3. Confirm the `slug` matches the folder name in `src/content/case-studies/`
4. Write the content in `src/content/case-studies/<slug>/index.jsx`
5. Drop images and gifs into `src/content/case-studies/<slug>/assets/`

The lock overlay disappears and the page goes live at `/#/case-studies/<slug>`.

### Add a new case study placeholder
Add an entry to `src/data/caseStudies.js` with `published: false`.
The card appears with a "Publishing Soon" lock overlay automatically.

### Change social links or resume path
Edit `src/config/index.js`.
Update the PDF filename in `/public/` to match.

### Change the colour theme
Edit the `@theme` block in `src/index.css`.

```css
@theme {
  --color-darkBg: #0f172a;   /* page background */
  --color-cardBg: #1e293b;   /* card surface */
  --color-accent: #10b981;   /* brand accent */
}
```

### Change any animation or layout CSS
Edit `src/styles/globals.css`.

### Reorder or remove a page section
Edit the `HomePage` component in `src/App.jsx`.

---

## Deployment

This site deploys automatically to GitHub Pages on every push to `main`
via the GitHub Actions workflow in `.github/workflows/`.

After deploying, if you've updated the Open Graph image or meta tags,
force a LinkedIn cache refresh at:
[linkedin.com/post-inspector](https://www.linkedin.com/post-inspector/)

---

## Notes

- **NDA:** No proprietary screenshots, internal dashboards, or client data are
  included anywhere in this repository. All project descriptions use
  publicly shareable outcomes and metrics consistent with the resume.

- **Image protection:** The profile photo (`me.jpg`) has right-click and
  drag prevention applied at the component level. This does not prevent
  access via browser DevTools.

- **Peer dependency note:** `@tailwindcss/vite@4.x` currently declares a
  peer dependency on `vite@^5–7`. This project runs on `vite@8` which is
  functional but triggers a peer resolution warning. Use
  `npm install --legacy-peer-deps` to install without errors.