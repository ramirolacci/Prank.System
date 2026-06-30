export type PrankType = 'fake-update' | 'fake-error' | 'glitch' | 'loading' | 'surprise-reveal';

export interface PrankConfig {
  prankType: PrankType;
  title: string;
  message: string;
  intensity: number; // Scale of 1 to 10
  duration: number;  // Duration in seconds (0 = infinite)
  theme: string;     // Theme variant (depends on prankType)
  fullscreen: boolean;
  revealText: string;
  targetName: string;
  showReveal: boolean; // Whether to trigger a surprise reveal after duration
}
