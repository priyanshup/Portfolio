/**
 * sections/CareerJourney.jsx
 *
 * Vertical timeline showing the career arc: Engineer → Analyst → PO.
 * Data lives in data/timeline.js.
 *
 * Layout: flex row — year bubble (fixed width) + card (flex-1).
 * This prevents any overlap between the bubble and card text,
 * regardless of font size or viewport width.
 */

import SectionHeader from '../components/ui/SectionHeader';
import { timeline, typeStyle } from '../data/timeline';

const CareerJourney = () => (
  <section id="journey" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
    <SectionHeader
      eyebrow="The Arc"
      title="Engineer → Analyst → Product Leader"
      subtitle="A decade of deliberate evolution. Every role built on the last — the engineering foundation is what makes the product thinking different."
    />

    <div className="tl-line relative space-y-5 mt-14">
      {timeline.map((item, i) => {
        const { badge, label } = typeStyle[item.type];
        return (
          <div key={i} className={`reveal d${Math.min(i + 1, 4)} flex gap-5 items-start`}>

            {/* Year bubble — fixed width, flex prevents overlap */}
            <div className={`flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center z-10 ${badge}`}>
              <span className="font-mono-pp text-[10px] font-bold">{item.year}</span>
            </div>

            {/* Card */}
            <div className="flex-1 p-6 rounded-2xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{item.role}</h3>
                  <p className="text-gray-400 text-sm">{item.company}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border font-mono-pp flex-shrink-0 ${badge}`}>
                  {label}
                </span>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.note}</p>
            </div>

          </div>
        );
      })}
    </div>
  </section>
);

export default CareerJourney;
