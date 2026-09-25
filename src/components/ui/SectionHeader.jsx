/**
 * components/ui/SectionHeader.jsx
 *
 * Shared section heading: short eyebrow, title, optional subtitle.
 * Eyebrows are 12px+ and only used where they add information.
 */

const SectionHeader = ({ eyebrow, title, subtitle, center = false }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    <div className="reveal">
      {eyebrow && (
        <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold dark:text-white text-slate-900">{title}</h2>
    </div>
    {subtitle && (
      <div className="reveal d1 mt-3">
        <p className={`dark:text-gray-400 text-slate-600 text-base leading-relaxed max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      </div>
    )}
  </div>
);

export default SectionHeader;
