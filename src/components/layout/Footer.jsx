/**
 * components/layout/Footer.jsx
 *
 * Site footer with brand logo, social links, and copyright.
 */

import { CONFIG } from '../../config';
import BrandLogo from '../ui/BrandLogo';
import { LI, GH, IG, FB } from '../ui/Icons';

const SOCIAL_LINKS = [
  { href: CONFIG.social.linkedin,  Icon: LI, label: 'LinkedIn' },
  { href: CONFIG.social.github,    Icon: GH, label: 'GitHub' },
  { href: CONFIG.social.instagram, Icon: IG, label: 'Instagram' },
  { href: CONFIG.social.facebook,  Icon: FB, label: 'Facebook' },
];

const Footer = () => (
  <footer className="py-16 px-6 border-t border-gray-900">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

      <div className="flex flex-col items-center md:items-start gap-2">
        <BrandLogo className="h-10 w-10" />
        <p className="font-mono-pp text-gray-500 text-xs uppercase tracking-widest">
          Technical Product Leader
        </p>
      </div>

      <div className="flex items-center gap-6 text-gray-500">
        {SOCIAL_LINKS.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={label}
            className="hover:text-white transition-colors"
          >
            <Icon />
          </a>
        ))}
      </div>

      <p className="font-mono-pp text-gray-500 text-[10px] uppercase tracking-[0.3em]">
        © 2026 Priyanshu Pushpam
      </p>
    </div>
  </footer>
);

export default Footer;
