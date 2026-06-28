/**
 * sections/ImpactStories.jsx
 *
 * Specific high-impact moments from across the career.
 * Data lives in data/impactStories.js.
 *
 * Card design mirrors Projects.jsx — same layout, same chip style —
 * but without the tools/tech stack row.
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
  <div className="h-full p-5 sm:p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors flex flex-col gap-3 sm:gap-5">
    <div>
      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1 sm:mb-2">{s.eyebrow}</p>
      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{s.headline}</h3>
      <p className="text-gray-400 text-xs mt-1 font-mono-pp">{s.company}</p>
    </div>

    <div className="border-t border-gray-800 pt-3 sm:pt-5">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-1 sm:mb-2">Context</p>
      <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{s.context}</p>
    </div>

    <div className="border-t border-gray-800 pt-3 sm:pt-5 mt-auto">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-2">Outcome</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {s.outcomes.map((o) => (
          <span key={o} className="text-xs font-bold px-2 sm:px-3 py-1 rounded-full border border-accent/30 text-accent bg-accent/10">
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
    <section id="impact-stories" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
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
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((s, i) => <ImpactCard key={i} s={s} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs border border-gray-700 text-gray-400 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all uppercase tracking-widest"
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
