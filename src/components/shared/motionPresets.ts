import { Transition, Variants } from 'framer-motion';

export function getPageTransition(reducedMotion: boolean): Transition {
  return reducedMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.4, 0, 0.2, 1] };
}

export function getPageVariants(reducedMotion: boolean): Variants {
  if (reducedMotion) {
    return {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
    };
  }
  return {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };
}

export function getCardVariants(reducedMotion: boolean, index = 0): {
  initial: object;
  animate: object;
  transition: Transition;
} {
  if (reducedMotion) {
    return { initial: {}, animate: {}, transition: { duration: 0 } };
  }
  return {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.04, duration: 0.25 },
  };
}
