/**
 * entry-server.jsx
 *
 * Build-time only. `npm run build` bundles this for Node (vite build --ssr)
 * and scripts/prerender.mjs calls render() once per page to write the static
 * HTML that crawlers, link-preview bots and no-JS readers get. The browser
 * never loads this file; see main.jsx for why the output isn't hydrated.
 */

import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
import { loadCaseStudy, slugFromPath } from './content/case-studies/registry';

export { allPageMeta, pageUrl } from './utils/pageMeta';
export { CONFIG } from './config';
export { caseStudies } from './data/work';

/** HTML for the page at `path` (no base), e.g. "/work/". */
export const render = async (path) => {
  const slug = slugFromPath(path);
  if (slug) await loadCaseStudy(slug);
  return renderToString(
    <StrictMode>
      <StaticRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')} location={import.meta.env.BASE_URL.replace(/\/$/, '') + path}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
};
