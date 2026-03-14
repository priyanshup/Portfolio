/**
 * data/timeline.js
 *
 * Career journey timeline entries.
 * type must be one of: "eng" | "pivot" | "po" | "current"
 */

export const timeline = [
  {
    year: "2016",
    role: "Software Engineer",
    company: "UnitedHealth Group",
    note: "Built the technical foundation — Java, SQL, Shell scripting for high-availability healthcare systems. Automated 92% of manual ops and cleared 900+ ticket backlogs.",
    type: "eng",
  },
  {
    year: "2019",
    role: "Sr. Business Systems Analyst — Healthcare",
    company: "UnitedHealth Group",
    note: "The deliberate pivot: from writing code to owning business outcomes. Bridged engineering teams and business stakeholders across 4 enterprise transformation programmes.",
    type: "pivot",
  },
  {
    year: "2022",
    role: "Product Owner — Sportsbook",
    company: "Techmojo Solutions",
    note: "Stepped into full product leadership — 50+ engineers, 5 scrum teams, 5 global markets. Drove 200% revenue growth within 3 months of MVP.",
    type: "po",
  },
  {
    year: "2024",
    role: "Product Owner — E-commerce",
    company: "VidaXL",
    note: "Leading AI-driven content automation at scale. 90K+ SKUs across 12 global markets. OpenAI on GCP delivering a 7% conversion lift in 30 days.",
    type: "current",
  },
];

/** Badge styles keyed by timeline entry type */
export const typeStyle = {
  eng:     { badge: "text-blue-400 border-blue-400/30 bg-blue-400/10",       label: "Engineer" },
  pivot:   { badge: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10", label: "Career Pivot" },
  po:      { badge: "text-accent border-accent/30 bg-accent/10",             label: "Product Owner" },
  current: { badge: "text-green-400 border-green-400/30 bg-green-400/10",    label: "Current" },
};
