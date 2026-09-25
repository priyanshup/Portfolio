/**
 * sections/Recognition.jsx
 *
 * The "trophy cabinet": recommendations, credentials, and the one open-source
 * project anyone can verify. Replaces the old Testimonials + Certifications
 * sections and the testimonial modal.
 *
 * Budget (DESIGN.md):
 *   - Recommendations: RECOMMENDATIONS_VISIBLE cards showing a one-line
 *     highlight (verbatim from the full text); ONE "Show all N" button reveals
 *     the rest.
 *       Desktop: "Read full recommendation" opens the whole text in a wide
 *       panel directly under that card's row. One panel is open at a time and
 *       the cards never change height, so a long recommendation never makes a
 *       tall, narrow card (and there is nothing tall to scroll back through).
 *       Phones: cards are already stacked, so the text expands inside the card.
 *   - Credentials: one wrapping grid (two per row on phones), so it never needs
 *     an overflow rule.
 *   - Open source: the first work item flagged openSource, as a compact row.
 *
 * No modal: everything is real page text (screeners and print see it). The
 * closed panel is `inert` (keyboard and screen readers skip it).
 */

import { useState, useRef, useEffect } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import WorkRow from '../components/work/WorkRow';
import { ExtLink } from '../components/ui/Icons';
import { testimonials } from '../data/testimonials';
import { certifications } from '../data/certifications';
import { allWork } from '../data/work';
import { RECOMMENDATIONS_VISIBLE } from '../config';
import { getInitials } from '../utils/initials';
import { keepInView, showInView } from '../utils/scroll';
import useMediaQuery, { DESKTOP_QUERY } from '../hooks/useMediaQuery';

const COLUMNS = 3; // cards per row on desktop (md:grid-cols-3)
const LONG_TEXT = 700; // characters; longer text is set in two columns in the panel

const Attribution = ({ t }) => (
  <div className="flex items-start gap-3">
    <span
      aria-hidden="true"
      className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center font-mono-pp font-bold dark:text-accent text-emerald-800 text-xs"
    >
      {getInitials(t.name)}
    </span>
    <div className="min-w-0">
      <p className="dark:text-white text-slate-900 font-bold text-sm">{t.name}</p>
      <p className="dark:text-gray-400 text-slate-600 text-[0.8125rem] md:text-xs mt-0.5">
        {t.title} · <span className="font-semibold dark:text-gray-300 text-slate-700">{t.company}</span>
      </p>
      <p className="dark:text-gray-400 text-slate-600 text-[0.8125rem] md:text-xs mt-0.5">{t.relation}</p>
    </div>
  </div>
);

const RecommendationCard = ({ t, isDesktop, selected, panelId, onSelect }) => {
  const [expanded, setExpanded] = useState(false); // phones: expands inside the card
  const cardRef = useRef(null);

  const open = isDesktop ? selected : expanded;
  const toggle = () => {
    if (isDesktop) { onSelect(); return; }
    /* Collapsing a long recommendation from its bottom would drop the reader into the next
       card; bring the card's top back into view instead (utils/scroll.js). */
    if (expanded) keepInView(cardRef.current);
    setExpanded((v) => !v);
  };

  return (
    <li ref={cardRef} className="flex scroll-mt-24">
      <div
        className={
          'flex-1 p-5 md:p-6 rounded-2xl bg-cardBg border flex flex-col gap-2 md:gap-4 transition-colors ' +
          (isDesktop && selected ? 'border-accent' : 'dark:border-gray-800 border-slate-200')
        }
      >
        {/* flex-1: the quote takes the spare height, so everything below it lines up across cards */}
        <blockquote className="flex-1 dark:text-gray-200 text-slate-800 text-base leading-relaxed">
          <span aria-hidden="true" className="block font-serif text-4xl leading-none h-6 text-accent">“</span>
          {!isDesktop && expanded ? t.text : t.highlight}
        </blockquote>

        <button
          onClick={toggle}
          aria-expanded={open}
          aria-controls={isDesktop ? panelId : undefined}
          className="link-accent self-start"
        >
          {open ? (isDesktop ? 'Close full recommendation' : 'Show less') : 'Read full recommendation'}
        </button>

        {/* min height only when cards sit side by side; stacked cards would show an empty gap */}
        <div className="md:min-h-[6.5rem] border-t dark:border-gray-800 border-slate-200 pt-3 md:pt-4">
          <Attribution t={t} />
        </div>
      </div>
    </li>
  );
};

