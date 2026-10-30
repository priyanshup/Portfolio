/**
 * components/work/WorkRow.jsx
 *
 * One item of the Work list. Three ways it is used:
 *
 *   featured   (showMetric)   Homepage. One column of a three-column panel: the
 *                             company, the headline metric on a recessed "screen",
 *                             the title, and an arrow knob; the whole cell is a link.
 *                             The summary shows from md up. On phones it shows only
 *                             the metric, company and title; the summary and outcome
 *                             chips stay in the page for screen readers and screeners
 *                             as visually-hidden text.
 *   collapsible               /work. A row in a list panel: meta on the left, title
 *                             and detail in the middle, arrow knob on the right. On
 *                             phones each row is compact (meta + title) and a
 *                             "Show summary" button opens the rest in place. The
 *                             title is the link (stretched over the row), so the
 *                             toggle can live inside without nesting controls.
 *   compact                   The open-source row in Recognition. On phones the
 *                             topic tags are hidden and the padding is tighter.
 *
 * Rows with a case study link to it; the rest (impact stories, projects)
 * render as plain rows.
 *
 * Props:
 *   item         – an entry from data/work.js
 *   showMetric   – featured cell: show the large headline metric
 *   collapsible  – /work row: summary opens on tap on phones
 *   compact      – trim tags and padding on phones
 *   from         – "home" | "work-page": where the list is shown, so the case
 *                  study's breadcrumb can lead back to it
 *   headingAs    – heading tag for the title ("h3" on the homepage, "h2" on /work)
 */

import { useState, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Chip, Tag } from '../ui/Tag';
import { GH, Package, IconDocs, ChevronDown, ArrowRight } from '../ui/Icons';
import useMediaQuery, { DESKTOP_QUERY } from '../../hooks/useMediaQuery';
import { trackCaseStudyOpen, trackProjectLinkClick } from '../../utils/analytics';
import { keepInView } from '../../utils/scroll';

const LINK_ICONS = { GitHub: GH, PyPI: Package, Docs: IconDocs };

const ArrowKnob = () => (
  <span aria-hidden="true" className="arrow-knob">
    <ArrowRight />
  </span>
);

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
  const extra = [item.domain, item.readMinutes && `~${item.readMinutes} min read`].filter(Boolean);

  const summary = (
    <p className={'text-body text-sm md:text-[0.9375rem] leading-relaxed max-w-2xl ' + (showMetric ? 'max-md:sr-only' : '')}>
      {item.summary}
    </p>
  );

  const outcomes = item.outcomes?.length > 0 && (
    <div className={'flex flex-wrap gap-1.5 ' + (showMetric ? 'sr-only' : '')}>
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
            className="font-mono-pp text-[0.8125rem] md:text-xs font-semibold px-3 py-1.5 max-md:min-h-11 rounded-md border-2 border-edge dark:border-black bg-plate dark:bg-[#2a2a2d] text-ink shadow-[0_2px_0_var(--color-edge)] dark:shadow-[0_2px_0_#000] inline-flex items-center gap-1.5 transition-transform active:translate-y-0.5 active:shadow-none"
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

  const headingClass = 'font-display font-[800] text-ink leading-snug text-balance';

  /* ── Homepage featured cell ── */
  if (showMetric) {
    return (
      <Link
        to={`/case-studies/${item.slug}`}
        state={{ from }}
        onClick={() => trackCaseStudyOpen(item.slug)}
        className="card-lift relative flex flex-col h-full p-5 md:p-7 bg-plate md:first:rounded-bl-[13px] md:last:rounded-br-[13px]"
      >
        <p className="meta-line text-muted flex flex-col gap-1">
          <span className="text-ink font-semibold md:font-[650]">{item.company}</span>
          <span className="max-md:sr-only">{extra.join(' · ')}</span>
        </p>

        {item.metric && (
          <div className="sunk mt-4 md:mt-6 px-4 py-4 md:py-6 md:min-h-[8.5rem] flex flex-col justify-center">
            <p className="font-display text-[1.625rem] md:text-[1.875rem] font-[850] text-ink leading-[1.05]">
              {item.metric.val}
            </p>
            <p className="text-[0.8125rem] md:text-xs text-muted mt-1.5 leading-snug">{item.metric.label}</p>
          </div>
        )}

        <Heading className={headingClass + ' text-lg md:text-xl mt-4 md:mt-6'}>{item.title}</Heading>
        <div className="mt-2 md:mt-3">{summary}</div>
        {outcomes}

        <div className="mt-auto pt-4 md:pt-6 flex items-center justify-between gap-3">
          <span className="silk silk--strong"><span className="md:max-lg:hidden">Read the case study</span><span className="hidden md:max-lg:inline">Case study</span></span>
          <ArrowKnob />
        </div>
      </Link>
    );
  }

  /* ── /work: collapsible row (title is the link, summary opens on phones) ── */
  if (collapsible) {
    const collapsed = !isDesktop && !open;
    return (
      <div
        ref={cardRef}
        className={'relative scroll-mt-32 bg-plate p-5 md:p-8 grid md:grid-cols-[11rem_1fr_auto] gap-x-8 gap-y-2 ' + (isPage ? 'card-lift' : '')}
      >
        <div className="meta-line text-muted md:pt-1.5 flex md:flex-col flex-wrap gap-x-1.5 gap-y-1">
          <span className="text-ink font-semibold md:font-[650]">{item.company}</span>
          {extra.map((s) => <span key={s}><span className="md:hidden">· </span>{s}</span>)}
        </div>

        <div className="min-w-0 flex flex-col gap-2 md:gap-3">
          <Heading className={headingClass + ' text-lg md:text-2xl'}>
            {isPage ? (
              <Link
                to={`/case-studies/${item.slug}`}
                state={{ from }}
                onClick={() => trackCaseStudyOpen(item.slug)}
                className="after:absolute after:inset-0"
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

          {/* Phones: the toggle. The whole-row link sits underneath (z-10 lifts the button). */}
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
            {isPage && <span aria-hidden="true" className="silk silk--strong">Case study</span>}
          </div>
        </div>

        {isPage && (
          <div className="hidden md:flex items-start pt-1">
            <ArrowKnob />
          </div>
        )}
      </div>
    );
  }

  /* ── The open-source row (Recognition) ── */
  return (
    <div className={'sunk flex flex-col gap-2 md:gap-3 ' + (compact ? 'p-4 md:p-7' : 'p-5 md:p-7')}>
      <p className="meta-line text-muted">
        <span className="text-ink font-semibold md:font-[650]">{item.company}</span>
        {extra.map((s) => ` · ${s}`).join('')}
      </p>
      <Heading className={headingClass + ' text-xl md:text-2xl'}>{item.title}</Heading>
      {summary}
      {outcomes}
      {links}
      {tags}
    </div>
  );
};

export default WorkRow;
