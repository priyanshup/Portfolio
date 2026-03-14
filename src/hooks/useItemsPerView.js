/**
 * hooks/useItemsPerView.js
 *
 * Returns the number of carousel items that fit based on viewport width.
 * Re-evaluates on window resize.
 *
 * Breakpoints mirror Tailwind defaults:
 *   < 640px  → mobile
 *   640–1023 → tablet
 *   ≥ 1024   → desktop
 */

import { useState, useEffect, useCallback } from 'react';

const useItemsPerView = (desktop, tablet, mobile) => {
  const get = useCallback(() => {
    if (typeof window === 'undefined') return desktop;
    if (window.innerWidth < 640)  return mobile;
    if (window.innerWidth < 1024) return tablet;
    return desktop;
  }, [desktop, tablet, mobile]);

  const [ipv, setIpv] = useState(get);

  useEffect(() => {
    const handler = () => setIpv(get());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [get]);

  return ipv;
};

export default useItemsPerView;
