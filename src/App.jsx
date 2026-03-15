/**
 * App.jsx
 *
 * Root component — imports and composes all sections.
 * Contains NO content, NO styles, NO data.
 *
 * Routing:
 *   /                    → full portfolio (all sections)
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
import { useScrollReveal, useScrollTracking, useSectionTracking } from './hooks';
import { trackPageView } from './utils/analytics.js';

/* Layout */
import Nav         from './components/layout/Nav';
import Footer      from './components/layout/Footer';

/* UI utilities */
import ScrollToTop from './components/ui/ScrollToTop';

/* Sections — reorder freely inside HomePage */
import Hero           from './sections/Hero';
import StatsBar       from './sections/StatsBar';
import CareerJourney  from './sections/CareerJourney';
import WorkExperience from './sections/WorkExperience';
import CoreDNA        from './sections/CoreDNA';
import Projects       from './sections/Projects';
import CaseStudies    from './sections/CaseStudies';
import Testimonials   from './sections/Testimonials';
import Certifications from './sections/Certifications';

/* Pages */
import CaseStudyPage from './pages/CaseStudyPage';

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
   HOME PAGE — all portfolio sections in one place
   Handles scroll restoration when returning from a case study page.
   Pass state={{ scrollTo: 'case-studies' }} on the back Link to
   land the user back in the Case Studies section.
───────────────────────────────────────────────────────────────── */
const HomePage = () => {
  useScrollReveal();
  useScrollTracking();    // fires scroll_depth events at 25/50/75/100%
  useSectionTracking();   // fires view_section as each section enters viewport

  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    /*
     * Small delay ensures the DOM has fully rendered before scrolling.
     * Without this, the element may not exist yet when the effect fires.
     */
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        const offset = 80; // account for the fixed nav height
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <main>
      <Hero />
      <StatsBar />
      <CareerJourney />
      <WorkExperience />
      <CoreDNA />
      <Projects />
      <CaseStudies />
      <Testimonials />
      <Certifications />
    </main>
  );
};

/* ─────────────────────────────────────────────────────────────────
   APP — sets up routing and persistent layout (Nav, Footer, ScrollToTop)
───────────────────────────────────────────────────────────────── */
const App = () => {
  /* Set page title and favicon from public/logo.png */
  useEffect(() => {
    document.title = 'Priyanshu Pushpam — Technical Product Leader';
    const existing = document.querySelector("link[rel*='icon']");
    const link = existing || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = 'logo.png';
    if (!existing) document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      {/* Nav is always visible on every page */}
      <Nav />

      {/*
        RouteTracker lives inside the router context (provided by HashRouter
        in main.jsx) so useLocation() works correctly.
        It renders nothing — purely fires analytics events.
      */}
      <RouteTracker />

      <Routes>
        {/* Home — full portfolio */}
        <Route path="/" element={<HomePage />} />

        {/* Individual case study pages — e.g. /#/case-studies/vidaxl-ai-automation */}
        <Route path="/case-studies/:slug" element={<CaseStudyPage />} />

        {/* Catch-all: redirect unknown paths back to home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer and scroll-to-top are always visible on every page */}
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;