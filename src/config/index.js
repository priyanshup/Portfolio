/**
 * config/index.js
 *
 * Single source of truth for all site-wide settings.
 * Edit this file to change links, URLs, and section budgets.
 */

export const CONFIG = {
  resumeUrl: "Priyanshu_Pushpam_Technical_Product_Manager.pdf",
  social: {
    linkedin:  "https://www.linkedin.com/in/ppushpam/",
    github:    "https://github.com/priyanshup",
    instagram: "https://www.instagram.com/mr.pushpam/",
    facebook:  "https://www.facebook.com/priyanshup",
  },
  // Shared with index.html's static <meta> tags and reused by the page
  // components to restore the homepage's title/description on unmount.
  siteUrl: "https://priyanshup.github.io/Portfolio/",
  siteTitle: "Priyanshu Pushpam | Technical Product Leader",
  siteDescription:
    "Product owner with ten years in healthcare, gaming and e-commerce, currently working on digital commerce at Heineken. Case studies, experience and recommendations.",
};

/*
 * SECTION BUDGETS — the homepage stays the same length however much content
 * you add. Each section has a fixed size and ONE overflow rule (DESIGN.md).
 */

/** Roles shown in Experience; older ones fold under "Earlier roles". */
export const EXPERIENCE_VISIBLE = 5;

/** Recommendations shown before "Show all". */
export const RECOMMENDATIONS_VISIBLE = 3;

/** Titles listed under the featured work on the homepage (rest: "+N more"). */
export const MORE_WORK_PREVIEW = 5;
