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
 *   <ImageFull>   Full-width image with optional caption
 *   <ImageHalf>   Two images side by side
 *   <Divider>     Horizontal rule between sections
 *   <BulletList>  Styled bullet list
 *   <Tag>         Inline tag chip
 */

/* ── Typography ─────────────────────────────────────────────────── */

export const H2 = ({ children }) => (
  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mt-14 mb-5 leading-tight">
    {children}
  </h2>
);

export const H3 = ({ children }) => (
  <h3 className="font-display text-xl font-bold text-white mt-10 mb-4 leading-tight">
    {children}
  </h3>
);

export const P = ({ children }) => (
  <p className="text-gray-400 text-base leading-relaxed mb-5">{children}</p>
);

/* ── Highlight blocks ───────────────────────────────────────────── */

/**
 * Callout — for key insights, quotes, or problem statements
 * Props:
 *   label    optional eyebrow label  (e.g. "Key Insight")
 *   accent   optional boolean — makes the border accent-coloured
 */
export const Callout = ({ label, accent = false, children }) => (
  <div className={`my-8 p-6 rounded-2xl bg-cardBg border ${accent ? 'border-accent/40' : 'border-gray-800'}`}>
    {label && (
      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-3">{label}</p>
    )}
    <p className="text-white text-lg leading-relaxed">{children}</p>
  </div>
);

/**
 * MetricRow — a row of headline metrics
 * Props:
 *   metrics  array of { val, label }
 *
 * Example:
 *   <MetricRow metrics={[
 *     { val: "7%",  label: "Conversion Lift" },
 *     { val: "23%", label: "Cost Reduction" },
 *     { val: "60h", label: "Saved Per Week" },
 *   ]} />
 */
export const MetricRow = ({ metrics }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-10">
    {metrics.map(({ val, label }) => (
      <div
        key={label}
        className="p-5 rounded-2xl bg-cardBg border border-gray-800 text-center"
      >
        <p className="font-display text-3xl font-bold text-accent">{val}</p>
        <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-widest mt-1">
          {label}
        </p>
      </div>
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
 *
 * Example in index.jsx:
 *   import heroImg from './assets/hero.png';
 *   <ImageFull src={heroImg} alt="Architecture diagram" caption="System overview" />
 */
export const ImageFull = ({ src, alt, caption }) => (
  <figure className="my-10">
    <div className="rounded-2xl overflow-hidden border border-gray-800">
      <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />
    </div>
    {caption && (
      <figcaption className="font-mono-pp text-gray-600 text-[10px] uppercase tracking-widest text-center mt-3">
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
        <div className="rounded-2xl overflow-hidden border border-gray-800">
          <img src={img.src} alt={img.alt} className="w-full h-auto" loading="lazy" />
        </div>
        {img.caption && (
          <figcaption className="font-mono-pp text-gray-600 text-[10px] uppercase tracking-widest text-center mt-2">
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
 *
 * Example:
 *   <BulletList items={[
 *     "Reduced manual hours by 60+/week",
 *     "Achieved 7% conversion lift in 30 days",
 *   ]} />
 */
export const BulletList = ({ items }) => (
  <ul className="space-y-3 my-6">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-gray-400 text-base leading-relaxed">
        <span className="text-accent mt-1 flex-shrink-0">▸</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

/* ── Misc ───────────────────────────────────────────────────────── */

export const Divider = () => (
  <div className="border-t border-gray-800 my-12" />
);