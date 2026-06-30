import React from 'react';
import { MotionConfig } from 'framer-motion';

interface MotionConfigProviderProps {
  children: React.ReactNode;
}

/**
 * Global Framer Motion config — respects OS "reduce motion" via reducedMotion="user".
 */
export const MotionConfigProvider: React.FC<MotionConfigProviderProps> = ({ children }) => {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </MotionConfig>
  );
};

/** Alias requested in spec */
export { MotionConfigProvider as MotionWrapper };
