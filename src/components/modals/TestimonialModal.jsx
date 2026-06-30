import { useState, useEffect, useRef, useCallback } from 'react';
import { CloseIcon } from '../ui/Icons';

const TestimonialModal = ({ testimonials, startIndex, onClose }) => {
  const [idx, setIdx]         = useState(startIndex);
  const [visible, setVisible] = useState(true);
  const t     = testimonials[idx];
  const count = testimonials.length;

  const swipeTxRef = useRef(null);
  const navigating = useRef(false);

  const navigate = useCallback((newIdx) => {
    if (navigating.current) return;
    navigating.current = true;
    setVisible(false);
    setTimeout(() => {
      setIdx(newIdx);
      setVisible(true);
      navigating.current = false;
    }, 150);
  }, []);

  const prev = useCallback(() => navigate((idx - 1 + count) % count), [idx, count, navigate]);
  const next = useCallback(() => navigate((idx + 1) % count),         [idx, count, navigate]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      { onClose(); return; }
      if (e.key === 'ArrowLeft')   { prev();    return; }
      if (e.key === 'ArrowRight')  { next();    return; }
    };
    window.addEventListener('keydown', onKey);
    // iOS Safari ignores overflow:hidden on body — position:fixed is the reliable lock.
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.width    = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.position = '';
      document.body.style.top      = '';
      document.body.style.width    = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, [onClose, prev, next]);

  const onTouchStart = (e) => { swipeTxRef.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (swipeTxRef.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeTxRef.current;
    swipeTxRef.current = null;
    if (Math.abs(dx) > 50) { dx > 0 ? prev() : next(); }
  };

  const showNav = count > 1;

  // Mobile: small centred button. Desktop: full card-height edge strip.
  // Header (z-20) and dots (z-20) sit above the arrow buttons (z-10) so they stay clickable.
  // Mobile: arrows hidden — swipe + dots are sufficient. Desktop: full card-height edge strip.
  const arrowCls =
    'absolute top-1/2 -translate-y-1/2 md:top-0 md:translate-y-0 md:h-full ' +
    'hidden md:flex items-center justify-center ' +
    'w-10 h-12 md:w-12 text-3xl leading-none z-10 select-none ' +
    'dark:text-slate-400 dark:hover:text-white text-slate-400 hover:text-slate-900 ' +
    'transition-colors';

  return (
    <div className="modal-backdrop" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div
        className="modal-card relative w-full max-w-lg flex flex-col rounded-3xl bg-cardBg dark:border-gray-600 border-slate-200 border shadow-2xl"
        style={{ maxHeight: '82vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative z-20 flex items-center justify-between px-8 pt-8 pb-4 flex-shrink-0">
          <p className="text-4xl dark:text-gray-600 text-slate-500 font-serif leading-none select-none">"</p>
          <button onClick={onClose} aria-label="Close"
            className="dark:text-gray-500 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className={'flex flex-col flex-1 overflow-hidden transition-opacity duration-150 ' +
          (visible ? 'opacity-100' : 'opacity-0')}>
          <div className="overflow-y-auto scroll-section px-8 pb-4 flex-1">
            <p className="dark:text-gray-200 text-slate-700 text-base leading-relaxed">{t.text}</p>
          </div>
          <div className="dark:border-gray-700 border-slate-200 border-t px-8 py-5 flex-shrink-0">
            <p className="dark:text-white text-slate-900 font-bold">{t.name}</p>
            <p className="dark:text-gray-400 text-slate-600 text-sm mt-1">{t.title} · {t.company}</p>
            <p className="font-mono-pp dark:text-gray-500 text-slate-500 text-[10px] uppercase tracking-widest mt-1">
              {t.relation}
            </p>
          </div>
        </div>

        {showNav && (
          <>
            <button onClick={prev} aria-label="Previous testimonial" className={arrowCls + ' left-2 md:left-0'}>‹</button>
            <button onClick={next} aria-label="Next testimonial"     className={arrowCls + ' right-2 md:right-0'}>›</button>
          </>
        )}

        {showNav && (
          <div className="relative z-20 flex justify-center gap-2 pb-4 flex-shrink-0">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => navigate(i)}
                aria-label={'Go to testimonial ' + (i + 1)}
                className={'h-1.5 rounded-full transition-all duration-300 ' +
                  (i === idx ? 'bg-accent w-5' : 'dark:bg-gray-700 bg-slate-300 hover:bg-gray-500 w-1.5')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialModal;
