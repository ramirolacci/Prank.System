import { useState, useEffect } from 'react';

export function useStandaloneMode(): {
  isStandalone: boolean;
  isIOSStandalone: boolean;
} {
  const [isStandalone, setIsStandalone] = useState(() => detectStandalone());

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)');
    const onChange = () => setIsStandalone(detectStandalone());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const isIOSStandalone =
    isStandalone && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return { isStandalone, isIOSStandalone };
}

function detectStandalone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
