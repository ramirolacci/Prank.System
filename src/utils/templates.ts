import { PrankConfig } from '../types/prank';

export interface PrankTemplate {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji representing the template
  config: PrankConfig;
}

export const PRANK_TEMPLATES: PrankTemplate[] = [
  {
    id: 'win11-update',
    name: 'Actualización Windows 11',
    description: 'Simula una actualización eterna de Windows 11 con porcentaje cambiante.',
    icon: '💻',
    config: {
      prankType: 'fake-update',
      title: 'Instalando actualizaciones del sistema',
      message: 'No apagues el equipo. Esto podría tardar unos minutos.',
      intensity: 5,
      duration: 15,
      theme: 'windows-11',
      fullscreen: true,
      revealText: '¡Tu sistema está al día! ... Mentira, es una broma 😜',
      targetName: '',
      showReveal: true
    }
  },
  {
    id: 'bsod',
    name: 'Pantalla Azul (BSOD)',
    description: 'La clásica pantalla azul de la muerte de Windows con código QR.',
    icon: '🔵',
    config: {
      prankType: 'fake-error',
      title: 'CRITICAL_PROCESS_DIED',
      message: 'Se ha producido un problema en su dispositivo y necesita reiniciarse. Estamos recopilando información sobre el error.',
      intensity: 6,
      duration: 12,
      theme: 'bsod',
      fullscreen: true,
      revealText: '¡Tu computadora está sana y salva! 😂',
      targetName: '',
      showReveal: true
    }
  },
  {
    id: 'macos-panic',
    name: 'Mac Kernel Panic',
    description: 'Pantalla de reinicio forzado de Apple en varios idiomas.',
    icon: '🍎',
    config: {
      prankType: 'fake-error',
      title: 'Kernel Panic',
      message: 'You need to restart your computer. Hold down the Power button for several seconds.',
      intensity: 4,
      duration: 15,
      theme: 'macos-panic',
      fullscreen: true,
      revealText: '¡Mac OS recuperado! Todo bajo control 🍏☕',
      targetName: '',
      showReveal: true
    }
  },
  {
    id: 'matrix-glitch',
    name: 'Invasión Hacker',
    description: 'Filtros de distorsión, terminal Cyberpunk y cursor loco.',
    icon: '⚡',
    config: {
      prankType: 'glitch',
      title: 'ALERTA DE SEGURIDAD: INTRUSIÓN',
      message: 'Infiltrando cortafuegos principales... Descargando memoria caché.',
      intensity: 7,
      duration: 10,
      theme: 'cyberpunk',
      fullscreen: true,
      revealText: '¡Hackeado! Jaja, broma inofensiva 🤖',
      targetName: '',
      showReveal: true
    }
  },
  {
    id: 'free-ram',
    name: 'Descargar RAM Gratis',
    description: 'Barra de carga infinita con mensajes de optimización absurdos.',
    icon: '🐏',
    config: {
      prankType: 'loading',
      title: 'Descargando 64GB DDR5 RAM Gratis',
      message: 'Asignando transistores en la nube molecular...',
      intensity: 5,
      duration: 12,
      theme: 'downloading-ram',
      fullscreen: true,
      revealText: '¡Disfruta tu nueva memoria RAM mental! 🧠🐏',
      targetName: '',
      showReveal: true
    }
  }
];
export type { PrankConfig };
