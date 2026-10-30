/**
 * components/ui/Tag.jsx
 *
 * The two small label styles used across the site, defined once.
 *   <Tag>   neutral topic / stack label (mono, normal case; 13px on phones, 12px from md)
 *   <Chip>  outcome / result label: ink text with an orange square (same sizing)
 */

export const Tag = ({ children, className = '' }) => (
  <span
    className={
      'font-mono-pp text-[0.8125rem] md:text-xs px-2 py-1 rounded-md border border-line bg-sunk text-body ' +
      className
    }
  >
    {children}
  </span>
);

export const Chip = ({ children, className = '' }) => (
  <span
    className={
      'inline-flex items-center gap-2 text-[0.8125rem] md:text-xs font-semibold px-2.5 py-1 rounded-md border-[1.5px] border-edge dark:border-line bg-plate text-ink ' +
      className
    }
  >
    <span aria-hidden="true" className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
    {children}
  </span>
);
