/**
 * components/ui/Tag.jsx
 *
 * The two small pill styles used across the site, defined once.
 *   <Tag>   neutral topic / stack label (mono, normal case; 13px on phones, 12px from md)
 *   <Chip>  accent-coloured outcome / result label (same sizing)
 */

export const Tag = ({ children, className = '' }) => (
  <span
    className={
      'font-mono-pp text-[0.8125rem] md:text-xs px-2 py-1 rounded border dark:bg-gray-900 bg-slate-100 dark:border-gray-800 border-slate-200 dark:text-gray-300 text-slate-700 ' +
      className
    }
  >
    {children}
  </span>
);

export const Chip = ({ children, className = '' }) => (
  <span
    className={
      'text-[0.8125rem] md:text-xs font-semibold px-2.5 py-1 rounded-full border border-accent/30 dark:text-accent text-emerald-800 bg-accent/10 ' +
      className
    }
  >
    {children}
  </span>
);
