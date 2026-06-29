import { useState, useEffect, useRef } from 'react';

const useIsMobile = () => {
  const mqRef = useRef(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)') : null
  );

  const [mobile, setMobile] = useState(() => mqRef.current ? mqRef.current.matches : false);

  useEffect(() => {
    const mq = mqRef.current;
    if (!mq) return;
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return mobile;
};

export default useIsMobile;
