/**
 * sections/Projects.jsx
 *
 * Displays NDA-safe project cards.
 * Data lives in data/projects.js.
 *
 * Desktop: static 2-col grid of the first VIEW_MORE_THRESHOLD cards.
 *          If there are more, a "View All" button opens ViewMoreModal.
 * Mobile:  swipeable carousel (1 card at a time).
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
  <div className="h-full p-5 sm:p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors flex flex-col gap-3 sm:gap-5">
    <div>
      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1 sm:mb-2">{p.domain}</p>
      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{p.title}</h3>
      <p className="text-gray-400 text-xs mt-1 font-mono-pp">{p.company}</p>
    </div>

    <div className="border-t border-gray-800 pt-3 sm:pt-5">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-1 sm:mb-2">Problem</p>
      <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{p.problem}</p>
    </div>

    <div className="border-t border-gray-800 pt-3 sm:pt-5">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-2">Outcomes</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {p.outcomes.map((o) => (
          <span key={o} className="text-xs font-bold px-2 sm:px-3 py-1 rounded-full border border-accent/30 text-accent bg-accent/10">
            {o}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-auto pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2">
      {p.stack.map((s) => (
        <span key={s} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400">
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
    <section id="projects" className="py-12 md:py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
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
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((p, i) => <ProjectCard key={i} p={p} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs border border-gray-700 text-gray-400 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all uppercase tracking-widest"
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