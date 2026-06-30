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

  const typeLabel = PRANK_TYPE_LABELS[config.prankType] ?? 'Broma visual';
  const themeLabel =
    APP_THEMES.find((t) => t.value === config.appTheme)?.label ?? config.appTheme;
  const title = config.title
    ? `${config.title} | ${SITE_NAME}`
    : `${typeLabel} | ${SITE_NAME}`;
  const description =
    config.message?.slice(0, 160) ||
    `Broma visual tipo ${typeLabel}. Tema ${themeLabel}. Simulación inofensiva en el navegador.`;

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
