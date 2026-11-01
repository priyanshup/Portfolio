/**
 * sections/WhatIBring.jsx
 *
 * Static list of strengths (data/dna.js), all text visible.
 * The skill keywords (CSPO, RICE, GA4 …) stay as plain text for screeners.
 *
 * Phones: list rows, one sentence each (`short`).
 * From md up: a 2x2 grid split by hairlines, with the full text (`desc`). The full text
 * stays in the page on phones as visually-hidden text, so nothing is lost for
 * screen readers or screeners; the short line is aria-hidden to avoid a repeat.
 */

import SectionHeader from '../components/ui/SectionHeader';
import { dnaItems } from '../data/dna';

const WhatIBring = () => (
  <section id="what-i-bring" className="plate max-w-6xl mx-auto w-full">
    <SectionHeader
      num="03"
      title="What I bring"
      lede="Four things I lean on when I make product decisions."
    />

    <ul className="reveal mt-6 md:mt-10 border-t border-line grid md:grid-cols-2">
      {dnaItems.map((item, i) => (
        <li
          key={item.title}
          className={
            'px-5 py-5 md:px-12 md:py-10 flex gap-4 md:gap-5 border-line ' +
            (i > 0 ? 'max-md:border-t ' : '') +
            (i % 2 === 0 ? 'md:border-r ' : '') +
            (i >= 2 ? 'md:border-t' : '')
          }
        >
          <span aria-hidden="true" className="icon-box max-md:!w-10 max-md:!h-10">
            <item.icon />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base md:text-xl font-[800] text-ink mb-1 md:mb-2">{item.title}</h3>
            <p aria-hidden="true" className="md:hidden text-body text-sm leading-relaxed">{item.short}</p>
            <p className="max-md:sr-only text-body text-[0.9375rem] leading-relaxed">{item.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  </section>
);


export default WhatIBring;
