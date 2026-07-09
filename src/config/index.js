/**
 * config/index.js
 *
 * Single source of truth for all site-wide settings.
 * Edit this file to change links, URLs, and behaviour thresholds.
 */

export const CONFIG = {
  resumeUrl: "Priyanshu_Pushpam_Technical_Product_Manager.pdf",
  social: {
    linkedin:  "https://www.linkedin.com/in/ppushpam/",
    github:    "https://github.com/priyanshup",
    instagram: "https://www.instagram.com/mr.pushpam/",
    facebook:  "https://www.facebook.com/priyanshup",
  },
  // Shared with index.html's static <meta> tags and reused by CaseStudyPage
  // to restore the homepage's title/description when a case study unmounts.
  siteUrl: "https://priyanshup.github.io/Portfolio/",
  siteTitle: "Priyanshu Pushpam — Technical Product Leader",
  siteDescription:
    "Technical Product Leader with 10 years of experience across e-commerce, gaming, and healthcare. Scaling platforms from zero to global using AI, cloud, and cross-functional leadership.",
};

export const VIEW_MORE_THRESHOLD = 4;
