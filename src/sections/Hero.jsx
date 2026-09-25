/**
 * sections/Hero.jsx
 *
 * Header — CSS Grid layout (not flex). Explicit column widths stop the text
 * column ever bleeding into the photo column.
 *
 * Budget (DESIGN.md): everything a recruiter needs in the first two screens —
 * current role, name, one plain line about what you do, three proof points,
 * and two actions. Proof points come from the featured work (data/work.js),
 * the role/badge from data/roles.js: nothing here is hard-coded twice.
 *
 * On mobile the order is text, proof, actions, and the section is not
 * forced to full-viewport height, so the proof lands in the first screen.
 * A small round photo, cropped to the face, sits beside the name on phones (the
 * big photo column is desktop only). "Worked at" is a 2x2 grid of equal cells with
 * each logo centred in its cell (the label stays left), and Resume is a text link
 * (the nav already carries a Resume pill) so it doesn't take a full row.
 */

import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { IconPin, DL, ArrowUpRight } from '../components/ui/Icons';
import { roles, currentRole, roleAsPhrase, roleShort, yearsExperience } from '../data/roles';
import { featuredWork, heroProofs } from '../data/work';
import CompanyLogo from '../components/ui/CompanyLogo';
import { trackResumeDownload } from '../utils/analytics';

const Hero = () => {
  const flagship = featuredWork[0];
  const years = yearsExperience();
  const employers = [...new Set(roles.map((r) => r.company))];

  return (
    <header
      id="about"
      className="relative md:min-h-screen flex items-center pt-24 pb-10 md:pt-24 md:pb-20 px-6 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-10 md:gap-12 lg:gap-20 w-full items-center">

        {/* ── Text column ── */}
        <div className="space-y-5 md:space-y-6 min-w-0">

          {/* Current-role badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 dark:text-accent text-emerald-800 text-xs font-mono-pp">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="sm:hidden">{roleShort(currentRole)} · {currentRole.company}</span>
            <span className="hidden sm:inline">{roleAsPhrase(currentRole)} · {currentRole.company}</span>
          </div>

          {/* Name, with the small round photo beside it on phones */}
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1
                className="font-display font-extrabold tracking-tight leading-[0.90] dark:text-white text-slate-900"
                style={{ fontSize: 'clamp(2.25rem, 6.5vw, 6rem)' }}
              >
                PRIYANSHU
                <br />
                PUSHPAM
              </h1>

              <div className="mt-4 md:mt-5 flex items-center gap-4">
                <div className="h-px w-10 dark:bg-gray-700 bg-slate-300 flex-shrink-0 hidden sm:block" />
                <p className="font-mono-pp text-[0.8125rem] md:text-xs md:uppercase tracking-[0.02em] md:tracking-[0.18em] dark:text-gray-300 text-slate-700">
                  <span className="sm:hidden">Product Leader · {years} Years</span>
                  <span className="hidden sm:inline">Technical Product Leader · Digital Commerce · {years} Years</span>
                </p>
              </div>
            </div>

            {/* Phones: the full-length photo is cropped to the face, so it reads at this size */}
            <span className="hero-avatar md:hidden flex-shrink-0 w-[88px] h-[88px] rounded-full overflow-hidden border dark:border-gray-700 border-slate-300">
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
          <p className="text-base md:text-lg dark:text-gray-300 text-slate-700 leading-relaxed max-w-lg">
            I'm a product owner who started out as a software engineer. I've worked on
            healthcare systems, an online sportsbook and an AI-driven e-commerce platform.
          </p>

          {/* Proof points, pulled from the featured work */}
          <ul aria-label="Highlights" className="grid gap-3 sm:grid-cols-3 max-w-2xl">
            {heroProofs.map((p) => (
              <li key={p.val} className="border-l-2 border-accent pl-3">
                <span className="block font-display text-xl font-extrabold text-accent leading-tight">{p.val}</span>
                <span className="block text-[0.8125rem] md:text-xs dark:text-gray-400 text-slate-600 leading-snug mt-0.5">{p.label}</span>
              </li>
            ))}
          </ul>

          {/* Actions. On phones Resume is a text link; the nav already has the pill. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 md:gap-3 pt-1">
            <Link
              to={`/case-studies/${flagship.slug}`}
              state={{ from: 'home' }}
              className="cta-btn-primary max-sm:w-full"
            >
              {flagship.ctaLabel ?? 'Read my top case study'} <ArrowUpRight />
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
          <p className="flex items-center gap-2 font-mono-pp meta-line dark:text-gray-400 text-slate-600">
            <IconPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
            Hyderabad, India · Open to conversations
          </p>

          {/* Where I've worked: recognisable names, shown once (theme-aware logos).
              A fixed 2x2 grid on phones so the row never wraps raggedly. */}
          <div>
            <p className="text-[0.8125rem] md:text-xs dark:text-gray-400 text-slate-600 mb-3">Worked at</p>
            <ul
              aria-label="Companies I have worked at"
              className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border dark:border-gray-800 border-slate-200 max-sm:dark:bg-gray-800 max-sm:bg-slate-200 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4 sm:overflow-visible sm:rounded-none sm:border-0"
            >
              {employers.map((c) => (
                <li key={c} className="flex items-center justify-center min-h-[3.75rem] max-sm:bg-darkBg sm:justify-start sm:min-h-[2.25rem]">
                  <CompanyLogo company={c} scale={0.85} />
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials: plain text, kept for screeners */}
          <p className="text-[0.8125rem] md:text-xs dark:text-gray-400 text-slate-600">
            CSPO® · Google GA4 · Productsup Expert · Former software engineer
          </p>
        </div>

        {/* ── Photo column (desktop; phones get the round photo beside the name) ── */}
        <div className="hidden md:flex justify-center md:justify-end">
          <div className="relative w-full md:w-auto">
            {/* Ambient glow, desktop only, the one decorative flourish */}
            <div className="absolute -inset-6 bg-accent/8 rounded-3xl blur-3xl hidden md:block" />

            {/* Accent line, desktop only */}
            <div className="hero-accent-line hidden md:block" />

            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden border dark:border-gray-700/60 border-slate-200 shadow-2xl">
              <img
                src="me.jpg"
                alt="Priyanshu Pushpam"
                className="w-full h-full object-cover object-top select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Hero;
