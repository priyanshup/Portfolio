/**
 * sections/WhatIBring.jsx
 *
 * Static list of strengths (data/dna.js). Replaces the old auto-scrolling
 * "Core DNA" marquee: no autoplay, no carousel, all text visible.
 * The skill keywords (CSPO, RICE, GA4 …) stay as plain text for screeners.
 *
 * Phones: compact list rows (no cards), one sentence each (`short`).
 * From md up: the 2-column card grid with the full text (`desc`). The full text
 * stays in the page on phones as visually-hidden text, so nothing is lost for
 * screen readers or screeners; the short line is aria-hidden to avoid a repeat.
 */

import SectionHeader from '../components/ui/SectionHeader';
import { dnaItems } from '../data/dna';

const WhatIBring = () => (
  <section id="what-i-bring" className="py-10 md:py-24 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-200">
    <SectionHeader
      title="What I bring"
      subtitle="Four things I lean on when I make product decisions."
    />

    <ul className="reveal grid md:grid-cols-2 md:gap-4">
      {dnaItems.map((item) => (
        <li
          key={item.title}
          className="py-4 md:p-7 md:rounded-2xl md:bg-cardBg border-t md:border dark:border-gray-800 border-slate-200 flex gap-3 md:gap-4"
        >
          <span
            aria-hidden="true"
            className="w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent/10 border border-accent/25 text-accent"
          >
            <item.icon />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base md:text-lg font-bold dark:text-white text-slate-900 mb-1 md:mb-2">{item.title}</h3>
            <p aria-hidden="true" className="md:hidden dark:text-gray-400 text-slate-600 text-sm leading-relaxed">{item.short}</p>
            <p className="max-md:sr-only dark:text-gray-400 text-slate-600 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default WhatIBring;
