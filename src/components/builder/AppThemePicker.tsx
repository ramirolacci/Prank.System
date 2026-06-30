import React from 'react';
import { AppTheme } from '../../types/prank';
import { APP_THEMES, ACCENT_COLORS } from '../../utils/themes';

interface AppThemePickerProps {
  appTheme: AppTheme;
  accentColor: string;
  onAppThemeChange: (theme: AppTheme) => void;
  onAccentColorChange: (color: string) => void;
}

export const AppThemePicker: React.FC<AppThemePickerProps> = ({
  appTheme,
  accentColor,
  onAppThemeChange,
  onAccentColorChange,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Tema de la broma
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '0.5rem',
          }}
        >
          {APP_THEMES.map((theme) => {
            const isActive = appTheme === theme.value;
            return (
              <button
                key={theme.value}
                type="button"
                onClick={() => onAppThemeChange(theme.value)}
                className={`app-theme-${theme.value} btn-interactive`}
                style={{
                  padding: '0.65rem 0.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                  background: isActive ? 'rgba(139, 92, 246, 0.12)' : 'rgba(255,255,255,0.02)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
                title={theme.description}
              >
                {theme.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          Color de acento
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {ACCENT_COLORS.map((color) => {
            const isActive = accentColor === color.value;
            return (
              <button
                key={color.value}
                type="button"
                onClick={() => onAccentColorChange(color.value)}
                aria-label={color.label}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: color.value,
                  border: isActive ? '2px solid #fff' : '2px solid transparent',
                  boxShadow: isActive ? `0 0 12px ${color.value}` : 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
