/**
 * Title, description and canonical path for every page. One list shared by
 * the pages (useDocumentMeta, at runtime) and the prerender
 * (scripts/prerender.mjs writes them into each page's static <head>, which is
 * what link-preview bots read). Paths end in "/" because GitHub Pages serves
 * each page as <path>/index.html and redirects the bare form.
 */
import { CONFIG } from '../config';
import { caseStudies } from '../data/work';

export const homeMeta = {
  title: CONFIG.siteTitle,
  description: CONFIG.siteDescription,
  path: '/',
};

export const workMeta = {
  title: 'All work | Priyanshu Pushpam',
  description: 'Case studies, projects and short write-ups from ten years in e-commerce, gaming and healthcare.',
  path: '/work/',
};

export const caseStudyMeta = (cs) => ({
  title: `${cs.title} | Priyanshu Pushpam`,
  description: cs.summary,
  path: `/case-studies/${cs.slug}/`,
});

/** Every page that gets its own prerendered HTML file, in sitemap order. */
export const allPageMeta = () => [homeMeta, workMeta, ...caseStudies.map(caseStudyMeta)];

/** Absolute URL for a page path, e.g. "/work/" → https://…/Portfolio/work/ */
export const pageUrl = (path) => CONFIG.siteUrl + path.replace(/^\//, '');
