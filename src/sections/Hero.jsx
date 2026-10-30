/**
 * sections/Hero.jsx
 *
 * The first plate: a screwed panel holding the name, one plain line, three
 * proof points and two keys, with the photo as a framed print on the right.
 * Under the plate, outside it, a "Worked at" strip of employer logos.
 *
 * Budget (DESIGN.md): everything a recruiter needs in the first two screens —
 * current role, name, one plain line about what you do, three proof points,
 * and two actions. Proof points come from the featured work (data/work.js),
 * the role/badge from data/roles.js: nothing here is hard-coded twice.
 *
 * Layout is CSS Grid with an explicit photo column width, so the text never
 * bleeds into the photo. On phones the order is text, proof, actions, and
 * the plate is not forced to full height, so the proof lands in the first
 * screen. A small round photo, cropped to the face, sits beside the name on
 * phones (the framed print is md and up). The current role is a line above the
 * name on phones and a sticker on the print from md up (one or the other is
 * displayed, never both). "Worked at" is a 2x2 grid of equal cells on phones,
 * and Resume is a text link there (the nav already has the Resume key).
 */

import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { IconPin, DL, ArrowRight } from '../components/ui/Icons';
import { roles, currentRole, roleAsPhrase, roleShort, yearsExperience } from '../data/roles';
import { featuredWork, heroProofs } from '../data/work';
import CompanyLogo from '../components/ui/CompanyLogo';
import { trackResumeDownload } from '../utils/analytics';

