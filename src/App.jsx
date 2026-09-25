/**
 * App.jsx
 *
 * Root component — imports and composes all sections.
 * Contains NO content, NO styles, NO data.
 *
 * Routing (HashRouter — URLs are /#/…):
 *   /                    → full portfolio (all sections)
 *   /work                → all work (overflow for the homepage Work section)
 *   /case-studies/:slug  → individual case study page
 *
 * Analytics:
 *   - RouteTracker fires trackPageView on every route change
 *   - useScrollTracking fires scroll depth events at 25/50/75/100%
 *   - useSectionTracking fires view_section when each section enters viewport
 *
 * To add/remove/reorder sections, edit the HomePage component below.
 * To change content, edit the relevant file in src/data/.
 * To change styles, edit src/styles/globals.css.
 */

import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useScrollReveal, useScrollTracking, useSectionTracking, useTheme } from './hooks';
import { trackPageView } from './utils/analytics.js';
import { CONFIG } from './config';

/* Layout */
import Nav         from './components/layout/Nav';
import Footer      from './components/layout/Footer';

/* UI utilities */
import ScrollToTop from './components/ui/ScrollToTop';

/* Sections — reorder freely inside HomePage */
import Hero           from './sections/Hero';
import Work           from './sections/Work';
import Experience     from './sections/Experience';
import WhatIBring     from './sections/WhatIBring';
import Recognition    from './sections/Recognition';
import Currently      from './sections/Currently';

/* Pages */
import CaseStudyPage from './pages/CaseStudyPage';
import WorkPage      from './pages/WorkPage';

/* ─────────────────────────────────────────────────────────────────
   ROUTE TRACKER
   Fires a GA4 page_view event on every route change.
   Handles HashRouter navigation which GA4 doesn't track automatically.
───────────────────────────────────────────────────────────────── */
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.hash);
  }, [location]);

  return null;
};

/* ─────────────────────────────────────────────────────────────────
   HOME PAGE — all portfolio sections in one place.
   Every in-app link to a homepage section (nav, back links) navigates to
   "/" with state={{ scrollTo: '<section id>' }}; this component performs
   the scroll once its sections are mounted.
───────────────────────────────────────────────────────────────── */
const HomePage = () => {
  useScrollReveal();
  useScrollTracking();    // fires scroll_depth events at 25/50/75/100%
  useSectionTracking();   // fires view_section as each section enters viewport

  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return undefined;

    /*
     * Small delay ensures the DOM has fully rendered before scrolling.
     * Without this, the element may not exist yet when the effect fires.
     */
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      if (target === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const offset = 80; // account for the fixed nav height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timer);
  }, [location.state, location.key]);

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-none">
      <Hero />
      <Work />
      <Experience />
      <WhatIBring />
      <Recognition />
      <Currently />
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────────
   APP — sets up routing and persistent layout (Nav, Footer, ScrollToTop)
───────────────────────────────────────────────────────────────── */
const App = () => {
  /* Set page title and favicon from public/logo.png */
  useEffect(() => {
    document.title = CONFIG.siteTitle;
    const existing = document.querySelector("link[rel*='icon']");
    const link = existing || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = 'logo.png';
    if (!existing) document.head.appendChild(link);
  }, []);

  /* Theme management — sets dark/light class on <html>, syncs localStorage */
  const [theme, toggleTheme] = useTheme();

  /*
   * Printing: always print dark-on-white. Drop the `dark` class for the
   * duration of the print job, then restore it.
   */
  useEffect(() => {
    let wasDark = false;
    const before = () => {
      wasDark = document.documentElement.classList.contains('dark');
      document.documentElement.classList.remove('dark');
    };
    const after = () => {
      if (wasDark) document.documentElement.classList.add('dark');
    };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  /* Skip link: move focus to <main> without touching the router's hash */
  const skipToContent = (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView();
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      {/* Visually hidden until keyboard focus; jumps past the nav to main content */}
      <a
        href="#main-content"
        onClick={skipToContent}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-full focus:bg-accent dark:focus:text-slate-950 focus:text-white focus:font-mono-pp focus:text-sm focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Nav is always visible on every page */}
      <Nav theme={theme} toggleTheme={toggleTheme} />

      {/*
        RouteTracker lives inside the router context (provided by HashRouter
        in main.jsx) so useLocation() works correctly.
        It renders nothing — purely fires analytics events.
      */}
      <RouteTracker />

      <Routes>
        {/* Home — full portfolio */}
        <Route path="/" element={<HomePage />} />

        {/* All work — overflow for the homepage Work section */}
        <Route path="/work" element={<WorkPage />} />

        {/* Individual case study pages — e.g. /#/case-studies/vidaxl-ai-content-automation */}
        <Route path="/case-studies/:slug" element={<CaseStudyPage />} />

        {/* Catch-all: unknown paths fall back to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer and scroll-to-top are always visible on every page */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
