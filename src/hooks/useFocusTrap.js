import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab / Shift+Tab focus inside containerRef for as long as it is
 * mounted, moves focus into it on mount, and restores focus to whatever
 * was focused beforehand once it unmounts (i.e. the element that opened it).
 */
const useFocusTrap = (containerRef) => {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement;

    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    const first = focusables()[0];
    (first || container).focus();

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (els.length === 0) return;
      const firstEl = els[0];
      const lastEl = els[els.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
        previouslyFocused.current.focus();
      }
    };
  }, [containerRef]);
};

export default useFocusTrap;
