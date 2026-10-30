/**
 * components/ui/SectionHeader.jsx
 *
 * The tab across the top of a section's plate: an orange number block, the
 * section title (the real <h2>, set as a small wide label), a dotted grille
 * and an optional meta reading on the right ("3 of 11", "Updated Sep 2026").
 * Under it, an optional lede: one large line in the display face, and an
 * optional plain subtitle.
 *
 *   num       "01", "02" … the section's position on the page
 *   title     section name (the h2)
 *   meta      optional short reading on the right of the tab
 *   lede      optional big line under the tab
 *   subtitle  optional plain sentence under the lede
 */

const SectionHeader = ({ num, title, meta, lede, subtitle, id }) => (
  <>
    <div className="plate-tab">
      {num && <span className="plate-tab__num" aria-hidden="true">{num}</span>}
      <h2 id={id} className="plate-tab__label silk silk--strong">{title}</h2>
      <span className="grille" aria-hidden="true" />
      {/* the wrapper does the hiding: .plate-tab__meta sets display itself */}
      {meta && (
        <span className="max-sm:hidden flex">
          <p className="plate-tab__meta silk">{meta}</p>
        </span>
      )}
    </div>
    {(lede || subtitle) && (
      <div className="px-5 pt-7 md:px-12 md:pt-12">
        {lede && (
          <p className="reveal font-display text-[1.625rem] md:text-[2.5rem] font-[850] leading-[1.05] text-ink max-w-3xl text-balance">
            {lede}
          </p>
        )}
        {subtitle && (
          <p className="reveal d1 mt-3 md:mt-4 text-body text-base md:text-lg leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>
    )}
  </>
);

export default SectionHeader;
