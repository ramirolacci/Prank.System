import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedPageTransitionProps {
  viewKey: string;
  children: React.ReactNode;
}

export const AnimatedPageTransition: React.FC<AnimatedPageTransitionProps> = ({
  viewKey,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
