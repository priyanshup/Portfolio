/**
 * components/layout/Nav.jsx
 *
 * Fixed top navigation bar.
 *
 * Always visible:  brand logo (left)  |  Resume button  |  hamburger (mobile)
 * Desktop only:    section links (centre)  |  social icons
 * Mobile only:     hamburger triggers MobileMenu overlay
 */

import { useState } from 'react';
import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import MobileMenu from './MobileMenu';
import { LI, GH, IG, FB, DL, MenuIcon } from '../ui/Icons';

const NAV_LINKS = [
  ['#about',        'About'],
  ['#journey',      'Journey'],
  ['#experience',   'Experience'],
  ['#projects',     'Projects'],
  ['#case-studies', 'Case Studies'],
];

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 bg-darkBg/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center gap-4">

          {/* Brand — always visible */}
          <a href="#about" className="flex-shrink-0">
            <BrandLogo className="h-9 w-9" />
          </a>

          {/* Section links — desktop only */}
          <div className="hidden lg:flex space-x-7 text-sm font-medium text-gray-400">
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} className="nav-link hover:text-white transition-colors">
                {label}
              </a>
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
            <a
              href={CONFIG.resumeUrl}
              download
              className="flex items-center gap-2 text-xs border border-accent text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-darkBg transition-all font-bold uppercase tracking-widest font-mono-pp whitespace-nowrap"
            >
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

export default Nav;
