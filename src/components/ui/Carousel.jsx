/**
 * components/ui/Carousel.jsx
 *
 * Two modes determined automatically:
 *
 * ── CONTINUOUS  (autoPlay=true AND items.length > itemsPerView) ──────────
 *   requestAnimationFrame infinite scroll.
 *   Desktop hover  → slows to hoverSpeed.
 *   Mobile swipe   → adjusts continuous offset.
 *   Mobile tap (clickable=false) → slows to 25% for 5s.
 *   externalPaused → pause from parent (e.g. while modal is open).
 *   No arrows rendered in continuous mode.
 *
 * ── DISCRETE  (autoPlay=false OR items.length <= itemsPerView) ──────────
 *   Smooth drag-follow swipe: track follows finger live, snaps on release.
 *   Triple-clone for seamless infinite wrap.
 *   Auto-advance + hover-pause when autoPlay=true.
 *   showArrows prop controls arrow visibility.
 *
 * ── PEEK (peek=true, isMobile, mobileItems=1) ──────────────────────────
 *   Shows ~10% of the next card on mobile to hint more content.
 *   Achieved by sizing each slot to 87% of the container instead of 100%.
 *   The transform offset scales with the slot size so snapping stays clean.
 *   The discrete container drops overflow-hidden so the peek is visible;
 *   the html/body overflow-x:hidden (globals.css) handles page-level clipping.
 *
 * Props:
 *   items             Array of data objects
 *   renderItem        (item, originalIndex) => JSX
 *   desktopItems      Visible on desktop        (default 3)
 *   tabletItems       Visible on tablet         (default 2)
 *   mobileItems       Visible on mobile         (default 1)
 *   autoPlay          Enable continuous/auto    (default true)
 *   desktopSpeed      px/s normal desktop speed (default 40)
 *   hoverSpeed        px/s desktop hover speed  (default 12)
 *   mobileSpeed       px/s mobile speed         (default 30)
 *   tapSlowMultiplier Speed fraction on tap     (default 0.25)
 *   clickable         Items interactive?        (default true)
 *   showArrows        Show prev/next arrows     (default false)
 *   peek              10% next-card peek mobile (default false)
 *   externalPaused    Pause from parent         (default false)
 *   interval          ms between discrete steps (default 4000)
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import useItemsPerView from '../../hooks/useItemsPerView';
import useIsMobile from '../../hooks/useIsMobile';

const Carousel = ({
  items,
  renderItem,
  desktopItems      = 3,
  tabletItems       = 2,
  mobileItems       = 1,
  autoPlay          = true,
  desktopSpeed      = 40,
  hoverSpeed        = 12,
  mobileSpeed       = 30,
  tapSlowMultiplier = 0.25,
  clickable         = true,
  showArrows        = false,
  peek              = false,
  externalPaused    = false,
  interval          = 4000,
}) => {
  const ipv         = useItemsPerView(desktopItems, tabletItems, mobileItems);
  const isMobile    = useIsMobile();
  const len         = items.length;
  const needsScroll = len > ipv;
  const continuous  = autoPlay && needsScroll;

  /*
   * peekIpv — used for slot width and transform in discrete mode on mobile.
   * 1.15 means each card takes up 100/1.15 ≈ 87% of the container,
   * leaving ~13% for the next card to peek through.
   * Logic operations (cur, dotCount) still use real ipv so snapping is clean.
   */
  const peekIpv = (peek && isMobile && mobileItems === 1) ? ipv + 0.15 : ipv;

  const extended = useMemo(() => [...items, ...items, ...items], [items]);

  // ── CONTINUOUS refs ───────────────────────────────────────────────
  const contWrapRef = useRef(null);
  const trackRef    = useRef(null);
  const rafRef      = useRef(null);
  const lastTsRef   = useRef(null);
  const offsetRef   = useRef(0);
  const speedRef    = useRef(desktopSpeed);
  const [slotW, setSlotW] = useState(0);

  // ── DISCRETE state ────────────────────────────────────────────────
  const [cur, setCur]         = useState(len);
  const [trans, setTrans]     = useState(true);
  const [manPaused, setManPaused] = useState(false);
  const [hovPaused, setHovPaused] = useState(false);
  const [dragX, setDragX]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const resumeRef = useRef(null);
  const hoverRef  = useRef(null);

  // ── Shared touch refs ─────────────────────────────────────────────
  const txRef     = useRef(null);
  const tyRef     = useRef(null);
  const tappedRef = useRef(false);
  const tapTimer  = useRef(null);

  // ── CONTINUOUS: measure slot width ───────────────────────────────
  useEffect(() => {
    if (!continuous || !contWrapRef.current) return;
    const measure = () => {
      if (!contWrapRef.current) return;
      setSlotW(Math.max(contWrapRef.current.offsetWidth / ipv, 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(contWrapRef.current);
    return () => ro.disconnect();
  }, [continuous, ipv]);

  // ── CONTINUOUS: rAF loop ─────────────────────────────────────────
  const tick = useCallback((ts) => {
    if (!lastTsRef.current) lastTsRef.current = ts;
    const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
    lastTsRef.current = ts;
    const sw = slotW * len;
    if (sw > 0) {
      offsetRef.current = (offsetRef.current + speedRef.current * dt) % sw;
      if (trackRef.current) {
        trackRef.current.style.transform =
          'translateX(' + (-(sw + offsetRef.current)) + 'px)';
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [slotW, len]);

  useEffect(() => {
    if (!continuous || slotW === 0) return;
    speedRef.current = isMobile ? mobileSpeed : desktopSpeed;
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [continuous, slotW, isMobile, mobileSpeed, desktopSpeed, tick]);

  // Pause/resume via externalPaused
  useEffect(() => {
    if (!continuous) return;
    if (externalPaused) {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    } else {
      if (!rafRef.current && slotW > 0) {
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
      }
    }
  }, [externalPaused, continuous, slotW, tick]);

  // ── DISCRETE: reset on ipv change ────────────────────────────────
  useEffect(() => {
    if (continuous) return;
    setTrans(false); setCur(len); setDragX(0);
  }, [ipv, len, continuous]);

  useEffect(() => {
    if (continuous || trans) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTrans(true))
    );
    return () => cancelAnimationFrame(id);
  }, [trans, continuous]);

  useEffect(() => {
    if (continuous || !autoPlay || manPaused || hovPaused || !needsScroll) return;
    const t = setInterval(() => setCur(c => c + 1), interval);
    return () => clearInterval(t);
  }, [continuous, autoPlay, manPaused, hovPaused, needsScroll, interval]);

  const onTransEnd = useCallback(() => {
    if (continuous) return;
    if (cur >= 2 * len) { setTrans(false); setCur(c => c - len); }
    else if (cur < len) { setTrans(false); setCur(c => c + len); }
  }, [cur, len, continuous]);

  // ── HOVER ─────────────────────────────────────────────────────────
  const onMouseEnter = useCallback(() => {
    if (continuous) { speedRef.current = hoverSpeed; }
    else { clearTimeout(hoverRef.current); setHovPaused(true); }
  }, [continuous, hoverSpeed]);

  const onMouseLeave = useCallback(() => {
    if (continuous) { speedRef.current = isMobile ? mobileSpeed : desktopSpeed; }
    else { hoverRef.current = setTimeout(() => setHovPaused(false), 30000); }
  }, [continuous, isMobile, mobileSpeed, desktopSpeed]);

  // ── ARROW NAV ─────────────────────────────────────────────────────
  const jumpOffset = useCallback((dir) => {
    const sw = slotW * len;
    if (sw <= 0) return;
    offsetRef.current = ((offsetRef.current + dir * slotW) + sw) % sw;
    lastTsRef.current = null;
  }, [slotW, len]);

  const goNext = useCallback(() => {
    if (!needsScroll) return;
    if (continuous) { jumpOffset(1); return; }
    setTrans(true); setDragX(0); setCur(c => c + 1);
    setManPaused(true); clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManPaused(false), 7000);
  }, [needsScroll, continuous, jumpOffset]);

  const goPrev = useCallback(() => {
    if (!needsScroll) return;
    if (continuous) { jumpOffset(-1); return; }
    setTrans(true); setDragX(0); setCur(c => c - 1);
    setManPaused(true); clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManPaused(false), 7000);
  }, [needsScroll, continuous, jumpOffset]);

  // ── TOUCH: drag-follow swipe ──────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    txRef.current = e.touches[0].clientX;
    tyRef.current = e.touches[0].clientY;
    if (!continuous) { setDragging(true); setTrans(false); setDragX(0); }
  }, [continuous]);

  const onTouchMove = useCallback((e) => {
    if (txRef.current === null || continuous) return;
    const dx = e.touches[0].clientX - txRef.current;
    const dy = e.touches[0].clientY - tyRef.current;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
      txRef.current = null; setDragging(false); setTrans(true); setDragX(0); return;
    }
    if (needsScroll) { e.preventDefault(); setDragX(dx); }
  }, [continuous, needsScroll]);

  const onTouchEnd = useCallback((e) => {
    if (txRef.current === null) return;
    const dx = e.changedTouches[0].clientX - txRef.current;
    const dy = e.changedTouches[0].clientY - tyRef.current;
    txRef.current = null; tyRef.current = null;

    if (continuous) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && needsScroll) {
        if (dx > 0) goPrev(); else goNext();
      }
      if (Math.abs(dx) < 12 && Math.abs(dy) < 12 && !clickable) {
        if (!tappedRef.current) {
          tappedRef.current = true;
          speedRef.current = (isMobile ? mobileSpeed : desktopSpeed) * tapSlowMultiplier;
          clearTimeout(tapTimer.current);
          tapTimer.current = setTimeout(() => {
            tappedRef.current = false;
            speedRef.current = isMobile ? mobileSpeed : desktopSpeed;
          }, 5000);
        }
      }
      return;
    }

    setDragging(false); setTrans(true); setDragX(0);
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && needsScroll) {
      setCur(c => dx > 0 ? c - 1 : c + 1);
      setManPaused(true); clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => setManPaused(false), 7000);
    }
  }, [continuous, needsScroll, clickable, isMobile, mobileSpeed, desktopSpeed,
      tapSlowMultiplier, goNext, goPrev]);

  useEffect(() => {
    if (!isMobile || !continuous) return;
    const h = () => {
      if (tappedRef.current) { tappedRef.current = false; speedRef.current = mobileSpeed; clearTimeout(tapTimer.current); }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [isMobile, continuous, mobileSpeed]);

  useEffect(() => {
    if (!isMobile || !continuous) return;
    const el = contWrapRef.current;
    const h = (e) => {
      if (tappedRef.current && el && !el.contains(e.target)) {
        tappedRef.current = false; speedRef.current = mobileSpeed; clearTimeout(tapTimer.current);
      }
    };
    document.addEventListener('touchstart', h, { passive: true });
    return () => document.removeEventListener('touchstart', h);
  }, [isMobile, continuous, mobileSpeed]);

  // ── DOTS ──────────────────────────────────────────────────────────
  const activeDot  = ((cur % len) + len) % len;
  const dotCount   = !continuous && needsScroll ? Math.max(1, len - ipv + 1) : 0;
  const activePage = activeDot % (dotCount || 1);
  const goToDot = (page) => {
    setTrans(true); setDragX(0); setCur(len + page);
    setManPaused(true); clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManPaused(false), 7000);
  };

  // ── STATIC ────────────────────────────────────────────────────────
  if (!needsScroll) {
    return (
      <div className="flex">
        {items.map((item, i) => (
          <div key={i} className="px-3 box-border"
               style={{ flex: '0 0 ' + (100 / ipv) + '%' }}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    );
  }

  // ── CONTINUOUS render ─────────────────────────────────────────────
  if (continuous) {
    return (
      <div className="relative overflow-hidden"
           onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div ref={contWrapRef} className="overflow-hidden"
             onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div ref={trackRef} className="flex will-change-transform"
               style={{ transform: 'translateX(' + (-(slotW * len)) + 'px)' }}>
            {extended.map((item, i) => (
              <div key={i} className="px-3 box-border flex-shrink-0" style={{ width: slotW + 'px' }}>
                {renderItem(item, i % len)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DISCRETE render ───────────────────────────────────────────────
  /*
   * When peek=true and mobile: peekIpv = ipv + 0.15, so each card is ~87%
   * wide and the next card is visible at the edge.
   * overflow-hidden is removed from the container so the peek shows through;
   * html overflow-x:hidden (globals.css) prevents a horizontal scrollbar.
   */
  const arrowMargin    = showArrows ? 'mx-[40px]' : '';
  const trackContainer = peek && isMobile
    ? arrowMargin                      // no overflow-hidden — let peek show
    : 'overflow-hidden ' + arrowMargin;

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="relative">
        {showArrows && (
          <button className="car-arrow car-arrow-left" onClick={goPrev} aria-label="Previous">‹</button>
        )}

        <div
          className={trackContainer}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: dragging ? 'none' : 'pan-y' }}
        >
          <div
            className="flex"
            style={{
              transform: dragX !== 0
                ? 'translateX(calc(-' + ((cur * 100) / peekIpv) + '% + ' + dragX + 'px))'
                : 'translateX(-' + ((cur * 100) / peekIpv) + '%)',
              transition: (trans && !dragging)
                ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                : 'none',
            }}
            onTransitionEnd={onTransEnd}
          >
            {extended.map((item, i) => (
              <div key={i} className="px-3 box-border"
                   style={{ width: (100 / peekIpv) + '%', flexShrink: 0 }}>
                {renderItem(item, i % len)}
              </div>
            ))}
          </div>
        </div>

        {showArrows && (
          <button className="car-arrow car-arrow-right" onClick={goNext} aria-label="Next">›</button>
        )}
      </div>

      {dotCount > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToDot(i)}
              aria-label={'Go to page ' + (i + 1)}
              className={'h-1.5 rounded-full transition-all duration-300 ' +
                (i === activePage ? 'bg-accent w-5' : 'bg-gray-700 hover:bg-gray-500 w-1.5')}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;