/**
 * sections/CareerJourney.jsx
 *
 * Horizontal "Acts" layout — replaces the vertical timeline.
 *
 * Each career chapter is displayed as a full-height panel in a 4-column grid.
 * The gap-px + container-background technique creates divider lines between panels.
 *
 * Desktop: 4 panels side by side (Act I → IV)
 * Tablet:  2 × 2 grid
 * Mobile:  1 column stack
 *
 * Each panel shows:
 *   - Act number (Roman numeral, top-left)
 *   - Type badge (top-right)
 *   - Year (large, faded accent — visual anchor)
 *   - Role + company
 *   - Narrative note
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px dark:bg-gray-800/40 bg-slate-200 rounded-2xl overflow-hidden">
        {timeline.map((item, i) => {
          const { badge, label } = typeStyle[item.type];
          return (
            <div
              key={i}
              className="bg-darkBg p-7 md:p-8 flex flex-col gap-5 dark:hover:bg-[#0f1420] hover:bg-white transition-colors duration-200"
            >
              {/* Act label + type badge */}
              <div className="flex items-start justify-between gap-2">
                <p className="font-mono-pp text-[10px] uppercase tracking-widest dark:text-gray-600 text-slate-400">
                  Act {ROMAN[i]}
                </p>
                <span className={'font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border glass-badge flex-shrink-0 ' + badge}>
                  {label}
                </span>
              </div>

              {/* Year — large, faded, visual anchor */}
              <p className="font-display font-extrabold text-6xl leading-none text-accent/20 select-none">
                {item.year}
              </p>

              {/* Role + company */}
              <div>
                <h3 className="font-display font-bold text-lg dark:text-white text-slate-900 leading-tight">
                  {item.role}
                </h3>
                <p className="font-mono-pp text-xs dark:text-gray-500 text-slate-500 mt-1">
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
