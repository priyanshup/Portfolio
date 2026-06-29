/**
 * sections/StatsBar.jsx
 *
 * Bold static number grid — replaces the old scrolling ticker.
 *
 * Layout:
 *   Mobile  — 2-column grid (3 rows of 2)
 *   Desktop — 3-column grid (2 rows of 3)
 *
 * Each cell uses a glass card (bg-cardBg) so the numbers sit on a
 * clearly bounded surface on every viewport size. Font sizes are
 * scaled down on mobile (text-3xl) to prevent overflow in 2-col cells.
 */

import { stats } from '../data/stats';

const StatsBar = () => (
  <section className="py-10 md:py-16 px-6 border-y dark:border-gray-900 border-slate-200">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={'bg-cardBg rounded-2xl px-4 py-7 md:px-6 md:py-10 text-center reveal d' + ((i % 3) + 1)}
          >
            <p className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent leading-none">
              {s.val}
            </p>
            <p className="font-mono-pp text-[10px] md:text-[11px] uppercase tracking-widest dark:text-gray-500 text-slate-500 mt-3 leading-tight">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
