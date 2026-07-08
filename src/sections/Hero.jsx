/**
 * sections/Hero.jsx
 *
 * Full-viewport header — CSS Grid layout (not flex).
 *
 * Grid is used instead of flex because explicit column widths prevent
 * the heading text from ever bleeding into the photo column. The photo
 * column has a fixed pixel width; the text column takes the remainder.
 * Overflow within each column is contained automatically.
 *
 * Font size uses clamp() tuned to Plus Jakarta Sans, which is narrower
 * than Syne — allowing a bolder size without overflow.
 *
 * Photo: editorial proportions, no rotation tricks, ambient glow always
 * visible. Vertical accent line anchored to the left side of the photo.
 */

import { CONFIG } from '../config';

const Hero = () => (
  <header
    id="about"
    className="relative min-h-screen flex items-center pt-24 pb-20 px-6 max-w-6xl mx-auto"
  >
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-8 md:gap-12 lg:gap-20 w-full items-center">

      {/* ── Text column ── */}
      <div className="space-y-7 min-w-0">

        {/* Availability badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono-pp">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Available for Strategic Technical Roles
        </div>

        {/* Name — uses clamp tuned to Plus Jakarta Sans (narrower than Syne) */}
        <div>
          <h1
            className="font-display font-extrabold tracking-tight leading-[0.90] dark:text-white text-slate-900"
            style={{ fontSize: 'clamp(2.75rem, 6.5vw, 6rem)' }}
          >
            PRIYANSHU
            <br />
            PUSHPAM
          </h1>

          <div className="mt-5 flex items-center gap-4">
            <div className="h-px w-10 dark:bg-gray-700 bg-slate-300 flex-shrink-0" />
            <p className="font-mono-pp text-[11px] uppercase tracking-[0.22em] dark:text-gray-400 text-slate-600">
              <span className="sm:hidden">Product Leader · 10 Years</span>
              <span className="hidden sm:inline">Technical Product Leader · 10 Years</span>
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-base md:text-lg dark:text-gray-300 text-slate-600 leading-relaxed max-w-lg">
          I bridge C-suite strategy and high-concurrency engineering —
          scaling platforms from zero to global.
        </p>

        {/* Credential tags */}
        <div className="flex flex-wrap gap-2">
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
        <div className="pt-1 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="bg-accent text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-emerald-400 hover:shadow-[0_0_28px_rgba(16,185,129,0.4)] transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="#journey"
            className="border dark:border-gray-700 border-slate-300 dark:text-gray-300 text-slate-700 px-7 py-3.5 rounded-full font-semibold text-sm dark:hover:border-gray-500 hover:border-slate-400 dark:hover:text-white hover:text-slate-900 transition-all duration-300"
          >
            My Journey
          </a>
        </div>
      </div>

      {/* ── Photo column ── */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-full md:w-auto">
          {/* Ambient glow — desktop only */}
          <div className="absolute -inset-6 bg-accent/8 rounded-3xl blur-3xl hidden md:block" />

          {/* Accent line — desktop only */}
          <div className="hero-accent-line hidden md:block" />

          {/* Photo */}
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

export default Hero;
