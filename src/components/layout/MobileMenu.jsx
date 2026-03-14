/**
 * components/layout/MobileMenu.jsx
 *
 * Full-screen slide-in menu for mobile navigation.
 * Triggered by the hamburger icon in Nav.
 *
 * - Slides in from the right
 * - Large Syne font links for all sections
 * - Social icons + Resume download at the bottom
 * - Closes on: link click, backdrop click, close button
 *
 * Props:
 *   open     – boolean
 *   onClose  – callback
 */

import { useEffect } from 'react';
import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import { LI, GH, IG, FB, DL, CloseIcon } from '../ui/Icons';

const NAV_LINKS = [
  ['#about',        'About'],
  ['#journey',      'Journey'],
  ['#experience',   'Experience'],
  ['#projects',     'Projects'],
  ['#case-studies', 'Case Studies'],
  ['#testimonials', 'Testimonials'],
];

const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  Icon: LI, label: 'LinkedIn' },
  { href: CONFIG.social.github,    Icon: GH, label: 'GitHub' },
  { href: CONFIG.social.instagram, Icon: IG, label: 'Instagram' },
  { href: CONFIG.social.facebook,  Icon: FB, label: 'Facebook' },
];

const MobileMenu = ({ open, onClose }) => {
  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[199] bg-black/40"
          onClick={onClose}
        />
      )}

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800 flex-shrink-0">
          <BrandLogo className="h-8 w-8" />
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1 overflow-y-auto">
          {NAV_LINKS.map(([href, label]) => (
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

        {/* Social + resume */}
        <div className="px-8 py-8 border-t border-gray-800 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
          <a
            href={CONFIG.resumeUrl}
            download
            className="flex items-center gap-2 justify-center w-full text-sm border border-accent text-accent px-6 py-3 rounded-full hover:bg-accent hover:text-darkBg transition-all font-bold uppercase tracking-widest font-mono-pp"
          >
            <DL /> Download Resume
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
