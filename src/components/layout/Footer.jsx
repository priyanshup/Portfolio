/**
 * components/layout/Footer.jsx
 *
 * Two zones:
 *
 * 1. Closing CTA — bold full-width "Let's build something ambitious?" section.
 *    LinkedIn connect + Resume download as the two primary calls-to-action.
 *    This is the page's final conversion moment before the footer links.
 *
 * 2. Footer links — brand logo, social icons, copyright line.
 *
 * Analytics: tracks resume downloads and social link clicks.
 */

import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import { LI, GH, IG, FB, DL, ArrowUpRight } from '../ui/Icons';
import {
  trackResumeDownload,
  trackLinkedInClick,
  trackGitHubClick,
  trackInstagramClick,
  trackFacebookClick,
} from '../../utils/analytics.js';

const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  icon: () => <LI />, label: 'LinkedIn',  onClick: trackLinkedInClick  },
  { href: CONFIG.social.github,    icon: () => <GH />, label: 'GitHub',    onClick: trackGitHubClick    },
  { href: CONFIG.social.instagram, icon: () => <IG />, label: 'Instagram', onClick: trackInstagramClick },
  { href: CONFIG.social.facebook,  icon: () => <FB />, label: 'Facebook',  onClick: trackFacebookClick  },
];

const Footer = () => (
  <footer className="border-t dark:border-gray-900 border-slate-200">

    {/* ── Closing CTA ──────────────────────────────────────────────── */}
    <div className="px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto text-center">

        <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.3em] mb-6">
          Open to Opportunities
        </p>

        <h2 className="font-display font-extrabold tracking-tighter leading-[0.9] dark:text-white text-slate-900 mb-8"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          Ready to build<br />something ambitious?
        </h2>

        <p className="dark:text-gray-400 text-slate-600 text-lg max-w-md mx-auto leading-relaxed mb-10">
          Senior product roles where engineering depth meets commercial scale.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href={CONFIG.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLinkedInClick}
            className="cta-btn-primary"
          >
            Connect on LinkedIn <ArrowUpRight />
          </a>
          <a
            href={CONFIG.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackResumeDownload}
            className="cta-btn-secondary"
          >
            <DL /> View Resume
          </a>
        </div>
      </div>
    </div>

    {/* ── Footer links ─────────────────────────────────────────────── */}
    <div className="px-6 py-10 border-t dark:border-gray-900 border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex flex-col items-center md:items-start gap-2">
          <BrandLogo className="h-9 w-9" />
          <p className="font-mono-pp dark:text-gray-600 text-slate-500 text-[10px] uppercase tracking-widest">
            Technical Product Leader
          </p>
        </div>

        <div className="flex items-center gap-5 dark:text-gray-500 text-slate-600">
          {SOCIAL_LINKS.map(({ href, icon, label, onClick }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              onClick={onClick}
              className="dark:hover:text-white hover:text-slate-900 transition-colors"
            >
              {icon()}
            </a>
          ))}
        </div>

        <p className="font-mono-pp dark:text-gray-600 text-slate-500 text-[10px] uppercase tracking-[0.3em]">
          © 2026 Priyanshu Pushpam
        </p>
      </div>
    </div>

  </footer>
);

export default Footer;
