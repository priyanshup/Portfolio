/**
 * sections/Hero.jsx
 *
 * Page header — name, tagline, badge tags, CTA buttons, profile photo.
 *
 * Font-size uses min(9vw, 7rem) so the name scales fluidly
 * and never overflows or gets cropped on any screen width.
 *
 * Profile photo:
 *   - object-top anchors crop to the face (never centre-cropped)
 *   - md:grayscale → hover reveals colour (desktop only; mobile always colour)
 */

import { CONFIG } from '../config';

const Hero = () => (
  <header
    id="about"
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16"
  >
    {/* ── Text column ── */}
    <div className="flex-1 space-y-6 md:space-y-8 text-left w-full">

      {/* Availability badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono-pp">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        Available for Strategic Technical Roles
      </div>

      {/* Name */}
      <h1
        className="font-display font-extrabold tracking-tighter leading-[0.95]"
        style={{ fontSize: 'min(9vw, 7rem)' }}
      >
        PRIYANSHU<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
          PUSHPAM
        </span>
      </h1>

      {/* Tagline */}
      <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl border-l-2 border-gray-800 pl-6">
        A Technical Product Leader with 10 years of experience. I bridge the gap between
        C-suite strategy and high-concurrency engineering — scaling platforms from zero to global.
      </p>

      {/* Credential tags */}
      <div className="flex flex-wrap gap-3">
        {['CSPO®', 'Google GA4', 'Productsup Expert', 'Ex-Software Engineer'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-cardBg border border-gray-800 rounded text-[10px] font-bold uppercase tracking-widest text-gray-400 font-mono-pp"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="pt-2 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="bg-white text-darkBg px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-darkBg transition-all duration-300"
        >
          View My Work
        </a>
        <a
          href="#journey"
          className="border border-gray-700 text-gray-300 px-8 py-4 rounded-full font-bold hover:border-gray-500 hover:text-white transition-all duration-300"
        >
          My Journey
        </a>
      </div>
    </div>

    {/* ── Photo column ── */}
    <div className="flex-1 flex justify-center">
      <div className="relative group">
        {/* Glow */}
        <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000" />

        <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96">
          {/* Decorative borders */}
          <div className="absolute inset-0 border border-gray-800 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500" />
          <div className="absolute inset-0 border border-accent/30 rounded-2xl -rotate-3 group-hover:-rotate-12 transition-transform duration-500" />

          {/* Photo */}
          <div className="relative w-full h-full bg-cardBg rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
            <img
              src="me.jpg"
              alt="Priyanshu Pushpam"
              className="w-full h-full object-cover object-top transition duration-700 scale-105 group-hover:scale-100 md:grayscale md:group-hover:grayscale-0 select-none pointer-events-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Profile+Photo'; }}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);

export default Hero;