const Hero = () => {
  const flagship = featuredWork[0];
  const years = yearsExperience();
  const employers = [...new Set(roles.map((r) => r.company))];

  return (
    <header id="about" className="max-w-6xl mx-auto w-full flex flex-col gap-3 md:gap-6">
      <div className="plate plate--screwed px-5 pt-8 pb-7 sm:px-10 md:px-14 md:py-16 grid grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-center">

        {/* ── Text column ── */}
        <div className="min-w-0 flex flex-col gap-5 md:gap-6">

          {/* Current role (phones; md+ shows it as the sticker on the photo) */}
          <p className="md:hidden flex items-center gap-2.5 silk silk--strong">
            <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            {roleShort(currentRole)} · {currentRole.company}
          </p>

          {/* Name, with the small round photo beside it on phones */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1
                className="font-display font-[850] tracking-[-0.045em] leading-[1.02] text-ink"
                style={{ fontSize: 'clamp(2.125rem, 5.2vw, 4.75rem)' }}
              >
                Priyanshu
                <br />
                {/* inline-block + a small top margin keeps the orange block clear of the "y" above */}
                <span className="mark inline-block mt-[0.1em] leading-[1.05]">Pushpam</span>
              </h1>
              <p className="silk mt-4 md:mt-5 max-sm:!tracking-[0.08em]">
                <span className="sm:hidden">Product leader · {years} years</span>
                <span className="hidden sm:inline">Technical product leader · Digital commerce · {years} years</span>
              </p>
            </div>

            {/* Phones: the photo is cropped to the face, so it reads at this size */}
            <span className="hero-avatar md:hidden flex-shrink-0 w-[88px] h-[88px] rounded-full overflow-hidden border-2 border-edge bg-accent shadow-[0_3px_0_var(--color-edge)]">
              <img
                src="me.jpg"
                alt="Priyanshu Pushpam"
                className="w-full h-full object-cover object-top scale-[2.3] origin-[54%_24%] select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </span>
          </div>

          {/* One plain line about what I do */}
          <p className="text-base md:text-lg text-body leading-relaxed max-w-xl">
            I'm a product owner who started out as a software engineer. I've worked on
            healthcare systems, an online sportsbook and an AI-driven e-commerce platform.
          </p>

          {/* Proof points, pulled from the featured work */}
          {/* phones: one recessed panel with rows; sm+: three recessed gauges */}
          <ul aria-label="Highlights" className="max-sm:sunk max-sm:divide-y max-sm:divide-line grid sm:gap-2 sm:grid-cols-3 max-w-2xl">
            {heroProofs.map((p, i) => (
              <li key={p.val} className="sm:sunk px-3.5 py-2.5 sm:py-3 flex sm:flex-col gap-x-3 gap-y-1 items-baseline sm:items-start">
                <span aria-hidden="true" className="font-mono-pp text-xs text-muted">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="block font-display text-lg md:text-xl font-[850] text-ink leading-tight">{p.val}</span>
                  <span className="block text-[0.8125rem] md:text-xs text-muted leading-snug mt-0.5">{p.label}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Actions. On phones Resume is a text link; the nav already has the key. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-4 pt-1">
            <Link
              to={`/case-studies/${flagship.slug}`}
              state={{ from: 'home' }}
              className="cta-btn-primary max-sm:w-full max-sm:!px-4 max-sm:!tracking-[0.04em]"
            >
              {flagship.ctaLabel ?? 'Read my top case study'} <ArrowRight />
            </Link>
            {/* (wrappers do the hiding: the button classes set `display` themselves) */}
            <span className="hidden sm:inline-flex">
              <a
                href={CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackResumeDownload}
                className="cta-btn-secondary"
              >
                <DL /> Resume
              </a>
            </span>
            <span className="sm:hidden">
              <a
                href={CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackResumeDownload}
                className="link-accent"
              >
                <DL className="w-4 h-4" /> Download my resume
              </a>
            </span>
          </div>

          {/* Location + a quiet, professional openness signal */}
          <p className="flex items-center gap-2 silk">
            <IconPin className="w-3.5 h-3.5 text-accent-ink flex-shrink-0" />
            Hyderabad, India · Open to conversations
          </p>
        </div>

        {/* ── Photo column (md+): a framed print with the current role as a sticker ── */}
        <figure className="hidden md:block relative m-0 pt-6 pr-3">
          <div className="relative rounded-[10px] overflow-hidden border-2 border-edge bg-accent shadow-[8px_8px_0_var(--color-edge)] dark:shadow-[8px_8px_0_var(--color-accent)] aspect-[4/5]">
            <img
              src="me.jpg"
              alt="Priyanshu Pushpam"
              className="w-full h-full object-cover object-[50%_20%] select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <p className="sticker absolute -top-1 -right-2 lg:-right-6 max-w-[15rem]">
            <span className="silk !text-[#0a0a0a] !tracking-[0.16em]">Now</span>
            <span className="font-display font-[800] text-[0.9375rem] leading-tight">
              {roleAsPhrase(currentRole)} at {currentRole.company}
            </span>
          </p>
          <figcaption className="mt-5 flex justify-between gap-4 silk">
            <span>Fig. 1</span>
            <span>Me, in the snow</span>
          </figcaption>
        </figure>
      </div>

      {/* ── Where I've worked: recognisable names, shown once (theme-aware logos).
          A fixed 2x2 grid on phones so the row never wraps raggedly. ── */}
      <div className="px-3 md:px-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-10">
        <p className="silk flex-shrink-0">Worked at</p>
        <ul
          aria-label="Companies I have worked at"
          className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-line max-sm:bg-line sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:flex-1 sm:gap-x-10 sm:gap-y-4 sm:overflow-visible sm:rounded-none sm:border-0"
        >
          {employers.map((c) => (
            <li key={c} className="flex items-center justify-center min-h-[3.5rem] max-sm:bg-plate sm:justify-start sm:min-h-[2.25rem]">
              <CompanyLogo company={c} scale={0.9} />
            </li>
          ))}
        </ul>
      </div>

      {/* Credentials: plain text, kept for screeners */}
      <p className="px-3 md:px-10 -mt-1 md:-mt-3 text-[0.8125rem] md:text-xs text-muted">
        CSPO® · Google GA4 · Productsup Expert · Former software engineer
      </p>
    </header>
  );
};

export default Hero;
