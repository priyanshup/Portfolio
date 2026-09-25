/**
 * components/layout/Footer.jsx
 *
 * Two zones:
 *
 * 1. Closing CTA: LinkedIn connect and Resume as the two primary calls to
 *    action. Headline is deliberately smaller than the hero name so the CTA
 *    doesn't compete with it.
 *
 * 2. Footer links — brand logo, social icons, copyright, and a short
 *    privacy / NDA note.
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
    <div className="px-6 py-16 md:py-24">
      <div className="max-w-6xl mx-auto text-center">

        <p className="font-mono-pp text-accent text-xs uppercase tracking-[0.2em] mb-5">
          Open to conversations
        </p>

        <h2
          className="font-display font-extrabold tracking-tight leading-[1.05] dark:text-white text-slate-900 mb-6"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
        >
          Want to talk?
        </h2>

        <p className="dark:text-gray-300 text-slate-700 text-lg max-w-xl mx-auto leading-relaxed mb-9">
          I'm a product owner at Heineken, working on digital commerce. If you'd like to talk about a role, a product problem or a project, send me a message.
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
    <div className="px-6 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] border-t dark:border-gray-900 border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        <div className="flex flex-col items-center md:items-start gap-2">
          <BrandLogo className="h-9 w-9" />
          <p className="font-mono-pp dark:text-gray-300 text-slate-700 text-xs uppercase tracking-[0.15em]">
            Technical Product Leader
          </p>
        </div>

        <div className="flex items-center gap-2 dark:text-gray-300 text-slate-700">
          {SOCIAL_LINKS.map(({ href, icon, label, onClick }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={onClick}
              className="w-11 h-11 flex items-center justify-center rounded-full dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
            >
              {icon()}
            </a>
          ))}
        </div>

        <p className="font-mono-pp dark:text-gray-300 text-slate-700 text-xs uppercase tracking-[0.2em]">
          © 2026 Priyanshu Pushpam
        </p>
      </div>

      <p className="max-w-3xl mx-auto text-center text-xs dark:text-gray-400 text-slate-600 leading-relaxed mt-8">
        Details about clients and employers are kept general because of NDAs, and I can share more on request. Company logos are trademarks of their owners.
        This site uses Google Analytics to count visits and see which sections get read.
      </p>
    </div>

  </footer>
);

export default Footer;
