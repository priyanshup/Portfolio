/**
 * sections/Currently.jsx
 *
 * A few honest lines about what's happening now. Data: data/currently.js.
 * Update every 1–2 months and bump `updated` there (it shows in the tab).
 */

import SectionHeader from '../components/ui/SectionHeader';
import { currently } from '../data/currently';

const Currently = () => (
  <section id="currently" className="plate max-w-6xl mx-auto w-full">
    <SectionHeader num="05" title="Currently" meta={`Updated ${currently.updated}`} />
    <dl className="reveal grid md:grid-cols-2">
      {currently.items.map((it, i) => (
        <div
          key={it.label}
          className={'px-5 py-6 md:px-12 md:py-10 border-line ' + (i > 0 ? 'max-md:border-t ' : '') + (i % 2 === 0 ? 'md:border-r' : '')}
        >
          <dt className="eyebrow mb-2.5">{it.label}</dt>
          <dd className="text-ink text-base md:text-lg leading-relaxed">{it.text}</dd>
        </div>
      ))}
    </dl>
    {/* the tab's meta is hidden on phones; keep the date there too */}
    <p className="sm:hidden eyebrow eyebrow--muted px-5 pb-5 -mt-1">Updated {currently.updated}</p>
  </section>
);

export default Currently;
