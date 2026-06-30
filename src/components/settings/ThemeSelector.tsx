import React from 'react';
import { motion } from 'framer-motion';
import { AppTheme } from '../../types/prank';
import { THEME_LABELS } from '../../theme/themeConfig';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getCardVariants } from '../shared/motionPresets';

interface ThemeSelectorProps {
  value: AppTheme;
  onChange: (theme: AppTheme) => void;
  compact?: boolean;
}

const THEME_SWATCHES: Record<AppTheme, string> = {
  dark: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  neon: 'linear-gradient(135deg, #d946ef, #22d3ee)',
  retro: 'linear-gradient(135deg, #f59e0b, #f472b6)',
  terminal: 'linear-gradient(135deg, #22c55e, #041208)',
  minimal: 'linear-gradient(135deg, #6b7280, #1f2937)',
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  value,
  onChange,
  compact = false,
}) => {
  const reducedMotion = useReducedMotion();
  const themes = Object.keys(THEME_LABELS) as AppTheme[];

  return (
    <div
      className="theme-selector-grid"
      style={{
        gridTemplateColumns: compact
          ? 'repeat(auto-fill, minmax(90px, 1fr))'
          : 'repeat(auto-fill, minmax(110px, 1fr))',
      }}
    >
      {themes.map((theme, index) => {
        const isActive = value === theme;
        const meta = THEME_LABELS[theme];
        const motionProps = getCardVariants(reducedMotion, index);

        return (
          <motion.button
            key={theme}
            type="button"
            initial={motionProps.initial}
            animate={motionProps.animate}
            transition={motionProps.transition}
            onClick={() => onChange(theme)}
            className={`theme-selector-item ${isActive ? 'active' : ''}`}
            title={meta.description}
            aria-pressed={isActive}
          >
            <div
              className="theme-swatch"
              style={{ background: THEME_SWATCHES[theme] }}
            />
            <span className="theme-selector-label">{meta.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};
