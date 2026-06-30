import { AppTheme } from '../types/prank';

export interface ThemeTokens {
  bgMain: string;
  bgSidebar: string;
  bgCard: string;
  bgGlass: string;
  primary: string;
  primaryHover: string;
  primaryGlow: string;
  accent: string;
  accentGlow: string;
  accentPink: string;
  textMain: string;
  textMuted: string;
  textDark: string;
  border: string;
  borderActive: string;
  success: string;
  danger: string;
  warning: string;
  fontFamily?: string;
}

export const THEME_TOKENS: Record<AppTheme, ThemeTokens> = {
  dark: {
    bgMain: '#0a0b10',
    bgSidebar: '#0f111a',
    bgCard: 'rgba(20, 22, 36, 0.6)',
    bgGlass: 'rgba(10, 11, 16, 0.5)',
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryGlow: 'rgba(139, 92, 246, 0.35)',
    accent: '#06b6d4',
    accentGlow: 'rgba(6, 182, 212, 0.3)',
    accentPink: '#ec4899',
    textMain: '#f3f4f6',
    textMuted: '#9ca3af',
    textDark: '#4b5563',
    border: 'rgba(255, 255, 255, 0.08)',
    borderActive: 'rgba(139, 92, 246, 0.4)',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  },
  neon: {
    bgMain: '#050510',
    bgSidebar: '#0a0a18',
    bgCard: 'rgba(12, 12, 28, 0.75)',
    bgGlass: 'rgba(5, 5, 16, 0.6)',
    primary: '#d946ef',
    primaryHover: '#c026d3',
    primaryGlow: 'rgba(217, 70, 239, 0.4)',
    accent: '#22d3ee',
    accentGlow: 'rgba(34, 211, 238, 0.35)',
    accentPink: '#f472b6',
    textMain: '#f8fafc',
    textMuted: '#94a3b8',
    textDark: '#64748b',
    border: 'rgba(34, 211, 238, 0.12)',
    borderActive: 'rgba(217, 70, 239, 0.45)',
    success: '#34d399',
    danger: '#fb7185',
    warning: '#fbbf24',
  },
  retro: {
    bgMain: '#1a1025',
    bgSidebar: '#241530',
    bgCard: 'rgba(36, 21, 48, 0.85)',
    bgGlass: 'rgba(26, 16, 37, 0.7)',
    primary: '#f59e0b',
    primaryHover: '#d97706',
    primaryGlow: 'rgba(245, 158, 11, 0.35)',
    accent: '#f472b6',
    accentGlow: 'rgba(244, 114, 182, 0.3)',
    accentPink: '#fb923c',
    textMain: '#fef3c7',
    textMuted: '#d6b896',
    textDark: '#92704a',
    border: 'rgba(245, 158, 11, 0.15)',
    borderActive: 'rgba(245, 158, 11, 0.45)',
    success: '#84cc16',
    danger: '#ef4444',
    warning: '#fbbf24',
    fontFamily: "'Outfit', sans-serif",
  },
  terminal: {
    bgMain: '#020a04',
    bgSidebar: '#041208',
    bgCard: 'rgba(4, 20, 8, 0.85)',
    bgGlass: 'rgba(2, 10, 4, 0.7)',
    primary: '#22c55e',
    primaryHover: '#16a34a',
    primaryGlow: 'rgba(34, 197, 94, 0.35)',
    accent: '#4ade80',
    accentGlow: 'rgba(74, 222, 128, 0.25)',
    accentPink: '#86efac',
    textMain: '#dcfce7',
    textMuted: '#6ee7a0',
    textDark: '#166534',
    border: 'rgba(34, 197, 94, 0.15)',
    borderActive: 'rgba(74, 222, 128, 0.4)',
    success: '#22c55e',
    danger: '#f87171',
    warning: '#facc15',
    fontFamily: "'Share Tech Mono', monospace",
  },
  minimal: {
    bgMain: '#111827',
    bgSidebar: '#1f2937',
    bgCard: 'rgba(31, 41, 55, 0.9)',
    bgGlass: 'rgba(17, 24, 39, 0.8)',
    primary: '#e5e7eb',
    primaryHover: '#d1d5db',
    primaryGlow: 'rgba(229, 231, 235, 0.15)',
    accent: '#9ca3af',
    accentGlow: 'rgba(156, 163, 175, 0.2)',
    accentPink: '#d1d5db',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    textDark: '#6b7280',
    border: 'rgba(255, 255, 255, 0.1)',
    borderActive: 'rgba(229, 231, 235, 0.35)',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
  },
};

const TOKEN_CSS_MAP: Record<keyof ThemeTokens, string> = {
  bgMain: '--bg-main',
  bgSidebar: '--bg-sidebar',
  bgCard: '--bg-card',
  bgGlass: '--bg-glass',
  primary: '--primary',
  primaryHover: '--primary-hover',
  primaryGlow: '--primary-glow',
  accent: '--accent',
  accentGlow: '--accent-glow',
  accentPink: '--accent-pink',
  textMain: '--text-main',
  textMuted: '--text-muted',
  textDark: '--text-dark',
  border: '--border',
  borderActive: '--border-active',
  success: '--success',
  danger: '--danger',
  warning: '--warning',
  fontFamily: '--font-ui',
};

export function applyThemeTokens(theme: AppTheme, accentOverride?: string): void {
  if (typeof document === 'undefined') return;

  const tokens = THEME_TOKENS[theme];
  const root = document.documentElement;

  (Object.keys(TOKEN_CSS_MAP) as (keyof ThemeTokens)[]).forEach((key) => {
    const cssVar = TOKEN_CSS_MAP[key];
    const value = tokens[key];
    if (value) root.style.setProperty(cssVar, value);
  });

  if (accentOverride) {
    root.style.setProperty('--user-accent', accentOverride);
  }

  root.setAttribute('data-theme', theme);
}

export const THEME_LABELS: Record<AppTheme, { label: string; description: string }> = {
  dark: { label: 'Oscuro', description: 'Creator studio clásico' },
  neon: { label: 'Neon', description: 'Vibrante y futurista' },
  retro: { label: 'Retro', description: 'Estética 90s' },
  terminal: { label: 'Terminal', description: 'Verde hacker' },
  minimal: { label: 'Minimal', description: 'Limpio y sobrio' },
};
