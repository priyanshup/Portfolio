/**
 * sections/WorkExperience.jsx
 *
 * ACCORDION SCROLL — how it works:
 *
 *   Goal: card header appears anchored at navHeight+12px while content
 *   grows downward. Scroll and expansion feel like one single motion.
 *
 *   Implementation:
 *     1. Capture rect.top of the target card BEFORE React re-renders.
 *     2. Calculate the exact scroll destination so the card header will
 *        land at NAV_HEIGHT + TOP_MARGIN from the top of the viewport.
 *     3. Call window.scrollTo({ behavior:'smooth' }) AND setOpen(i)
 *        in the same synchronous event handler.
 *     4. Both animations start in the same frame — the browser scrolls
 *        while React expands the accordion simultaneously.
 *
 *   No rAF loop, no repeated corrections, no fighting browser scroll.
 *   Works identically on mobile and desktop.
 *
 * IMPORTANT — accordion + reveal separation:
 *   .reveal on outer wrapper div ONLY.
 *   overflow-hidden (.accordion-inner) on inner div ONLY.
 */

import { useState, useRef } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { ChevronDown } from '../components/ui/Icons';
import { experience } from '../data/experience';

const NAV_HEIGHT = 80; // px — fixed nav bar height
const TOP_MARGIN = 16; // px — breathing room below nav

const WorkExperience = () => {
  const [open, setOpen] = useState(0);
  const cardRefs = useRef([]);

  const handleOpen = (i) => {
    if (open === i) return;

    // Expand the card first, then after the accordion animation completes
    // scroll smoothly to bring it fully into view.
    setOpen(i);

    setTimeout(() => {
      const el = cardRefs.current[i];
      if (!el) return;
      const rect   = el.getBoundingClientRect();
      const target = window.scrollY + rect.top - NAV_HEIGHT - TOP_MARGIN;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }, 400); // matches the 0.38s accordion CSS transition + small buffer
  };

  return (
    <section id="experience" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader
        eyebrow="Track Record"
        title="Work Experience"
        subtitle="10 years. 4 roles. Healthcare, gaming, and e-commerce — each one building on the last."
      />

      <div className="space-y-3">
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={'reveal d' + Math.min(i + 1, 4)}
            >
              <div className={'rounded-2xl border transition-colors duration-300 overflow-hidden ' + (
                isOpen
                  ? 'border-gray-600 bg-cardBg'
                  : 'border-gray-800 bg-cardBg/40 hover:border-gray-700'
              )}>

                <button
                  onClick={() => handleOpen(i)}
                  className="w-full text-left p-6 md:p-8 flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4"
                >
                  <div className="flex gap-6 items-center flex-1 min-w-0">
                    <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0 w-20">
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.period}</p>
                      <div className="w-px h-3 bg-gray-700" />
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.periodEnd}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1">{job.domain}</p>
                      <h3 className="font-display font-bold text-xl text-white">{job.role}</h3>
                      <p className="text-gray-400 text-sm">{job.company} · {job.location}</p>
                      <p className="md:hidden font-mono-pp text-[10px] text-gray-400 mt-1">
                        {job.period} — {job.periodEnd}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {job.current && (
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-green-400/30 text-green-400 bg-green-400/10 font-mono-pp">
                        Current
                      </span>
                    )}
                    <ChevronDown open={isOpen} />
                  </div>
                </button>

                <div className={'accordion-body ' + (isOpen ? 'open' : '')}>
                  <div className="accordion-inner">
                    <div className="px-6 md:px-8 pb-8 border-t border-gray-800/60 pt-6">
                      <ul className="space-y-3">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                            <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {job.tags.map((t) => (
                          <span key={t} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExperience;