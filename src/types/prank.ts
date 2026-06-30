export type PrankType = 'fake-update' | 'fake-error' | 'glitch' | 'loading' | 'surprise-reveal';

export type AppTheme = 'dark' | 'neon' | 'terminal' | 'retro' | 'minimal';

export type VisualIntensity = 'low' | 'medium' | 'high';

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
  showReveal: boolean;
  appTheme: AppTheme;
  visualIntensity: VisualIntensity;
  accentColor: string;
}

export const PRANK_TYPE_LABELS: Record<PrankType, string> = {
  'fake-update': 'Actualización falsa',
  'fake-error': 'Error de sistema',
  'glitch': 'Glitch / Hacker',
  'loading': 'Carga infinita',
  'surprise-reveal': 'Revelación sorpresa',
};
