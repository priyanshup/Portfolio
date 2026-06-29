/**
 * sections/ImpactStories.jsx
 *
 * Specific high-impact moments from across the career.
 * Data lives in data/impactStories.js.
 *
 * Card redesign:
 *   - Accent gradient bar at the top of each card (differentiates from ProjectCard)
 *   - Headline bumped to text-2xl — the stat/result is the hero of each card
 *   - Internal section dividers removed; whitespace carries the hierarchy
 *   - Hover lift via card-lift class
 *
 * Desktop: static 2-col grid (all stories shown; count is below VIEW_MORE_THRESHOLD).
 * Mobile:  swipeable carousel (1 card at a time).
 */

import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import ViewMoreModal from '../components/modals/ViewMoreModal';
import { useIsMobile } from '../hooks';
import { impactStories } from '../data/impactStories';
import { VIEW_MORE_THRESHOLD } from '../config';

/* ── Impact card — shared between inline grid and modal ── */
export const ImpactCard = ({ s }) => (
  <div className="h-full rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 dark:hover:border-gray-600 hover:border-slate-300 card-lift flex flex-col overflow-hidden">

    {/* Wider gradient bar — distinct from ProjectCard's slim line */}
    <div className="h-[3px] bg-gradient-to-r from-accent via-accent/40 to-transparent flex-shrink-0" />

    <div className="p-5 sm:p-8 flex flex-col gap-4 flex-1">
      {/* Eyebrow + headline */}
      <div>
        <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-2">{s.eyebrow}</p>
        <h3 className="font-display text-xl sm:text-2xl font-bold dark:text-white text-slate-900 leading-tight">
          {s.headline}
        </h3>
      </div>

      {/* Context */}
      <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed flex-1">{s.context}</p>

      {/* Outcomes */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {s.outcomes.map((o) => (
          <span key={o} className="text-xs font-bold px-3 py-1.5 rounded-full border border-accent/30 text-accent bg-accent/10">
            {o}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── Section ── */
const ImpactStories = () => {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const visible = impactStories.slice(0, VIEW_MORE_THRESHOLD);
  const hasMore = impactStories.length > VIEW_MORE_THRESHOLD;

  return (
    <section id="impact-stories" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">
      <SectionHeader
        eyebrow="Career Highlights"
        title="Impact Stories"
        subtitle="Specific moments where a focused approach created a measurable difference."
      />

      {showAll && (
        <ViewMoreModal
          title="Impact Stories"
          eyebrow="Career Highlights"
          items={impactStories}
          renderItem={(s) => <ImpactCard s={s} />}
          onClose={() => setShowAll(false)}
        />
      )}

      <div className="reveal">
        {isMobile ? (
          <Carousel
            items={impactStories}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            peek={true}
            renderItem={(s) => <ImpactCard s={s} />}
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              {visible.map((s, i) => <ImpactCard key={i} s={s} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs dark:border-gray-700 border-slate-400 dark:text-gray-400 text-slate-700 dark:bg-transparent bg-slate-100 border px-6 py-3 rounded-full hover:border-accent hover:text-accent dark:hover:bg-transparent hover:bg-slate-200 transition-all uppercase tracking-widest"
                >
                  View All Impact Stories ({impactStories.length}) ↗
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ImpactStories;
