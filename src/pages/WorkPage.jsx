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
        width="max-w-4xl"
        items={[
          { label: 'Portfolio', to: '/' },
          { label: 'Work', to: '/', state: { scrollTo: 'work' } },
          { label: 'All work' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        <h1 className="font-display text-3xl md:text-5xl font-bold dark:text-white text-slate-900 leading-tight text-balance">
          All work
        </h1>
        <p className="dark:text-gray-300 text-slate-700 text-base md:text-lg leading-relaxed mt-3 md:mt-4 max-w-2xl">
          Everything I've written up: case studies, smaller projects, and short stories about specific problems,
          across e-commerce, gaming and healthcare. Most client work is under NDA, so the detail is limited.
        </p>

        <div className="mt-6 md:mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
          <button onClick={() => choose(null)} aria-pressed={!active} className="chip-toggle">
            All ({allWork.length})
          </button>
          {workDomains.map((d) => (
            <button key={d} onClick={() => choose(d)} aria-pressed={active === d} className="chip-toggle">
              {d} ({allWork.filter((w) => w.domain === d).length})
            </button>
          ))}
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {items.length} of {allWork.length} items
        </p>

        <ul className="mt-6 md:mt-8 space-y-3 md:space-y-4">
          {items.map((item) => (
            <li key={item.id}><WorkRow item={item} from="work-page" headingAs="h2" collapsible /></li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WorkPage;