/* Desktop: the full text, wide and short, under the row of the chosen card */
const RecommendationPanel = ({ t, onClose }) => (
  <article
    aria-label={`Full recommendation from ${t.name}`}
    className="mt-3 md:mt-4 p-6 md:p-8 rounded-2xl bg-cardBg border border-accent/40"
  >
    <div className="flex items-start justify-between gap-6 mb-5">
      <Attribution t={t} />
      <button onClick={onClose} className="link-accent flex-shrink-0">Close</button>
    </div>
    <blockquote
      className={
        'dark:text-gray-200 text-slate-800 text-base leading-relaxed ' +
        (t.text.length > LONG_TEXT ? 'lg:columns-2 lg:gap-12' : 'max-w-3xl')
      }
    >
      {t.text}
    </blockquote>
  </article>
);

const Recognition = () => {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null); // index of the open recommendation (desktop)
  const [shown, setShown] = useState(0); // last opened, so its text stays while the panel closes
  const recsRef = useRef(null);
  const visible = showAll ? testimonials : testimonials.slice(0, RECOMMENDATIONS_VISIBLE);
  const hidden = testimonials.length - RECOMMENDATIONS_VISIBLE;
  const openSource = allWork.find((w) => w.openSource);

  const rows = [];
  for (let i = 0; i < visible.length; i += COLUMNS) rows.push(visible.slice(i, i + COLUMNS));

  const panelIdFor = (row) => `rec-panel-${row}`;

  const select = (i) => {
    if (selected === i) { setSelected(null); return; }
    setSelected(i);
    setShown(i);
    // let the panel finish opening (grid-template-rows transition), then make sure it is on screen
    setTimeout(() => showInView(document.getElementById(panelIdFor(Math.floor(i / COLUMNS)))), 400);
  };

  /* Escape closes the open recommendation */
  useEffect(() => {
    if (selected === null) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const toggleAll = () => {
    if (showAll) keepInView(recsRef.current);
    setSelected(null);
    setShowAll((v) => !v);
  };

  return (
    <section id="recognition" className="py-10 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-200">
      <SectionHeader
        title="Recognition"
        subtitle="What people I've worked with say, the certifications I hold, and one open-source project you can inspect yourself."
      />

      {/* Recommendations */}
      <div ref={recsRef} className="reveal scroll-mt-24">
        <h3 className="font-display text-xl font-bold dark:text-white text-slate-900 mb-1">Recommendations</h3>
        <p className="dark:text-gray-400 text-slate-600 text-sm mb-4 md:mb-5">From LinkedIn. Each card shows one line, and you can open it to read the whole recommendation.</p>

        {rows.map((row, r) => {
          const openHere = isDesktop && selected !== null && Math.floor(selected / COLUMNS) === r;
          const panelId = panelIdFor(r);
          return (
            <div key={r} className={r > 0 ? 'mt-3 md:mt-4' : ''}>
              <ul className="grid md:grid-cols-3 gap-3 md:gap-4 items-stretch">
                {row.map((t, j) => {
                  const i = r * COLUMNS + j;
                  return (
                    <RecommendationCard
                      key={t.name}
                      t={t}
                      isDesktop={isDesktop}
                      selected={selected === i}
                      panelId={panelId}
                      onSelect={() => select(i)}
                    />
                  );
                })}
              </ul>

              {isDesktop && (
                <div id={panelId} className={'accordion-body ' + (openHere ? 'open' : '')}>
                  <div className="accordion-inner" inert={!openHere}>
                    {Math.floor(shown / COLUMNS) === r && visible[shown] && (
                      <RecommendationPanel t={visible[shown]} onClose={() => setSelected(null)} />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {hidden > 0 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={toggleAll}
              aria-expanded={showAll}
              className="cta-btn-secondary"
            >
              {showAll ? 'Show fewer' : `Show all ${testimonials.length} recommendations`}
            </button>
          </div>
        )}
      </div>

      {/* Credentials */}
      <div className="reveal mt-10 md:mt-14">
        <h3 className="font-display text-xl font-bold dark:text-white text-slate-900 mb-4 md:mb-5">Credentials</h3>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {certifications.map((c) => (
            <li key={c.short}>
              <a
                href={c.link || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full block p-4 md:p-5 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200 dark:hover:border-gray-600 hover:border-slate-300 transition-colors"
              >
                <p className="font-mono-pp text-accent text-xs font-bold mb-1">{c.short}</p>
                <p className="dark:text-white text-slate-900 text-sm font-bold leading-snug">{c.full}</p>
                <p className="dark:text-gray-400 text-slate-600 text-[0.8125rem] md:text-xs mt-2">{c.issuer} · {c.year}</p>
                {c.link && (
                  <span className="text-accent text-[0.8125rem] md:text-xs font-semibold mt-2 md:mt-3 inline-flex items-center gap-1">
                    Verify <ExtLink className="w-4 h-4" />
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Open source */}
      {openSource && (
        <div className="reveal mt-10 md:mt-14">
          <h3 className="font-display text-xl font-bold dark:text-white text-slate-900 mb-4 md:mb-5">Open source</h3>
          <WorkRow item={openSource} compact />
        </div>
      )}
    </section>
  );
};

export default Recognition;
