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