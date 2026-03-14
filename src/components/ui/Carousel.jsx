/**
 * components/ui/Carousel.jsx
 *
 * Fully reusable carousel with:
 *  - Infinite directional scroll (triple-clone strategy — never reverses)
 *  - Responsive items-per-view (desktop / tablet / mobile)
 *  - Full-height left/right arrow strips (entire edge is clickable)
 *  - Touch swipe (mobile)
 *  - Desktop hover pause (resumes 30s after mouse leaves)
 *  - Auto-scroll with manual-pause (resumes 7s after last click)
 *  - Dot indicators
 *
 * Props:
 *   items         – array of data objects
 *   renderItem    – (item, originalIndex) => JSX
 *   desktopItems  – items visible on desktop  (default 3)
 *   tabletItems   – items visible on tablet   (default 2)
 *   mobileItems   – items visible on mobile   (default 1)
 *   autoPlay      – enable auto-scroll        (default true)
 *   interval      – ms between auto-slides    (default 4000)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useItemsPerView from '../../hooks/useItemsPerView';

const Carousel = ({
  items,
  renderItem,
  desktopItems = 3,
  tabletItems  = 2,
  mobileItems  = 1,
  autoPlay     = true,
  interval     = 4000,
}) => {
  const ipv         = useItemsPerView(desktopItems, tabletItems, mobileItems);
  const len         = items.length;
  const needsScroll = len > ipv;

  /*
   * Triple-clone: [copy-A | copy-B | copy-C]
   * cur starts in copy-B (index = len).
   * Every click increments/decrements cur — never reverses.
   * transitionEnd silently snaps back from outer copies to copy-B.
   */
  const extended = useMemo(() => [...items, ...items, ...items], [items]);

  const [cur, setCur]                   = useState(len);
  const [transOn, setTransOn]           = useState(true);
  const [manualPaused, setManualPaused] = useState(false);
  const [hoverPaused, setHoverPaused]   = useState(false);
  const paused      = manualPaused || hoverPaused;
  const resumeRef   = useRef(null);
  const hoverRef    = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  /* Reset to middle copy (no animation) when ipv changes */
  useEffect(() => {
    setTransOn(false);
    setCur(len);
  }, [ipv, len]);

  /* Re-enable transition after a no-animation snap */
  useEffect(() => {
    if (!transOn) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransOn(true))
      );
      return () => cancelAnimationFrame(id);
    }
  }, [transOn]);

  /* Auto-scroll */
  useEffect(() => {
    if (!autoPlay || !needsScroll || paused) return;
    const t = setInterval(() => setCur((c) => c + 1), interval);
    return () => clearInterval(t);
  }, [autoPlay, needsScroll, paused, interval]);

  /* Snap back silently from outer copies */
  const handleTransitionEnd = useCallback(() => {
    if (!needsScroll) return;
    if (cur >= 2 * len) { setTransOn(false); setCur((c) => c - len); }
    else if (cur < len)  { setTransOn(false); setCur((c) => c + len); }
  }, [cur, len, needsScroll]);

  /* Manual navigation — always +1 or -1, cyclic */
  const go = useCallback((dir) => {
    if (!needsScroll) return;
    setTransOn(true);
    setCur((c) => c + dir);
    setManualPaused(true);
    clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManualPaused(false), 7000);
  }, [needsScroll]);

  /* Desktop hover: pause immediately, resume 30s after mouse leaves */
  const onMouseEnter = () => {
    clearTimeout(hoverRef.current);
    setHoverPaused(true);
  };
  const onMouseLeave = () => {
    hoverRef.current = setTimeout(() => setHoverPaused(false), 30000);
  };

  /* Touch swipe */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && needsScroll) {
      go(dx > 0 ? -1 : 1);
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  /* Dot indicators */
  const activeDot  = ((cur % len) + len) % len;
  const dotCount   = needsScroll ? Math.max(1, len - ipv + 1) : 0;
  const activePage = activeDot % (dotCount || 1);

  const goToDot = (page) => {
    setTransOn(true);
    setCur(len + page);
    setManualPaused(true);
    clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManualPaused(false), 7000);
  };

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="relative">
        {needsScroll && (
          <button className="car-arrow car-arrow-left" onClick={() => go(-1)} aria-label="Previous">
            ‹
          </button>
        )}

        <div
          className={`overflow-hidden ${needsScroll ? 'mx-[44px]' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform:  `translateX(-${(cur * 100) / ipv}%)`,
              transition: transOn ? 'transform 0.5s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((item, i) => (
              <div
                key={i}
                style={{ width: `${100 / ipv}%`, flexShrink: 0 }}
                className="px-3 box-border"
              >
                {renderItem(item, i % len)}
              </div>
            ))}
          </div>
        </div>

        {needsScroll && (
          <button className="car-arrow car-arrow-right" onClick={() => go(1)} aria-label="Next">
            ›
          </button>
        )}
      </div>

      {dotCount > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activePage
                  ? 'bg-accent w-5'
                  : 'bg-gray-700 hover:bg-gray-500 w-1.5'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
