import React from 'react';
import { PrankType } from '../../types/prank';
import { getThemeOptions } from '../../utils/themes';

interface ThemePickerProps {
  prankType: PrankType;
  theme: string;
  onChange: (theme: string) => void;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({
  prankType,
  theme,
  onChange,
}) => {
  const options = getThemeOptions(prankType);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
        Estilo de pantalla
      </label>
      <select
        value={theme}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
