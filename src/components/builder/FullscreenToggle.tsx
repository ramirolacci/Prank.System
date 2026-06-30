import React from 'react';
import { Maximize2, Info } from 'lucide-react';

interface FullscreenToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const FullscreenToggle: React.FC<FullscreenToggleProps> = ({
  checked,
  onChange,
}) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: '1rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        background: checked ? 'rgba(139, 92, 246, 0.08)' : undefined,
        borderColor: checked ? 'var(--border-active)' : undefined,
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          background: 'rgba(139, 92, 246, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Maximize2 size={18} style={{ color: 'var(--primary)' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
            Pantalla completa al tocar
          </span>
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-label="Activar pantalla completa"
            style={{
              width: '20px',
              height: '20px',
              accentColor: 'var(--primary)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
        </div>
        <p
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            marginTop: '0.35rem',
            lineHeight: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.35rem',
          }}
        >
          <Info size={12} style={{ flexShrink: 0, marginTop: '2px' }} />
          Al abrir el link, la víctima puede expandir la broma con un toque. Siempre verá el botón
          de salir. En móvil, algunos navegadores no permiten fullscreen.
        </p>
      </div>
    </div>
  );
};
