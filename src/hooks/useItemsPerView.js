import { useState, useEffect, useCallback, useRef } from 'react';

const useItemsPerView = (desktop, tablet, mobile) => {
  const mobileQ = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)')  : null
  );
  const tabletQ = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)') : null
  );

  const get = useCallback(() => {
    if (!mobileQ.current) return desktop;
    if (mobileQ.current.matches) return mobile;
    if (tabletQ.current?.matches) return tablet;
    return desktop;
  }, [desktop, tablet, mobile]);

  const [ipv, setIpv] = useState(get);

  useEffect(() => {
    const handler = () => setIpv(get());
    mobileQ.current?.addEventListener('change', handler);
    tabletQ.current?.addEventListener('change', handler);
    return () => {
      mobileQ.current?.removeEventListener('change', handler);
      tabletQ.current?.removeEventListener('change', handler);
    };
  }, [get]);

  return ipv;
};

export default useItemsPerView;
