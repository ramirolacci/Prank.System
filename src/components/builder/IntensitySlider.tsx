import React from 'react';
import { VisualIntensity } from '../../types/prank';
import { INTENSITY_LEVELS, visualIntensityFromNumeric } from '../../utils/intensity';

interface IntensitySliderProps {
  intensity: number;
  visualIntensity: VisualIntensity;
  onIntensityChange: (value: number) => void;
  onVisualIntensityChange: (level: VisualIntensity) => void;
}

export const IntensitySlider: React.FC<IntensitySliderProps> = ({
  intensity,
  visualIntensity,
  onIntensityChange,
  onVisualIntensityChange,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
          }}
        >
          <span>Intensidad visual</span>
          <span style={{ color: 'var(--accent)' }}>Nivel {intensity}/10</span>
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            onIntensityChange(value);
            onVisualIntensityChange(visualIntensityFromNumeric(value));
          }}
          className="range-input"
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {INTENSITY_LEVELS.map((level) => {
          const isActive = visualIntensity === level.value;
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => {
                onVisualIntensityChange(level.value);
                onIntensityChange(level.numeric);
              }}
              className="btn-interactive"
              style={{
                flex: '1 1 auto',
                minWidth: '70px',
                padding: '0.45rem 0.75rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? '1px solid var(--primary)' : '1px solid var(--border)',
                background: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255,255,255,0.02)',
                color: isActive ? 'var(--text-main)' : 'var(--text-muted)',
              }}
            >
              {level.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
