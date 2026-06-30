import { Transition, Variants } from 'framer-motion';

const REDUCED_DURATION = 0.12;

export function getPageTransition(reducedMotion: boolean): Transition {
  return reducedMotion
    ? { duration: REDUCED_DURATION, ease: 'easeOut' }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] };
}

export function getPageVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 0.92 },
      animate: { opacity: 1 },
      exit: { opacity: 0.92 },
    };
  }
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };
}

export function getCardVariants(
  reducedMotion: boolean,
  index = 0
): {
  initial: object;
  animate: object;
  transition: Transition;
} {
  if (reducedMotion) {
    return {
      initial: { opacity: 0.94 },
      animate: { opacity: 1 },
      transition: { duration: REDUCED_DURATION },
    };
  }
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.04, duration: 0.25 },
  };
}

/** Safe whileTap for buttons — no scale when reduced motion */
export function getTapProps(reducedMotion: boolean) {
  return reducedMotion ? {} : { whileTap: { scale: 0.97 } };
}
