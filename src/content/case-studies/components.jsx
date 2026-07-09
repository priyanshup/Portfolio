/**
 * content/case-studies/components.jsx
 *
 * Reusable styled components for writing case study content.
 * Import these in every case study index.jsx for consistent formatting.
 *
 * Available components:
 *   <H2>          Section heading
 *   <H3>          Sub-section heading
 *   <P>           Body paragraph
 *   <Callout>     Highlighted quote or key insight
 *   <MetricRow>   Row of metric stat boxes
 *   <AtAGlance>   Recruiter-facing 60-second summary block — always first
 *   <ProcessFlow> Visual step sequence for "My Approach" — mirrors the H3 steps
 *   <ImageFull>   Full-width image with optional caption
 *   <ImageHalf>   Two images side by side
 *   <Divider>     Horizontal rule between sections
 *   <BulletList>  Styled bullet list
 *   <Tag>         Inline tag chip
 */

import { Fragment } from 'react';

/* ── Typography ─────────────────────────────────────────────────── */

export const H2 = ({ children }) => (
  <h2 className="font-display text-2xl md:text-3xl font-bold dark:text-white text-slate-900 mt-14 mb-5 leading-tight">
    {children}
  </h2>
);

export const H3 = ({ children }) => (
  <h3 className="font-display text-xl font-bold dark:text-white text-slate-800 mt-10 mb-4 leading-tight">
    {children}
  </h3>
);

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
  <div className={`my-8 p-6 rounded-2xl bg-cardBg border ${accent ? 'border-accent/40' : 'dark:border-gray-800 border-slate-200'}`}>
    {label && (
      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-3">{label}</p>
    )}
    <p className="dark:text-slate-300 text-slate-700 text-lg leading-relaxed">{children}</p>
  </div>
);

/**
 * MetricRow — a row of headline metrics
 * Props:
 *   metrics  array of { val, label }
 */
export const MetricRow = ({ metrics }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-10">
    {metrics.map(({ val, label }) => (
      <div
        key={label}
        className="p-5 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 text-center"
      >
        <p className="font-display text-3xl font-bold text-accent">{val}</p>
        <p className="font-mono-pp dark:text-gray-400 text-slate-500 text-[10px] uppercase tracking-widest mt-1">
          {label}
        </p>
      </div>
    ))}
  </div>
);

/* ── At a Glance / Process flow ─────────────────────────────────── */

const Field = ({ label, value }) => (
  <div className="min-w-0">
    <p className="font-mono-pp dark:text-gray-400 text-slate-500 text-[10px] uppercase tracking-widest mb-1">
      {label}
    </p>
    <p className="dark:text-slate-300 text-slate-700 text-sm leading-relaxed">{value}</p>
  </div>
);

/**
 * AtAGlance — recruiter-facing 60-second summary. Always the first thing
 * in a case study, above <MetricRow>. The full quantified result set lives
 * in the <MetricRow> that follows immediately after — this block covers the
 * qualitative facts (role, team, timeline) plus the single headline metric,
 * so the two together read as one "spec sheet" without repeating each other.
 *
 * Props:
 *   summary        one-sentence elevator pitch (distinct from the card teaser)
 *   problem        one-sentence business problem
 *   role           title held during this project
 *   team           who was involved — a headcount if one exists, otherwise
 *                  a plain description of the group (never invented)
 *   timeline       short, factual timeframe or scope descriptor
 *   primaryMetric  { val, label } — the single headline result
 *   tech           array of stack/tool strings
 */
export const AtAGlance = ({ summary, problem, role, team, timeline, primaryMetric, tech }) => (
  <div className="my-8 p-6 sm:p-8 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200">
    <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-4">At a Glance</p>

    <p className="dark:text-white text-slate-900 text-lg sm:text-xl font-display font-bold leading-snug mb-6">
      {summary}
    </p>

    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-6">
      <Field label="Business Problem" value={problem} />
      <Field label="My Role" value={role} />
      <Field label="Team" value={team} />
      <Field label="Timeline" value={timeline} />
    </div>

    <div className="border-t dark:border-gray-800 border-slate-200 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <p className="font-mono-pp dark:text-gray-500 text-slate-500 text-[10px] uppercase tracking-widest mb-1">
          Primary Success Metric
        </p>
        <p className="font-display text-2xl font-bold text-accent">
          {primaryMetric.val}{' '}
          <span className="text-xs font-mono-pp dark:text-gray-400 text-slate-600 font-normal uppercase tracking-widest">
            {primaryMetric.label}
          </span>
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:justify-end">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded dark:bg-gray-900 bg-slate-100 dark:border dark:border-gray-800 border border-slate-200 dark:text-gray-400 text-slate-600"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/**
 * ProcessFlow — visualises the numbered steps of "My Approach" as a
 * connected sequence, so a skimmer gets the shape of the approach before
 * reading the prose underneath. Steps should be the same short phrases as
 * the <H3> headings that follow — this is a visual index, not new content.
 * Horizontal with → connectors on desktop; stacks vertically with ↓ on mobile.
 *
 * Props:
 *   steps  array of short strings, one per approach step
 */
export const ProcessFlow = ({ steps }) => (
  <div className="my-10 flex flex-col md:flex-row md:items-stretch gap-3" role="list" aria-label="Approach, step by step">
    {steps.map((step, i) => (
      <Fragment key={i}>
        <div role="listitem" className="flex-1 p-5 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 min-w-0">
          <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1.5">
            Step {i + 1}
          </p>
          <p className="dark:text-white text-slate-900 text-sm font-semibold leading-snug">{step}</p>
        </div>
        {i < steps.length - 1 && (
          <div
            aria-hidden="true"
            className="flex items-center justify-center flex-shrink-0 dark:text-gray-700 text-slate-300 font-bold text-lg leading-none"
          >
            <span className="md:hidden">↓</span>
            <span className="hidden md:inline">→</span>
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
      <figcaption className="font-mono-pp dark:text-gray-400 text-slate-600 text-[10px] uppercase tracking-widest text-center mt-3">
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
          <figcaption className="font-mono-pp dark:text-gray-400 text-slate-600 text-[10px] uppercase tracking-widest text-center mt-2">
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
  <div className="border-t dark:border-gray-800 border-slate-200 my-12" />
);
