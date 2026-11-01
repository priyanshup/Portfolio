/**
 * main.jsx
 *
 * Browser entry point. Real paths under the /Portfolio base:
 *   https://priyanshup.github.io/Portfolio/case-studies/vidaxl-ai-content-automation/
 *
 * Every page also exists as prerendered HTML (scripts/prerender.mjs) so link
 * previews, crawlers and no-JS readers get real content. That markup is NOT
 * hydrated: several components pick their layout from the viewport on the
 * first render, and hydrating the desktop prerender on a phone would flash.
 * #root[data-prerendered] stays invisible (index.html) until this render
 * replaces it, so nobody sees the swap. That costs nothing against the old
 * setup, where #root was empty until the same moment.
 *
 * Old /#/… links (shared while the site used HashRouter) are rewritten to
 * real paths by a script in index.html before this runs.
 */

import { StrictMode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

/* Self-hosted fonts (no third-party requests; see DESIGN.md) */
import '@fontsource-variable/zalando-sans-expanded';
import '@fontsource-variable/inter';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/700.css';

import './index.css';
import './styles/globals.css';
import App from './App.jsx';
import { loadCaseStudy, slugFromPath } from './content/case-studies/registry';

const container = document.getElementById('root');

const start = () => {
  container.replaceChildren();
  const root = createRoot(container);
  // synchronous, so the app is in the DOM before the prerender's cover comes off
  flushSync(() => root.render(
    <StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  ));
  container.removeAttribute('data-prerendered');
};

/* A case study opened directly: load its article first, so it renders at once */
const slug = slugFromPath(window.location.pathname);
if (slug) loadCaseStudy(slug).catch(() => {}).finally(start);
else start();
