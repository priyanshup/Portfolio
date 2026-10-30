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
 *   .reveal on the outer wrapper ONLY, with a className that never changes
 *   (open/closed styling lives on an inner div); .accordion-inner (overflow hidden) on
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
    <section id="experience" className="plate max-w-6xl mx-auto w-full">
      <SectionHeader
        num="02"
        title="Experience"
        meta={`${yearsExperience()} years · ${roles.length} roles`}
        lede="I started as an engineer, moved into business analysis, then into product ownership."
      />

      <ol className="mt-6 md:mt-10 border-t border-line divide-y divide-line">
        {shown.map((job, i) => {
          const isOpen = open === i;
          const panelId = `role-panel-${job.id}`;
          const btnId = `role-btn-${job.id}`;
          const startYear = job.start.split(' ')[1];
          const endLabel = job.end === 'Present' ? 'to now' : 'to ' + job.end.split(' ')[1];
          return (
            <li
              key={job.id}
              ref={(el) => { rowRefs.current[i] = el; }}
              /* The class list here must never change between renders: useScrollReveal adds
                 `in-view` to this element directly, and a new className from React would
                 wipe it (the row would fade out). State-driven styles go on the inner div. */
              className={'reveal d' + Math.min(i + 1, 4) + ' overflow-hidden last:rounded-b-[13px]'}
              style={{ scrollMarginTop: (NAV_HEIGHT + TOP_MARGIN) + 'px' }}
            >
              <div className={'transition-colors duration-300 ' + (isOpen ? 'bg-sunk' : '')}>
              <h3 className="m-0">
                <button
                  id={btnId}
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="group w-full text-left focus-visible:outline-offset-[-4px] px-5 py-5 md:px-12 md:py-7 grid grid-cols-[1fr_auto] md:grid-cols-[8rem_1fr_auto] gap-x-4 md:gap-x-8 items-start hover:bg-sunk transition-colors"
                >
                  {/* Big start year, the way a log reads */}
                  <span className="hidden md:flex flex-col pt-0.5">
                    <span className="font-display text-[2.25rem] font-[850] leading-none text-ink">{startYear}</span>
                    <span className="silk mt-2">{endLabel}</span>
                    <span className="sr-only">{job.start} to {job.end}</span>
                  </span>

                  <span className="min-w-0 block">
                    {/* phones: logo and dates share one line to save height */}
                    <span className="md:hidden flex items-center justify-between gap-3 mb-2">
                      <CompanyLogo company={job.company} scale={0.65} decorative />
                      <span className="font-mono-pp text-[0.8125rem] whitespace-nowrap text-muted">
                        {job.start} to {job.end}
                      </span>
                    </span>
                    <span className="flex items-center gap-3 flex-wrap">
                      <span className="font-display font-[800] text-lg md:text-xl text-ink leading-snug">{job.role}</span>
                      {job.current && <span className="max-md:hidden flex"><span className="label-key">Current</span></span>}
                    </span>
                    <span className="block text-body text-sm mt-1">
                      {job.company} · {job.location}
                    </span>
                    {!isOpen && (
                      <span className="block text-muted text-sm mt-1.5 md:mt-2 leading-relaxed">
                        {job.headline}
                      </span>
                    )}
                  </span>

                  <span className="flex items-center gap-5 flex-shrink-0">
                    <span className="hidden md:flex w-32 justify-end">
                      <CompanyLogo company={job.company} scale={0.8} decorative />
                    </span>
                    <span aria-hidden="true" className="arrow-knob">
                      <ChevronDown open={isOpen} />
                    </span>
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
                  <div className="px-5 pb-6 md:px-12 md:pb-9 md:grid md:grid-cols-[8rem_1fr] md:gap-x-8">
                    <span aria-hidden="true" className="hidden md:block" />
                    <div className="max-w-3xl">
                      <p className="text-sm text-muted leading-relaxed mb-4">
                        {job.note}
                      </p>
                      <ul className="space-y-3">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm md:text-[0.9375rem] text-body leading-relaxed">
                            <span aria-hidden="true" className="bullet-sq" />
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
              </div>
            </li>
          );
        })}
      </ol>

      {roles.length > EXPERIENCE_VISIBLE && (
        <div className="flex justify-center py-6 border-t border-line">
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
