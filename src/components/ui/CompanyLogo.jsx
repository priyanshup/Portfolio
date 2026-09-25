/**
 * components/ui/CompanyLogo.jsx
 *
 * Employer logos, theme-aware.
 *
 * The four original SVGs live UNMODIFIED in src/assets/logos/. They were
 * supplied in one fixed colour each (black, white, or white-on-green), which
 * disappears on one of the two themes. So they are imported as raw text and
 * inlined, with ONLY the neutral parts recoloured to `currentColor` — the
 * component's text colour follows the theme (dark ink on light, near-white on
 * dark). Brand colours are kept exactly as supplied:
 *
 *   Heineken  red star stays #E3000F; white lettering -> theme colour;
 *             the thin white ring around the star stays white (the original
 *             outline, invisible on light, visible on dark — as in the original)
 *   TechMojo  blue mark stays #3E59E1; dark wordmark -> theme colour
 *   VidaXL    supplied white -> theme colour
 *   UHG       supplied black -> theme colour
 *
 * Inlining also strips ids/<title>/clip-paths so several instances can share a
 * page without duplicate ids; accessibility comes from the wrapper's aria-label.
 * Logos are trademarks of their owners (see the footer note).
 *
 * Props:
 *   company     – company name as used in data/roles.js and data/work.js
 *   scale       – multiplies the logo's optical height (default 1)
 *   decorative  – true when the company name is already next to it in text
 */

import uhgRaw from '../../assets/logos/uhg-logo--stacked-2022.svg?raw';
import techmojoRaw from '../../assets/logos/techmojo-logo.svg?raw';
import vidaxlRaw from '../../assets/logos/vidaxl_logo-white.svg?raw';
import heinekenRaw from '../../assets/logos/heineken-logo.svg?raw';

/* Reduce an SVG file to a bare, id-free <svg viewBox> fragment. */
const bare = (raw) => {
  const svgTag = raw.match(/<svg\b[^>]*>/)[0];
  const viewBox = svgTag.match(/viewBox="([^"]+)"/)[1];
  const inner = raw
    .slice(raw.indexOf(svgTag) + svgTag.length, raw.lastIndexOf('</svg>'))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<title[\s\S]*?<\/title>/g, '')
    .replace(/<defs>[\s\S]*?<\/defs>/g, '')
    .replace(/\sclip-path="url\(#[^)]*\)"/g, '');
  return { viewBox, inner };
};

const build = ({ viewBox, inner }) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" aria-hidden="true" focusable="false">${inner}</svg>`;

const uhg = bare(uhgRaw);
uhg.inner = uhg.inner.replaceAll('fill="black"', 'fill="currentColor"');

const techmojo = bare(techmojoRaw);
techmojo.inner = techmojo.inner.replaceAll('fill="#26303A"', 'fill="currentColor"');

const vidaxl = bare(vidaxlRaw);
vidaxl.inner = vidaxl.inner.replaceAll('fill="white"', 'fill="currentColor"');

const heineken = bare(heinekenRaw);
heineken.inner = heineken.inner
  // the outline ring behind the star: keep it white (its original colour)
  .replace('class="st1" d="M246.1,130.45', 'class="hk-ring" d="M246.1,130.45')
  .replaceAll('class="st0"', 'class="hk-red"')
  .replaceAll('class="st1"', 'class="hk-text"')
  // Illustrator's <style> block is global once inlined — replace it with
  // uniquely-named rules (and remove the empty background group).
  .replace(/<style[\s\S]*?<\/style>/, '')
  .replace(/<g id="BG">\s*<\/g>/, '')
  .replace('<g id="Logo">', '<g>');
heineken.inner =
  '<style>.hk-red{fill:#E3000F}.hk-ring{fill:#fff}.hk-text{fill:currentColor}</style>' + heineken.inner;

/*
 * Optical heights (px). The logos have very different shapes — a 4:1 wordmark
 * and a 2:1 star badge need different heights to carry equal visual weight.
 */
const LOGOS = {
  heineken: { html: build(heineken), label: 'Heineken', height: 40 },
  vidaxl:   { html: build(vidaxl),   label: 'VidaXL', height: 30 },
  techmojo: { html: build(techmojo), label: 'Techmojo', height: 30 },
  uhg:      { html: build(uhg),      label: 'UnitedHealth Group', height: 32 },
};

const ALIASES = {
  'Heineken': 'heineken',
  'VidaXL': 'vidaxl',
  'Techmojo': 'techmojo',
  'Techmojo Solutions': 'techmojo',
  'UnitedHealth Group': 'uhg',
};

const CompanyLogo = ({ company, scale = 1, decorative = false, className = '' }) => {
  const logo = LOGOS[ALIASES[company]];
  if (!logo) return null;
  return (
    <span
      className={'company-logo dark:text-slate-100 text-slate-800 ' + className}
      style={{ height: Math.round(logo.height * scale) }}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : logo.label}
      aria-hidden={decorative ? true : undefined}
      dangerouslySetInnerHTML={{ __html: logo.html }}
    />
  );
};

export default CompanyLogo;
