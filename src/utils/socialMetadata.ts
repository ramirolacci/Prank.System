import { PrankConfig, PRANK_TYPE_LABELS } from '../types/prank';
import { APP_THEMES } from './themes';
import { isBrowser } from '../hooks/useStorage';
import { encodeConfig } from './url';

export interface SocialMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
  themeColor: string;
  siteName: string;
  type: 'website' | 'article';
}

const SITE_NAME = 'PrankForge';
const DEFAULT_TITLE = 'PrankForge — Bromas visuales inofensivas';
const DEFAULT_DESCRIPTION =
  'Creá y compartí simulaciones de pantalla: errores, actualizaciones y glitches. 100% inofensivo, siempre con botón de salida.';

export function getDefaultOgImageUrl(): string {
  if (!isBrowser()) return '/og-default.svg';
  return new URL('/og-default.svg', window.location.origin).href;
}

export function getAbsoluteUrl(path = ''): string {
  if (!isBrowser()) return path || '/';
  return new URL(path || window.location.pathname, window.location.origin).href;
}

export function buildSocialMetadata(config?: PrankConfig | null, shareUrl?: string): SocialMetadata {
  const url = shareUrl || (isBrowser() ? window.location.href.split('?')[0] : '/');
  const themeColor = config?.accentColor ?? '#8b5cf6';

  if (!config) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      image: getDefaultOgImageUrl(),
      url,
      themeColor,
      siteName: SITE_NAME,
      type: 'website',
    };
  }

  // Handle Link Disguise Presets
  if (config.linkDisguise && config.linkDisguise !== 'none') {
    switch (config.linkDisguise) {
      case 'pdf-doc':
        return {
          title: '📄 Documento_Oficial_Firmado_2026.pdf',
          description: 'Documento adjunto en formato PDF seguro. Hacé clic para abrir y descargar.',
          image: getDefaultOgImageUrl(),
          url: shareUrl || getSocialPreviewUrl(config),
          themeColor: '#ef4444',
          siteName: 'PDF Cloud Reader',
          type: 'article',
        };
      case 'bank-transfer':
        return {
          title: '💸 Comprobante de Transferencia Acreditada ($150.000)',
          description: 'Se ha acreditado exitosamente un pago en tu cuenta. Ver detalles de la operación.',
          image: getDefaultOgImageUrl(),
          url: shareUrl || getSocialPreviewUrl(config),
          themeColor: '#10b981',
          siteName: 'Banca Móvil',
          type: 'article',
        };
      case 'giveaway':
        return {
          title: '🎁 ¡Pase VIP y Premio Exclusivo Confirmado!',
          description: 'Reclamá tu cupón de regalo oficial antes de que expire en 24 horas.',
          image: getDefaultOgImageUrl(),
          url: shareUrl || getSocialPreviewUrl(config),
          themeColor: '#f59e0b',
          siteName: 'Rewards Hub',
          type: 'article',
        };
      case 'whatsapp-backup':
        return {
          title: '💬 WhatsApp Backup & Media Export',
          description: 'Copia de seguridad del historial de mensajes lista para ver en el navegador.',
          image: getDefaultOgImageUrl(),
          url: shareUrl || getSocialPreviewUrl(config),
          themeColor: '#25d366',
          siteName: 'WhatsApp Web',
          type: 'article',
        };
    }
  }

  const typeLabel = PRANK_TYPE_LABELS[config.prankType] ?? 'Broma visual';
  const themeLabel =
    APP_THEMES.find((t) => t.value === config.appTheme)?.label ?? config.appTheme;
  const title = config.title
    ? `${config.title}`
    : `${typeLabel}`;
  const description =
    config.message?.slice(0, 160) ||
    `Simulación visual interactiva.`;

  const socialPreviewUrl = getSocialPreviewUrl(config);

  return {
    title,
    description,
    image: getDefaultOgImageUrl(),
    url: shareUrl || socialPreviewUrl,
    themeColor,
    siteName: SITE_NAME,
    type: 'article',
  };
}

export function getSocialPreviewUrl(config: PrankConfig): string {
  if (!isBrowser()) return '/';
  const code = encodeConfig(config);
  return `${window.location.origin}${window.location.pathname}?p=${code}&mode=social`;
}
