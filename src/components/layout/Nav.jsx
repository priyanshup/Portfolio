/**
 * components/layout/Nav.jsx
 *
 * Fixed top navigation (the "floating layer" — blur is allowed here).
 *
 * Section links use react-router <Link to="/" state={{ scrollTo }}> so they
 * behave the same on the homepage and on inner pages (/work, case studies):
 * HomePage reads the state and scrolls. The URL stays clean (no #section
 * fragments fighting the HashRouter). On the homepage the link for the
 * section in view gets aria-current="true" and an underline.
 *
 * The mobile menu is a simple NON-modal disclosure (aria-expanded), not a
 * dialog: it closes on Escape (returning focus to its button), on an outside
 * click, and when a link is chosen.
 *
 * On phones (< 768px) the bar slides away while the reader scrolls down and
 * returns on the first scroll up. It also returns whenever keyboard focus is
 * inside it, and never hides while the menu is open. The state is published as
 * html[data-nav-hidden] so the sticky PageBar can move up into the freed
 * space (CSS in globals.css §8b).
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import { LI, GH, IG, FB, DL, Sun, Moon } from '../ui/Icons';
import useActiveSection from '../../hooks/useActiveSection';
import useScrollDirection from '../../hooks/useScrollDirection';
import {
  trackResumeDownload,
  trackLinkedInClick,
  trackGitHubClick,
  trackInstagramClick,
  trackFacebookClick,
} from '../../utils/analytics.js';

const NAV_LINKS = [
  ['about',       'About'],
  ['work',        'Work'],
  ['experience',  'Experience'],
  ['recognition', 'Recognition'],
];
const NAV_IDS = NAV_LINKS.map(([id]) => id);

const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  icon: () => <LI />, label: 'LinkedIn',  track: trackLinkedInClick  },
  { href: CONFIG.social.github,    icon: () => <GH />, label: 'GitHub',    track: trackGitHubClick    },
  { href: CONFIG.social.instagram, icon: () => <IG />, label: 'Instagram', track: trackInstagramClick },
  { href: CONFIG.social.facebook,  icon: () => <FB />, label: 'Facebook',  track: trackFacebookClick  },
];

/* ── Animated 3-bar hamburger icon ─────────────────────────────── */
const Hamburger = ({ open }) => (
  <span className="hamburger dark:text-gray-300 text-slate-700" aria-hidden="true">
    <span className={'hbar' + (open ? ' hbar-1-open' : '')} />
    <span className={'hbar' + (open ? ' hbar-2-open' : '')} />
    <span className={'hbar' + (open ? ' hbar-3-open' : '')} />
  </span>
);

const Nav = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef      = useRef(null);
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(NAV_IDS, onHome);

  /* Hide on scroll down, show on scroll up or keyboard focus */
  const [keyboardInside, setKeyboardInside] = useState(false);
  const direction = useScrollDirection({ threshold: 8, minY: 120, paused: open });
  useEffect(() => {
    const hide = direction === 'down' && !open && !keyboardInside;
    document.documentElement.dataset.navHidden = hide ? 'true' : 'false';
  }, [direction, open, keyboardInside]);
  useEffect(() => () => { delete document.documentElement.dataset.navHidden; }, []);

  /* Close on Escape and return focus to the menu button */
  useEffect(() => {
    if (!open) return undefined;
    const h = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  /* Close on outside click / tap */
  useEffect(() => {
    if (!open) return undefined;
    const h = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        btnRef.current      && !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', h);
    document.addEventListener('touchstart', h, { passive: true });
    return () => {
      document.removeEventListener('mousedown', h);
      document.removeEventListener('touchstart', h);
    };
  }, [open]);

  const close = () => setOpen(false);

  const sectionLink = (id, label, className, onClick) => (
    <Link
      key={id}
      to="/"
      state={{ scrollTo: id }}
      replace={onHome}
      onClick={onClick}
      aria-current={active === id ? 'true' : undefined}
      className={className}
    >
      {label}
    </Link>
  );

  return (
    <nav
      aria-label="Primary"
      className="site-nav fixed w-full z-50 bg-darkBg/85 backdrop-blur-md border-b dark:border-gray-800/60 border-slate-200/80"
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setKeyboardInside(true); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setKeyboardInside(false); }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center gap-4">
        {/* Brand logo: 44px tap target around the 36px mark */}
        <Link
          to="/"
          state={{ scrollTo: 'about' }}
          replace={onHome}
          className="flex-shrink-0 flex items-center justify-center w-11 h-11 -ml-1"
          aria-label="Priyanshu Pushpam, home"
        >
          <BrandLogo className="h-9 w-9" />
        </Link>

        {/* Desktop section links */}
        <div className="hidden lg:flex space-x-7 text-sm font-medium dark:text-gray-300 text-slate-800">
          {NAV_LINKS.map(([id, label]) =>
            sectionLink(id, label, 'nav-link dark:hover:text-accent hover:text-emerald-700 transition-colors py-2')
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Theme toggle — all breakpoints */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center w-11 h-11 rounded-full border cursor-pointer transition-all duration-300 dark:bg-slate-800 bg-slate-100 dark:border-emerald-500/60 border-amber-500/60 dark:text-emerald-400 text-amber-700 dark:hover:border-emerald-400 hover:border-amber-600 dark:hover:text-emerald-300 hover:text-amber-800"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {/* Resume pill — all breakpoints */}
          <a
            href={CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackResumeDownload}
            className="resume-btn font-mono-pp"
          >
            <DL /> Resume
          </a>

          {/* Hamburger button — below lg breakpoint only */}
          <button
            ref={btnRef}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-dropdown"
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-lg dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* Compact dropdown — below lg only. Hidden with visibility, so links
          are out of the tab order and screen-reader tree while closed. */}
      <div
        id="nav-dropdown"
        ref={dropdownRef}
        className={'mobile-dropdown lg:hidden' + (open ? ' open' : '')}
      >
        <div>
          {NAV_LINKS.map(([id, label]) => sectionLink(id, label, 'dd-link', close))}
        </div>
        <div className="dd-divider" />
        <div className="flex items-center gap-1 px-2 py-1">
          {SOCIAL_LINKS.map(({ href, icon, label, track }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={() => { track(); close(); }}
              className="flex items-center justify-center w-11 h-11 rounded-xl dark:text-gray-300 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-black/5 transition-all"
            >
              {icon()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
