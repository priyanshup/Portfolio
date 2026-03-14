/**
 * sections/StatsBar.jsx
 *
 * Horizontal band of headline metrics displayed as a carousel.
 * Auto-scrolls only when there are more stats than fit on screen.
 * Add stats freely in data/stats.js — the carousel handles any count.
 */

import Carousel from '../components/ui/Carousel';
import { stats } from '../data/stats';

const StatsBar = () => (
  <section className="border-y border-gray-900 bg-cardBg/10 py-10 px-6">
    <div className="max-w-5xl mx-auto">
      <Carousel
        items={stats}
        desktopItems={4}
        tabletItems={3}
        mobileItems={2}
        autoPlay={stats.length > 4}
        interval={3500}
        renderItem={(s) => (
          <div className="text-center py-2 px-4">
            <h3 className="font-display text-3xl font-bold text-accent">{s.val}</h3>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1 font-mono-pp">
              {s.label}
            </p>
          </div>
        )}
      />
    </div>
  </section>
);

export default StatsBar;
