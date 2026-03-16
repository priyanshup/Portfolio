/**
 * sections/StatsBar.jsx
 *
 * Continuous rAF carousel, no arrows.
 * Stats are not clickable so mobile tap-to-slow is active.
 * Numbers wrapped in glass-metric for the accent-tinted glass highlight.
 *
 * Gap fix: glass-metric uses w-full so every cell is the same width
 * and the px-3 padding on each slot produces consistent gaps.
 */

import Carousel from '../components/ui/Carousel';
import { stats } from '../data/stats';

const StatsBar = () => (
  <section className="border-y border-gray-900 bg-cardBg/10 py-5 md:py-10 px-6">
    <div className="max-w-5xl mx-auto">
      <Carousel
        items={stats}
        desktopItems={4}
        tabletItems={3}
        mobileItems={2}
        autoPlay
        desktopSpeed={38}
        hoverSpeed={11}
        mobileSpeed={28}
        tapSlowMultiplier={0.25}
        clickable={false}
        showArrows={false}
        disableSwipe={true}
        renderItem={(s) => (
          <div className="text-center py-2">
            {/* Full-width wrapper ensures consistent slot sizing */}
            <div className="glass-metric w-full py-3 px-2">
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent">
                {s.val}
              </h3>
            </div>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mt-2 font-mono-pp">
              {s.label}
            </p>
          </div>
        )}
      />
    </div>
  </section>
);

export default StatsBar;