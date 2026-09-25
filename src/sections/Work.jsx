/**
 * sections/Work.jsx
 *
 * Homepage Work section. Budget (DESIGN.md): the featured items only
 * (data/work.js `featured: true`, keep to 3), a short list of further titles,
 * and a link to the full /work page. Adding more work never lengthens this
 * section — items are promoted or left on /work.
 *
 * The "more work" titles are real links in the page HTML (not hidden), so
 * screeners and crawlers still see every title.
 */

import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import WorkRow from '../components/work/WorkRow';
import { featuredWork, moreWork, allWork } from '../data/work';
import { MORE_WORK_PREVIEW } from '../config';
import { trackCaseStudyOpen, trackViewMoreOpen } from '../utils/analytics';

const Work = () => {
  const preview = moreWork.slice(0, MORE_WORK_PREVIEW);
  const remaining = moreWork.length - preview.length;

  return (
    <section id="work" className="py-10 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-200">
      <SectionHeader
        title="Work"
        subtitle="Three projects I'd talk about first. Most of my client work is under NDA, so the detail here is deliberately light."
      />

      <div className="reveal space-y-3 md:space-y-4">
        {featuredWork.map((item) => (
          <WorkRow key={item.id} item={item} showMetric />
        ))}
      </div>

      <div className="reveal mt-8 md:mt-10 grid md:grid-cols-[1fr_auto] gap-4 md:gap-6 md:items-start">
        <div>
          <h3 className="font-display text-lg font-bold dark:text-white text-slate-900 mb-1 md:mb-3">More work</h3>
          <ul>
            {preview.map((w) => (
              <li key={w.id} className="text-sm leading-relaxed">
                {/* the link fills a 44px row so it is easy to hit with a thumb */}
                <Link
                  to={w.slug ? `/case-studies/${w.slug}` : '/work'}
                  state={{ from: 'home' }}
                  onClick={() => w.slug && trackCaseStudyOpen(w.slug)}
                  className="flex flex-wrap items-center gap-x-1.5 min-h-11 py-1.5 dark:text-gray-100 text-slate-900 font-medium dark:hover:text-accent hover:text-accent"
                >
                  <span className="underline decoration-slate-400/60 underline-offset-4">{w.title}</span>
                  <span className="dark:text-gray-400 text-slate-600 font-normal">· {w.company}</span>
                </Link>
              </li>
            ))}
            {remaining > 0 && (
              <li className="text-sm dark:text-gray-400 text-slate-600 py-2">{remaining} more on the full list</li>
            )}
          </ul>
        </div>

        <Link
          to="/work"
          onClick={() => trackViewMoreOpen('work')}
          className="cta-btn-secondary md:mt-9"
        >
          All work ({allWork.length})
        </Link>
      </div>
    </section>
  );
};

export default Work;
