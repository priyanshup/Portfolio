/**
 * sections/Work.jsx
 *
 * Homepage Work section. Budget (DESIGN.md): the featured items only
 * (data/work.js `featured: true`, keep to 3), a short list of further titles,
 * and a link to the full /work page. Adding more work never lengthens this
 * section — items are promoted or left on /work.
 *
 * Layout: one plate. The featured items are three columns (stacked on phones);
 * the panel's foot lists further titles beside the "All work" key.
 *
 * The "more work" titles are real links in the page HTML (not hidden), so
 * screeners and crawlers still see every title.
 */

import { Link } from 'react-router-dom';
import SectionHeader from '../components/ui/SectionHeader';
import WorkRow from '../components/work/WorkRow';
import { ArrowRight } from '../components/ui/Icons';
import { featuredWork, moreWork, allWork } from '../data/work';
import { MORE_WORK_PREVIEW } from '../config';
import { trackCaseStudyOpen, trackViewMoreOpen } from '../utils/analytics';

const Work = () => {
  const preview = moreWork.slice(0, MORE_WORK_PREVIEW);
  const remaining = moreWork.length - preview.length;

  return (
    <section id="work" className="plate max-w-6xl mx-auto w-full">
      <SectionHeader
        num="01"
        title="Work"
        meta={`${featuredWork.length} of ${allWork.length}`}
        lede="Three projects I'd talk about first."
        subtitle="Most of my client work is under NDA, so the detail here is deliberately light."
      />

      <div className="reveal mt-6 md:mt-10 grid md:grid-cols-3 border-y border-line max-md:divide-y md:divide-x divide-line">
        {featuredWork.map((item) => (
          <WorkRow key={item.id} item={item} showMetric />
        ))}
      </div>

      <div className="reveal px-5 py-6 md:px-12 md:py-9 grid md:grid-cols-[1fr_auto] gap-5 md:gap-10 md:items-end">
        <div>
          <h3 className="silk silk--strong mb-1 md:mb-3">More work</h3>
          <ul className="md:columns-2 md:gap-10">
            {preview.map((w) => (
              <li key={w.id} className="text-sm leading-relaxed break-inside-avoid">
                {/* the link fills a 44px row so it is easy to hit with a thumb */}
                <Link
                  to={w.slug ? `/case-studies/${w.slug}` : '/work'}
                  state={{ from: 'home' }}
                  onClick={() => w.slug && trackCaseStudyOpen(w.slug)}
                  className="group block min-h-11 py-2 text-ink font-medium"
                >
                  <span className="underline decoration-line decoration-2 underline-offset-4 group-hover:decoration-accent">{w.title}</span>
                  <span className="text-muted font-normal"> · {w.company}</span>
                </Link>
              </li>
            ))}
            {remaining > 0 && (
              <li className="text-sm text-muted py-2">{remaining} more on the full list</li>
            )}
          </ul>
        </div>

        <Link
          to="/work"
          onClick={() => trackViewMoreOpen('work')}
          className="cta-btn-secondary"
        >
          All work ({allWork.length}) <ArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default Work;
