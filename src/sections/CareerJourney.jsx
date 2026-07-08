/**
 * sections/CareerJourney.jsx
 *
 * Horizontal "Acts" layout — four career chapters in a card grid.
 *
 * Each chapter card uses bg-cardBg (glass) — clear, bounded surfaces
 * that are consistent with the rest of the site. The gap-px divider
 * technique has been replaced with a proper gap-4 grid.
 *
 * Year color: dark mode uses a very faint accent tint for decoration;
 * light mode uses slate-300 (visible, not garish).
 *
 * Desktop: 4 panels side by side (Act I → IV)
 * Tablet:  2 × 2 grid
 * Mobile:  1 column stack
 */

import SectionHeader from '../components/ui/SectionHeader';
import { timeline, typeStyle } from '../data/timeline';

const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

const CareerJourney = () => (
  <section id="journey" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">
    <SectionHeader
      eyebrow="The Arc"
      title="Engineer → Analyst → Product Leader"
      subtitle="A decade of deliberate evolution. Every role built on the last — the engineering foundation is what makes the product thinking different."
    />

    <div className="reveal mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {timeline.map((item, i) => {
          const { badge, label } = typeStyle[item.type];
          return (
            <div
              key={i}
              className="bg-cardBg rounded-2xl p-6 md:p-7 border dark:border-gray-800 border-slate-200 card-lift flex flex-col gap-4"
            >
              {/* Act label + type badge */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-mono-pp text-[10px] uppercase tracking-widest dark:text-gray-400 text-slate-600">
                  Act {ROMAN[i]}
                </p>
                <span className={'font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border glass-badge flex-shrink-0 ' + badge}>
                  {label}
                </span>
              </div>

              {/* Year — decorative anchor, readable in both modes */}
              <p className="font-display font-extrabold text-5xl leading-none dark:text-accent/20 text-slate-300 select-none">
                {item.year}
              </p>

              {/* Role + company */}
              <div>
                <h3 className="font-display font-bold text-base dark:text-white text-slate-900 leading-snug">
                  {item.role}
                </h3>
                <p className="font-mono-pp text-xs dark:text-gray-400 text-slate-500 mt-1">
                  {item.company}
                </p>
              </div>

              {/* Narrative note */}
              <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed flex-1">
                {item.note}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default CareerJourney;
