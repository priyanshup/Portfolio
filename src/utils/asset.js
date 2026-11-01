/**
 * URL for a file in /public. Pages live at real paths (/Portfolio/work/,
 * /Portfolio/case-studies/<slug>/), so a bare relative "me.jpg" would resolve
 * against the page's folder and 404. Always go through this.
 */
export const asset = (file) => import.meta.env.BASE_URL + file;
