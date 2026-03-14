/**
 * pages/CaseStudyPage.jsx
 *
 * OVERLAY RESTORATION:
 *   Reads location.state.fromOverlay on mount.
 *   If true, all back links forward it so CaseStudies.jsx knows
 *   to reopen the overlay when the user returns.
 *
 *   Navigation state flow:
 *     Overlay card click → state { scrollTo, fromOverlay: true }
 *     CaseStudyPage reads fromOverlay → passes it on its back links
 *     HomePage scrolls to section → CaseStudies reads fromOverlay → opens overlay
 *
 * FLOATING BACK BUTTON:
 *   Appears when both static back links are off-screen simultaneously.
 *   Disappears when either static link becomes visible.
 */

import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies.js';

const BACK_LABEL = '← Back to Portfolio';

/* ── Loading skeleton ── */
const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-4 bg-gray-800 rounded w-1/4" />
    <div className="h-8 bg-gray-800 rounded w-3/4" />
    <div className="h-4 bg-gray-800 rounded w-full" />
    <div className="h-4 bg-gray-800 rounded w-5/6" />
    <div className="h-4 bg-gray-800 rounded w-full" />
  </div>
);

/* ── Dynamic content loader ── */
const CaseStudyContent = ({ slug }) => {
  const [Content, setContent] = useState(null);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setContent(null);
    setError(false);
    import(`../content/case-studies/${slug}/index.jsx`)
      .then((mod) => setContent(() => mod.default))
      .catch(() => setError(true));
  }, [slug]);

  if (error) return (
    <p className="text-gray-500 text-sm">
      Content file not found. Make sure{' '}
      <code className="font-mono-pp text-accent">
        src/content/case-studies/{slug}/index.jsx
      </code>{' '}
      exists.
    </p>
  );

  if (!Content) return <LoadingSkeleton />;
  return <Content />;
};

/* ── Page ── */
const CaseStudyPage = () => {
  const { slug }   = useParams();
  const location   = useLocation();
  const cs = caseStudies.find((c) => c.slug === slug && c.published);

  /*
   * Read fromOverlay from incoming navigation state.
   * If user came here from the overlay, we forward this flag on all
   * back links so CaseStudies.jsx can reopen the overlay on return.
   */
  const fromOverlay = location.state?.fromOverlay ?? false;

  /* Back link state — always scrolls to case-studies, preserves overlay flag */
  const backState = { scrollTo: 'case-studies', fromOverlay };

  const topLinkRef    = useRef(null);
  const bottomLinkRef = useRef(null);
  const [showFloating, setShowFloating] = useState(false);

  /* Page title */
  useEffect(() => {
    document.title = cs
      ? `${cs.title} — Priyanshu Pushpam`
      : 'Case Study Not Found — Priyanshu Pushpam';
  }, [cs]);

  /* Scroll to top on navigation */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  /*
   * Floating back button visibility.
   * Show when BOTH static links are off-screen simultaneously.
   */
  useEffect(() => {
    if (!cs) return;

    const visibilityMap = { top: false, bottom: false };

    const update = () => {
      setShowFloating(!visibilityMap.top && !visibilityMap.bottom);
    };

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === topLinkRef.current) {
          visibilityMap.top = entry.isIntersecting;
        } else if (entry.target === bottomLinkRef.current) {
          visibilityMap.bottom = entry.isIntersecting;
        }
      });
      update();
    }, { threshold: 0.1 });

    const timer = setTimeout(() => {
      if (topLinkRef.current)    obs.observe(topLinkRef.current);
      if (bottomLinkRef.current) obs.observe(bottomLinkRef.current);
    }, 100);

    return () => { clearTimeout(timer); obs.disconnect(); };
  }, [cs, slug]);

  /* ── 404 ── */
  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-widest">404</p>
          <h1 className="font-display text-4xl font-bold text-white">
            Case study not found
          </h1>
          <p className="text-gray-400 text-sm">
            This case study doesn't exist or hasn't been published yet.
          </p>
          <Link
            to="/"
            state={backState}
            className="inline-block mt-4 font-mono-pp text-xs border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-darkBg transition-all uppercase tracking-widest"
          >
            {BACK_LABEL}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Floating back button ── */}
      <Link
        to="/"
        state={backState}
        className={`floating-back-btn font-mono-pp ${showFloating ? 'visible' : ''}`}
        aria-label="Back to Portfolio"
      >
        ← Portfolio
      </Link>

      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Static top back link */}
        <Link
          ref={topLinkRef}
          to="/"
          state={backState}
          className="font-mono-pp text-accent text-xs uppercase tracking-widest hover:text-white transition-colors mb-10 inline-flex items-center gap-2"
        >
          {BACK_LABEL}
        </Link>

        {/* Header */}
        <div className="mt-8 mb-12 space-y-6">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em]">
            {cs.company}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {cs.title}
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed border-l-2 border-gray-800 pl-6">
            {cs.teaser}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {cs.tags.map((t) => (
              <span
                key={t}
                className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-2" />
        </div>

        {/* Dynamically loaded content */}
        <CaseStudyContent slug={slug} />

        {/* Static bottom back link */}
        <div className="border-t border-gray-800 mt-16 pt-10">
          <Link
            ref={bottomLinkRef}
            to="/"
            state={backState}
            className="font-mono-pp text-accent text-xs uppercase tracking-widest hover:text-white transition-colors inline-flex items-center gap-2"
          >
            {BACK_LABEL}
          </Link>
        </div>

      </article>
    </>
  );
};

export default CaseStudyPage;