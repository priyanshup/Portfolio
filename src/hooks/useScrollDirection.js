import { useState, useEffect, useRef } from 'react';

/**
 * Reports which way the page is scrolling, with a small dead zone so that
 * jitter and momentum wobble don't flip it.
 *
 *   'up' | 'down' | null (null = at the very top, or not moved yet)
 *
 *   threshold – px of movement needed before the direction changes
 *   minY      – above this scroll position the result is always null (a nav
 *               that hides on scroll-down should stay put near the top)
 *   paused    – true freezes the last value (e.g. while a menu is open)
 *
 * Passive listener, requestAnimationFrame-throttled. The nav uses it to hide
 * while reading down and return on the way up.
 */
const useScrollDirection = ({ threshold = 8, minY = 0, paused = false } = {}) => {
  const [direction, setDirection] = useState(null);
  const lastY = useRef(0);
  const pausedRef = useRef(paused);
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;

    const update = () => {
      raf = 0;
      if (pausedRef.current) { lastY.current = window.scrollY; return; }
      const y = Math.max(0, window.scrollY);
      const dy = y - lastY.current;
      if (y <= minY) { setDirection(null); lastY.current = y; return; }
      if (Math.abs(dy) < threshold) return;
      setDirection(dy > 0 ? 'down' : 'up');
      lastY.current = y;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, minY]);

  return direction;
};

export default useScrollDirection;
