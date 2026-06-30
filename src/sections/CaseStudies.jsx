/**
 * sections/CaseStudies.jsx
 *
 * OVERLAY RESTORATION:
 *   When a user navigates to a case study from the "View All" overlay,
 *   the back button passes state={{ scrollTo: 'case-studies', fromOverlay: true }}.
 *   On return, this component reads that state via useLocation() and
 *   automatically reopens the overlay — restoring the user's browsing context.
 *
 * Card redesign:
 *   - Single-column full-width layout on desktop (was 2-col grid)
 *   - Left accent border (3px emerald, animates to full on hover)
 *   - Faded chapter number (01, 02…) positioned top-right inside each card
 *   - Larger title (text-2xl → text-3xl) — case studies earn more visual weight
 *   - Hover lift via card-lift class
 *
 * Analytics:
 *   - trackCaseStudyOpen fires when a published case study card is clicked
 *   - trackViewMoreOpen fires when the "View All" button is clicked
 *
 * Desktop: single-column stack + "View All" modal when count > VIEW_MORE_THRESHOLD.
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
import { trackCaseStudyOpen, trackViewMoreOpen } from '../utils/analytics.js';

/* ── Case study card ─────────────────────────────────────────────
   Props:
     cs          – case study data object
     fromOverlay – true when rendered inside the ViewMoreModal
     index       – position in the list; drives the chapter number display
                   (null in carousel/modal — suppresses the chapter number)
─────────────────────────────────────────────────────────────────── */
export const CaseStudyCard = ({ cs, fromOverlay = false, index = null }) => {
  const showChapter = index !== null;
  const chapterNum = showChapter ? String(index + 1).padStart(2, '0') : null;

  const tags = (
    <div className="flex flex-wrap gap-1.5 pt-1">
      {cs.tags.map((t) => (
        <span
          key={t}
          className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded dark:bg-gray-900 bg-slate-100 dark:border dark:border-gray-800 border border-slate-200 dark:text-gray-400 text-slate-600"
        >
          {t}
        </span>
      ))}
    </div>
  );

  const body = (
    <div className="relative p-6 sm:p-8 space-y-3 sm:space-y-4">
      {/* Chapter number — decorative, faded, top-right */}
      {showChapter && (
        <span className="absolute top-6 right-6 sm:top-8 sm:right-8 font-display font-extrabold text-7xl sm:text-8xl dark:text-gray-800/70 text-slate-200 leading-none select-none pointer-events-none">
          {chapterNum}
        </span>
      )}

      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-accent">{cs.company}</p>

      <h3 className={`font-display text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 leading-tight transition-colors duration-200 group-hover:text-accent${showChapter ? ' pr-20' : ''}`}>
        {cs.title}
      </h3>

      <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed max-w-2xl">
        {cs.teaser}
      </p>

      {tags}

      {cs.published && (
        <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest pt-1 dark:group-hover:text-white group-hover:text-emerald-700 transition-colors">
          Read Case Study →
        </p>
      )}
    </div>
  );

  const baseCardClass = [
    'rounded-2xl bg-cardBg border',
    'dark:border-gray-800 border-slate-200',
    'border-l-[3px] border-l-accent/35',
    'dark:hover:border-l-accent hover:border-l-accent',
    'card-lift h-full group overflow-hidden',
    'transition-all duration-300',
  ].join(' ');

  /* Published with slug — navigate and pass overlay context */
  if (cs.published && cs.slug) {
    return (
      <Link
        to={`/case-studies/${cs.slug}`}
        state={{ scrollTo: 'case-studies', fromOverlay }}
        onClick={() => trackCaseStudyOpen(cs.slug)}
        className={'block ' + baseCardClass}
      >
        {body}
      </Link>
    );
  }

  /* Published but no slug */
  if (cs.published) {
    return <div className={baseCardClass}>{body}</div>;
  }

  /* Not published — locked */
  return (
    <div className={'cs-locked ' + baseCardClass}>
      <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
        <p className="font-mono-pp text-[10px] uppercase tracking-widest text-accent">{cs.company}</p>
        <h3 className="font-display text-2xl sm:text-3xl font-bold dark:text-white text-slate-900 leading-tight">{cs.title}</h3>
        <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed">{cs.teaser}</p>
        {tags}
      </div>
      <div className="cs-locked-overlay">
        <LockIcon />
        <span className="font-mono-pp text-xs uppercase tracking-widest dark:text-gray-400 text-slate-600">
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

  const [showAll, setShowAll] = useState(
    () => !!(location.state?.fromOverlay && hasMore)
  );

  useEffect(() => {
    if (location.state?.fromOverlay) {
      window.history.replaceState(
        { ...window.history.state, usr: { scrollTo: 'case-studies', fromOverlay: false } },
        ''
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleViewAllClick = () => {
    setShowAll(true);
    trackViewMoreOpen('case-studies');
  };

  return (
    <section id="case-studies" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">

      <SectionHeader
        eyebrow="Deep Dives"
        title="Case Studies"
        subtitle="Structured accounts of the problem, the approach, and what actually shipped."
      />

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
          <Carousel
            items={caseStudies}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            peek={true}
            renderItem={(cs) => <CaseStudyCard cs={cs} fromOverlay={false} />}
          />
        ) : (
          <>
            {/* Single-column editorial stack on desktop */}
            <div className="flex flex-col gap-4">
              {visible.map((cs, i) => (
                <CaseStudyCard key={i} cs={cs} fromOverlay={false} index={i} />
              ))}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleViewAllClick}
                  className="font-mono-pp text-xs dark:border-gray-700 border-slate-400 dark:text-gray-400 text-slate-700 dark:bg-transparent bg-slate-100 border px-6 py-3 rounded-full hover:border-accent hover:text-accent dark:hover:bg-transparent hover:bg-slate-200 transition-all uppercase tracking-widest"
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
