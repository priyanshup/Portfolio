/**
 * sections/Certifications.jsx
 *
 * Certification cards with clickable certificate links.
 * Data lives in data/certifications.js.
 *
 * Desktop/tablet: 4-column grid
 * Mobile:         carousel (1 card at a time)
 *
 * The MutationObserver in useScrollReveal (hooks/useScrollReveal.js)
 * observes newly mounted .reveal elements when the layout switches,
 * preventing the "disappearing cards on resize" bug.
 */

import SectionHeader from '../components/ui/SectionHeader';
import Carousel from '../components/ui/Carousel';
import { ExtLink } from '../components/ui/Icons';
import { useIsMobile } from '../hooks';
import { certifications } from '../data/certifications';

/* ── Cert card — shared between grid and carousel ── */
const CertCard = ({ c }) => {
  const inner = (
    <>
      <p className="font-display text-2xl font-extrabold text-accent mb-3">{c.short}</p>
      <p className="text-white text-xs font-bold leading-tight">{c.full}</p>
      <p className="font-mono-pp text-gray-400 text-[10px] uppercase tracking-widest mt-2">{c.issuer}</p>
      <p className="font-mono-pp text-gray-500 text-[10px] mt-1">{c.year}</p>
      {c.link ? (
        <span className="font-mono-pp text-[10px] text-accent mt-3 inline-flex items-center gap-1 group-hover:text-white transition-colors">
          View Certificate <ExtLink />
        </span>
      ) : (
        <span className="font-mono-pp text-[10px] text-gray-700 mt-3 inline-block uppercase tracking-widest">
          Link coming soon
        </span>
      )}
    </>
  );

  const cls = "p-6 rounded-2xl bg-cardBg border border-gray-800 text-center hover:border-gray-600 transition-colors flex flex-col items-center group h-full";

  return c.link ? (
    <a href={c.link} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
};

/* ── Section ── */
const Certifications = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto border-t border-gray-900">
      <SectionHeader
        eyebrow="Credentials"
        title="Certifications"
        subtitle="Formal credentials across product management, analytics, and platform expertise."
        center
      />

      {isMobile ? (
        <div className="reveal">
          <Carousel
            items={certifications}
            desktopItems={1}
            tabletItems={1}
            mobileItems={1}
            autoPlay={false}
            renderItem={(c) => <CertCard c={c} />}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {certifications.map((c, i) => (
            <div key={i} className={`reveal d${i + 1}`}>
              <CertCard c={c} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Certifications;
