/**
 * sections/Currently.jsx
 *
 * A few honest lines about what's happening now. Data: data/currently.js.
 * Update every 1–2 months and bump `updated` there.
 */

import SectionHeader from '../components/ui/SectionHeader';
import { currently } from '../data/currently';

const Currently = () => (
  <section id="currently" className="py-12 md:py-20 px-6 max-w-6xl mx-auto border-t dark:border-gray-900 border-slate-200">
    <SectionHeader
      eyebrow={`Updated ${currently.updated}`}
      title="Currently"
    />
    <dl className="reveal grid md:grid-cols-2 gap-4">
      {currently.items.map((it) => (
        <div key={it.label} className="p-6 rounded-2xl bg-cardBg border dark:border-gray-800 border-slate-200">
          <dt className="font-mono-pp text-accent text-xs uppercase tracking-[0.15em] mb-2">{it.label}</dt>
          <dd className="dark:text-gray-300 text-slate-700 text-base leading-relaxed">{it.text}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default Currently;
