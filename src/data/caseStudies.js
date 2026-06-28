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
    title: "Zero-Downtime Migration Across 28 States",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "Migrated dental vendor March Vision from a proprietary claims format to the industry-standard 837 across 28 US states — with zero disruption to claim processing.",
    tags: ["Risk Management", "Technical Leadership", "Stakeholder Alignment", "Healthcare"],
    published: true,
    slug: "uhg-zero-downtime-migration",
  },
  {
    title: "30% Faster QA Cycles Through Smart Data Mocking",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "Built an Excel macro-based PHI-safe test data generator that auto-created database queries for QA teams, cutting QA cycle time by 30% and eliminating compliance risk.",
    tags: ["Internal Tooling", "Developer Experience", "Process Innovation", "Healthcare"],
    published: true,
    slug: "uhg-qa-cycle-automation",
  },
  {
    title: "Improving Payment Cycles by ~20% Through Claims Intelligence",
    company: "UnitedHealth Group · Healthcare",
    teaser:
      "Designed logic to auto-derive missing claim fields, detect and correct provider typos, and reduce rejections — resulting in ~20% faster payment cycles tracked by the analytics team.",
    tags: ["Enterprise Transformation", "Stakeholder Management", "Process Redesign", "Healthcare"],
    published: true,
    slug: "uhg-claims-transformation",
  },
];