import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getPageTransition, getPageVariants } from './motionPresets';

interface AnimatedPageTransitionProps {
  viewKey: string;
  children: React.ReactNode;
}

export const AnimatedPageTransition: React.FC<AnimatedPageTransitionProps> = ({
  viewKey,
  children,
}) => {
  const reducedMotion = useReducedMotion();
  const variants = getPageVariants(reducedMotion);
  const transition = getPageTransition(reducedMotion);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
