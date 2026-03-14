/**
 * data/experience.js
 *
 * Work experience entries for the accordion section.
 * Each entry maps to one expandable card.
 */

export const experience = [
  {
    period: "Sep 2024",
    periodEnd: "Present",
    role: "Product Owner",
    domain: "E-commerce Platform",
    company: "VidaXL",
    location: "Hyderabad, India",
    current: true,
    bullets: [
      "Achieved 7% conversion lift across all SKUs within 30 days by integrating OpenAI-driven multilingual content generation.",
      "Reduced monthly operational costs by 23% by automating manual localization workflows, saving 60+ manual hours per week.",
      "Engineered real-time KPI dashboards on GCP, increasing leadership decision-making speed by 35% through automated data visibility.",
      "Optimized digital asset management, reducing cloud storage costs by 21% through centralizing asset retrieval and metadata protocols.",
    ],
    tags: ["GCP", "OpenAI", "Python", "Productsup", "Salsify"],
  },
  {
    period: "Mar 2022",
    periodEnd: "Aug 2024",
    role: "Product Owner",
    domain: "Sportsbook & Gaming",
    company: "Techmojo Solutions",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Drove 200% revenue growth within 3 months post-MVP by executing a multi-country GTM strategy across UK, Germany, Spain, Japan, and Turkey.",
      "Led 5 Scrum teams (50+ members) and 2 Business Analysts, synchronising roadmap priorities and technical grooming for complex betting logic.",
      "Improved system performance by 30% by leveraging AWS CloudWatch logs to identify bottlenecks and architecting API optimisations.",
      "Reduced time-to-market by 20% by implementing a RICE-based framework that aligned technical debt with growth features.",
    ],
    tags: ["AWS", "Java Microservices", "Redis", "React", "RICE"],
  },
  {
    period: "Jun 2019",
    periodEnd: "Mar 2022",
    role: "Sr. Business Systems Analyst",
    domain: "Healthcare",
    company: "UnitedHealth Group",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Delivered 25% improvement in operational efficiency by managing 4 enterprise transformation initiatives.",
      "Accelerated payment cycles by 20% and reduced manual errors by 10% through end-to-end automation of claims processing.",
      "Slashed QA cycles by 30% by building a mock-data automation product, enabling significantly faster pre-release validation.",
    ],
    tags: ["SQL", "Shell", "Java", "JIRA", "Healthcare"],
  },
  {
    period: "Jul 2016",
    periodEnd: "Jun 2019",
    role: "Software Engineer",
    domain: "Healthcare",
    company: "UnitedHealth Group",
    location: "Hyderabad, India",
    current: false,
    bullets: [
      "Automated 92% of manual workload for account creation, resolving a backlog of 900+ tickets in 4 weeks.",
      "Engineered 25+ SQL and Shell scripts to replace manual daily tasks, enhancing platform reliability and incident response speed.",
    ],
    tags: ["Java", "SQL", "Shell", "CRON"],
  },
];
