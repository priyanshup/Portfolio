/**
 * sections/Experience.jsx
 *
 * One compact row per role, newest first; tap a row to expand its detail.
 * Replaces the old WorkExperience accordion + CareerJourney "Acts" strip:
 * both listed the same roles from two data files. Data: data/roles.js.
 *
 * Budget (DESIGN.md): the newest role is open by default on desktop (all rows
 * start collapsed on phones) and each collapsed row shows its headline result,
 * so the section reads in seconds. Only
 * EXPERIENCE_VISIBLE roles show; older ones fold under "Earlier roles".
 *
 * ACCORDION SCROLL: call setOpen(i) first, then in a setTimeout(400) call
 * scrollIntoView on the row. Waiting for the grid-template-rows transition to
 * settle means scrollIntoView reads the final layout. Do NOT capture rect.top
 * before setOpen and scroll simultaneously, because the expansion shifts the row.
 *
 * IMPORTANT, accordion and reveal separation:
 *   .reveal on the outer wrapper ONLY; .accordion-inner (overflow hidden) on
 *   the inner div ONLY. The collapsed panel is `inert` so keyboard and screen
 *   reader users skip it; its text stays in the DOM for crawlers and print.
 */

import { useState, useRef } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { Tag } from '../components/ui/Tag';
import CompanyLogo from '../components/ui/CompanyLogo';
import { ChevronDown } from '../components/ui/Icons';
import { roles, yearsExperience } from '../data/roles';
import { EXPERIENCE_VISIBLE } from '../config';
import { keepInView } from '../utils/scroll';
import { DESKTOP_QUERY } from '../hooks/useMediaQuery';

const NAV_HEIGHT = 80; // px, fixed nav bar height
const TOP_MARGIN = 16; // px, breathing room below nav

const Experience = () => {
  /* Newest role starts expanded on larger screens. On phones every row starts
     collapsed and shows its headline result, which keeps the section short. */
  const [open, setOpen] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches ? 0 : -1,
  );
  const [showEarlier, setShowEarlier] = useState(false);
  const rowRefs = useRef([]);

  const shown = showEarlier ? roles : roles.slice(0, EXPERIENCE_VISIBLE);
  const hiddenCount = roles.length - shown.length;

  const handleToggle = (i) => {
    if (open === i) {
      keepInView(rowRefs.current[i]); // closing a long role from its bottom: stay with it
      setOpen(-1);
      return;
    }
    setOpen(i);
    setTimeout(() => {
      const el = rowRefs.current[i];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  };

  return (
    <section id="experience" className="py-10 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-200">
      <SectionHeader
        title="Experience"
        subtitle={`${yearsExperience()} years in ${roles.length} roles. I started as an engineer, moved into business analysis, then into product ownership.`}
      />

      <ol className="space-y-2.5 md:space-y-3">
        {shown.map((job, i) => {
          const isOpen = open === i;
          const panelId = `role-panel-${job.id}`;
          const btnId = `role-btn-${job.id}`;
          return (
            <li
              key={job.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              className={'reveal d' + Math.min(i + 1, 4)}
              style={{ scrollMarginTop: (NAV_HEIGHT + TOP_MARGIN) + 'px' }}
            >
              <div className={'rounded-2xl border transition-colors duration-300 overflow-hidden bg-cardBg ' + (
                isOpen
                  ? 'dark:border-gray-600 border-slate-300'
                  : 'dark:border-gray-800 border-slate-200 dark:hover:border-gray-600 hover:border-slate-300'
              )}>
                <h3 className="m-0">
                  <button
                    id={btnId}
                    onClick={() => handleToggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left p-4 md:p-7 flex items-start gap-3 md:gap-6"
                  >
                    <span className="hidden md:flex flex-col items-center gap-1 flex-shrink-0 w-24 pt-1 font-mono-pp text-xs dark:text-gray-400 text-slate-600 text-center">
                      <span>{job.start}</span>
                      <span aria-hidden="true" className="w-px h-3 dark:bg-gray-700 bg-slate-300" />
                      <span>{job.end}</span>
                    </span>

                    <span className="min-w-0 flex-1 block">
                      {/* phones: logo and dates share one line to save height */}
                      <span className="md:hidden flex items-center justify-between gap-3 mb-1.5">
                        <CompanyLogo company={job.company} scale={0.65} decorative />
                        <span className="font-mono-pp text-[0.8125rem] whitespace-nowrap dark:text-gray-400 text-slate-600">
                          {job.start} to {job.end}
                        </span>
                      </span>
                      <span className="block font-display font-bold text-lg md:text-xl dark:text-white text-slate-900 leading-snug">
                        {job.role}
                      </span>
                      <span className="block dark:text-gray-300 text-slate-700 text-sm mt-0.5">
                        {job.company} · {job.location}
                      </span>
                      {!isOpen && (
                        <span className="block dark:text-gray-400 text-slate-600 text-sm mt-1.5 md:mt-2 leading-relaxed">
                          {job.headline}
                        </span>
                      )}
                    </span>

                    <span className="flex items-center gap-3 flex-shrink-0 pt-1">
                      <span className="hidden md:flex w-32 justify-end">
                        <CompanyLogo company={job.company} scale={0.8} decorative />
                      </span>
                      {job.current && (
                        <span className="max-md:hidden text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border dark:border-green-400/30 border-green-700/40 dark:text-green-400 text-green-800 dark:bg-green-400/10 bg-green-700/10 font-mono-pp">
                          Current
                        </span>
                      )}
                      <ChevronDown open={isOpen} />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className={'accordion-body ' + (isOpen ? 'open' : '')}
                >
                  <div className="accordion-inner" inert={!isOpen}>
                    <div className="px-4 md:px-7 pb-5 md:pb-7 border-t dark:border-gray-800 border-slate-200 pt-5 md:pl-[9.25rem]">
                      <p className="text-sm dark:text-gray-400 text-slate-600 leading-relaxed mb-4">
                        {job.note}
                      </p>
                      <ul className="space-y-3">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm dark:text-gray-300 text-slate-700 leading-relaxed">
                            <span aria-hidden="true" className="text-accent mt-0.5 flex-shrink-0">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-5">
                        {job.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {roles.length > EXPERIENCE_VISIBLE && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowEarlier((v) => !v)}
            aria-expanded={showEarlier}
            className="cta-btn-secondary"
          >
            {showEarlier ? 'Hide earlier roles' : `Show ${hiddenCount} earlier role${hiddenCount === 1 ? '' : 's'}`}
          </button>
        </div>
      )}
    </section>
  );
};

export default Experience;
