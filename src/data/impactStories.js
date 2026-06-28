/**
 * data/impactStories.js
 *
 * Specific high-impact moments from across the career.
 * Each story appears as a card in the Impact Stories section.
 *
 * Ordered reverse chronologically — most recent company first, oldest last.
 * Current order: VidaXL (Sep 2024 – Jun 2026) → UHG (Jun 2019 – Mar 2022)
 *
 * Fields:
 *   eyebrow   – domain/context label (shown above the headline)
 *   company   – company where this happened
 *   headline  – bold card headline
 *   context   – 1-2 sentence problem/context statement
 *   outcomes  – array of short outcome strings displayed as highlighted chips
 */

export const impactStories = [
  {
    eyebrow: "Conversion & Growth · VidaXL",
    company: "VidaXL",
    headline: "7% Monthly Conversion Lift Through AI-Powered Product Content",
    context:
      "Product listings were manually written and translated, taking 3 weeks per launch. After automating title, description, key highlights, and multilingual translation using AI, products reached the website faster with richer, more relevant content — directly improving purchase decisions.",
    outcomes: [
      "7% increase in monthly conversion trend for newly launched products",
      "Product launch time reduced from 3 weeks to 3 days",
      "Multilingual content generated automatically across target languages",
    ],
  },
  {
    eyebrow: "Infrastructure & Cost · VidaXL",
    company: "VidaXL",
    headline: "21% Storage Cost Reduction via Shared Compliance Asset Architecture",
    context:
      "Across 300,000+ SKUs stored in Cloudinary, mandatory compliance images (Prop 65, topple warning, safety warning) were duplicated inside every individual SKU folder — by design. This created massive redundancy at scale.",
    outcomes: [
      "Migrated all compliance images to a single shared location in Cloudinary",
      "SKUs now reference shared assets — no duplication",
      "21% reduction in storage consumption and cloud storage costs",
      "Zero impact on image rendering or compliance requirements",
    ],
  },
  {
    eyebrow: "Operations & Automation · UHG",
    company: "UnitedHealth Group",
    headline: "Automated 92% of Operational Ticket Backlog",
    context:
      "Inherited a queue of 900+ manual access provisioning tickets for an operations team with high attrition. Built an automated form-based onboarding, update, and offboarding workflow integrated with the SBM (Serena Business Manager) ticketing system.",
    outcomes: [
      "92% reduction in ticket inflow",
      "Team shifted focus entirely to the remaining edge-case 8%",
      "Automated onboarding, access updates, and offboarding end-to-end",
    ],
  },
  {
    eyebrow: "Delivery & Leadership · UHG",
    company: "UnitedHealth Group",
    headline: "Delivered 4 Compliance Projects Simultaneously, On Deadline",
    context:
      "Led four concurrent compliance-critical initiatives at UHG under a tight deadline. Restructured the team into project-specific responsibility zones — each senior member owned one initiative end-to-end, minimising context switching.",
    outcomes: [
      "All four projects delivered on time",
      "Zero compliance misses",
      "Single point of accountability to management maintained throughout",
    ],
  },
  {
    eyebrow: "Developer Automation · UHG",
    company: "UnitedHealth Group",
    headline: "Built a Cron Automation Engine from Scratch",
    context:
      "Support team was manually executing 25+ SQL and shell scripts daily at varying frequencies. As a developer at UHG, designed and built a forever-running shell script cron engine scheduled via TWS (Tivoli Workload Scheduler).",
    outcomes: [
      "Fully automated script execution and email notifications",
      "Built-in resume logic ensured no missed executions after system restarts",
      "Eliminated daily manual effort for the entire support team",
    ],
  },
];
