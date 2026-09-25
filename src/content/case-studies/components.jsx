/**
 * content/case-studies/components.jsx
 *
 * Reusable styled components for writing case study content.
 * Import these in every case study index.jsx for consistent formatting.
 *
 * Available components:
 *   <H2>          Section heading (gets an id, which feeds the "On this page" menu)
 *   <H3>          Sub-section heading
 *   <Collapsible> A whole section (H2 + content) that is open on desktop and
 *                 collapsed behind its heading on phones
 *   <P>           Body paragraph
 *   <Callout>     Highlighted quote or key insight
 *   <MetricRow>   Row of metric stat boxes
 *   <Snapshot>    "The short version": problem, what I did, result, takeaway — always first
 *   <ProcessFlow> Visual step sequence for "My Approach" — mirrors the H3 steps
 *   <ImageFull>   Full-width image with optional caption
 *   <ImageHalf>   Two images side by side
 *   <Divider>     Horizontal rule between sections
 *   <BulletList>  Styled bullet list
 *   <Tag>         Inline tag chip
 */

import { Fragment, useState, useEffect, useId, useRef } from 'react';
import { Tag } from '../../components/ui/Tag';
import { ChevronDown } from '../../components/ui/Icons';
import useMediaQuery, { DESKTOP_QUERY } from '../../hooks/useMediaQuery';
import { OPEN_SECTION_EVENT } from '../../utils/sectionEvents';
import { keepInView } from '../../utils/scroll';

/* ── Typography ─────────────────────────────────────────────────── */

/** "What I'd do differently" -> "what-id-do-differently" */
const slugify = (text) =>
  String(text).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/* scroll-mt-32 clears the fixed nav (64px) and the sticky page bar (~50px) */
export const H2 = ({ children, id }) => (
  <h2
    id={id ?? (typeof children === 'string' ? slugify(children) : undefined)}
    className="scroll-mt-32 font-display text-2xl md:text-3xl font-bold dark:text-white text-slate-900 mt-10 md:mt-14 mb-4 md:mb-5 leading-tight text-balance"
  >
    {children}
  </h2>
);

export const H3 = ({ children }) => (
  <h3 className="font-display text-xl font-bold dark:text-white text-slate-800 mt-8 md:mt-10 mb-3 md:mb-4 leading-tight text-balance">
    {children}
  </h3>
);

/**
 * Collapsible: a full section that is always open from md up (plain H2 + text),
 * and on phones sits behind its heading until tapped. Long sections such as
 * "What we built" and "What I'd do differently" use it so a phone reader can
 * skim past them. The closed panel is `inert` (skipped by keyboard and screen
 * readers) but its text stays in the page for crawlers, screeners and print.
 * The "On this page" menu opens a section by dispatching OPEN_SECTION_EVENT
 * (utils/sectionEvents.js) with the section id as detail.
 */
