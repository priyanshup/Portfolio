/**
 * pages/CaseStudyPage.jsx
 *
 * Renders an individual case study at /case-studies/:slug
 * (URL in HashRouter form: /#/case-studies/<slug>).
 *
 * Metadata comes from data/work.js (items with a `slug`); the article body is
 * lazy-loaded from src/content/case-studies/<slug>/index.jsx.
 *
 * Page furniture:
 *   - a sticky PageBar under the nav: Portfolio / Work (or All work) / this page,
 *     every level a link, plus a thin reading-progress line
 *   - an "On this page" menu in that bar (built from the article's H2 ids)
 *   - read-time label, company logo, topic tags (collapsed behind a toggle on phones)
 *   - end of page: contact block + "next case study" card
 *
 * Origin: links into a case study pass state { from }: 'work-page' when the
 * reader came from /work, otherwise the homepage's Work section. The trail
 * follows that, so "back one level" always goes where the reader came from.
 */

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { caseStudies, nextCaseStudy } from '../data/work';
import { CONFIG } from '../config';
import PageBar from '../components/ui/PageBar';
import CompanyLogo from '../components/ui/CompanyLogo';
import { Tag } from '../components/ui/Tag';
import { ArrowUpRight, DL, ChevronDown } from '../components/ui/Icons';
import useDocumentMeta from '../hooks/useDocumentMeta';
import useMediaQuery, { DESKTOP_QUERY } from '../hooks/useMediaQuery';
import { trackCaseStudyOpen, trackLinkedInClick, trackResumeDownload } from '../utils/analytics';

/* ── Loading skeleton ── */
const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse" aria-hidden="true">
    <div className="h-4 dark:bg-gray-800 bg-slate-200 rounded w-1/4" />
    <div className="h-8 dark:bg-gray-800 bg-slate-200 rounded w-3/4" />
    <div className="h-4 dark:bg-gray-800 bg-slate-200 rounded w-full" />
    <div className="h-4 dark:bg-gray-800 bg-slate-200 rounded w-5/6" />
    <div className="h-4 dark:bg-gray-800 bg-slate-200 rounded w-full" />
  </div>
);

/* ── Dynamic content loader ── */
const CaseStudyContent = ({ slug, onReady }) => {
  const [Content, setContent] = useState(null);
  const [error, setError]     = useState(false);

  useEffect(() => {
    setContent(null);
    setError(false);
    import(`../content/case-studies/${slug}/index.jsx`)
      .then((mod) => setContent(() => mod.default))
      .catch(() => setError(true));
  }, [slug]);

  /* tell the page when the article is in the DOM, so it can build the section menu */
  useEffect(() => { onReady?.(); }, [Content, onReady]);

  if (error) return (
    <p className="dark:text-gray-300 text-slate-700 text-sm">
      Content file not found. Make sure{' '}
      <code className="font-mono-pp text-accent">
        src/content/case-studies/{slug}/index.jsx
      </code>{' '}
      exists.
    </p>
  );
  if (!Content) return <LoadingSkeleton />;
  return <Content />;
};

/* Topic tags: a plain row on desktop, one toggle row on phones (text stays in the page, panel is inert while closed) */
const TopicTags = ({ tags }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const collapsed = !isDesktop && !open;
  return (
    <div>
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="link-accent"
        >
          Topics ({tags.length})
          <ChevronDown open={open} />
        </button>
      </div>
      <div id={panelId} className={'accordion-body ' + (!collapsed ? 'open' : '')}>
        <div className="accordion-inner" inert={collapsed}>
          <div className="flex flex-wrap gap-2 pb-1 md:pt-2">
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
    </div>
  );
};

/* 0..1 scroll progress through the page (requestAnimationFrame-throttled). */
const useReadingProgress = (enabled) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!enabled) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);
  return progress;
};

