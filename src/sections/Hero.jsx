/**
 * sections/Hero.jsx
 *
 * Full-viewport header — editorial layout.
 *
 * Layout:
 *   Left column  — name, role line, tagline, credential tags, CTAs.
 *   Right column — photo (full-height, no rotating borders).
 *
 * Name treatment:
 *   Both lines full-weight white — no gradient downgrade on the surname.
 *   Fluid font size via clamp() so it never overflows any screen.
 *
 * Photo treatment:
 *   Larger, always colour, no decorative spinning borders.
 *   Vertical accent gradient line anchored to the left of the photo.
 *   Ambient glow always visible (not only on hover).
 *
 * CTA primary:
 *   Solid accent fill with a glow box-shadow on hover.
 */

import { CONFIG } from '../config';

const Hero = () => (
  <header
    id="about"
    className="relative min-h-screen flex flex-col justify-center pt-24 pb-20 px-6 max-w-6xl mx-auto md:flex-row md:items-center gap-12 md:gap-16 lg:gap-24"
  >
    {/* ── Text column ── */}
    <div className="flex-1 space-y-7 md:space-y-8 text-left w-full">

      {/* Availability badge */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono-pp">
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        Available for Strategic Technical Roles
      </div>

      {/* Name — both lines full weight, no gradient */}
      <div>
        <h1
          className="font-display font-extrabold tracking-tighter leading-[0.88] dark:text-white text-slate-900"
          style={{ fontSize: 'clamp(3.25rem, 10.5vw, 8.5rem)' }}
        >
          PRIYANSHU
          <br />
          PUSHPAM
        </h1>

        {/* Role line with decorative rule */}
        <div className="mt-5 flex items-center gap-4">
          <div className="h-px w-10 dark:bg-gray-700 bg-slate-300 flex-shrink-0" />
          <p className="font-mono-pp text-[11px] uppercase tracking-[0.22em] dark:text-gray-500 text-slate-500">
            Technical Product Leader · 10 Years
          </p>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-lg md:text-xl dark:text-gray-300 text-slate-700 leading-relaxed max-w-lg">
        I bridge C-suite strategy and high-concurrency engineering —
        scaling platforms from zero to global.
      </p>

      {/* Credential tags */}
      <div className="flex flex-wrap gap-2.5">
        {['CSPO®', 'Google GA4', 'Productsup Expert', 'Ex-Software Engineer'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-cardBg border dark:border-gray-800 border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-widest dark:text-gray-400 text-slate-500 font-mono-pp"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="pt-2 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.45)] transition-all duration-300 hover:-translate-y-0.5"
        >
          View My Work
        </a>
        <a
          href="#journey"
          className="border dark:border-gray-700 border-slate-300 dark:text-gray-300 text-slate-700 px-8 py-4 rounded-full font-bold dark:hover:border-gray-500 hover:border-slate-400 dark:hover:text-white hover:text-slate-900 transition-all duration-300 hover:-translate-y-0.5"
        >
          My Journey
        </a>
      </div>
    </div>

    {/* ── Photo column ── */}
    <div className="flex-shrink-0 flex justify-center md:justify-end">
      <div className="relative">
        {/* Ambient glow — always present */}
        <div className="absolute -inset-8 bg-accent/10 rounded-3xl blur-3xl" />

        {/* Left accent line */}
        <div className="hero-accent-line" />

        {/* Photo container — editorial proportions, no rotation tricks */}
        <div className="relative w-72 h-[420px] sm:w-80 sm:h-[460px] md:w-[22rem] md:h-[520px] rounded-2xl overflow-hidden border dark:border-gray-700/60 border-slate-200 shadow-2xl">
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
  </header>
);

export default Hero;
