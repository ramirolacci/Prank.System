/**
 * PWA manifest configuration — single source of truth.
 * Used by vite-plugin-pwa in vite.config.ts
 */
export const APP_MANIFEST = {
  name: 'PrankForge — Creador de Bromas Visuales',
  short_name: 'PrankForge',
  description:
    'Creá y compartí bromas visuales inofensivas: pantallas de error, actualizaciones falsas y más. 100% simulación en el navegador.',
  start_url: '/',
  scope: '/',
  display: 'standalone' as const,
  orientation: 'portrait-primary' as const,
  theme_color: '#8b5cf6',
  background_color: '#0a0b10',
  lang: 'es',
  dir: 'ltr' as const,
  categories: ['entertainment', 'utilities'],
  icons: [
    {
      src: 'pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any',
    },
    {
      src: 'pwa-maskable-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
};

export const PWA_INSTALL_DISMISS_KEY = 'prankforge_pwa_install_dismissed_v1';
