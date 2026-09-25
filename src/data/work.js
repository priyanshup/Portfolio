/**
 * data/work.js
 *
 * Single source of truth for everything shown under "Work": case studies,
 * smaller projects and short write-ups of specific problems.
 *
 * The homepage shows only the items flagged `featured`. Everything else lives
 * on the "All work" page (/work). Adding a twentieth item is a data edit and
 * never lengthens the homepage. See DESIGN.md, "Section budgets".
 *
 * Fields:
 *   id         stable id
 *   kind       "case-study" | "project" | "impact"
 *   featured   true = shown on the homepage (keep to 3)
 *   published  false hides a case study everywhere (default true)
 *   slug       case studies only; must match the folder name in
 *              src/content/case-studies/<slug>/ (route /case-studies/:slug)
 *   readMinutes case studies only; roughly words / 240
 *   title      sentence case, plain, says what happened
 *   company
 *   domain     short category, also the filter chip on /work
 *   summary    one or two sentences in the first person
 *   outcomes   short result chips
 *   tags       topics and stack
 *   ctaLabel   optional short label for the Hero button when this is the first
 *              featured item ("See how AI cut publishing time"). It should say
 *              what you'll read, in a few words. Falls back to "Read my top case study".
 *   metric     optional { val, label }. Featured items with a metric feed the
 *              Hero proof strip. Only write "X to Y" if both numbers are real.
 *   openSource, links   open-source items (Quor)
 *
 * Order is the display order on /work (featured first, then by recency).
 * Voice: plain first person, British spelling, no dashes as connectors.
 * See DESIGN.md, "Writing voice".
 */

