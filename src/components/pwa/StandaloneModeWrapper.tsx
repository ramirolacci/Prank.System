import React, { useEffect } from 'react';
import { useStandaloneMode } from '../../hooks/useStandaloneMode';

interface StandaloneModeWrapperProps {
  children: React.ReactNode;
}

/**
 * Applies standalone-specific classes when running as installed PWA.
 */
export const StandaloneModeWrapper: React.FC<StandaloneModeWrapperProps> = ({ children }) => {
  const { isStandalone } = useStandaloneMode();

  useEffect(() => {
    document.documentElement.classList.toggle('standalone-mode', isStandalone);
    document.body.classList.toggle('standalone-mode', isStandalone);
    return () => {
      document.documentElement.classList.remove('standalone-mode');
      document.body.classList.remove('standalone-mode');
    };
  }, [isStandalone]);

  return (
    <div className={isStandalone ? 'standalone-root' : undefined} data-standalone={isStandalone}>
      {children}
    </div>
  );
};
