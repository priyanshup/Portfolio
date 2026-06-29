/**
 * sections/StatsBar.jsx
 *
 * Bold static number grid — replaces the old scrolling ticker.
 *
 * Layout:
 *   Mobile  — 2-column grid  (3 rows of 2)
 *   Desktop — 3-column grid  (2 rows of 3)
 *
 * Gap technique:
 *   The grid uses gap-px and the container carries the divider colour.
 *   Each cell's bg-darkBg matches the page background, so the 1px gaps
 *   between cells become visible divider lines with no border math needed.
 */

import { stats } from '../data/stats';

const StatsBar = () => (
  <section className="border-y dark:border-gray-900 border-slate-200">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px dark:bg-gray-900 bg-slate-200">
        {stats.map((s, i) => (
          <div
            key={i}
            className={'bg-darkBg px-6 md:px-10 py-10 md:py-14 text-center reveal d' + ((i % 3) + 1)}
          >
            <p className="font-display text-5xl md:text-6xl font-extrabold text-accent">
              {s.val}
            </p>
            <p className="font-mono-pp text-[11px] uppercase tracking-widest dark:text-gray-500 text-slate-500 mt-3">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
