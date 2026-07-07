/**
 * data/projects.js
 *
 * Key projects for the Projects section.
 * Each project appears as a card.
 *
 * No links needed — all client work is under NDA. The one exception is
 * personal/open-source projects (`openSource: true`), which carry a
 * `links` array rendered as clickable chips on the card.
 * Add new projects freely. If the total count exceeds VIEW_MORE_THRESHOLD
 * (defined in config/index.js), a "View All" button appears automatically.
 */

export const projects = [
  {
    title: "Global Product Publication Automation",
    company: "VidaXL",
    domain: "E-commerce · AI · GCP",
    problem:
      "Manually managing product content for 90K+ SKUs across 12 languages was costing 60+ hours per week with inconsistent quality and missed market deadlines.",
    outcomes: [
      "7% conversion lift in 30 days",
      "23% cost reduction",
      "60+ hrs/week saved",
    ],
    stack: ["GCP", "OpenAI", "Python", "Productsup", "Salsify"],
  },
  {
    title: "White-Label Sportsbook Platform",
    company: "Techmojo Solutions",
    domain: "SaaS · Gaming · AWS",
    problem:
      "Building a zero-to-one white-label sportsbook capable of supporting high-concurrency global launches across multiple regulatory environments simultaneously.",
    outcomes: [
      "200% revenue growth post-MVP",
      "30% system performance boost",
      "5-country simultaneous launch",
    ],
    stack: ["AWS", "Java Microservices", "Redis", "React"],
  },
  {
    title: "Healthcare Claims & Member Onboarding",
    company: "UnitedHealth Group",
    domain: "Healthcare · Enterprise",
    problem:
      "Legacy manual processes for healthcare claims were causing a 900+ ticket backlog, delayed payment cycles, and high error rates in member onboarding.",
    outcomes: [
      "900+ tickets cleared in 4 weeks",
      "20% faster payment cycles",
      "10% error reduction",
    ],
    stack: ["SQL", "Shell", "Java", "837 Standards"],
  },
  {
    title: "Script Execution Automation Tool",
    company: "UnitedHealth Group",
    domain: "Internal Tooling · DevOps",
    problem:
      "Engineers were spending 40% of their time manually running complex database scripts with no centralised logging, scheduling, or error handling.",
    outcomes: [
      "92% of manual ops automated",
      "40% engineering bandwidth reclaimed",
      "Zero execution errors",
    ],
    stack: ["SQL", "Shell", "CRON", "Java"],
  },
  {
    title: "Quor",
    company: "Personal Project",
    domain: "Developer Tools · Python · Open Source",
    problem:
      "AI coding assistants burn through their context window on repetitive, low-signal command output — build logs, stack traces, verbose CLI noise — leaving less room for the code that actually matters.",
    outcomes: ["983 tests passing", "Published on PyPI", "Apache 2.0"],
    stack: ["Python", "CLI", "PyPI"],
    openSource: true,
    links: [
      { label: "GitHub", url: "https://github.com/priyanshup/Quor" },
      { label: "PyPI", url: "https://pypi.org/project/quor/" },
      { label: "Docs", url: "https://github.com/priyanshup/Quor#readme" },
    ],
  },
];