export const Collapsible = ({ title, children }) => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const sectionRef = useRef(null);
  const id = slugify(title);

  useEffect(() => {
    const onOpen = (e) => { if (e.detail === id) setOpen(true); };
    window.addEventListener(OPEN_SECTION_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SECTION_EVENT, onOpen);
  }, [id]);

  if (isDesktop) {
    return (
      <>
        <H2 id={id}>{title}</H2>
        {children}
      </>
    );
  }

  return (
    <section ref={sectionRef} className="scroll-mt-32 mt-8 border-y dark:border-gray-800 border-slate-200">
      <h2 id={id} className="scroll-mt-32 m-0">
        <button
          type="button"
          onClick={() => {
            if (open) keepInView(sectionRef.current);
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full min-h-14 py-3 flex items-center justify-between gap-4 text-left font-display text-xl font-bold dark:text-white text-slate-900 leading-tight"
        >
          {title}
          <ChevronDown open={open} />
        </button>
      </h2>
      <div id={panelId} className={'accordion-body ' + (open ? 'open' : '')}>
        <div className="accordion-inner" inert={!open}>
          <div className="pb-2">{children}</div>
        </div>
      </div>
    </section>
  );
};

export const P = ({ children }) => (
  <p className="dark:text-slate-300 text-slate-700 text-base leading-relaxed mb-5">{children}</p>
);

/* ── Highlight blocks ───────────────────────────────────────────── */

/**
 * Callout — for key insights, quotes, or problem statements
 * Props:
 *   label    optional eyebrow label  (e.g. "Key Insight")
 *   accent   optional boolean — makes the border accent-coloured
 */
export const Callout = ({ label, accent = false, children }) => (
  <div className={`my-6 md:my-8 p-5 md:p-6 rounded-2xl bg-cardBg border ${accent ? 'border-accent/40' : 'dark:border-gray-800 border-slate-200'}`}>
    {label && (
      <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-3">{label}</p>
    )}
    <p className="dark:text-slate-300 text-slate-700 text-base md:text-lg leading-relaxed">{children}</p>
  </div>
);

/**
 * MetricRow — a row of headline metrics
 * Props:
 *   metrics  array of { val, label }
 */
const METRIC_COLS = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4' };

export const MetricRow = ({ metrics }) => {
  const n = Math.min(metrics.length, 4);
  const odd = metrics.length % 2 === 1;
  return (
    <div className={'grid grid-cols-2 gap-3 md:gap-4 my-6 md:my-10 ' + METRIC_COLS[n]}>
      {metrics.map(({ val, label }, i) => (
        <div
          key={label}
          /* on the 2-column mobile grid an odd last item spans the row (no orphan) */
          className={
            'p-4 md:p-5 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 text-center ' +
            (odd && i === metrics.length - 1 ? 'col-span-2 sm:col-span-1' : '')
          }
        >
          <p className="font-display text-2xl md:text-3xl font-bold text-accent">{val}</p>
          <p className="dark:text-gray-400 text-slate-600 text-[0.8125rem] md:text-xs leading-snug mt-1">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

/* ── At a Glance / Process flow ─────────────────────────────────── */

const Fact = ({ label, value }) => (
  <div className="min-w-0">
    <dt className="font-mono-pp dark:text-gray-400 text-slate-600 text-xs uppercase tracking-[0.15em] mb-1">
      {label}
    </dt>
    <dd className="dark:text-gray-300 text-slate-700 text-sm leading-relaxed">{value}</dd>
  </div>
);

const Cell = ({ label, children }) => (
  <div className="min-w-0 p-4 sm:p-6 bg-cardBg">
    <dt className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-1.5 sm:mb-2">{label}</dt>
    <dd className="dark:text-gray-200 text-slate-800 text-sm sm:text-base leading-relaxed">{children}</dd>
  </div>
);

/**
 * Snapshot — "the short version". Always the first thing in a case study.
 * A recruiter, a casual reader, or a fan should get the whole story from this
 * block alone; the sections below are the depth.
 *
 *   plain      one or two sentences in everyday words (no jargon, no acronyms):
 *              what the situation was and what changed
 *   problem    the business problem, in one or two sentences
 *   did        WHAT I DID — my own contribution and decisions (not "we")
 *   result     the outcome, with the key numbers
 *   takeaway   the durable lesson
 *   role, team, timeline, tech   the facts row. On phones role, team and timeline
 *              collapse into one "Details" line; from sm up they are three columns.
 *
 * Everything must come from the case study's own text — never invent. The
 * detailed metric tiles (<MetricRow>) follow immediately after.
 */
const noStop = (text) => String(text).replace(/\.\s*$/, '');

export const Snapshot = ({ plain, problem, did, result, takeaway, role, team, timeline, tech }) => (
  <section aria-label="The short version" className="my-6 md:my-8 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 overflow-hidden">
    <div className="p-5 sm:p-8">
      <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-2 sm:mb-3">The short version</p>
      <p className="font-display text-[1.0625rem] sm:text-xl font-semibold dark:text-white text-slate-900 leading-snug">
        {plain}
      </p>
    </div>

    <dl className="grid sm:grid-cols-2 gap-px dark:bg-gray-800 bg-slate-200 border-t dark:border-gray-800 border-slate-200">
      <Cell label="The problem">{problem}</Cell>
      <Cell label="What I did">{did}</Cell>
      <Cell label="The result">{result}</Cell>
      <Cell label="The takeaway">{takeaway}</Cell>
    </dl>

    <div className="p-4 sm:p-8 border-t dark:border-gray-800 border-slate-200">
      {/* phones: one Details line */}
      <p className="sm:hidden dark:text-gray-300 text-slate-700 text-sm leading-relaxed">
        <span className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mr-2">Details</span>
        {noStop(role)}. Team: {noStop(team)}. Timeline: {noStop(timeline)}.
      </p>
      <dl className="hidden sm:grid sm:grid-cols-3 gap-x-8 gap-y-4">
        <Fact label="My role" value={role} />
        <Fact label="Team" value={team} />
        <Fact label="Timeline" value={timeline} />
      </dl>
      <div className="flex flex-wrap gap-1.5 mt-3 sm:mt-5">
        {tech.map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
    </div>
  </section>
);

/**
 * ProcessFlow — visualises the numbered steps of "My Approach" as a
 * connected sequence, so a skimmer gets the shape of the approach before
 * reading the prose underneath. Steps should be the same short phrases as
 * the <H3> headings that follow — this is a visual index, not new content.
 * Horizontal with connectors on desktop; stacks (without connectors) on mobile.
 *
 * Props:
 *   steps  array of short strings, one per approach step
 */
export const ProcessFlow = ({ steps }) => (
  <div className="my-6 md:my-10 flex flex-col md:flex-row md:items-stretch gap-2 md:gap-3" role="list" aria-label="Approach, step by step">
    {steps.map((step, i) => (
      <Fragment key={i}>
        <div role="listitem" className="flex-1 p-4 md:p-5 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 min-w-0">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-1.5">
            Step {i + 1}
          </p>
          <p className="dark:text-white text-slate-900 text-sm font-semibold leading-snug">{step}</p>
        </div>
        {i < steps.length - 1 && (
          <div
            aria-hidden="true"
            className="hidden md:flex items-center justify-center flex-shrink-0 dark:text-gray-600 text-slate-400"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" focusable="false">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        )}
      </Fragment>
    ))}
  </div>
);

/* ── Images ─────────────────────────────────────────────────────── */

/**
 * ImageFull — full-width image
 * Props:
 *   src      import the image at the top of your index.jsx, pass it here
 *   alt      alt text (required for accessibility)
 *   caption  optional caption below the image
 */
export const ImageFull = ({ src, alt, caption }) => (
  <figure className="my-10">
    <div className="rounded-2xl overflow-hidden dark:border dark:border-gray-800 border border-slate-200">
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </div>
    {caption && (
      <figcaption className="font-mono-pp dark:text-gray-400 text-slate-600 text-xs uppercase tracking-[0.15em] text-center mt-3">
        {caption}
      </figcaption>
    )}
  </figure>
);

/**
 * ImageHalf — two images side by side (stacks on mobile)
 * Props:
 *   left   { src, alt, caption }
 *   right  { src, alt, caption }
 */
export const ImageHalf = ({ left, right }) => (
  <div className="grid sm:grid-cols-2 gap-4 my-10">
    {[left, right].map((img, i) => (
      <figure key={i}>
        <div className="rounded-2xl overflow-hidden dark:border dark:border-gray-800 border border-slate-200">
          <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
        </div>
        {img.caption && (
          <figcaption className="font-mono-pp dark:text-gray-400 text-slate-600 text-xs uppercase tracking-[0.15em] text-center mt-2">
            {img.caption}
          </figcaption>
        )}
      </figure>
    ))}
  </div>
);

/* ── Lists ──────────────────────────────────────────────────────── */

/**
 * BulletList — styled unordered list
 * Props:
 *   items   array of strings or JSX
 */
export const BulletList = ({ items }) => (
  <ul className="space-y-3 my-6">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 dark:text-slate-300 text-slate-700 text-base leading-relaxed">
        <span className="text-accent mt-1 flex-shrink-0">▸</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Misc ───────────────────────────────────────────────────────── */

export const Divider = () => (
  <div className="border-t dark:border-gray-800 border-slate-200 my-8 md:my-12" />
);
