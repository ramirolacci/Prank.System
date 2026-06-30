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
};

/**
 * Encodes a PrankConfig object to a URL-safe Base64 string
 */
export function encodeConfig(config: PrankConfig): string {
  try {
    const jsonStr = JSON.stringify(config);
    // Base64 encoding with UTF-8 safety
    const base64 = btoa(
      encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      })
    );
    // Make URL safe
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
    // Restore base64 padding
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    // Decode with UTF-8 safety
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonStr) as PrankConfig;
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
