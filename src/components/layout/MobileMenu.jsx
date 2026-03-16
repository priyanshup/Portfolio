/**
 * components/layout/MobileMenu.jsx
 *
 * Compact frosted-glass dropdown menu — NOT full-viewport.
 *
 * Behaviour:
 *   - Scales in from the top-right corner (transform-origin: top right)
 *   - 280px wide, anchored just below the nav bar
 *   - Contains: section nav links | social icons | resume button
 *   - No backdrop overlay — clicking outside is handled by Nav.jsx
 *   - ref forwarded so Nav.jsx can detect outside clicks
 *
 * Analytics: tracks resume download and all social link clicks.
 */

import { forwardRef } from 'react';
import { CONFIG } from '../../config';
import { LI, GH, IG, FB, DL } from '../ui/Icons';
import {
  trackResumeDownload,
  trackLinkedInClick,
  trackGitHubClick,
  trackInstagramClick,
  trackFacebookClick,
} from '../../utils/analytics.js';

const NAV_LINKS = [
  ['#about',        'About'],
  ['#journey',      'Journey'],
  ['#experience',   'Experience'],
  ['#projects',     'Projects'],
  ['#case-studies', 'Case Studies'],
  ['#testimonials', 'Testimonials'],
];

const SOCIAL = [
  { href: CONFIG.social.linkedin,  icon: () => <LI />, label: 'LinkedIn',  track: trackLinkedInClick  },
  { href: CONFIG.social.github,    icon: () => <GH />, label: 'GitHub',    track: trackGitHubClick    },
  { href: CONFIG.social.instagram, icon: () => <IG />, label: 'Instagram', track: trackInstagramClick },
  { href: CONFIG.social.facebook,  icon: () => <FB />, label: 'Facebook',  track: trackFacebookClick  },
];

const MobileMenu = forwardRef(({ open, onClose }, ref) => (
  <div
    ref={ref}
    className={`mobile-dropdown ${open ? 'open' : ''}`}
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
  >
    {/* ── Section links ── */}
    <nav>
      {NAV_LINKS.map(([href, label]) => (
        <a
          key={href}
          href={href}
          onClick={onClose}
          className="dd-link font-medium"
        >
          {label}
        </a>
      ))}
    </nav>

    <div className="dd-divider" />

    {/* ── Social icons ── */}
    <div className="flex items-center gap-1 px-3 py-2">
      {SOCIAL.map(({ href, icon, label, track }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener"
          aria-label={label}
          onClick={track}
          className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.06] transition-colors"
        >
          {icon()}
        </a>
      ))}
    </div>

    <div className="dd-divider" />

    {/* ── Resume button ── */}
    <div className="px-2 py-2">
      <a
        href={CONFIG.resumeUrl}
        download
        onClick={trackResumeDownload}
        className="resume-btn font-mono-pp w-full justify-center"
        style={{ display: 'flex' }}
      >
        <DL /> Download Resume
      </a>
    </div>
  </div>
));

MobileMenu.displayName = 'MobileMenu';

export default MobileMenu;