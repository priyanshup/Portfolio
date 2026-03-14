/**
 * components/ui/SectionHeader.jsx
 *
 * Reusable section header with eyebrow label, heading, and optional subtitle.
 *
 * Props:
 *   eyebrow   – small monospace label above the title (e.g. "The Arc")
 *   title     – main heading text
 *   subtitle  – optional paragraph below the title
 *   center    – if true, centers all text (default: false = left-aligned)
 */

const SectionHeader = ({ eyebrow, title, subtitle, center = false }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    <div className="reveal">
      <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em] mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl md:text-4xl font-bold">{title}</h2>
    </div>

    {subtitle && (
      <div className="reveal d1 mt-3">
        <p className={`text-gray-400 text-sm leading-relaxed max-w-xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      </div>
    )}
  </div>
);

export default SectionHeader;
