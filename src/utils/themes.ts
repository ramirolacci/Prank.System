import { AppTheme, PrankType } from '../types/prank';

export interface ThemeOption {
  value: string;
  label: string;
}

export const APP_THEMES: { value: AppTheme; label: string; description: string }[] = [
  { value: 'dark', label: 'Oscuro', description: 'Estilo creator studio clásico' },
  { value: 'neon', label: 'Neon', description: 'Colores vibrantes y brillo cian/rosa' },
  { value: 'terminal', label: 'Terminal', description: 'Verde matrix y tipografía mono' },
  { value: 'retro', label: 'Retro', description: 'Paleta 90s y bordes pixelados' },
  { value: 'minimal', label: 'Minimal', description: 'Limpio, alto contraste, sin distracciones' },
];

export const ACCENT_COLORS = [
  { value: '#8b5cf6', label: 'Violeta' },
  { value: '#06b6d4', label: 'Cian' },
  { value: '#ec4899', label: 'Rosa' },
  { value: '#10b981', label: 'Verde' },
  { value: '#f59e0b', label: 'Ámbar' },
  { value: '#ef4444', label: 'Rojo' },
];

export function getThemeOptions(type: PrankType): ThemeOption[] {
  switch (type) {
    case 'fake-update':
      return [
        { value: 'windows-11', label: 'Windows 11' },
        { value: 'windows-10', label: 'Windows 10' },
        { value: 'macos', label: 'macOS' },
        { value: 'android', label: 'Android' },
      ];
    case 'fake-error':
      return [
        { value: 'bsod', label: 'Pantalla azul (BSOD)' },
        { value: 'macos-panic', label: 'Mac Kernel Panic' },
        { value: 'critical-warning', label: 'Alerta crítica' },
        { value: 'retro-alert', label: 'Error retro (Win 98)' },
      ];
    case 'glitch':
      return [
        { value: 'cyberpunk', label: 'Cyberpunk Terminal' },
        { value: 'matrix', label: 'Matrix Digital' },
      ];
    case 'loading':
      return [
        { value: 'futuristic', label: 'Cargador futurista' },
        { value: 'windows-98', label: 'Instalador Windows 98' },
        { value: 'downloading-ram', label: 'Descarga RAM' },
      ];
    default:
      return [{ value: 'default', label: 'Por defecto' }];
  }
}

export function getDefaultThemeForType(type: PrankType): string {
  const options = getThemeOptions(type);
  return options[0]?.value ?? 'default';
}

export function getAppThemeClass(theme: AppTheme): string {
  return `app-theme-${theme}`;
}
