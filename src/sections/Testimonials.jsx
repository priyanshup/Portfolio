/**
 * sections/Testimonials.jsx
 *
 * Desktop: static 2-column grid of pull-quote cards.
 *   - Oversized quotation mark (text-8xl) as visual anchor
 *   - More text visible (line-clamp-6 vs old line-clamp-4)
 *   - Hover lift via card-lift class
 *   - "Read full" link removed — whole card is clickable, opening the modal
 *
 * Mobile: discrete smooth swipe, no autoscroll (unchanged from before).
 */

import { useState, useCallback } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import TestimonialModal from '../components/modals/TestimonialModal';
import { testimonials } from '../data/testimonials';
import { useIsMobile } from '../hooks';

const Testimonials = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(null);
  const closeModal = useCallback(() => setExpanded(null), []);

  /* Shared card renderer — used in both desktop grid and mobile carousel */
  const renderCard = (t, i) => (
    <button
      onClick={() => setExpanded(i)}
      className="w-full h-full text-left p-6 sm:p-8 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 hover:border-accent/40 card-lift flex flex-col gap-3 cursor-pointer group relative overflow-hidden"
    >
      {/* Oversized quote mark — absolute so it doesn't push content down */}
      <span aria-hidden="true" className="absolute top-3 left-5 sm:top-4 sm:left-6 font-serif text-6xl sm:text-8xl dark:text-gray-800 text-slate-200 leading-none select-none pointer-events-none group-hover:text-accent/20 transition-colors duration-300">
        "
      </span>

      {/* Quote body — starts at top of card, no dead space */}
      <p className="dark:text-gray-300 text-slate-700 text-sm leading-relaxed flex-1 line-clamp-6 pt-7 sm:pt-9 relative z-10">
        {t.text}
      </p>

      {/* Attribution */}
      <div className="border-t dark:border-gray-800 border-slate-200 pt-4 mt-1 relative z-10">
        <p className="dark:text-white text-slate-900 font-bold text-sm">{t.name}</p>
        <p className="dark:text-gray-400 text-slate-500 text-xs mt-0.5">{t.title} · {t.company}</p>
        <p className="font-mono-pp dark:text-gray-600 text-slate-400 text-[10px] uppercase tracking-widest mt-1">
          {t.relation}
        </p>
      </div>
    </button>
  );

  return (
    <section id="testimonials" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">
      <SectionHeader
        eyebrow="Social Proof"
        title="What People Say"
        subtitle="From LinkedIn recommendations. Click any card to read the full text."
        center
      />

      {expanded !== null && (
        <TestimonialModal testimonials={testimonials} startIndex={expanded} onClose={closeModal} />
      )}

      <div className="reveal">
        {isMobile ? (
          /* Mobile: discrete snap-swipe, no autoscroll, no arrows */
          <Carousel
            items={testimonials}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            showArrows={false}
            clickable={true}
            peek={true}
            renderItem={renderCard}
          />
        ) : (
          /* Desktop: static 2-column pull-quote grid */
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i}>{renderCard(t, i)}</div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
