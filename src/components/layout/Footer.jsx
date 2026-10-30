/**
 * components/layout/Footer.jsx
 *
 * Three zones:
 *
 * 1. Closing CTA on the contrast plate (black in light mode, paper in dark):
 *    LinkedIn connect and Resume as the two calls to action. The headline is
 *    smaller than the hero name so the two don't compete.
 *
 * 2. Footer bar: brand, the social links as knobs, copyright, and a short
 *    privacy / NDA note.
 *
 * 3. A colour stripe along the very bottom edge.
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

/* Each social link is a knob; colours run orange, white, steel, graphite */
const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  icon: () => <LI />, label: 'LinkedIn',  knob: 'knob--orange',   onClick: trackLinkedInClick  },
  { href: CONFIG.social.github,    icon: () => <GH />, label: 'GitHub',    knob: 'knob--white',    onClick: trackGitHubClick    },
  { href: CONFIG.social.instagram, icon: () => <IG />, label: 'Instagram', knob: 'knob--steel',    onClick: trackInstagramClick },
  { href: CONFIG.social.facebook,  icon: () => <FB />, label: 'Facebook',  knob: 'knob--graphite', onClick: trackFacebookClick  },
];

const Footer = () => (
  <footer className="pt-3 md:pt-6">

    {/* ── Closing CTA: the contrast plate (black in light mode, paper in dark) ── */}
    <div className="px-2.5 md:px-6">
      <div className="plate plate--contrast plate--screwed max-w-6xl mx-auto px-6 py-12 sm:px-10 md:px-14 md:py-20 grid md:grid-cols-[1fr_auto] gap-8 md:gap-14 md:items-center">
        <div>
          <p className="silk silk--accent mb-4">Open to conversations</p>
          <h2
            className="font-display font-[850] tracking-[-0.045em] leading-[1] text-ink mb-5"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            Want to talk?
          </h2>
          <p className="text-body text-base md:text-lg max-w-xl leading-relaxed">
            I'm a product owner at Heineken, working on digital commerce. If you'd like to talk about a role, a product problem or a project, send me a message.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-4">
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
            <DL /> View resume
          </a>
        </div>
      </div>
    </div>

    {/* ── Footer bar: brand, knobs, copyright ── */}
    <div className="max-w-6xl mx-auto px-5 md:px-16 pt-12 md:pt-16 pb-8 grid lg:grid-cols-[1fr_auto_1fr] items-center lg:items-end gap-8">
      <div className="flex items-center gap-3 justify-center lg:justify-start">
        <BrandLogo className="h-9 w-9" />
        <p className="silk whitespace-nowrap">Technical product leader</p>
      </div>

      <ul className="flex items-end justify-center gap-5 sm:gap-7" aria-label="Find me on">
        {SOCIAL_LINKS.map(({ href, icon, label, knob, onClick }) => (
          <li key={label} className="flex flex-col items-center gap-2.5">
            <span aria-hidden="true" className="silk max-sm:hidden">{label}</span>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onClick={onClick}
              className={'knob ' + knob}
            >
              <span aria-hidden="true" className="knob__face" />
              {icon()}
            </a>
          </li>
        ))}
      </ul>

      <p className="silk whitespace-nowrap text-center lg:text-right">© 2026 Priyanshu Pushpam</p>
    </div>

    <p className="max-w-3xl mx-auto px-5 text-center text-xs text-muted leading-relaxed pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
      Details about clients and employers are kept general because of NDAs, and I can share more on request. Company logos are trademarks of their owners.
      This site uses Google Analytics to count visits and see which sections get read.
    </p>

    <div className="stripe" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
  </footer>
);


export default Footer;
