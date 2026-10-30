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
    className="scroll-mt-32 font-display text-[1.5rem] md:text-[2rem] font-[850] tracking-[-0.04em] text-ink mt-12 md:mt-16 mb-4 md:mb-5 leading-[1.1] text-balance"
  >
    {children}
  </h2>
);

export const H3 = ({ children }) => (
  <h3 className="font-display text-lg md:text-xl font-[800] text-ink mt-8 md:mt-10 mb-3 md:mb-4 leading-snug text-balance">
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
    <section ref={sectionRef} className="scroll-mt-32 mt-8 border-y border-line">
      <h2 id={id} className="scroll-mt-32 m-0">
        <button
          type="button"
          onClick={() => {
            if (open) keepInView(sectionRef.current);
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full min-h-14 py-3 flex items-center justify-between gap-4 text-left font-display text-lg font-[800] text-ink leading-tight"
        >
          {title}
          <span aria-hidden="true" className="arrow-knob"><ChevronDown open={open} /></span>
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
  <p className="text-body text-base md:text-[1.0625rem] leading-relaxed mb-5">{children}</p>
);

/* ── Highlight blocks ───────────────────────────────────────────── */

/**
 * Callout — for key insights, quotes, or problem statements
 * Props:
 *   label    optional eyebrow label  (e.g. "Key Insight")
 *   accent   optional boolean — makes the border accent-coloured
 */
export const Callout = ({ label, accent = false, children }) => (
  <div className={`sunk my-6 md:my-8 p-5 md:p-7 border-l-4 ${accent ? '!border-l-accent' : '!border-l-edge dark:!border-l-accent'}`}>
    {label && (
      <p className="silk silk--accent mb-3">{label}</p>
    )}
    <p className="text-ink text-base md:text-lg font-medium leading-relaxed">{children}</p>
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
            'p-4 md:p-5 rounded-[10px] border-2 border-edge dark:border-black bg-plate dark:bg-[#222225] shadow-[0_3px_0_var(--color-edge)] dark:shadow-[0_3px_0_#000] ' +
            (odd && i === metrics.length - 1 ? 'col-span-2 sm:col-span-1' : '')
          }
        >
          <p className="font-display text-2xl md:text-[1.75rem] font-[850] text-ink leading-tight">{val}</p>
          <p className="text-muted text-[0.8125rem] md:text-xs leading-snug mt-1.5">
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
    <dt className="silk mb-1.5">
      {label}
    </dt>
    <dd className="text-body text-sm leading-relaxed">{value}</dd>
  </div>
);

const Cell = ({ label, children }) => (
  <div className="min-w-0 p-4 sm:p-6 bg-plate">
    <dt className="silk silk--accent mb-1.5 sm:mb-2">{label}</dt>
    <dd className="text-body text-sm sm:text-base leading-relaxed">{children}</dd>
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
  <section aria-label="The short version" className="my-6 md:my-8 rounded-[12px] bg-sunk border border-line overflow-hidden">
    <div className="plate-tab !rounded-none" aria-hidden="true">
      <span className="plate-tab__num">TL;DR</span>
      <span className="plate-tab__label silk silk--strong">The short version</span>
      <span className="grille" />
    </div>
    <div className="p-5 sm:p-8">
      <p className="font-display text-base sm:text-xl font-[650] sm:font-[750] tracking-[-0.02em] text-ink leading-snug">
        {plain}
      </p>
    </div>

    <dl className="grid sm:grid-cols-2 gap-px bg-line border-t border-line">
      <Cell label="The problem">{problem}</Cell>
      <Cell label="What I did">{did}</Cell>
      <Cell label="The result">{result}</Cell>
      <Cell label="The takeaway">{takeaway}</Cell>
    </dl>

    <div className="p-4 sm:p-8 border-t border-line">
      {/* phones: one Details line */}
      <p className="sm:hidden text-body text-sm leading-relaxed">
        <span className="silk silk--accent mr-2">Details</span>
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
        <div role="listitem" className="flex-1 p-4 md:p-5 rounded-[10px] border-2 border-edge dark:border-black bg-plate dark:bg-[#222225] shadow-[0_3px_0_var(--color-edge)] dark:shadow-[0_3px_0_#000] min-w-0">
          <p className="label-key mb-2.5">
            Step {i + 1}
          </p>
          <p className="text-ink text-sm font-semibold leading-snug">{step}</p>
        </div>
        {i < steps.length - 1 && (
          <div
            aria-hidden="true"
            className="hidden md:flex items-center justify-center flex-shrink-0 text-ink"
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
    <div className="rounded-[10px] overflow-hidden border-2 border-edge dark:border-line">
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </div>
    {caption && (
      <figcaption className="silk text-center mt-3">
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
        <div className="rounded-[10px] overflow-hidden border-2 border-edge dark:border-line">
          <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
        </div>
        {img.caption && (
          <figcaption className="silk text-center mt-2">
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
      <li key={i} className="flex gap-3 text-body text-base md:text-[1.0625rem] leading-relaxed">
        <span aria-hidden="true" className="bullet-sq" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Misc ───────────────────────────────────────────────────────── */

export const Divider = () => (
  <div className="border-t border-line my-8 md:my-12" />
);
