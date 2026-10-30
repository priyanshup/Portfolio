/**
 * pages/WorkPage.jsx, route: /work
 *
 * The full list of work. This is the overflow for the homepage Work section:
 * a real page (shareable URL, working back button, readable by screeners)
 * instead of an overlay. Filter chips are driven by the URL (?domain=…), so a
 * filtered view is linkable too. Case studies opened from here remember it
 * (state.from = 'work-page'), so their breadcrumb leads back to this list.
 *
 * On phones each row is compact (company, title) and "Show summary" opens the
 * rest in place; from md up everything is shown. See WorkRow's `collapsible`.
 */

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageBar from '../components/ui/PageBar';
import WorkRow from '../components/work/WorkRow';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { allWork, workDomains } from '../data/work';

const WorkPage = () => {
  const [params, setParams] = useSearchParams();
  const requested = params.get('domain');
  const active = workDomains.includes(requested) ? requested : null;
  const items = active ? allWork.filter((w) => w.domain === active) : allWork;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useDocumentMeta({
    title: 'All work | Priyanshu Pushpam',
    description: 'Case studies, projects and short write-ups from ten years in e-commerce, gaming and healthcare.',
    path: '/work',
  });

  const choose = (domain) => setParams(domain && domain !== active ? { domain } : {}, { replace: true });

  return (
    <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
      <PageBar
        width="max-w-5xl"
        items={[
          { label: 'Portfolio', to: '/' },
          { label: 'Work', to: '/', state: { scrollTo: 'work' } },
          { label: 'All work' },
        ]}
      />

      <div className="px-2.5 md:px-6 pt-2 md:pt-5 flex flex-col gap-3 md:gap-6">
        {/* Header plate: title, intro, filter keys */}
        <div className="plate plate--screwed max-w-5xl mx-auto w-full px-5 py-7 sm:px-10 md:px-14 md:py-14">
          <p className="silk mb-3 md:mb-4">Case studies, projects and short stories</p>
          <h1 className="font-display text-[2.25rem] md:text-[3.75rem] font-[850] tracking-[-0.045em] leading-[1] text-ink text-balance">
            All <span className="mark">work</span>
          </h1>
          <p className="text-body text-base md:text-lg leading-relaxed mt-4 md:mt-6 max-w-2xl">
            Everything I've written up: case studies, smaller projects, and short stories about specific problems,
            across e-commerce, gaming and healthcare. Most client work is under NDA, so the detail is limited.
          </p>

          <div className="mt-6 md:mt-8 flex flex-wrap gap-2.5" role="group" aria-label="Filter by domain">
            <button onClick={() => choose(null)} aria-pressed={!active} className="chip-toggle">
              All ({allWork.length})
            </button>
            {workDomains.map((d) => (
              <button key={d} onClick={() => choose(d)} aria-pressed={active === d} className="chip-toggle">
                {d} ({allWork.filter((w) => w.domain === d).length})
              </button>
            ))}
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {items.length} of {allWork.length} items
        </p>

        {/* The list: one plate, rows split by hairlines */}
        <div className="plate max-w-5xl mx-auto w-full mb-6 md:mb-10">
          <div className="plate-tab" aria-hidden="true">
            <span className="plate-tab__num">{String(items.length).padStart(2, '0')}</span>
            <span className="plate-tab__label silk silk--strong">{active ?? 'Everything'}</span>
            <span className="grille" />
          </div>
          <ul className="divide-y divide-line">
            {items.map((item) => (
              <li key={item.id} className="last:[&>div]:rounded-b-[13px]">
                <WorkRow item={item} from="work-page" headingAs="h2" collapsible />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};


export default WorkPage;
