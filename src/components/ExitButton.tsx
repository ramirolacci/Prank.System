import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

interface ExitButtonProps {
  onExit: () => void;
}

export const ExitButton: React.FC<ExitButtonProps> = ({ onExit }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="exit-control-wrapper"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 999999, // Super high z-index to overlay any screen
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem',
        pointerEvents: 'auto',
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExit();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          borderRadius: '999px',
          background: hovered ? 'rgba(239, 68, 68, 0.95)' : 'rgba(20, 22, 36, 0.85)',
          color: '#ffffff',
          border: hovered ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          fontFamily: 'inherit',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          outline: 'none',
        }}
        title="Terminar simulación"
      >
        <X size={15} />
        <span>Salir de la Broma</span>
      </button>

      {hovered && (
        <div
          className="exit-explanation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '8px',
            background: 'rgba(10, 11, 16, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.72rem',
            maxWidth: '240px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            pointerEvents: 'none',
          }}
        >
          <Info size={12} style={{ flexShrink: 0, color: 'var(--accent)' }} />
          <span>Es una simulación visual. Tu dispositivo está a salvo.</span>
        </div>
      )}
    </div>
  );
};
