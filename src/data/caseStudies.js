/**
 * data/caseStudies.js
 *
 * Case study METADATA only — no content here.
 * Full content lives in src/content/case-studies/<slug>/index.jsx
 *
 * FIELDS:
 *   title      – card heading
 *   company    – e.g. "VidaXL · E-commerce"
 *   teaser     – short summary shown on the portfolio card
 *   tags       – array of label strings
 *   published  – false = locked overlay | true = clickable card + full page
 *   slug       – must exactly match the folder name in
 *                src/content/case-studies/<slug>/
 *
 * TO PUBLISH A CASE STUDY:
 *   1. Set published: true
 *   2. Confirm the slug matches your content folder name
 *   3. Write your content in src/content/case-studies/<slug>/index.jsx
 *   4. Drop images/gifs in src/content/case-studies/<slug>/assets/
 */

export const caseStudies = [
  {
    title: "Scaling Product Launch Speed: How AI Reduced Publishing Time from 3 Weeks to 3 Days",
    company: "VidaXL · E-commerce",
    teaser:
      "How I designed and shipped an AI-powered product content engine that automated title, description, and translation generation for a global catalog of 250K SKUs across 30+ markets — cutting publishing time from weeks to days.",
    tags: ["AI Strategy", "Product Discovery", "Automation", "OpenAI API", "GCP"],
    published: true,
    slug: "vidaxl-ai-content-automation",
  },
  {
    title: "From MVP to 200%: The GTM Playbook for a Global Sportsbook",
    company: "Techmojo · Gaming",
    teaser:
      "How I defined the MVP scope for a global sportsbook platform, coordinated 50+ engineers across multiple teams, and created a repeatable launch playbook that enabled expansion to 5 countries and drove 200% revenue growth within three months.",
    tags: ["GTM Strategy", "Product Roadmap", "Cross-Team Execution", "AWS"],
    published: true,
    slug: "techmojo-sportsbook-gtm",
  },
  {
   
    title: "Zero Risk at Scale: Engineering a Zero-Downtime Cross-System Migration",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "How I led a high-stakes cross-system migration for a critical healthcare platform — coordinating multiple engineering teams to achieve 100% rollout success with zero production downtime.",
    tags: ["Risk Management", "Technical Leadership", "Stakeholder Alignment", "Healthcare"],
    published: false,
    slug: "uhg-zero-downtime-migration",
  },
  {
    
    title: "Shipping Faster Without Breaking Things: Building a QA Automation Product for Healthcare Systems",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "How I identified a QA bottleneck slowing every release cycle, built a mock-data automation product to eliminate it, and reduced QA cycle time by 30% — unlocking faster, more confident releases across the engineering organisation.",
    tags: ["Internal Tooling", "Developer Experience", "Process Innovation", "Healthcare"],
    published: false,
    slug: "uhg-qa-cycle-automation",
  },
  {
 
    title: "Transforming Claims at Scale: Four Enterprise Initiatives That Moved Healthcare Operations Forward",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "How I orchestrated four simultaneous enterprise transformation initiatives for US healthcare claims processing — achieving 25% operational efficiency improvement, 20% faster payment cycles, and a meaningful reduction in manual processing errors.",
    tags: ["Enterprise Transformation", "Stakeholder Management", "Process Redesign", "Healthcare"],
    published: false,
    slug: "uhg-claims-transformation",
  },
];