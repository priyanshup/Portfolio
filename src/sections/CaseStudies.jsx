/**
 * sections/CaseStudies.jsx
 *
 * OVERLAY RESTORATION:
 *   When a user navigates to a case study from the "View All" overlay,
 *   the back button passes state={{ scrollTo: 'case-studies', fromOverlay: true }}.
 *   On return, this component reads that state via useLocation() and
 *   automatically reopens the overlay — restoring the user's browsing context.
 *
 *   Cards inside the overlay pass fromOverlay: true in their navigation state.
 *   Cards in the main grid pass fromOverlay: false (no overlay to restore).
 *
 * Desktop: static 2-col grid + "View All" modal when count > VIEW_MORE_THRESHOLD.
 * Mobile:  swipeable carousel.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import ViewMoreModal from '../components/modals/ViewMoreModal';
import { LockIcon } from '../components/ui/Icons';
import { useIsMobile } from '../hooks';
import { caseStudies } from '../data/caseStudies.js';
import { VIEW_MORE_THRESHOLD } from '../config';

/* ── Case study card ─────────────────────────────────────────────
   Props:
     cs           – case study data object
     fromOverlay  – true when rendered inside the ViewMoreModal.
                    Adds state to the navigation so the section
                    knows to reopen the overlay on return.
─────────────────────────────────────────────────────────────────── */
export const CaseStudyCard = ({ cs, fromOverlay = false }) => {
  const tags = (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
      {cs.tags.map((t) => (
        <span
          key={t}
          className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400"
        >
          {t}
        </span>
      ))}
    </div>
  );

  const body = (
    <div className="p-5 sm:p-8 space-y-3 sm:space-y-4">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-accent">{cs.company}</p>
      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
        {cs.title}
      </h3>
      <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{cs.teaser}</p>
      {tags}
      {cs.published && (
        <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest pt-1 group-hover:text-white transition-colors">
          Read Case Study →
        </p>
      )}
    </div>
  );

  /* Published with slug — navigate and pass overlay context */
  if (cs.published && cs.slug) {
    return (
      <Link
        to={`/case-studies/${cs.slug}`}
        state={{
          scrollTo:    'case-studies',
          fromOverlay: fromOverlay,
        }}
        className="block rounded-3xl bg-cardBg border border-gray-800 hover:border-accent/40 transition-colors h-full group"
      >
        {body}
      </Link>
    );
  }

  /* Published but no slug */
  if (cs.published) {
    return (
      <div className="rounded-3xl bg-cardBg border border-gray-800 h-full group">
        {body}
      </div>
    );
  }

  /* Not published — locked */
  return (
    <div className="cs-locked rounded-3xl bg-cardBg border border-gray-800 h-full">
      <div className="p-5 sm:p-8 space-y-3 sm:space-y-4">
        <p className="font-mono-pp text-[10px] uppercase tracking-widest text-accent">{cs.company}</p>
        <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{cs.title}</h3>
        <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{cs.teaser}</p>
        {tags}
      </div>
      <div className="cs-locked-overlay">
        <LockIcon />
        <span className="font-mono-pp text-xs uppercase tracking-widest text-gray-400">
          Publishing Soon
        </span>
      </div>
    </div>
  );
};

/* ── Section ── */
const CaseStudies = () => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const visible = caseStudies.slice(0, VIEW_MORE_THRESHOLD);
  const hasMore = caseStudies.length > VIEW_MORE_THRESHOLD;

  /*
   * Overlay restoration on return from a case study.
   *
   * Initialise showAll directly from location.state — no effect needed.
   * This avoids the react-hooks/set-state-in-effect lint warning and
   * removes a render cycle. The lazy initialiser runs only once on mount.
   */
  const [showAll, setShowAll] = useState(
    () => !!(location.state?.fromOverlay && hasMore)
  );

  /*
   * Clear the fromOverlay flag from history after reading it.
   * This prevents the overlay from reopening if the user navigates
   * away and returns via the browser's back button.
   * Empty deps is intentional — runs once on mount only.
   */
  useEffect(() => {
    if (location.state?.fromOverlay) {
      window.history.replaceState(
        { ...window.history.state, usr: { scrollTo: 'case-studies', fromOverlay: false } },
        ''
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="case-studies" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">

      {/* Section header */}
      <div className="mb-10">
        <div className="reveal">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em] mb-3">Deep Dives</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Case Studies</h2>
        </div>
        <div className="reveal d1 mt-3 flex flex-wrap items-center gap-3">
          <p className="text-gray-400 text-sm">Full written case studies are in progress.</p>
          <span className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-yellow-400/30 text-yellow-400 bg-yellow-400/10">
            Publishing Soon
          </span>
        </div>
      </div>

      {/* View All overlay — cards inside pass fromOverlay: true */}
      {showAll && (
        <ViewMoreModal
          title="Case Studies"
          eyebrow="All Deep Dives"
          items={caseStudies}
          renderItem={(cs) => <CaseStudyCard cs={cs} fromOverlay={true} />}
          onClose={() => setShowAll(false)}
        />
      )}

      <div className="reveal">
        {isMobile ? (
          /* Mobile carousel — fromOverlay not relevant on mobile */
          <Carousel
            items={caseStudies}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            renderItem={(cs) => <CaseStudyCard cs={cs} fromOverlay={false} />}
          />
        ) : (
          <>
            {/* Main grid — cards pass fromOverlay: false */}
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((cs, i) => (
                <CaseStudyCard key={i} cs={cs} fromOverlay={false} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs border border-gray-700 text-gray-400 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all uppercase tracking-widest"
                >
                  View All Case Studies ({caseStudies.length}) ↗
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;