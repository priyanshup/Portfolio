/**
 * content/case-studies/registry.js
 *
 * Loads case-study bodies (./<slug>/index.jsx) on demand and remembers the
 * ones already loaded. The prerender (src/entry-server.jsx) and the browser
 * entry (src/main.jsx) both load the requested study BEFORE the first render,
 * so a case-study URL opened directly renders its article at once instead of
 * a loading skeleton.
 */

const loaders = import.meta.glob('./*/index.jsx');
const loaded = {};

/** Resolves to the study's component; rejects if there is no such folder. */
export const loadCaseStudy = (slug) => {
  if (loaded[slug]) return Promise.resolve(loaded[slug]);
  const load = loaders[`./${slug}/index.jsx`];
  if (!load) return Promise.reject(new Error(`No case study at ${slug}`));
  return load().then((mod) => (loaded[slug] = mod.default));
};

/** The study's component if it has already loaded, otherwise undefined. */
export const loadedCaseStudy = (slug) => loaded[slug];

/** "/case-studies/<slug>" (with or without the base or a trailing slash) → slug */
export const slugFromPath = (path) => path.match(/\/case-studies\/([^/]+)\/?$/)?.[1];
