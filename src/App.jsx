import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ═══════════════════════════════════════════════════════════════════
   CONFIGURATION
   ═══════════════════════════════════════════════════════════════════ */
const CONFIG = {
  resumeUrl: "Priyanshu_Pushpam_Product_Manager.pdf",
  social: {
    linkedin:  "https://www.linkedin.com/in/ppushpam/",
    github:    "https://github.com/priyanshup",
    instagram: "https://www.instagram.com/mr.pushpam/",
    facebook:  "https://www.facebook.com/priyanshup",
  },
};

/*
 * How many cards to show inline before the "View All" button appears.
 * Applies to Projects and Case Studies.
 */
const VIEW_MORE_THRESHOLD = 4;

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL STYLES
   ═══════════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    .font-display { font-family: 'Syne', sans-serif !important; }
    .font-mono-pp { font-family: 'IBM Plex Mono', monospace !important; }
    html, body     { font-family: 'DM Sans', sans-serif; overflow-x: hidden; }

    /* ── Scroll-reveal ── */
    .reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.75s cubic-bezier(0.16,1,0.3,1),
                  transform 0.75s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.in-view { opacity: 1; transform: none; }
    .d1{transition-delay:.10s} .d2{transition-delay:.20s}
    .d3{transition-delay:.30s} .d4{transition-delay:.40s}

    /* ── Timeline vertical line ── */
    .tl-line::before {
      content: ''; position: absolute;
      left: 27px; top: 56px; bottom: 0; width: 1px;
      background: linear-gradient(to bottom, rgba(255,255,255,.10), rgba(255,255,255,.04) 80%, transparent);
    }

    /* ── Case study locked overlay ── */
    .cs-locked { position: relative; overflow: hidden; }
    .cs-locked-overlay {
      position: absolute; inset: 0;
      background: rgba(10,10,10,.80); backdrop-filter: blur(4px);
      border-radius: inherit; z-index: 2;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 8px;
    }

    /* ── Nav underline ── */
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -2px; left: 0;
      width: 0; height: 1px; background: currentColor; transition: width .25s ease;
    }
    .nav-link:hover::after { width: 100%; }

    /* ── Scrollbar ── */
    .scroll-section { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.10) transparent; }
    .scroll-section::-webkit-scrollbar { width: 5px; }
    .scroll-section::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px; }

    /* ── Accordion ── */
    .accordion-body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .38s cubic-bezier(0.16,1,0.3,1); }
    .accordion-body.open { grid-template-rows: 1fr; }
    .accordion-inner { overflow: hidden; }

    /* ── Modals (testimonial + view-more) ── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 100;
      background: rgba(0,0,0,.80); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center; padding: 24px;
      animation: fadeIn .2s ease;
    }
    .modal-card { animation: scaleIn .25s cubic-bezier(0.16,1,0.3,1); }
    @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
    @keyframes scaleIn { from{opacity:0;transform:scale(.94)} to{opacity:1;transform:scale(1)} }

    /*
     * ── CAROUSEL ARROWS ──
     * White-shade gradient (fix #3): replaces the black/dark overlay
     * with a subtle white frosted-glass fade so it reads cleanly on dark cards.
     * Full-height (fix #3): top:0 bottom:0 makes the entire edge clickable.
     */
    .car-arrow {
      position: absolute; top: 0; bottom: 0; z-index: 10; width: 44px;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.6rem; font-weight: 700;
      color: rgba(255,255,255,0.50);
      cursor: pointer; border: none; background: transparent;
      transition: color .2s, background .2s;
      user-select: none;
    }
    .car-arrow:hover { color: rgba(255,255,255,0.95); }
    .car-arrow-left  {
      left: 0;
      background: linear-gradient(to right, rgba(255,255,255,0.07) 0%, transparent 100%);
      border-radius: 1rem 0 0 1rem;
    }
    .car-arrow-right {
      right: 0;
      background: linear-gradient(to left, rgba(255,255,255,0.07) 0%, transparent 100%);
      border-radius: 0 1rem 1rem 0;
    }

    /* ── Mobile menu slide-in ── */
    .mobile-menu {
      position: fixed; inset: 0; z-index: 200;
      background: rgba(0,0,0,0.96);
      display: flex; flex-direction: column;
      padding: 0;
      transform: translateX(100%);
      transition: transform .35s cubic-bezier(0.16,1,0.3,1);
    }
    .mobile-menu.open { transform: translateX(0); }

    /* ── Scroll-to-top button ── */
    .scroll-top-btn {
      position: fixed; bottom: 28px; right: 24px; z-index: 90;
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.70);
      cursor: pointer; transition: all .25s ease;
      opacity: 0; pointer-events: none;
    }
    .scroll-top-btn.visible { opacity: 1; pointer-events: all; }
    .scroll-top-btn:hover { background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.25); transform: translateY(-2px); }
  ` }} />
);

/* ═══════════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════════ */

/*
 * useScrollReveal with MutationObserver (fix #6):
 * Watches for newly added .reveal elements (from conditional rendering
 * switching between carousel/grid) and observes them immediately,
 * preventing the "disappearing content on resize" bug.
 */
const useScrollReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.08 }
    );

    const observeEl = (el) => {
      if (el.classList?.contains('reveal') && !el.classList.contains('in-view')) obs.observe(el);
    };

    /* Observe all currently in DOM */
    document.querySelectorAll('.reveal').forEach(observeEl);

    /* Watch for dynamically added elements (layout switching) */
    const mutObs = new MutationObserver(mutations => {
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          observeEl(node);
          node.querySelectorAll?.('.reveal').forEach(observeEl);
        });
      });
    });
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => { obs.disconnect(); mutObs.disconnect(); };
  }, []);
};

const useItemsPerView = (desktop, tablet, mobile) => {
  const get = useCallback(() => {
    if (typeof window === 'undefined') return desktop;
    if (window.innerWidth < 640)  return mobile;
    if (window.innerWidth < 1024) return tablet;
    return desktop;
  }, [desktop, tablet, mobile]);
  const [ipv, setIpv] = useState(get);
  useEffect(() => {
    const h = () => setIpv(get());
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, [get]);
  return ipv;
};

const useIsMobile = () => {
  const [m, setM] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
};

/* ═══════════════════════════════════════════════════════════════════
   CAROUSEL
   ─────────────────────────────────────────────────────────────────
   Fix #3: White-shade arrows (via .car-arrow-left/right CSS above)
   Fix #4a: Touch swipe — tracks touchStartX, on touchEnd if |dx|>50
             and horizontal movement dominates, navigate in that direction.
   Fix #4b: Desktop hover pause — onMouseEnter pauses, onMouseLeave
             schedules resume after 30 seconds.
   Infinite wrap: triple-clone ensures the animation always continues
   in the clicked direction (never reverses).
   ═══════════════════════════════════════════════════════════════════ */
const Carousel = ({
  items, renderItem,
  desktopItems = 3, tabletItems = 2, mobileItems = 1,
  autoPlay = true, interval = 4000,
}) => {
  const ipv        = useItemsPerView(desktopItems, tabletItems, mobileItems);
  const len        = items.length;
  const needsScroll = len > ipv;
  const extended    = useMemo(() => [...items, ...items, ...items], [items]);

  const [cur, setCur]           = useState(len);
  const [transOn, setTransOn]   = useState(true);
  const [manualPaused, setManualPaused] = useState(false);
  const [hoverPaused, setHoverPaused]   = useState(false);
  const paused    = manualPaused || hoverPaused;
  const resumeRef = useRef(null);
  const hoverRef  = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    setTransOn(false);
    setCur(len);
  }, [ipv, len]);

  useEffect(() => {
    if (!transOn) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setTransOn(true)));
      return () => cancelAnimationFrame(id);
    }
  }, [transOn]);

  useEffect(() => {
    if (!autoPlay || !needsScroll || paused) return;
    const t = setInterval(() => setCur(c => c + 1), interval);
    return () => clearInterval(t);
  }, [autoPlay, needsScroll, paused, interval]);

  const handleTransitionEnd = useCallback(() => {
    if (!needsScroll) return;
    if (cur >= 2 * len) { setTransOn(false); setCur(c => c - len); }
    else if (cur < len)  { setTransOn(false); setCur(c => c + len); }
  }, [cur, len, needsScroll]);

  const go = useCallback((dir) => {
    if (!needsScroll) return;
    setTransOn(true);
    setCur(c => c + dir);
    setManualPaused(true);
    clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => setManualPaused(false), 7000);
  }, [needsScroll]);

  /* Desktop: pause on hover, resume 30s after mouse leaves */
  const onMouseEnter = () => {
    clearTimeout(hoverRef.current);
    setHoverPaused(true);
  };
  const onMouseLeave = () => {
    hoverRef.current = setTimeout(() => setHoverPaused(false), 30000);
  };

  /* Mobile: swipe */
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
        {needsScroll && <button className="car-arrow car-arrow-left"  onClick={() => go(-1)} aria-label="Previous">‹</button>}

        <div
          className={`overflow-hidden ${needsScroll ? 'mx-[44px]' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${(cur * 100) / ipv}%)`,
              transition: transOn ? 'transform .5s ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extended.map((item, i) => (
              <div key={i} style={{ width: `${100 / ipv}%`, flexShrink: 0 }} className="px-3 box-border">
                {renderItem(item, i % len)}
              </div>
            ))}
          </div>
        </div>

        {needsScroll && <button className="car-arrow car-arrow-right" onClick={() => go(1)}  aria-label="Next">›</button>}
      </div>

      {dotCount > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button key={i} onClick={() => goToDot(i)} aria-label={`Go to page ${i+1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activePage ? 'bg-accent w-5' : 'bg-gray-700 hover:bg-gray-500 w-1.5'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   VIEW MORE MODAL (fix #2)
   Shows all cards in a scrollable overlay grid.
   ═══════════════════════════════════════════════════════════════════ */
const ViewMoreModal = ({ title, eyebrow, items, renderItem, onClose }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', h);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-card relative w-full max-w-4xl flex flex-col rounded-3xl bg-cardBg border border-gray-700 shadow-2xl"
        style={{ maxHeight: '88vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-800 flex-shrink-0">
          <div>
            <p className="font-mono-pp text-accent text-[10px] uppercase tracking-[0.3em] mb-1">{eyebrow}</p>
            <h3 className="font-display text-2xl font-bold text-white">{title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="text-gray-500 hover:text-white transition-colors p-1 flex-shrink-0 mt-1">
            <CloseIcon />
          </button>
        </div>
        {/* Scrollable grid */}
        <div className="overflow-y-auto scroll-section p-6">
          <div className="grid sm:grid-cols-2 gap-5">
            {items.map((item, i) => (
              <div key={i}>{renderItem(item, i)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════════ */
const LI       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const GH       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>;
const IG       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;
const FB       = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const DL       = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>;
const LockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-400"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
const ChevDown = ({ open }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-4 h-4 text-gray-400 transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-180' : ''}`}><path d="M19 9l-7 7-7-7"/></svg>;
const CloseIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const ExtLink  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 inline ml-1"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const MenuIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><line x1="3" y1="6"  x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
const ArrowUp  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4"><path d="M12 19V5M5 12l7-7 7 7"/></svg>;

/* Brand logo — references logo.png from your repo's public/ folder */
const BrandLogo = ({ className = "h-8 w-8" }) => (
  <img src="logo.png" alt="Priyanshu Pushpam" className={`${className} object-contain`} />
);

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */
const stats = [
  { val:"10+",  label:"Years Exp" },
  { val:"200%", label:"Rev Growth" },
  { val:"90K+", label:"SKUs Scaled" },
  { val:"50+",  label:"Eng Leaders" },
  { val:"25K+", label:"Platform DAU" },
  { val:"5",    label:"Global Markets" },
];

const timeline = [
  { year:"2016", role:"Software Engineer",                        company:"UnitedHealth Group", note:"Built the technical foundation — Java, SQL, Shell scripting for high-availability healthcare systems. Automated 92% of manual ops and cleared 900+ ticket backlogs.", type:"eng" },
  { year:"2019", role:"Sr. Business Systems Analyst — Healthcare", company:"UnitedHealth Group", note:"The deliberate pivot: from writing code to owning business outcomes. Bridged engineering teams and business stakeholders across 4 enterprise transformation programmes.", type:"pivot" },
  { year:"2022", role:"Product Owner — Sportsbook",               company:"Techmojo Solutions",  note:"Stepped into full product leadership — 50+ engineers, 5 scrum teams, 5 global markets. Drove 200% revenue growth within 3 months of MVP.", type:"po" },
  { year:"2024", role:"Product Owner — E-commerce",               company:"VidaXL",              note:"Leading AI-driven content automation at scale. 90K+ SKUs across 12 global markets. OpenAI on GCP delivering a 7% conversion lift in 30 days.", type:"current" },
];

const typeStyle = {
  eng:     { badge:"text-blue-400 border-blue-400/30 bg-blue-400/10",       label:"Engineer" },
  pivot:   { badge:"text-yellow-400 border-yellow-400/30 bg-yellow-400/10", label:"Career Pivot" },
  po:      { badge:"text-accent border-accent/30 bg-accent/10",             label:"Product Owner" },
  current: { badge:"text-green-400 border-green-400/30 bg-green-400/10",    label:"Current" },
};

const experience = [
  {
    period:"Sep 2024", periodEnd:"Present", role:"Product Owner", domain:"E-commerce Platform",
    company:"VidaXL", location:"Hyderabad, India", current:true,
    bullets:[
      "Achieved 7% conversion lift across all SKUs within 30 days by integrating OpenAI-driven multilingual content generation.",
      "Reduced monthly operational costs by 23% by automating manual localization workflows, saving 60+ manual hours per week.",
      "Engineered real-time KPI dashboards on GCP, increasing leadership decision-making speed by 35% through automated data visibility.",
      "Optimized digital asset management, reducing cloud storage costs by 21% through centralizing asset retrieval and metadata protocols.",
    ],
    tags:["GCP","OpenAI","Python","Productsup","Salsify"],
  },
  {
    period:"Mar 2022", periodEnd:"Aug 2024", role:"Product Owner", domain:"Sportsbook & Gaming",
    company:"Techmojo Solutions", location:"Hyderabad, India", current:false,
    bullets:[
      "Drove 200% revenue growth within 3 months post-MVP by executing a multi-country GTM strategy across UK, Germany, Spain, Japan, and Turkey.",
      "Led 5 Scrum teams (50+ members) and 2 Business Analysts, synchronising roadmap priorities and technical grooming for complex betting logic.",
      "Improved system performance by 30% by leveraging AWS CloudWatch logs to identify bottlenecks and architecting API optimisations.",
      "Reduced time-to-market by 20% by implementing a RICE-based framework that aligned technical debt with growth features.",
    ],
    tags:["AWS","Java Microservices","Redis","React","RICE"],
  },
  {
    period:"Jun 2019", periodEnd:"Mar 2022", role:"Sr. Business Systems Analyst", domain:"Healthcare",
    company:"UnitedHealth Group", location:"Hyderabad, India", current:false,
    bullets:[
      "Delivered 25% improvement in operational efficiency by managing 4 enterprise transformation initiatives.",
      "Accelerated payment cycles by 20% and reduced manual errors by 10% through end-to-end automation of claims processing.",
      "Slashed QA cycles by 30% by building a mock-data automation product, enabling significantly faster pre-release validation.",
    ],
    tags:["SQL","Shell","Java","JIRA","Healthcare"],
  },
  {
    period:"Jul 2016", periodEnd:"Jun 2019", role:"Software Engineer", domain:"Healthcare",
    company:"UnitedHealth Group", location:"Hyderabad, India", current:false,
    bullets:[
      "Automated 92% of manual workload for account creation, resolving a backlog of 900+ tickets in 4 weeks.",
      "Engineered 25+ SQL and Shell scripts to replace manual daily tasks, enhancing platform reliability and incident response speed.",
    ],
    tags:["Java","SQL","Shell","CRON"],
  },
];

const dnaItems = [
  { icon:"⚙️", title:"Engineering Roots",    desc:"3 years as a Software Engineer — Java, SQL, and Shell for high-availability healthcare systems. This foundation makes every architecture discussion and technical trade-off meaningfully different." },
  { icon:"📈", title:"Product Strategy",      desc:"CSPO-certified. Led multi-team (50+) engineering organisations. Expert in RICE, Kano, OKRs, P&L management, GTM strategy, and bridging the gap between business goals and technical execution." },
  { icon:"🤖", title:"AI & Scale",            desc:"Leveraging LLMs, GCP, and cloud-native architectures to automate at scale — from 90K+ SKU publication engines to healthcare claims processing for millions of patients." },
  { icon:"📊", title:"Data-Driven Decisions", desc:"GA4-certified. Deep expertise in Tableau, Power BI, SQL analytics, A/B testing, and funnel optimisation. KPI dashboards I've built have reduced leadership decision cycles by 35%." },
];

const projects = [
  { title:"Global Product Publication Automation", company:"VidaXL", domain:"E-commerce · AI · GCP",
    problem:"Manually managing product content for 90K+ SKUs across 12 languages was costing 60+ hours per week with inconsistent quality and missed market deadlines.",
    outcomes:["7% conversion lift in 30 days","23% cost reduction","60+ hrs/week saved"],
    stack:["GCP","OpenAI","Python","Productsup","Salsify"] },
  { title:"White-Label Sportsbook Platform", company:"Techmojo Solutions", domain:"SaaS · Gaming · AWS",
    problem:"Building a zero-to-one white-label sportsbook capable of supporting high-concurrency global launches across multiple regulatory environments simultaneously.",
    outcomes:["200% revenue growth post-MVP","30% system performance boost","5-country simultaneous launch"],
    stack:["AWS","Java Microservices","Redis","React"] },
  { title:"Healthcare Claims & Member Onboarding", company:"UnitedHealth Group", domain:"Healthcare · Enterprise",
    problem:"Legacy manual processes for healthcare claims were causing a 900+ ticket backlog, delayed payment cycles, and high error rates in member onboarding.",
    outcomes:["900+ tickets cleared in 4 weeks","20% faster payment cycles","10% error reduction"],
    stack:["SQL","Shell","Java","837 Standards"] },
  { title:"Script Execution Automation Tool", company:"UnitedHealth Group", domain:"Internal Tooling · DevOps",
    problem:"Engineers were spending 40% of their time manually running complex database scripts with no centralised logging, scheduling, or error handling.",
    outcomes:["92% of manual ops automated","40% engineering bandwidth reclaimed","Zero execution errors"],
    stack:["SQL","Shell","CRON","Java"] },
];

const caseStudies = [
  { title:"Scaling to Zero: How AI Replaced 60 Hours of Weekly Manual Work", company:"VidaXL · E-commerce",
    teaser:"A deep dive into how I designed and shipped an AI-powered content automation engine for 90K+ SKUs across 12 global markets — from stakeholder discovery to 7% conversion lift in 30 days.",
    tags:["AI Strategy","Product Discovery","OKRs","GCP"] },
  { title:"From MVP to 200%: The GTM Playbook for a Global Sportsbook", company:"Techmojo · Gaming",
    teaser:"How I coordinated 50+ engineers across 5 countries, navigated multi-regulatory complexity, and drove 200% revenue growth within 3 months of the first launch.",
    tags:["GTM Strategy","Multi-team Execution","Roadmap","AWS"] },
];

const testimonials = [
  { text:"I had the pleasure of working with Priyanshu Pushpam when he was a developer, and he was exceptional in that role. His technical skills, innovative solutions, and collaborative spirit made a significant impact on our projects. Now, as a Product Owner, I am confident that Priyanshu continues to excel. His ability of understanding business requirements, his own wonderful technical hand, combined with his dedication to continuous learning, ensures he is a wonderful product owner. I wholeheartedly recommend Priyanshu for any professional opportunity.", name:"Anup Mittal", title:"Solutions Architect", company:"UnitedHealth Group", relation:"Managed Priyanshu directly" },
  { text:"I had the privilege of working with Priyanshu on the Sportsbook product for Pragmatic Play, a highly complex and fast-paced initiative that demanded clarity, agility, and precision. From the outset, Priyanshu brought an exceptional level of ownership and product thinking that elevated the entire project. As a Product Owner, Priyanshu consistently demonstrated a rare balance of strategic foresight and operational excellence. Their ability to translate evolving business goals into a well-structured product backlog ensured that both technical teams and stakeholders were aligned at every step. Their user stories weren't just tasks, they reflected deep customer empathy and a sharp focus on business value. What truly set Priyanshu apart was their communication style clear, calm, and compelling. Whether aligning stakeholders on shifting priorities, presenting roadmaps to leadership, or navigating last-minute scope changes, he did so with remarkable composure and professionalism. His presence fostered trust and collaboration across teams, and they always ensured that every voice was heard. Priyanshu's soft skills are just as commendable as their technical capabilities. They're approachable, emotionally intelligent, and naturally inclusive, a team player who uplifts others while driving the product forward with purpose. During high-pressure milestones, Priyanshu remained a steady force, making smart trade-offs and rallying the team with confidence and clarity. The Sportsbook project benefitted immensely from Priyanshu's contributions — and so did everyone who worked alongside them. I would highly recommend Priyanshu to any organization seeking a strong, thoughtful, and skilled Product Owner who can lead Product and Team by putting his heart into it.", name:"Vivek Rao Peachara", title:"Project Manager", company:"Techmojo Solutions", relation:"Worked with Priyanshu at Techmojo" },
  { text:"I had the pleasure of working with Priyanshu in our previous company Techmojo Solutions Pvt Ltd where he served as a business analyst and was reporting to me. I must say that, not only as a business analyst, Priyanshu has proven his capabilities in any area he focused on. He has shown tremendous efforts and capabilities in client management, requirement gathering and bridging the gap between client and our team. He understands the domain and technology both which ensured that the team and clients are aligned. I would recommend every organisation to give him the opportunity that he deserves.", name:"Tanushi Gupta", title:"Development Lead", company:"Techmojo Solutions", relation:"Managed Priyanshu directly" },
  { text:"I have worked with Priyanshu. He is very dedicated and motivated in work and always likes to take challenges in project. He has sound technical knowledge, project management skills and a proven resource who deliver work with high quality. Definitely a person many want to work with. I recommend him for a Product owner role.", name:"Uma Shankar Pandey", title:"Product Owner", company:"Pragmatic Play", relation:"Cross-Functional Collaborator" },
  { text:"It was a pleasure working with Priyanshu for the 1 year. As a product owner, he did demonstrated exceptional leadership, clear vision, and a strong ability to align stakeholders toward common goals. He excelled at prioritizing tasks, ensuring our team delivered high-quality outcomes on time while fostering a collaborative and inclusive environment. Priyanshu consistently brought strategic insight, adaptability, and a customer-focused approach to our projects, making a significant impact on our success. I highly recommend him for any role requiring innovative product leadership and effective team coordination. He takes complete responsibility of the product and extends any sort of support if needed. As Scrum Master when I reach out to him with unrealistic time lines, he does address them with proper justification and manages stakeholders on the other hand.", name:"Ganesh Aradi", title:"Scrum Master", company:"Techmojo Solutions", relation:"Worked with Priyanshu at Techmojo" },
];

const certifications = [
  { short:"CSPO®", full:"Certified Scrum Product Owner",  issuer:"Scrum Alliance",     year:"2024", link:"https://bcert.me/bc/html/show-badge.html?b=aedlnhiv" },
  { short:"GA4",   full:"Google Analytics Certification", issuer:"Google",             year:"2025", link:"https://skillshop.credential.net/4c74613d-1a20-46b0-aaf0-688983f4d215#acc.9zRFUDa2" },
  { short:"PSC",   full:"Product Strategy Micro-Cert",    issuer:"Product School",     year:"2023", link:"https://drive.google.com/file/d/1v9jwv1dw-qcASLFkFSQjKCkH-ZIFIb9h/view" },
  { short:"PUE",   full:"Productsup Platform Expert",     issuer:"Productsup Academy", year:"2025", link:"https://drive.google.com/file/d/1_eEZj8wxyT15kKNDj9FUec5f_ncAMmwU/view" },
];

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIAL MODAL (fix #5 — max-height + internal scroll)
   ═══════════════════════════════════════════════════════════════════ */
const TestimonialModal = ({ t, onClose }) => {
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card relative w-full max-w-lg flex flex-col rounded-3xl bg-cardBg border border-gray-600 shadow-2xl"
        style={{ maxHeight: '82vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <p className="text-4xl text-gray-600 font-serif leading-none select-none">"</p>
          <button onClick={onClose} aria-label="Close" className="text-gray-500 hover:text-white transition-colors"><CloseIcon /></button>
        </div>
        {/* Scrollable body */}
        <div className="overflow-y-auto scroll-section px-8 pb-4 flex-1">
          <p className="text-gray-200 text-base leading-relaxed">{t.text}</p>
        </div>
        {/* Fixed footer */}
        <div className="border-t border-gray-700 px-8 py-5 flex-shrink-0">
          <p className="text-white font-bold">{t.name}</p>
          <p className="text-gray-400 text-sm mt-1">{t.title} · {t.company}</p>
          <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-widest mt-1">{t.relation}</p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   MOBILE MENU (fix #9)
   Full-screen overlay slide-in from right.
   Logo + Resume stay always visible in nav; this adds section nav + socials.
   ═══════════════════════════════════════════════════════════════════ */
const MobileMenu = ({ open, onClose }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    ['#about',        'About'],
    ['#journey',      'Journey'],
    ['#experience',   'Experience'],
    ['#projects',     'Projects'],
    ['#case-studies', 'Case Studies'],
    ['#testimonials', 'Testimonials'],
  ];

  const socials = [
    { href: CONFIG.social.linkedin,  Icon: LI, label: "LinkedIn" },
    { href: CONFIG.social.github,    Icon: GH, label: "GitHub" },
    { href: CONFIG.social.instagram, Icon: IG, label: "Instagram" },
    { href: CONFIG.social.facebook,  Icon: FB, label: "Facebook" },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-[199] bg-black/40" onClick={onClose} />}

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {/* Top bar inside menu */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 flex-shrink-0">
          <BrandLogo className="h-8 w-8" />
          <button onClick={onClose} aria-label="Close menu" className="text-gray-400 hover:text-white transition-colors p-1">
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={onClose}
              className="font-display text-4xl font-bold text-gray-500 hover:text-white transition-colors py-3 border-b border-gray-900 last:border-0"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Social icons + resume at bottom */}
        <div className="px-8 py-8 border-t border-gray-800 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-5">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                className="text-gray-500 hover:text-white transition-colors">
                <Icon />
              </a>
            ))}
          </div>
          <a href={CONFIG.resumeUrl} download
            className="flex items-center gap-2 justify-center w-full text-sm border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-darkBg transition-all font-bold uppercase tracking-widest font-mono-pp">
            <DL /> Download Resume
          </a>
        </div>
      </div>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SCROLL TO TOP (fix #8)
   ═══════════════════════════════════════════════════════════════════ */
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
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

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER
   ═══════════════════════════════════════════════════════════════════ */
const SectionHeader = ({ eyebrow, title, subtitle, center=false }) => (
  <div className={`mb-10 ${center ? 'text-center' : ''}`}>
    <div className="reveal">
      <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em] mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-bold">{title}</h2>
    </div>
    {subtitle && (
      <div className="reveal d1 mt-3">
        <p className={`text-gray-400 text-sm leading-relaxed max-w-xl ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
      </div>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   NAV (fix #9 — hamburger on mobile; logo always visible)
   ═══════════════════════════════════════════════════════════════════ */
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          {/* Brand logo — always visible */}
          <a href="#about" className="flex-shrink-0">
            <BrandLogo className="h-9 w-9" />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex space-x-7 text-sm font-medium text-gray-400">
            {[['#about','About'],['#journey','Journey'],['#experience','Experience'],['#projects','Projects'],['#case-studies','Case Studies']].map(([href,label]) => (
              <a key={href} href={href} className="nav-link hover:text-white transition-colors">{label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Social icons — desktop only */}
            <div className="hidden md:flex items-center gap-3 text-gray-500">
              <a href={CONFIG.social.linkedin}  target="_blank" rel="noopener" aria-label="LinkedIn"  className="hover:text-white transition-colors"><LI /></a>
              <a href={CONFIG.social.github}    target="_blank" rel="noopener" aria-label="GitHub"    className="hover:text-white transition-colors"><GH /></a>
              <a href={CONFIG.social.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-white transition-colors"><IG /></a>
              <a href={CONFIG.social.facebook}  target="_blank" rel="noopener" aria-label="Facebook"  className="hover:text-white transition-colors"><FB /></a>
            </div>

            {/* Resume — always visible */}
            <a href={CONFIG.resumeUrl} download
              className="flex items-center gap-2 text-xs border border-accent text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-darkBg transition-all font-bold uppercase tracking-widest font-mono-pp whitespace-nowrap">
              <DL /> Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   HERO
   Fix #1: image div changes from justify-end to justify-center so the
   text+image pair is visually centred as a balanced unit.
   ═══════════════════════════════════════════════════════════════════ */
const Hero = () => (
  <header id="about" className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
    <div className="flex-1 space-y-6 md:space-y-8 text-left w-full">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono-pp">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
        </span>
        Available for Strategic Technical Roles
      </div>

      <h1
        className="font-display font-extrabold tracking-tighter leading-[0.95]"
        style={{ fontSize: 'min(9vw, 7rem)' }}
      >
        PRIYANSHU<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">PUSHPAM</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl border-l-2 border-gray-800 pl-6">
        A Technical Product Leader with 10 years of experience. I bridge the gap between C-suite strategy
        and high-concurrency engineering — scaling platforms from zero to global.
      </p>

      <div className="flex flex-wrap gap-3">
        {['CSPO®','Google GA4','Productsup Expert','Ex-Software Engineer'].map(tag => (
          <span key={tag} className="px-3 py-1 bg-cardBg border border-gray-800 rounded text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono-pp">{tag}</span>
        ))}
      </div>

      <div className="pt-2 flex flex-wrap gap-4">
        <a href="#projects" className="bg-white text-darkBg px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-darkBg transition-all duration-300">View My Work</a>
        <a href="#journey"  className="border border-gray-700 text-gray-300 px-8 py-4 rounded-full font-bold hover:border-gray-500 hover:text-white transition-all duration-300">My Journey</a>
      </div>
    </div>

    {/* Image — justify-center (was md:justify-end) */}
    <div className="flex-1 flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96">
          <div className="absolute inset-0 border border-gray-800 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
          <div className="absolute inset-0 border border-accent/30 rounded-2xl -rotate-3 group-hover:-rotate-12 transition-transform duration-500"></div>
          <div className="relative w-full h-full bg-cardBg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <img
              src="me.jpg"
              alt="Priyanshu Pushpam"
              className="w-full h-full object-cover object-top transition duration-700 scale-105 group-hover:scale-100 md:grayscale md:group-hover:grayscale-0"
              onError={(e) => { e.target.src="https://via.placeholder.com/400x500?text=Profile+Photo"; }}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

/* ═══════════════════════════════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════════════════════════════ */
const StatsBar = () => (
  <section className="border-y border-gray-900 bg-cardBg/10 py-10 px-6">
    <div className="max-w-5xl mx-auto">
      <Carousel items={stats} desktopItems={4} tabletItems={3} mobileItems={2} autoPlay={stats.length > 4} interval={3500}
        renderItem={(s) => (
          <div className="text-center py-2 px-4">
            <h3 className="font-display text-3xl font-bold text-accent">{s.val}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-mono-pp">{s.label}</p>
          </div>
        )}
      />
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════
   CAREER JOURNEY
   ═══════════════════════════════════════════════════════════════════ */
const CareerJourney = () => (
  <section id="journey" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
    <SectionHeader eyebrow="The Arc" title="Engineer → Analyst → Product Leader"
      subtitle="A decade of deliberate evolution. Every role built on the last — the engineering foundation is what makes the product thinking different."
    />
    <div className="tl-line relative space-y-5 mt-14">
      {timeline.map((item, i) => {
        const { badge, label } = typeStyle[item.type];
        return (
          <div key={i} className={`reveal d${Math.min(i+1,4)} flex gap-5 items-start`}>
            <div className={`flex-shrink-0 w-14 h-14 rounded-full border-2 flex items-center justify-center z-10 ${badge}`}>
              <span className="font-mono-pp text-[10px] font-bold">{item.year}</span>
            </div>
            <div className="flex-1 p-6 rounded-2xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-white">{item.role}</h3>
                  <p className="text-gray-400 text-sm">{item.company}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border font-mono-pp flex-shrink-0 ${badge}`}>{label}</span>
              </div>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════
   WORK EXPERIENCE
   ═══════════════════════════════════════════════════════════════════ */
const WorkExperience = () => {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader eyebrow="Track Record" title="Work Experience"
        subtitle="10 years. 4 roles. Healthcare, gaming, and e-commerce — each one building on the last."
      />
      <div className="space-y-3">
        {experience.map((job, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={`reveal d${Math.min(i+1,4)}`}>
              <div className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${isOpen ? 'border-gray-600 bg-cardBg' : 'border-gray-800 bg-cardBg/40 hover:border-gray-700'}`}>
                <button onClick={() => setOpen(i)} className="w-full text-left p-6 md:p-8 flex flex-wrap md:flex-nowrap items-start md:items-center justify-between gap-4">
                  <div className="flex gap-6 items-center flex-1 min-w-0">
                    <div className="hidden md:flex flex-col items-center gap-1 flex-shrink-0 w-20">
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.period}</p>
                      <div className="w-px h-3 bg-gray-700"></div>
                      <p className="font-mono-pp text-[10px] text-gray-400 text-center">{job.periodEnd}</p>
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1">{job.domain}</p>
                      <h3 className="font-display font-bold text-xl text-white">{job.role}</h3>
                      <p className="text-gray-400 text-sm">{job.company} · {job.location}</p>
                      <p className="md:hidden font-mono-pp text-[10px] text-gray-400 mt-1">{job.period} — {job.periodEnd}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {job.current && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-green-400/30 text-green-400 bg-green-400/10 font-mono-pp">Current</span>}
                    <ChevDown open={isOpen} />
                  </div>
                </button>
                <div className={`accordion-body ${isOpen ? 'open' : ''}`}>
                  <div className="accordion-inner">
                    <div className="px-6 md:px-8 pb-8 border-t border-gray-800/60 pt-6">
                      <ul className="space-y-3">
                        {job.bullets.map((b, j) => (
                          <li key={j} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                            <span className="text-accent mt-0.5 flex-shrink-0">▸</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-6">
                        {job.tags.map(t => (
                          <span key={t} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   CORE DNA
   ═══════════════════════════════════════════════════════════════════ */
const CoreDNA = () => (
  <section className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
    <SectionHeader eyebrow="What I Bring" title="Core DNA" center
      subtitle="Three domains, one throughline: understanding systems deeply enough to make the right product calls."
    />
    <div className="reveal">
      <Carousel items={dnaItems} desktopItems={3} tabletItems={2} mobileItems={1} autoPlay interval={5000}
        renderItem={(item) => (
          <div className="h-full p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors flex flex-col gap-4 min-h-56">
            <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl">{item.icon}</div>
            <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed flex-1">{item.desc}</p>
          </div>
        )}
      />
    </div>
  </section>
);

/* ═══════════════════════════════════════════════════════════════════
   PROJECT CARD
   Fix #7: mobile-compact — responsive padding and tighter gaps
   ═══════════════════════════════════════════════════════════════════ */
const ProjectCard = ({ p }) => (
  <div className="h-full p-5 sm:p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-gray-600 transition-colors flex flex-col gap-3 sm:gap-5">
    <div>
      <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mb-1 sm:mb-2">{p.domain}</p>
      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{p.title}</h3>
      <p className="text-gray-400 text-xs mt-1 font-mono-pp">{p.company}</p>
    </div>
    <div className="border-t border-gray-800 pt-3 sm:pt-5">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-1 sm:mb-2">Problem</p>
      <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{p.problem}</p>
    </div>
    <div className="border-t border-gray-800 pt-3 sm:pt-5">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-gray-400 mb-2">Outcomes</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {p.outcomes.map(o => <span key={o} className="text-xs font-bold px-2 sm:px-3 py-1 rounded-full border border-accent/30 text-accent bg-accent/10">{o}</span>)}
      </div>
    </div>
    <div className="mt-auto pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2">
      {p.stack.map(s => <span key={s} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400">{s}</span>)}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   PROJECTS
   Fix #2: Desktop shows first VIEW_MORE_THRESHOLD cards in a static grid.
   If there are more, a "View All (N)" button opens a ViewMoreModal.
   Mobile: swipe carousel (unchanged).
   ═══════════════════════════════════════════════════════════════════ */
const Projects = () => {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const visible = projects.slice(0, VIEW_MORE_THRESHOLD);
  const hasMore = projects.length > VIEW_MORE_THRESHOLD;

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader eyebrow="Shipped Work" title="Key Projects"
        subtitle="All work done under NDA — no links, no screenshots. What's here: the problem, the approach, and the measurable outcome."
      />

      {showAll && (
        <ViewMoreModal
          title="Key Projects"
          eyebrow="All Shipped Work"
          items={projects}
          renderItem={(p) => <ProjectCard p={p} />}
          onClose={() => setShowAll(false)}
        />
      )}

      <div className="reveal">
        {isMobile ? (
          <Carousel items={projects} desktopItems={1} tabletItems={1} mobileItems={1} autoPlay={false}
            renderItem={(p) => <ProjectCard p={p} />}
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((p, i) => <ProjectCard key={i} p={p} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs border border-gray-700 text-gray-400 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all uppercase tracking-widest"
                >
                  View All Projects ({projects.length}) ↗
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   CASE STUDY CARD
   ═══════════════════════════════════════════════════════════════════ */
const CaseStudyCard = ({ cs }) => (
  <div className="cs-locked rounded-3xl bg-cardBg border border-gray-800 h-full">
    <div className="p-5 sm:p-8 space-y-3 sm:space-y-4">
      <p className="font-mono-pp text-[10px] uppercase tracking-widest text-accent">{cs.company}</p>
      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">{cs.title}</h3>
      <p className="text-gray-400 text-sm leading-snug sm:leading-relaxed">{cs.teaser}</p>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
        {cs.tags.map(t => <span key={t} className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-900 border border-gray-800 text-gray-400">{t}</span>)}
      </div>
    </div>
    <div className="cs-locked-overlay"><LockIcon /><span className="font-mono-pp text-xs uppercase tracking-widest text-gray-400">Publishing Soon</span></div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   CASE STUDIES (same View More pattern)
   ═══════════════════════════════════════════════════════════════════ */
const CaseStudies = () => {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);
  const visible = caseStudies.slice(0, VIEW_MORE_THRESHOLD);
  const hasMore = caseStudies.length > VIEW_MORE_THRESHOLD;

  return (
    <section id="case-studies" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <div className="mb-10">
        <div className="reveal">
          <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em] mb-3">Deep Dives</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Case Studies</h2>
        </div>
        <div className="reveal d1 mt-3 flex flex-wrap items-center gap-3">
          <p className="text-gray-400 text-sm">Full written case studies are in progress.</p>
          <span className="font-mono-pp text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-yellow-400/30 text-yellow-400 bg-yellow-400/10">Publishing Soon</span>
        </div>
      </div>

      {showAll && (
        <ViewMoreModal
          title="Case Studies"
          eyebrow="All Deep Dives"
          items={caseStudies}
          renderItem={(cs) => <CaseStudyCard cs={cs} />}
          onClose={() => setShowAll(false)}
        />
      )}

      <div className="reveal">
        {isMobile ? (
          <Carousel items={caseStudies} desktopItems={1} tabletItems={1} mobileItems={1} autoPlay={false}
            renderItem={(cs) => <CaseStudyCard cs={cs} />}
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              {visible.map((cs, i) => <CaseStudyCard key={i} cs={cs} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="font-mono-pp text-xs border border-gray-700 text-gray-400 px-6 py-3 rounded-full hover:border-accent hover:text-accent transition-all uppercase tracking-widest"
                >
                  View All Case Studies ({caseStudies.length}) ↗
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const [expanded, setExpanded] = useState(null);
  const closeModal = useCallback(() => setExpanded(null), []);
  return (
    <section id="testimonials" className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader eyebrow="Social Proof" title="What People Say" center
        subtitle="From LinkedIn recommendations. Click any card to read the full text."
      />
      {expanded !== null && <TestimonialModal t={testimonials[expanded]} onClose={closeModal} />}
      <div className="reveal">
        <Carousel items={testimonials} desktopItems={3} tabletItems={2} mobileItems={1} autoPlay interval={6000}
          renderItem={(t, i) => (
            <button onClick={() => setExpanded(i)}
              className="w-full h-full text-left p-8 rounded-3xl bg-cardBg border border-gray-800 hover:border-accent/40 transition-colors flex flex-col gap-4 min-h-64 cursor-pointer group"
            >
              <p className="text-4xl text-gray-600 group-hover:text-gray-500 font-serif leading-none select-none">"</p>
              <p className="text-gray-300 text-sm leading-relaxed flex-1 -mt-3 line-clamp-4">{t.text}</p>
              <div className="border-t border-gray-800 pt-4 mt-auto">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-gray-400 text-xs mt-1">{t.title} · {t.company}</p>
                <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-widest mt-1">{t.relation}</p>
                <p className="font-mono-pp text-accent text-[10px] uppercase tracking-widest mt-3 group-hover:text-white transition-colors">Read full ↗</p>
              </div>
            </button>
          )}
        />
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   CERTIFICATIONS
   Fix #6: useIsMobile switches between carousel/grid. The MutationObserver
   in useScrollReveal now picks up newly mounted .reveal elements automatically.
   Additional safety: cert cards are always mounted with their in-view state
   managed by the observer.
   ═══════════════════════════════════════════════════════════════════ */
const CertCard = ({ c }) => {
  const inner = (
    <>
      <p className="font-display text-2xl font-extrabold text-accent mb-3">{c.short}</p>
      <p className="text-white text-xs font-bold leading-tight">{c.full}</p>
      <p className="font-mono-pp text-gray-400 text-[10px] uppercase tracking-widest mt-2">{c.issuer}</p>
      <p className="font-mono-pp text-gray-500 text-[10px] mt-1">{c.year}</p>
      {c.link
        ? <span className="font-mono-pp text-[10px] text-accent mt-3 inline-flex items-center gap-1 group-hover:text-white transition-colors">View Certificate<ExtLink /></span>
        : <span className="font-mono-pp text-[10px] text-gray-700 mt-3 inline-block uppercase tracking-widest">Link coming soon</span>
      }
    </>
  );
  const cls = "p-6 rounded-2xl bg-cardBg border border-gray-800 text-center hover:border-gray-600 transition-colors flex flex-col items-center group h-full";
  return c.link
    ? <a href={c.link} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <div className={cls}>{inner}</div>;
};

const Certifications = () => {
  const isMobile = useIsMobile();
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader eyebrow="Credentials" title="Certifications" center
        subtitle="Formal credentials across product management, analytics, and platform expertise."
      />
      {isMobile ? (
        <div className="reveal">
          <Carousel items={certifications} desktopItems={1} tabletItems={1} mobileItems={1} autoPlay={false}
            renderItem={(c) => <CertCard c={c} />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((c, i) => (
            <div key={i} className={`reveal d${i+1}`}><CertCard c={c} /></div>
          ))}
        </div>
      )}
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   FOOTER — logo replaces "PP." text
   ═══════════════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer className="py-16 px-6 border-t border-gray-900">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <BrandLogo className="h-10 w-10" />
        <p className="font-mono-pp text-gray-500 text-xs uppercase tracking-widest">Technical Product Leader</p>
      </div>
      <div className="flex items-center gap-6 text-gray-500">
        {[
          { href:CONFIG.social.linkedin, Icon:LI, label:"LinkedIn" },
          { href:CONFIG.social.github,   Icon:GH, label:"GitHub" },
          { href:CONFIG.social.instagram,Icon:IG, label:"Instagram" },
          { href:CONFIG.social.facebook, Icon:FB, label:"Facebook" },
        ].map(({ href, Icon, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} className="hover:text-white transition-colors"><Icon /></a>
        ))}
      </div>
      <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-[0.3em]">© 2026 Priyanshu Pushpam</p>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════════
   APP
   Fix #10: useEffect sets favicon + page title on mount.
   ═══════════════════════════════════════════════════════════════════ */
const App = () => {
  useScrollReveal();

  /* Set favicon and page title (fix #10) */
  useEffect(() => {
    document.title = "Priyanshu Pushpam — Technical Product Leader";
    const existing = document.querySelector("link[rel*='icon']");
    const link = existing || document.createElement('link');
    link.rel  = 'icon';
    link.type = 'image/png';
    link.href = 'logo.png';
    if (!existing) document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white">
      <GlobalStyles />
      <Nav />
      <Hero />
      <StatsBar />
      <CareerJourney />
      <WorkExperience />
      <CoreDNA />
      <Projects />
      <CaseStudies />
      <Testimonials />
      <Certifications />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;