/* ── Page ── */
const CaseStudyPage = () => {
  const { slug }   = useParams();
  const location   = useLocation();
  const cs = caseStudies.find((c) => c.slug === slug);
  const next = cs ? nextCaseStudy(cs.slug) : null;

  /* Where did the reader come from? Drives the breadcrumb trail. */
  const from = location.state?.from === 'work-page' ? 'work-page' : 'home';
  const progress = useReadingProgress(Boolean(cs));

  /* Sections for the "On this page" menu: every id'd H2 inside the article */
  const articleRef = useRef(null);
  const [sections, setSections] = useState([]);
  const scanSections = useCallback(() => {
    const found = [...(articleRef.current?.querySelectorAll('h2[id]') ?? [])].map((h) => ({
      id: h.id,
      label: h.textContent.trim(),
    }));
    setSections((prev) =>
      prev.length === found.length && prev.every((p, i) => p.id === found[i].id) ? prev : found,
    );
  }, []);

  useDocumentMeta({
    title: cs ? `${cs.title} | Priyanshu Pushpam` : 'Case study not found | Priyanshu Pushpam',
    description: cs ? cs.summary : undefined,
    path: cs ? `/case-studies/${cs.slug}` : undefined,
  });

  /* Scroll to top on navigation */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, location.key]);

  /* ── 404 ── */
  if (!cs) {
    return (
      <main id="main-content" tabIndex={-1} className="min-h-screen flex items-center justify-center px-6 focus:outline-none">
        <div className="text-center space-y-4">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.2em]">404</p>
          <h1 className="font-display text-4xl font-bold dark:text-white text-slate-900">
            Case study not found
          </h1>
          <p className="dark:text-gray-300 text-slate-700 text-base">
            I couldn't find that case study.
          </p>
          <Link to="/work" className="cta-btn-primary mt-4">
            Browse all work
          </Link>
        </div>
      </main>
    );
  }

  const trail = from === 'work-page'
    ? [
        { label: 'Portfolio', to: '/' },
        { label: 'All work', to: '/work' },
        { label: cs.title },
      ]
    : [
        { label: 'Portfolio', to: '/' },
        { label: 'Work', to: '/', state: { scrollTo: 'work' } },
        { label: cs.title },
      ];

  return (
    <main id="main-content" tabIndex={-1} className="pt-16 focus:outline-none">
      <PageBar items={trail} width="max-w-3xl" progress={progress} sections={sections} />

      <article ref={articleRef} className="max-w-3xl mx-auto px-6 pt-6 md:pt-10 pb-24">
        {/* Header: compact on phones so the plain-language line lands in the first screen */}
        <header className="mb-6 md:mb-12 space-y-3 md:space-y-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <CompanyLogo company={cs.company} scale={0.8} />
            <p className="font-mono-pp text-accent meta-line">
              {cs.company} · {cs.domain} · ~{cs.readMinutes} min read
            </p>
          </div>
          <h1 className="font-display text-[1.75rem] md:text-5xl font-bold dark:text-white text-slate-900 leading-tight text-balance">
            {cs.title}
          </h1>
          <TopicTags tags={cs.tags} />
          <div className="hidden md:block border-t dark:border-gray-800 border-slate-200 pt-2" />
        </header>

        {/* Dynamically loaded content */}
        <CaseStudyContent slug={slug} onReady={scanSections} />

        {/* End of page: talk about it, then read the next one */}
        <aside className="mt-16 p-6 sm:p-8 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200">
          <h2 className="font-display text-2xl font-bold dark:text-white text-slate-900 mb-2">
            Want to talk about this?
          </h2>
          <p className="dark:text-gray-300 text-slate-700 text-base leading-relaxed mb-6">
            Happy to talk it through, including what I'd change.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CONFIG.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackLinkedInClick}
              className="cta-btn-primary"
            >
              Message me on LinkedIn <ArrowUpRight />
            </a>
            <a
              href={CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackResumeDownload}
              className="cta-btn-secondary"
            >
              <DL /> Resume
            </a>
          </div>
        </aside>

        {next && (
          <Link
            to={`/case-studies/${next.slug}`}
            state={{ from }}
            onClick={() => trackCaseStudyOpen(next.slug)}
            className="card-lift mt-6 block p-6 sm:p-8 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200"
          >
            <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-2">
              Next case study · ~{next.readMinutes} min read
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold dark:text-white text-slate-900 leading-snug">
              {next.title}
            </p>
            <p className="dark:text-gray-400 text-slate-600 text-sm mt-2">{next.company} · {next.domain}</p>
          </Link>
        )}

        {/* Bottom links: same levels as the bar, for readers who finished the page */}
        <div className="border-t dark:border-gray-800 border-slate-200 mt-12 pt-6 flex flex-wrap gap-x-6">
          <Link to="/" state={{ scrollTo: 'work' }} className="link-accent">← Back to Work</Link>
          <Link to="/work" className="link-accent">All work</Link>
        </div>
      </article>
    </main>
  );
};

export default CaseStudyPage;
