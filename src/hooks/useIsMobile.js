/**
 * hooks/useIsMobile.js
 *
 * Returns true when the viewport is below the mobile breakpoint (640px).
 * Used to switch between carousel and grid layouts at runtime.
 */

import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return mobile;
};

export default useIsMobile;
