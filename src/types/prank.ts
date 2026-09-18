export type PrankType =
  | 'fake-update'
  | 'fake-error'
  | 'glitch'
  | 'loading'
  | 'surprise-reveal'
  | 'fbi-warning'
  | 'battery-explosion'
  | 'broken-glass'
  | 'whatsapp-hacked';

export type AppTheme = 'dark' | 'neon' | 'terminal' | 'retro' | 'minimal';

export type VisualIntensity = 'low' | 'medium' | 'high';

export type EscapeMode = 'stealth' | 'button' | 'gestures';

export type LinkDisguise = 'none' | 'pdf-doc' | 'bank-transfer' | 'giveaway' | 'whatsapp-backup';

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
  // PrankForge v2.0 High-Impact Additions
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  escapeMode: EscapeMode;
  linkDisguise: LinkDisguise;
}

export const PRANK_TYPE_LABELS: Record<PrankType, string> = {
  'fake-update': 'Actualización falsa',
  'fake-error': 'Error de sistema',
  'glitch': 'Glitch / Hacker',
  'loading': 'Carga infinita',
  'surprise-reveal': 'Revelación sorpresa',
  'fbi-warning': 'Alerta FBI / Policial',
  'battery-explosion': 'Batería 98°C / Peligro',
  'broken-glass': 'Pantalla Rota / Cristal',
  'whatsapp-hacked': 'WhatsApp Clonado / Hack',
};

