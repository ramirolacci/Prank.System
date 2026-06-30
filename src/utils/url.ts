import { PrankConfig } from '../types/prank';

export const DEFAULT_CONFIG: PrankConfig = {
  prankType: 'fake-update',
  title: 'Instalando actualizaciones de seguridad',
  message: 'Tu PC se reiniciará automáticamente. Por favor, no apagues el equipo.',
  intensity: 5,
  duration: 10,
  theme: 'windows-11',
  fullscreen: true,
  revealText: '¡Caíste en la broma! 😂',
  targetName: '',
  showReveal: true,
  appTheme: 'dark',
  visualIntensity: 'medium',
  accentColor: '#8b5cf6',
};

function stripDefaults(config: PrankConfig): Partial<PrankConfig> {
  const compact: Partial<PrankConfig> = {};
  (Object.keys(config) as (keyof PrankConfig)[]).forEach((key) => {
    if (config[key] !== DEFAULT_CONFIG[key]) {
      (compact as Record<string, unknown>)[key] = config[key];
    }
  });
  if (!compact.prankType) {
    compact.prankType = config.prankType;
  }
  return compact;
}

export function normalizeConfig(partial: Partial<PrankConfig>): PrankConfig {
  return { ...DEFAULT_CONFIG, ...partial };
}

/**
 * Encodes a PrankConfig object to a URL-safe Base64 string (compact when possible)
 */
export function encodeConfig(config: PrankConfig): string {
  try {
    const jsonStr = JSON.stringify(stripDefaults(config));
    const base64 = btoa(
      encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (e) {
    console.error('Error encoding config:', e);
    return '';
  }
}

/**
 * Decodes a URL-safe Base64 string back into a PrankConfig object
 */
export function decodeConfig(str: string): PrankConfig | null {
  if (!str) return null;
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return normalizeConfig(JSON.parse(jsonStr));
  } catch (e) {
    console.error('Error decoding config:', e);
    return null;
  }
}

/**
 * Generates the full shareable URL containing the encoded config
 */
export function generateShareUrl(config: PrankConfig): string {
  const code = encodeConfig(config);
  const origin = window.location.origin + window.location.pathname;
  return `${origin}?p=${code}`;
}

/**
 * Short display version of share URL for UI
 */
export function getShortShareDisplay(url: string): string {
  try {
    const parsed = new URL(url);
    const code = parsed.searchParams.get('p') ?? '';
    const shortCode = code.length > 24 ? `${code.slice(0, 24)}…` : code;
    return `${parsed.origin}${parsed.pathname}?p=${shortCode}`;
  } catch {
    return url.length > 48 ? `${url.slice(0, 48)}…` : url;
  }
}
