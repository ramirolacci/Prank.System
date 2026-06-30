import React from 'react';

interface MobileSafeLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper with safe-area insets for notched phones and PWA standalone mode.
 */
export const MobileSafeLayout: React.FC<MobileSafeLayoutProps> = ({
  children,
  className = '',
}) => {
  return <div className={`mobile-safe-layout ${className}`.trim()}>{children}</div>;
};
