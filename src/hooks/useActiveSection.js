import { useState, useEffect } from 'react';

/**
 * Returns the id of the section currently in the reading band of the
 * viewport (roughly the upper-middle), or null. Used only to highlight the
 * matching nav link; it never touches the URL.
 *
 *   ids      – section element ids, in page order (pass a stable array)
 *   enabled  – false on pages that don't render those sections
 */
const useActiveSection = (ids, enabled = true) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const inBand = new Map();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => inBand.set(e.target.id, e.isIntersecting));
        const current = els.filter((el) => inBand.get(el.id)).pop();
        setActive(current ? current.id : null);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
};

export default useActiveSection;
