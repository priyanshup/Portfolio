/**
 * sections/WorkExperience.jsx
 *
 * Accordion-style work history. One card per role, click to expand.
 * Data lives in data/experience.js.
 *
 * IMPORTANT — accordion + reveal separation:
 *   .reveal is on the outer wrapper div ONLY.
 *   overflow-hidden is on the inner card div ONLY.
 *   They must never share an element — if they do, the IntersectionObserver
 *   re-triggers the fade-out when the card expands and its bounding box changes.
 */

import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { ChevronDown } from '../components/ui/Icons';
import { experience } from '../data/experience';

const WorkExperience = () => {
  const [open, setOpen] = useState(0); // first card open by default

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader
        eyebrow="Track Record"
        title="Work Experience"
        subtitle="10 years. 4 roles. Healthcare, gaming, and e-commerce — each one building on the last."
      />

      <div className="space-y-3">
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            /* .reveal ONLY — no overflow-hidden here */
            <div key={i} className={`reveal d${Math.min(i + 1, 4)}`}>

              {/* overflow-hidden ONLY — separate from .reveal */}
              <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                isOpen
                  ? 'border-gray-600 bg-cardBg'
                  : 'border-gray-800 bg-cardBg/40 hover:border-gray-700'
              }`}>

                {/* Header row — click always opens, never collapses */}
                <button
                  onClick={() => setOpen(i)}
                  className="w-full text-left p-6 md:p-8 flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4"
                >
                  <div className="flex gap-6 items-center flex-1 min-w-0">
                    {/* Date column — desktop only */}
                    <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0 w-20">
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.period}</p>
                      <div className="w-px h-3 bg-gray-700" />
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.periodEnd}</p>
                    </div>

                    <div className="min-w-0">
                      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1">{job.domain}</p>
                      <h3 className="font-display font-bold text-xl text-white">{job.role}</h3>
                      <p className="text-gray-400 text-sm">{job.company} · {job.location}</p>
                      {/* Date — mobile only */}
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

                {/* Expandable body */}
                <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
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
                          <span
                            key={t}
                            className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400"
                          >
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
