/**
 * components/layout/Nav.jsx
 *
 * Fixed top navigation bar.
 *
 * Desktop:  logo | section links | social icons | theme toggle | resume button
 * Mobile:   logo | theme toggle | resume button | animated hamburger
 *
 * Hamburger: 3-bar → X morph animation (globals.css §15).
 * Menu:      compact 280px frosted-glass dropdown anchored top-right
 *            (globals.css §16). NOT the full-screen slide-in.
 *            Closes on: outside click, Escape key, link click.
 *
 * Theme toggle: shows Sun (switch to light) in dark mode,
 *               shows Moon (switch to dark) in light mode.
 *
 * Analytics: resume download + social click trackers.
 */

import { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import { LI, GH, IG, FB, DL, Sun, Moon } from '../ui/Icons';
import {
  trackResumeDownload,
  trackLinkedInClick,
  trackGitHubClick,
  trackInstagramClick,
  trackFacebookClick,
} from '../../utils/analytics.js';

const NAV_LINKS = [
  ['#about',        'About'],
  ['#experience',   'Experience'],
  ['#journey',      'Journey'],
  ['#projects',     'Projects'],
  ['#case-studies', 'Case Studies'],
];

const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  icon: () => <LI />, label: 'LinkedIn',  track: trackLinkedInClick  },
  { href: CONFIG.social.github,    icon: () => <GH />, label: 'GitHub',    track: trackGitHubClick    },
  { href: CONFIG.social.instagram, icon: () => <IG />, label: 'Instagram', track: trackInstagramClick },
  { href: CONFIG.social.facebook,  icon: () => <FB />, label: 'Facebook',  track: trackFacebookClick  },
];

/* ── Animated 3-bar hamburger icon ─────────────────────────────── */
const Hamburger = ({ open }) => (
  <span
    className="hamburger dark:text-gray-400 text-slate-600"
    aria-hidden="true"
  >
    <span className={'hbar' + (open ? ' hbar-1-open' : '')} />
    <span className={'hbar' + (open ? ' hbar-2-open' : '')} />
    <span className={'hbar' + (open ? ' hbar-3-open' : '')} />
  </span>
);

const Nav = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const btnRef      = useRef(null);

  /* Close on Escape */
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* Close on outside click / tap */
  useEffect(() => {
    if (!open) return;
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

  return (
    <nav className="fixed w-full z-50 bg-darkBg/80 backdrop-blur-md border-b dark:border-gray-800/60 border-slate-200/80">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">

        {/* Brand logo */}
        <a href="#about" className="flex-shrink-0">
          <BrandLogo className="h-9 w-9" />
        </a>

        {/* Desktop section links */}
        <div className="hidden lg:flex space-x-7 text-sm font-medium dark:text-gray-400 text-slate-800">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="nav-link dark:hover:text-accent hover:text-emerald-700 transition-colors">
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop social icons */}
          <div className="hidden md:flex items-center gap-3 dark:text-gray-500 text-slate-700">
            {SOCIAL_LINKS.map(({ href, icon, label, track }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                onClick={track}
                className="rounded-lg p-1.5 -m-1 dark:hover:text-white hover:text-slate-900 dark:hover:bg-slate-700/50 hover:bg-slate-200 transition-all"
              >
                {icon()}
              </a>
            ))}
          </div>

          {/* Theme toggle — all breakpoints */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-300 dark:bg-slate-800 bg-slate-100 dark:border-emerald-500/60 border-amber-400/50 dark:text-emerald-400 text-amber-500 dark:shadow-[0_0_10px_rgba(16,185,129,0.35)] shadow-[0_0_10px_rgba(251,191,36,0.35)] dark:hover:border-emerald-400 hover:border-amber-400 dark:hover:text-emerald-300 hover:text-amber-400 dark:hover:shadow-[0_0_18px_rgba(16,185,129,0.65)] hover:shadow-[0_0_18px_rgba(251,191,36,0.65)]"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {/* Resume glass pill — all breakpoints */}
          <a
            href={CONFIG.resumeUrl}
            download
            onClick={trackResumeDownload}
            className="resume-btn font-mono-pp"
          >
            <DL /> Resume
          </a>

          {/* Hamburger button — below lg breakpoint only */}
          <button
            ref={btnRef}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="nav-dropdown"
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg dark:text-gray-400 text-slate-600 dark:hover:text-white hover:text-slate-900 transition-colors"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* Compact frosted-glass dropdown — below lg only */}
      <div
        id="nav-dropdown"
        ref={dropdownRef}
        className={'mobile-dropdown lg:hidden' + (open ? ' open' : '')}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Section links */}
        <div>
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="dd-link"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="dd-divider" />

        {/* Social icons row */}
        <div className="flex items-center gap-1 px-2 py-1">
          {SOCIAL_LINKS.map(({ href, icon, label, track }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              onClick={() => { track(); close(); }}
              className="flex items-center justify-center w-9 h-9 rounded-xl dark:text-gray-500 text-slate-500 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-black/5 transition-all"
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
