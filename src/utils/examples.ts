import { PrankConfig, PrankType } from '../types/prank';
import { getDefaultThemeForType } from './themes';

const BASE_DEFAULTS = {
  intensity: 5,
  duration: 12,
  fullscreen: true,
  showReveal: true,
  targetName: '',
  appTheme: 'dark' as const,
  visualIntensity: 'medium' as const,
  accentColor: '#8b5cf6',
  soundEnabled: false,
  vibrationEnabled: true,
  escapeMode: 'stealth' as const,
  linkDisguise: 'none' as const,
};

export const PRANK_EXAMPLES: Record<PrankType, Omit<PrankConfig, 'prankType'>> = {
  'fake-update': {
    ...BASE_DEFAULTS,
    title: 'Instalando actualizaciones del sistema',
    message: 'No apagues el equipo. Esto podría tardar unos minutos.',
    theme: 'windows-11',
    revealText: '¡Tu PC está al día! ... Mentira, era una broma 😜',
  },
  'fake-error': {
    ...BASE_DEFAULTS,
    title: 'CRITICAL_PROCESS_DIED',
    message: 'Se ha producido un problema y tu dispositivo necesita reiniciarse.',
    theme: 'bsod',
    intensity: 6,
    revealText: '¡Tranqui! Tu computadora está perfectamente bien 😂',
  },
  'glitch': {
    ...BASE_DEFAULTS,
    title: 'ALERTA DE SEGURIDAD: INTRUSIÓN DETECTADA',
    message: 'Infiltrando cortafuegos... Descargando memoria caché del sistema.',
    theme: 'cyberpunk',
    intensity: 8,
    visualIntensity: 'high',
    revealText: '¡Hackeado! Nah, solo era una broma inofensiva 🤖',
  },
  'loading': {
    ...BASE_DEFAULTS,
    title: 'Descargando 64 GB de RAM gratis',
    message: 'Asignando transistores en la nube molecular...',
    theme: 'downloading-ram',
    revealText: '¡Disfrutá tu nueva RAM mental! 🧠🐏',
  },
  'fbi-warning': {
    ...BASE_DEFAULTS,
    title: '¡DISPOSITIVO BLOQUEADO POR LA POLICÍA NACIONAL!',
    message: 'Se ha detectado tráfico de archivos maliciosos no autorizados.',
    theme: 'fbi-red',
    intensity: 8,
    linkDisguise: 'pdf-doc',
    revealText: '¡Tranqui! Tu dispositivo está 100% libre de multas 🚔😂',
  },
  'whatsapp-hacked': {
    ...BASE_DEFAULTS,
    title: '¡NUEVO DISPOSITIVO VINCULADO!',
    message: 'Se ha iniciado sesión desde una IP desconocida en San Pablo, Brasil.',
    theme: 'whatsapp-green',
    intensity: 8,
    linkDisguise: 'whatsapp-backup',
    revealText: '¡Tus chats están 100% seguros y privados! 💬🔐',
  },
  'surprise-reveal': {
    ...BASE_DEFAULTS,
    title: '¡Caíste en la broma!',
    message: 'Tu dispositivo está perfectamente bien.',
    theme: 'default',
    duration: 5,
    revealText: '¡Fue todo una broma! Tu dispositivo está bien.',
  },
};

export function getExampleConfig(type: PrankType): PrankConfig {
  const example = PRANK_EXAMPLES[type];
  return {
    prankType: type,
    ...example,
    theme: example.theme || getDefaultThemeForType(type),
  };
}

export function getRandomTemplateConfig(): PrankConfig {
  const types: PrankType[] = [
    'fake-update',
    'fake-error',
    'glitch',
    'loading',
    'fbi-warning',
    'whatsapp-hacked',
  ];
  const randomType = types[Math.floor(Math.random() * types.length)];
  return getExampleConfig(randomType);
}
