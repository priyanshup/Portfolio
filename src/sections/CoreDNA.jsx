/**
 * sections/CoreDNA.jsx
 *
 * Desktop: continuous rAF autoscroll, hover-slow, no arrows.
 * Mobile:  discrete smooth swipe, no autoscroll, no arrows.
 *   Swipe behaviour matches Projects and CaseStudies.
 */

import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import { dnaItems } from '../data/dna';
import { useIsMobile } from '../hooks';

/* Shared card renderer — same for both mobile and desktop */
const DNACard = ({ item, hover = false }) => (
  <div className={'h-full p-8 rounded-3xl bg-cardBg border border-gray-800 flex flex-col gap-4 min-h-56 ' + (hover ? 'hover:border-gray-600 transition-colors' : '')}>
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
      style={{
        background: 'rgba(16,185,129,0.10)',
        border: '1px solid rgba(16,185,129,0.22)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 1px 0 rgba(16,185,129,0.12)',
      }}
    >
      {item.icon}
    </div>
    <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed flex-1">{item.desc}</p>
  </div>
);

const CoreDNA = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader
        eyebrow="What I Bring"
        title="Core DNA"
        subtitle="Three domains, one throughline: understanding systems deeply enough to make the right product calls."
        center
      />

      <div className="reveal">
        {isMobile ? (
          /* Mobile: discrete snap-swipe, no autoscroll, no arrows */
          <Carousel
            items={dnaItems}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            showArrows={false}
            clickable={false}
            peek={true}
            renderItem={(item) => <DNACard item={item} />}
          />
        ) : (
          /* Desktop: continuous autoscroll, hover-slow, no arrows */
          <Carousel
            items={dnaItems}
            desktopItems={3}
            tabletItems={2}
            mobileItems={1}
            autoPlay
            desktopSpeed={38}
            hoverSpeed={11}
            mobileSpeed={26}
            tapSlowMultiplier={0.25}
            clickable={false}
            showArrows={false}
            renderItem={(item) => <DNACard item={item} hover />}
          />
        )}
      </div>
    </section>
  );
};

export default CoreDNA;