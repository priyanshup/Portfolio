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
      "Product launch time cut from 3 weeks to 3 days",
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
      "21% reduction in cloud storage costs",
      "300,000+ SKUs decoupled from duplicate assets",
      "Zero impact on compliance image rendering",
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
      "900+ backlog cleared through automation",
      "Team refocused entirely on edge-case 8%",
    ],
  },
  {
    eyebrow: "Delivery & Leadership · UHG",
    company: "UnitedHealth Group",
    headline: "Delivered 4 Compliance Projects Simultaneously, On Deadline",
    context:
      "Led four concurrent compliance-critical initiatives at UHG under a tight deadline. Restructured the team into project-specific responsibility zones — each senior member owned one initiative end-to-end, minimising context switching.",
    outcomes: [
      "All 4 projects delivered on deadline",
      "Zero compliance misses across all initiatives",
      "Cross-functional team restructured for zero context switching",
    ],
  },
  {
    eyebrow: "Developer Automation · UHG",
    company: "UnitedHealth Group",
    headline: "Built a Cron Automation Engine from Scratch",
    context:
      "Support team was manually executing 25+ SQL and shell scripts daily at varying frequencies. As a developer at UHG, designed and built a forever-running shell script cron engine scheduled via TWS (Tivoli Workload Scheduler).",
    outcomes: [
      "Eliminated daily manual execution for entire support team",
      "Zero missed schedules — auto-resumes after system restart",
      "25+ scripts automated across SQL and shell",
    ],
  },
];