export const work = [
  /* Featured case studies */
  {
    id: "vidaxl-ai-content-automation",
    kind: "case-study",
    featured: true,
    slug: "vidaxl-ai-content-automation",
    readMinutes: 4,
    title: "How AI cut product publishing time from 3 weeks to 3 days",
    company: "VidaXL",
    domain: "E-commerce",
    summary:
      "I designed and shipped an AI content engine that writes product titles, descriptions and translations for a catalogue of 250K SKUs across 30+ markets. Publishing went from weeks to days.",
    outcomes: ["7% conversion lift in 30 days", "23% cost reduction", "60+ hrs/week saved"],
    tags: ["AI strategy", "Product discovery", "Automation", "OpenAI API", "GCP"],
    ctaLabel: "See how AI cut publishing time",
    metric: { val: "3 weeks to 3 days", label: "Product publishing time at VidaXL" },
  },
  {
    id: "techmojo-sportsbook-gtm",
    kind: "case-study",
    featured: true,
    slug: "techmojo-sportsbook-gtm",
    readMinutes: 5,
    title: "Launching a sportsbook in five countries in one month",
    company: "Techmojo",
    domain: "Gaming",
    summary:
      "I set the MVP scope for a global sportsbook, coordinated 50+ engineers across several teams, and wrote a launch playbook we reused for each new country. Five countries launched in a month and revenue grew 200% within three months.",
    outcomes: ["200% revenue growth after the MVP", "30% better performance", "5 countries launched"],
    tags: ["Go-to-market", "Product roadmap", "Cross-team delivery", "AWS"],
    metric: { val: "200%", label: "Revenue growth within 3 months of MVP at Techmojo" },
  },
  {
    id: "uhg-zero-downtime-migration",
    kind: "case-study",
    featured: true,
    slug: "uhg-zero-downtime-migration",
    readMinutes: 5,
    title: "Migrating 28 states to the 837 claims format with zero downtime",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "I moved a dental claims vendor, March Vision, from its own claims format to the industry-standard 837 across 28 US states, without disrupting claim processing.",
    outcomes: ["0 downtime incidents", "28 states migrated", "100% rollout success"],
    tags: ["Risk management", "Technical leadership", "Stakeholder alignment", "Healthcare"],
    metric: { val: "28 states", label: "Moved to the 837 standard with zero downtime at UHG" },
  },

  /* Other case studies */
  {
    id: "uhg-qa-cycle-automation",
    kind: "case-study",
    featured: false,
    slug: "uhg-qa-cycle-automation",
    readMinutes: 5,
    title: "Cutting QA cycle time by 30% with a test data generator",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "I built an Excel macro tool that generates privacy-safe test data and the database queries to load it. QA cycles got 30% shorter, and no patient data was involved.",
    outcomes: ["30% QA cycle time reduction", "0 PHI violations in test environments"],
    tags: ["Internal tooling", "Developer experience", "Process improvement", "Healthcare"],
    metric: { val: "30%", label: "Faster QA cycles" },
  },
  {
    id: "uhg-claims-transformation",
    kind: "case-study",
    featured: false,
    slug: "uhg-claims-transformation",
    readMinutes: 6,
    title: "Speeding up claim payments by about 20%",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "I designed logic that fills in missing claim fields, corrects likely provider typos and cuts rejections. Payments got about 20% faster, as tracked by the analytics team.",
    outcomes: ["~20% faster payment cycles", "10% error reduction"],
    tags: ["Enterprise transformation", "Stakeholder management", "Process redesign", "Healthcare"],
    metric: { val: "~20%", label: "Faster payment cycles" },
  },

  /* Open source */
  {
    id: "quor",
    kind: "project",
    featured: false,
    openSource: true,
    title: "Quor",
    company: "Personal Project",
    domain: "Developer tools",
    summary:
      "AI coding assistants waste their context window on repetitive command output such as build logs, stack traces and noisy CLI messages. Quor trims that output so there's more room for the code that matters.",
    outcomes: ["983 tests passing", "Published on PyPI", "Apache 2.0"],
    tags: ["Python", "CLI", "PyPI"],
    links: [
      { label: "GitHub", url: "https://github.com/priyanshup/Quor" },
      { label: "PyPI", url: "https://pypi.org/project/quor/" },
      { label: "Docs", url: "https://github.com/priyanshup/Quor#readme" },
    ],
  },

  /* Smaller write-ups (no dedicated case-study page) */
  {
    id: "vidaxl-storage-cost",
    kind: "impact",
    featured: false,
    title: "Cutting cloud storage costs 21% by sharing compliance images",
    company: "VidaXL",
    domain: "E-commerce",
    summary:
      "Across 300,000+ SKUs stored in Cloudinary, the mandatory compliance images (Prop 65, topple warning, safety warning) were copied into every SKU's folder by design. That meant a lot of duplicate storage.",
    outcomes: [
      "21% lower cloud storage costs",
      "300,000+ SKUs no longer hold duplicate assets",
      "Compliance images render exactly as before",
    ],
    tags: ["Infrastructure and cost", "Cloudinary"],
  },
  {
    id: "uhg-ticket-backlog",
    kind: "impact",
    featured: false,
    title: "Automating 92% of a ticket backlog",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "I inherited 900+ manual access-provisioning tickets on a team with high attrition. I built a form-based workflow for onboarding, updates and offboarding, integrated with the SBM (Serena Business Manager) ticketing system.",
    outcomes: [
      "92% fewer tickets coming in",
      "900+ backlog cleared through automation",
      "Team now handles only the remaining 8% of edge cases",
    ],
    tags: ["Operations and automation", "SBM"],
  },
  {
    id: "uhg-compliance-delivery",
    kind: "impact",
    featured: false,
    title: "Delivering four compliance projects at once, on deadline",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "I led four compliance-critical initiatives at UHG at the same time, under a tight deadline. I split the team into project-specific zones so each senior member owned one initiative from start to finish and nobody was switching between projects.",
    outcomes: [
      "All four projects delivered on deadline",
      "No compliance misses",
      "Far less context switching after the restructure",
    ],
    tags: ["Delivery and leadership"],
  },
  {
    id: "uhg-script-automation",
    kind: "project",
    featured: false,
    title: "A tool for running database scripts on a schedule",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "Engineers were spending about 40% of their time running complex database scripts by hand, with no central logging, scheduling or error handling.",
    outcomes: [
      "92% of manual operations automated",
      "40% of engineering time freed up",
      "No execution errors",
    ],
    tags: ["SQL", "Shell", "CRON", "Java"],
  },
  {
    id: "uhg-cron-engine",
    kind: "impact",
    featured: false,
    title: "Building a cron-style scheduler from scratch",
    company: "UnitedHealth Group",
    domain: "Healthcare",
    summary:
      "The support team ran 25+ SQL and shell scripts by hand every day, at different frequencies. As a developer at UHG I built a shell-script engine that runs continuously, scheduled through TWS (Tivoli Workload Scheduler).",
    outcomes: [
      "Support team no longer runs scripts by hand",
      "No missed schedules, and it resumes after a system restart",
      "25+ SQL and shell scripts automated",
    ],
    tags: ["Developer automation", "TWS"],
  },
];

/* ── Derived views (import these, don't re-filter in components) ──── */

const isPublished = (w) => w.published !== false;

/** Everything that should be shown anywhere. */
export const allWork = work.filter(isPublished);

/** Case studies that have a full page (route /case-studies/:slug). */
export const caseStudies = allWork.filter((w) => w.slug);

/** Homepage flagship items. */
export const featuredWork = allWork.filter((w) => w.featured);

/** Everything not featured (for the homepage "more work" links). */
export const moreWork = allWork.filter((w) => !w.featured);

/** Hero proof strip: metrics of the featured items, in order. */
export const heroProofs = featuredWork.filter((w) => w.metric).map((w) => w.metric);

/** Filter chips for /work, in first-seen order. */
export const workDomains = [...new Set(allWork.map((w) => w.domain))];

/** Case study following `slug` in list order (wraps around). */
export const nextCaseStudy = (slug) => {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i < 0 || caseStudies.length < 2) return null;
  return caseStudies[(i + 1) % caseStudies.length];
};
