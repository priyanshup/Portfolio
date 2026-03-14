/**
 * components/ui/ScrollToTop.jsx
 *
 * Floating button in the bottom-right corner.
 * Appears after the user scrolls 400px down.
 * Smooth-scrolls back to the top on click.
 */

import { useState, useEffect } from 'react';
import { ArrowUp } from './Icons';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? 'visible' : ''}`}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTop;
