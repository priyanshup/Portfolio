/**
 * sections/Testimonials.jsx
 *
 * LinkedIn recommendations displayed as a carousel.
 * Clicking a card opens a TestimonialModal with the full text.
 * Data lives in data/testimonials.js — add more freely.
 */

import { useState, useCallback } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import TestimonialModal from '../components/modals/TestimonialModal';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [expanded, setExpanded] = useState(null);
  const closeModal = useCallback(() => setExpanded(null), []);

  return (
    <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader
        eyebrow="Social Proof"
        title="What People Say"
        subtitle="From LinkedIn recommendations. Click any card to read the full text."
        center
      />

      {expanded !== null && (
        <TestimonialModal t={testimonials[expanded]} onClose={closeModal} />
      )}

      <div className="reveal">
        <Carousel
          items={testimonials}
          desktopItems={3}
          tabletItems={2}
          mobileItems={1}
          autoPlay
          interval={6000}
          renderItem={(t, i) => (
            <button
              onClick={() => setExpanded(i)}
              className="w-full h-full text-left p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-accent/40 transition-colors flex flex-col gap-4 min-h-64 cursor-pointer group"
            >
              <p className="text-4xl text-gray-600 group-hover:text-gray-500 font-serif leading-none select-none">
                "
              </p>
              {/* Truncated preview — full text in modal */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-3 line-clamp-4">
                {t.text}
              </p>
              <div className="border-t border-gray-800 pt-4 mt-auto">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-1">{t.title} · {t.company}</p>
                <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-widest mt-1">
                  {t.relation}
                </p>
                <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mt-3 group-hover:text-white transition-colors">
                  Read full ↗
                </p>
              </div>
            </button>
          )}
        />
      </div>
    </section>
  );
};

export default Testimonials;
