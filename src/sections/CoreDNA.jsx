/**
 * sections/CoreDNA.jsx
 *
 * Skills / capabilities carousel.
 * Data lives in data/dna.js — add more items freely.
 */

import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import { dnaItems } from '../data/dna';

const CoreDNA = () => (
  <section className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
    <SectionHeader
      eyebrow="What I Bring"
      title="Core DNA"
      subtitle="Three domains, one throughline: understanding systems deeply enough to make the right product calls."
      center
    />

    <div className="reveal">
      <Carousel
        items={dnaItems}
        desktopItems={3}
        tabletItems={2}
        mobileItems={1}
        autoPlay
        interval={5000}
        renderItem={(item) => (
          <div className="h-full p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors flex flex-col gap-4 min-h-56">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl">
              {item.icon}
            </div>
            <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{item.desc}</p>
          </div>
        )}
      />
    </div>
  </section>
);

export default CoreDNA;
