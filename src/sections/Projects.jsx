/**
 * sections/Projects.jsx
 *
 * Displays NDA-safe project cards.
 * Data lives in data/projects.js.
 *
 * Desktop: static 2-col grid of the first VIEW_MORE_THRESHOLD cards.
 *          If there are more, a "View All" button opens ViewMoreModal.
 * Mobile:  swipeable carousel (1 card at a time).
 *
 * Card redesign:
 *   - Hover lift via card-lift class (translateY + shadow escalation)
 *   - rounded-2xl (down from rounded-3xl) for a sharper, less bubbly feel
 *   - Internal dividers removed; spacing carries the hierarchy instead
 *   - Stack tags moved to a separated footer area below a hairline
 */

import { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import ViewMoreModal from '../components/modals/ViewMoreModal';
import { useIsMobile } from '../hooks';
import { projects } from '../data/projects';
import { VIEW_MORE_THRESHOLD } from '../config';

/* ── Project card — shared between inline grid and modal ── */
export const ProjectCard = ({ p }) => (
  <div className="h-full rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 dark:hover:border-gray-600 hover:border-slate-300 card-lift flex flex-col overflow-hidden">

    {/* Accent line at top */}
    <div className="h-[2px] bg-gradient-to-r from-accent/50 via-accent/20 to-transparent flex-shrink-0" />

    <div className="p-5 sm:p-8 flex flex-col gap-4 flex-1">
      {/* Header */}
      <div>
        <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1">{p.domain}</p>
        <h3 className="font-display text-lg sm:text-xl font-bold dark:text-white text-slate-900 leading-tight">{p.title}</h3>
        <p className="dark:text-gray-500 text-slate-500 text-xs mt-1 font-mono-pp">{p.company}</p>
      </div>

      {/* Problem */}
      <p className="dark:text-gray-400 text-slate-600 text-sm leading-relaxed">{p.problem}</p>

      {/* Outcomes */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {p.outcomes.map((o) => (
          <span key={o} className="text-xs font-bold px-2.5 py-1 rounded-full border border-accent/30 text-accent bg-accent/10">
            {o}
          </span>
        ))}
      </div>
    </div>

    {/* Stack tags — separated by hairline */}
    <div className="px-5 sm:px-8 pb-5 sm:pb-7 pt-4 border-t dark:border-gray-800/60 border-slate-100 flex flex-wrap gap-1.5">
      {p.stack.map((s) => (
        <span key={s} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded dark:bg-gray-900/80 bg-slate-100 dark:border dark:border-gray-800 border border-slate-200 dark:text-gray-500 text-slate-500">
          {s}
        </span>
      ))}
    </div>
  </div>
);

/* ── Section ── */
const Projects = () => {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const visible = projects.slice(0, VIEW_MORE_THRESHOLD);
  const hasMore = projects.length > VIEW_MORE_THRESHOLD;

  return (
    <section id="projects" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-100">
      <SectionHeader
        eyebrow="Shipped Work"
        title="Key Projects"
        subtitle="All work done under NDA — no links, no screenshots. What's here: the problem, the approach, and the measurable outcome."
      />

      {showAll && (
        <ViewMoreModal
          title="Key Projects"
          eyebrow="All Shipped Work"
          items={projects}
          renderItem={(p) => <ProjectCard p={p} />}
          onClose={() => setShowAll(false)}
        />
      )}

      <div className="reveal">
        {isMobile ? (
          <Carousel
            items={projects}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            peek={true}
            renderItem={(p) => <ProjectCard p={p} />}
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              {visible.map((p, i) => <ProjectCard key={i} p={p} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs dark:border-gray-700 border-slate-400 dark:text-gray-400 text-slate-700 dark:bg-transparent bg-slate-100 border px-6 py-3 rounded-full hover:border-accent hover:text-accent dark:hover:bg-transparent hover:bg-slate-200 transition-all uppercase tracking-widest"
                >
                  View All Projects ({projects.length}) ↗
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
