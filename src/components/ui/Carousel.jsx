/**
 * components/ui/Carousel.jsx
 *
 * ── CONTINUOUS  (autoPlay=true AND len > ipv) ────────────────────────────
 *   rAF infinite scroll. Hover-slow on desktop. Tap-to-slow on mobile.
 *   externalPaused prop pauses loop from parent (e.g. modal open).
 *   disableSwipe prop prevents swipe on mobile (used by StatsBar).
 *
 * ── DISCRETE  (autoPlay=false OR len <= ipv) ────────────────────────────
 *   Live drag-follow swipe → smooth snap on release.
 *   Triple-clone for seamless wrap. curRef keeps cur in sync so
 *   fast swipes never drift out of copy-B range.
 *   Native touchmove listener (passive:false) so preventDefault works.
 *   showArrows / peek / disableSwipe props.
 *
 * Props:
 *   items desktopItems tabletItems mobileItems
 *   autoPlay desktopSpeed hoverSpeed mobileSpeed tapSlowMultiplier
 *   clickable showArrows peek disableSwipe externalPaused interval
 */

import {
  useState, useEffect, useRef, useCallback, useMemo,
} from 'react';
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
  disableSwipe      = false,
  externalPaused    = false,
  interval          = 4000,
}) => {
  const ipv        = useItemsPerView(desktopItems, tabletItems, mobileItems);
  const isMobile   = useIsMobile();
  const len        = items.length;
  const needsScroll = len > ipv;
  const continuous  = autoPlay && needsScroll;

  /* peekIpv — shrinks each slot to ~87% on mobile so next card peeks */
  const peekIpv = (peek && isMobile && mobileItems === 1) ? ipv + 0.15 : ipv;

  const extended = useMemo(() => [...items, ...items, ...items], [items]);

  // ── CONTINUOUS refs ───────────────────────────────────────────────
  const contWrapRef = useRef(null);
  const trackRef    = useRef(null);
  const rafRef      = useRef(null);
  const tickRef     = useRef(null);
  const lastTsRef   = useRef(null);
  const offsetRef   = useRef(0);
  const speedRef    = useRef(desktopSpeed);
  const [slotW, setSlotW] = useState(0);

  // ── DISCRETE state + curRef ───────────────────────────────────────
  // curRef mirrors cur so touch handlers can read the latest value
  // synchronously without stale-closure issues.
  const curRef = useRef(len);
  const [cur, setCurState]    = useState(len);
  const [trans, setTrans]     = useState(true);
  const [manPaused, setManPaused] = useState(false);
  const [hovPaused, setHovPaused] = useState(false);
  const [dragX, setDragX]     = useState(0);
  const [dragging, setDragging] = useState(false);
  const resumeRef = useRef(null);
  const hoverRef  = useRef(null);

  // Wrapper that keeps curRef in sync with React state
  const setCur = useCallback((fn) => {
    setCurState(prev => {
      const next = typeof fn === 'function' ? fn(prev) : fn;
      curRef.current = next;
      return next;
    });
  }, []);

  // ── Touch refs ────────────────────────────────────────────────────
  const trackContainerRef = useRef(null); // for native touchmove listener
  const txRef     = useRef(null);
  const tyRef     = useRef(null);
  const isDragHorizRef = useRef(false); // determined after first few px
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
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, [slotW, len]);

  useEffect(() => { tickRef.current = tick; }, [tick]);

  useEffect(() => {
    if (!continuous || slotW === 0) return;
    speedRef.current = isMobile ? mobileSpeed : desktopSpeed;
    lastTsRef.current = null;
    rafRef.current = requestAnimationFrame(tickRef.current);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [continuous, slotW, isMobile, mobileSpeed, desktopSpeed, tick]);

  useEffect(() => {
    if (!continuous) return;
    if (externalPaused) {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    } else if (!rafRef.current && slotW > 0) {
      lastTsRef.current = null;
      rafRef.current = requestAnimationFrame(tickRef.current);
    }
  }, [externalPaused, continuous, slotW, tick]);

  // ── DISCRETE: reset when ipv or len changes ───────────────────────
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    if (continuous) return;
    // Synchronize curRef and state — legitimate reset on external change
    curRef.current = len;
    setTrans(false);
    setCurState(len);
    setDragX(0);
  }, [ipv, len, continuous]); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-enable transition after the silent snap
  useEffect(() => {
    if (continuous || trans) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setTrans(true))
    );
    return () => cancelAnimationFrame(id);
  }, [trans, continuous]);

  // Auto-advance
  useEffect(() => {
    if (continuous || !autoPlay || manPaused || hovPaused || !needsScroll) return;
    const t = setInterval(() => setCur(c => c + 1), interval);
    return () => clearInterval(t);
  }, [continuous, autoPlay, manPaused, hovPaused, needsScroll, interval, setCur]);

  // Snap back silently from copy-A or copy-C after CSS transition ends
  const onTransEnd = useCallback(() => {
    if (continuous) return;
    const c = curRef.current;
    if (c >= 2 * len) {
      const next = c - len;
      curRef.current = next;
      setTrans(false);
      setCurState(next);
    } else if (c < len) {
      const next = c + len;
      curRef.current = next;
      setTrans(false);
      setCurState(next);
    }
  }, [len, continuous]);

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
  }, [needsScroll, continuous, jumpOffset, setCur]);

  const goPrev = useCallback(() => {
    if (!needsScroll) return;
    if (continuous) { jumpOffset(-1); return; }
    setTrans(true); setDragX(0); setCur(c => c - 1);
    setManPaused(true); clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManPaused(false), 7000);
  }, [needsScroll, continuous, jumpOffset, setCur]);

  // ── TOUCH: start (React, passive OK) ──────────────────────────────
  const onTouchStart = useCallback((e) => {
    if (disableSwipe && isMobile) return;

    txRef.current = e.touches[0].clientX;
    tyRef.current = e.touches[0].clientY;
    isDragHorizRef.current = false; // undecided until we see movement

    if (continuous) return; // continuous handles swipe in touchEnd only

    /* Normalize cur to copy-B before starting drag.
     * Fast swipes may leave cur in copy-A/C if onTransEnd was skipped. */
    const c = curRef.current;
    if (c >= 2 * len) {
      const norm = c - len;
      curRef.current = norm;
      setCurState(norm);
    } else if (c < len) {
      const norm = c + len;
      curRef.current = norm;
      setCurState(norm);
    }

    setDragging(true);
    setTrans(false);
    setDragX(0);
  }, [disableSwipe, isMobile, continuous, len]);

  // ── TOUCH: move — attached as NATIVE listener (passive:false) ─────
  // This is registered via useEffect below so we can call preventDefault.
  const onTouchMoveNative = useCallback((e) => {
    if (disableSwipe && isMobile) return;
    if (txRef.current === null || continuous) return;

    const dx = e.touches[0].clientX - txRef.current;
    const dy = e.touches[0].clientY - tyRef.current;
    const adx = Math.abs(dx);
    const ady = Math.abs(dy);

    // Determine scroll direction on first significant movement
    if (!isDragHorizRef.current && (adx > 5 || ady > 5)) {
      if (ady > adx) {
        // Vertical scroll — release drag, allow page scroll
        txRef.current = null;
        setDragging(false);
        setTrans(true);
        setDragX(0);
        return;
      }
      isDragHorizRef.current = true;
    }

    if (isDragHorizRef.current && needsScroll) {
      e.preventDefault(); // blocks page scroll during horizontal swipe
      setDragX(dx);
    }
  }, [disableSwipe, isMobile, continuous, needsScroll]);

  // Register native touchmove listener on track container
  useEffect(() => {
    const el = trackContainerRef.current;
    if (!el || continuous) return;
    el.addEventListener('touchmove', onTouchMoveNative, { passive: false });
    return () => el.removeEventListener('touchmove', onTouchMoveNative);
  }, [onTouchMoveNative, continuous]);

  // ── TOUCH: end (React) ────────────────────────────────────────────
  const onTouchEnd = useCallback((e) => {
    if (disableSwipe && isMobile) return;
    if (txRef.current === null) return;

    const dx = e.changedTouches[0].clientX - txRef.current;
    const dy = e.changedTouches[0].clientY - tyRef.current;
    txRef.current = null;
    tyRef.current = null;
    isDragHorizRef.current = false;

    if (continuous) {
      // Continuous: swipe adjusts offset
      if (!disableSwipe && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && needsScroll) {
        if (dx > 0) goPrev(); else goNext();
      }
      // Tap-to-slow for non-clickable
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

    // Discrete: commit or cancel drag
    setDragging(false);
    setTrans(true);
    setDragX(0);

    if (isDragHorizRef.current || (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50 && needsScroll)) {
      if (Math.abs(dx) > 50) {
        setCur(c => dx > 0 ? c - 1 : c + 1);
        setManPaused(true); clearTimeout(resumeRef.current);
        resumeRef.current = setTimeout(() => setManPaused(false), 7000);
      }
    }
  }, [disableSwipe, isMobile, continuous, needsScroll, clickable,
      mobileSpeed, desktopSpeed, tapSlowMultiplier, goNext, goPrev, setCur]);

  // Resume speed on page scroll (tap-to-slow)
  useEffect(() => {
    if (!isMobile || !continuous) return;
    const h = () => {
      if (tappedRef.current) {
        tappedRef.current = false;
        speedRef.current = mobileSpeed;
        clearTimeout(tapTimer.current);
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, [isMobile, continuous, mobileSpeed]);

  // Resume speed on outside tap (tap-to-slow)
  useEffect(() => {
    if (!isMobile || !continuous) return;
    const el = contWrapRef.current;
    const h = (e) => {
      if (tappedRef.current && el && !el.contains(e.target)) {
        tappedRef.current = false;
        speedRef.current = mobileSpeed;
        clearTimeout(tapTimer.current);
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

  // ── STATIC (no scroll needed) ─────────────────────────────────────
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
             onTouchStart={onTouchStart}
             onTouchEnd={onTouchEnd}>
          <div ref={trackRef} className="flex will-change-transform"
               style={{ transform: 'translateX(' + (-(slotW * len)) + 'px)' }}>
            {extended.map((item, i) => (
              <div key={i} className="px-3 box-border flex-shrink-0"
                   style={{ width: slotW + 'px' }}>
                {renderItem(item, i % len)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── DISCRETE render ───────────────────────────────────────────────
  // When peek=true on mobile, remove overflow-hidden so the next card
  // peeks through. Page-level overflow-x:hidden (globals.css) clips it.
  const arrowMargin = showArrows ? 'mx-[40px]' : '';
  const wrapClass   = (peek && isMobile)
    ? arrowMargin
    : 'overflow-hidden ' + arrowMargin;

  const transform = dragX !== 0
    ? 'translateX(calc(-' + ((cur * 100) / peekIpv) + '% + ' + dragX + 'px))'
    : 'translateX(-' + ((cur * 100) / peekIpv) + '%)';

  const transition = (trans && !dragging)
    ? 'transform 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'none';

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="relative">
        {showArrows && (
          <button className="car-arrow car-arrow-left" onClick={goPrev} aria-label="Previous">‹</button>
        )}

        <div
          ref={trackContainerRef}
          className={wrapClass}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div
            className="flex"
            style={{ transform, transition }}
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