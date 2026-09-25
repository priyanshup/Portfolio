/**
 * utils/scroll.js
 *
 * keepInView(el): call it when the user COLLAPSES something that was long.
 *
 * If they scrolled to the bottom of an expanded card and press "Show less",
 * the card shrinks and the page under them jumps to whatever follows, which
 * feels like being thrown into the next section. So when the element's top is
 * above the visible area (above its own scroll-margin-top, which should clear
 * the fixed nav), scroll it back to the top of the screen. The element keeps
 * its top position while collapsing, so this can run in the same click.
 * If the top is still visible, the page is left alone.
 *
 * Give the element a `scroll-mt-*` class that clears the nav (and the page bar
 * on inner pages). Respects prefers-reduced-motion.
 */
/**
 * showInView(el): call it after something OPENS below the reader. Scrolls just
 * enough to bring it fully on screen (and not at all if it already is).
 */
export const showInView = (el) => {
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' });
};

export const keepInView = (el) => {
  if (!el) return;
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (el.getBoundingClientRect().top >= margin) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};
