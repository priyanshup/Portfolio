/**
 * hooks/useScrollTracking.js
 *
 * Fires scroll depth events at 25, 50, 75, and 100% thresholds.
 * Each threshold fires only once per page load.
 * Uses a passive scroll listener so it never blocks rendering.
 */

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../utils/analytics.js';

const THRESHOLDS = [25, 50, 75, 100];

const useScrollTracking = () => {
  const fired = useRef(new Set());

  useEffect(() => {
    fired.current = new Set(); // reset on mount (new page)

    const handleScroll = () => {
      const scrollTop    = window.scrollY;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;

      THRESHOLDS.forEach((threshold) => {
        if (scrollPercent >= threshold && !fired.current.has(threshold)) {
          fired.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollTracking;