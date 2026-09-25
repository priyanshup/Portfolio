/**
 * components/ui/ScrollToTop.jsx
 *
 * Floating button in the bottom-right corner. It shows only while the reader
 * is scrolling UP (and is past the first 400px), then fades out 2.5s after the
 * last upward movement, or as soon as they scroll down again. That way it never
 * sits on top of the text being read. Keyboard focus always reveals it
 * (see .scroll-top-btn:focus-visible in globals.css).
 * Smooth-scrolls back to the top on click.
 */

import { useState, useEffect, useRef } from 'react';
import { ArrowUp } from './Icons';

const SHOW_AFTER = 400; // px scrolled before the button can appear
const IDLE_MS = 2500;   // fade out this long after the last upward scroll
const STEP = 6;         // px of movement that counts as a direction change

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const lastY = useRef(0);
  const timer = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;
      if (Math.abs(dy) < STEP) return;
      lastY.current = y;

      window.clearTimeout(timer.current);
      if (dy < 0 && y > SHOW_AFTER) {
        setVisible(true);
        timer.current = window.setTimeout(() => setVisible(false), IDLE_MS);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', '#/');
      }}
      onFocus={() => { window.clearTimeout(timer.current); setVisible(true); }}
      onBlur={() => setVisible(false)}
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? 'visible' : ''}`}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTop;
