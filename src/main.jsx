/**
 * main.jsx
 *
 * Application entry point.
 * Uses HashRouter for GitHub Pages compatibility.
 *
 * HashRouter stores the route in the URL hash (#), so GitHub Pages
 * never needs to handle client-side paths directly.
 *
 * Case study URLs will look like:
 *   https://priyanshup.github.io/Portfolio/#/case-studies/vidaxl-ai-automation
 *
 * If you ever move to a custom domain with server-side routing support,
 * swap HashRouter back to BrowserRouter and remove the # from URLs.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

/* Self-hosted fonts (no third-party requests; see DESIGN.md) */
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/inter';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@fontsource/ibm-plex-mono/700.css';

import './index.css';
import './styles/globals.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);