/**
 * sections/CareerJourney.jsx
 *
 * Glass year bubbles + glass cards + glass badge pills.
 * Mobile spacing: py-12 md:py-24
 */

import SectionHeader from '../components/ui/SectionHeader';
import { timeline, typeStyle } from '../data/timeline';

const CareerJourney = () => (
  <section id="journey" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">
    <SectionHeader
      eyebrow="The Arc"
      title="Engineer → Analyst → Product Leader"
      subtitle="A decade of deliberate evolution. Every role built on the last — the engineering foundation is what makes the product thinking different."
    />

    <div className="tl-line relative space-y-5 mt-14">
      {timeline.map((item, i) => {
        const { badge, label } = typeStyle[item.type];
        return (
          <div key={i} className={'reveal d' + Math.min(i + 1, 4) + ' flex gap-5 items-start'}>
            <div
              className={'flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center z-10 tl-bubble ' + badge}
            >
              <span className="font-mono-pp text-[10px] font-bold">{item.year}</span>
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 dark:hover:border-gray-600 hover:border-slate-300 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg dark:text-white text-slate-900">{item.role}</h3>
                  <p className="dark:text-gray-400 text-slate-600 text-sm">{item.company}</p>
                </div>
                <span className={'text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border font-mono-pp flex-shrink-0 glass-badge ' + badge}>
                  {label}
                </span>
              </div>
              <p className="dark:text-gray-400 text-slate-600 text-sm mt-2 leading-relaxed">{item.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default CareerJourney;
