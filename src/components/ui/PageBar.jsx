/**
 * components/ui/PageBar.jsx
 *
 * Sticky context bar for inner pages (/work, case studies), pinned directly
 * under the nav. It replaces the old scroll-away breadcrumb plus the floating
 * "← Portfolio" button, which only ever went back to the top level.
 *
 * Every level of the trail is a link and always visible, so from deep in a
 * case study you can go straight to the Work section, the All-work list, or
 * the top of the portfolio — never just "home".
 *
 *   items    – [{ label, to?, state? }]; the last item is the current page
 *   width    – max-width class matching the page's content column
 *   progress – optional 0..1 reading progress, drawn as a thin bar (no motion)
 *   sections – optional [{ id, label }]: adds an "On this page" menu that jumps
 *              to each section (and opens it first if it is collapsed on phones)
 *
 * The bar sits under the 64px nav via the `.page-bar` class (globals.css §8b),
 * which moves it to the top of the screen while the nav is hidden on phones.
 * The menu is a non-modal disclosure like the nav's: it closes on Escape
 * (focus returns to its button), on an outside click, and when a section is chosen.
 */

import { useState, useEffect, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from './Icons';
import { openSection } from '../../utils/sectionEvents';

const PageBar = ({ items, width = 'max-w-3xl', progress, sections = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (menuRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return;
      setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
    };
  }, [menuOpen]);

  const jumpTo = (id) => {
    setMenuOpen(false);
    openSection(id);
    // wait a frame so a just-opened section has its final position
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="page-bar sticky z-40 border-b dark:border-gray-800 border-slate-200 bg-darkBg/90 backdrop-blur-md">
      <div className={'relative mx-auto px-6 ' + width}>
        <nav aria-label="Breadcrumb" className="h-12 flex items-center gap-3">
          <ol className="flex items-center flex-1 min-w-0 text-sm dark:text-gray-400 text-slate-600">
            {items.map((it, i) => {
              const last = i === items.length - 1;
              return (
                <li key={it.label} className={'flex items-center min-w-0 ' + (last ? 'flex-1' : 'flex-shrink-0')}>
                  {it.to && !last ? (
                    <Link to={it.to} state={it.state} className="link-accent whitespace-nowrap">
                      {it.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={last ? 'page' : undefined}
                      className={'truncate ' + (last ? 'dark:text-gray-100 text-slate-900 font-medium' : '')}
                    >
                      {it.label}
                    </span>
                  )}
                  {!last && <span aria-hidden="true" className="mx-2 dark:text-gray-600 text-slate-400">/</span>}
                </li>
              );
            })}
          </ol>

          {sections.length > 1 && (
            <button
              ref={btnRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              className="flex-shrink-0 inline-flex items-center gap-1 min-h-11 pl-3 pr-1 -mr-1 rounded-lg text-sm font-medium dark:text-gray-200 text-slate-800 dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
            >
              On this page
              <ChevronDown open={menuOpen} />
            </button>
          )}
        </nav>

        {menuOpen && (
          <ul
            id={menuId}
            ref={menuRef}
            aria-label="On this page"
            className="absolute right-4 top-full mt-1 w-[min(20rem,calc(100vw-2rem))] max-h-[70vh] overflow-y-auto p-1.5 rounded-2xl bg-cardBg border dark:border-gray-700 border-slate-200 shadow-xl"
          >
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(s.id)}
                  className="w-full text-left min-h-11 px-3 py-2 rounded-xl text-sm dark:text-gray-200 text-slate-800 dark:hover:bg-white/5 hover:bg-black/5"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {typeof progress === 'number' && (
        <div aria-hidden="true" className="h-0.5 w-full">
          <div className="h-full bg-accent origin-left" style={{ transform: `scaleX(${progress})` }} />
        </div>
      )}
    </div>
  );
};

export default PageBar;
