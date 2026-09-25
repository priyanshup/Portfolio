import { useState, useEffect } from 'react';

/**
 * Tracks a CSS media query. The first render already has the right answer
 * (read synchronously), so components that collapse on phones never flash
 * open-then-closed.
 *
 *   const isDesktop = useMediaQuery('(min-width: 768px)');
 *
 * The site's own breakpoint for "phone layout" is below 768px (Tailwind `md`).
 */
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};

export const DESKTOP_QUERY = '(min-width: 768px)';

export default useMediaQuery;
