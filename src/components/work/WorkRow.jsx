/**
 * components/work/WorkRow.jsx
 *
 * One row of the Work list. Three ways it is used:
 *
 *   featured   (showMetric)   Homepage. A whole-card link with the headline metric.
 *                             On phones it shows only the metric, company and
 *                             title; the summary and outcome chips move to the
 *                             case page (they stay in the page for screen readers
 *                             and screeners as visually-hidden text).
 *   collapsible               /work. On phones each row is compact (meta + title)
 *                             and a "Summary" button opens the rest in place;
 *                             from md up everything is shown. The title is the
 *                             link (stretched over the card), so the toggle can
 *                             live inside the row without nesting controls.
 *   compact                   The open-source card in Recognition. On phones the
 *                             topic tags are hidden and the padding is tighter.
 *
 * Rows with a case study link to it; the rest (impact stories, projects)
 * render as plain rows.
 *
 * Props:
 *   item         – an entry from data/work.js
 *   showMetric   – featured row: show the large headline metric
 *   collapsible  – /work row: summary opens on tap on phones
 *   compact      – trim tags and padding on phones
 *   from         – "home" | "work-page": where the list is shown, so the case
 *                  study's breadcrumb can lead back to it
 *   headingAs    – heading tag for the title ("h3" on the homepage, "h2" on /work)
 */

import { useState, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Tag } from '../ui/Tag';
import { GH, Package, IconDocs, ChevronDown } from '../ui/Icons';
import useMediaQuery, { DESKTOP_QUERY } from '../../hooks/useMediaQuery';
import { trackCaseStudyOpen, trackProjectLinkClick } from '../../utils/analytics';
import { keepInView } from '../../utils/scroll';

const LINK_ICONS = { GitHub: GH, PyPI: Package, Docs: IconDocs };

const base = 'block rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 ';

const WorkRow = ({
  item,
  showMetric = false,
  collapsible = false,
  compact = false,
  from = 'home',
  headingAs = 'h3',
}) => {
  const Heading = headingAs;
  const isPage = Boolean(item.slug);
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const cardRef = useRef(null);

  /* ── Pieces ── */
  const meta = (
    <p className="font-mono-pp text-accent meta-line">
      {item.company}
      {/* the rest of the meta line is hidden visually on the featured phone row */}
      <span className={showMetric ? 'max-md:sr-only' : ''}>
        {[item.domain, item.readMinutes && `~${item.readMinutes} min read`]
          .filter(Boolean)
          .map((s) => ` · ${s}`)
          .join('')}
      </span>
    </p>
  );

  const headingClass =
    'font-display text-xl sm:text-2xl font-bold dark:text-white text-slate-900 leading-snug text-balance';

  const summary = (
    <p
      className={
        'dark:text-gray-400 text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl ' +
        (showMetric ? 'max-md:sr-only' : '')
      }
    >
      {item.summary}
    </p>
  );

  const outcomes = item.outcomes?.length > 0 && (
    <div className={'flex flex-wrap gap-1.5 ' + (showMetric ? 'max-md:sr-only' : '')}>
      {item.outcomes.map((o) => <Chip key={o}>{o}</Chip>)}
    </div>
  );

  const links = item.openSource && item.links?.length > 0 && (
    <div className="flex flex-wrap gap-2 relative z-10">
      {item.links.map((l) => {
        const Icon = LINK_ICONS[l.label];
        return (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackProjectLinkClick(item.title, l.label)}
            className="font-mono-pp text-[0.8125rem] md:text-xs px-3 md:px-2.5 py-1.5 max-md:min-h-11 rounded border dark:border-gray-700 border-slate-300 dark:text-gray-200 text-slate-700 dark:hover:text-white hover:text-slate-900 inline-flex items-center gap-1.5 transition-colors"
          >
            {Icon && <Icon className="w-4 h-4" />}
            {l.label}
          </a>
        );
      })}
    </div>
  );

  const tags = !showMetric && item.tags?.length > 0 && (
    <div className={'flex flex-wrap gap-1.5 ' + (compact ? 'max-md:sr-only' : '')}>
      {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
    </div>
  );

  const metric = showMetric && item.metric && (
    <div className="order-first md:order-last md:w-72 md:text-right flex-shrink-0">
      <p className="font-display text-2xl md:text-3xl font-extrabold text-accent leading-tight">
        {item.metric.val}
      </p>
      <p className="text-[0.8125rem] md:text-xs dark:text-gray-400 text-slate-600 mt-0.5 md:mt-1 leading-snug">
        {item.metric.label}
      </p>
    </div>
  );

  /* ── /work: collapsible row (title is the link, summary opens on phones) ── */
  if (collapsible) {
    const collapsed = !isDesktop && !open;
    return (
      <div ref={cardRef} className={base + 'relative scroll-mt-32 ' + (isPage ? 'card-lift' : '')}>
        <div className="p-5 sm:p-7 flex flex-col gap-2 md:gap-3">
          {meta}
          <Heading className={headingClass}>
            {isPage ? (
              <Link
                to={`/case-studies/${item.slug}`}
                state={{ from }}
                onClick={() => trackCaseStudyOpen(item.slug)}
                className="after:absolute after:inset-0 after:rounded-2xl"
              >
                {item.title}
              </Link>
            ) : (
              item.title
            )}
          </Heading>

          <div id={panelId} className={'accordion-body ' + (!collapsed ? 'open' : '')}>
            <div className="accordion-inner" inert={collapsed}>
              <div className="flex flex-col gap-3 pt-1">
                {summary}
                {outcomes}
                {links}
                {tags}
              </div>
            </div>
          </div>

          {/* Phones: the toggle. The whole-card link sits underneath (z-10 lifts the button). */}
          <div className="md:hidden flex items-center justify-between gap-3 -mb-2">
            <button
              type="button"
              onClick={() => {
                if (open) keepInView(cardRef.current);
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls={panelId}
              className="link-accent relative z-10"
            >
              {open ? 'Hide summary' : 'Show summary'}
              <ChevronDown open={open} />
            </button>
            {isPage && (
              <span aria-hidden="true" className="text-accent text-sm font-semibold">Case study</span>
            )}
          </div>

          {isPage && (
            <p aria-hidden="true" className="hidden md:block text-accent text-sm font-semibold pt-1">
              Read the case study
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ── Homepage featured row, and the open-source card ── */
  const body = (
    <div
      className={
        'flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-8 sm:p-7 ' +
        (compact ? 'p-4' : 'p-5')
      }
    >
      <div className="min-w-0 flex-1 flex flex-col gap-2 md:gap-3">
        {/* phones: the case-study cue shares the company line to save a row */}
        <div className="flex items-baseline justify-between gap-3">
          {meta}
          {isPage && showMetric && (
            <span className="md:hidden flex-shrink-0 text-accent text-[0.8125rem] font-semibold">Read case study</span>
          )}
        </div>
        <Heading className={headingClass}>{item.title}</Heading>
        {summary}
        {outcomes}
        {links}
        {tags}
        {isPage && (
          <p className={'text-accent text-sm font-semibold ' + (showMetric ? 'hidden md:block' : '')}>
            Read the case study
          </p>
        )}
      </div>
      {metric}
    </div>
  );

  if (isPage) {
    return (
      <Link
        to={`/case-studies/${item.slug}`}
        state={{ from }}
        onClick={() => trackCaseStudyOpen(item.slug)}
        className={base + 'card-lift'}
      >
        {body}
      </Link>
    );
  }
  return <div className={base}>{body}</div>;
};

export default WorkRow;
