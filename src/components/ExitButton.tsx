import React, { useState, useEffect, useRef } from 'react';
import { X, Info } from 'lucide-react';
import { EscapeMode } from '../types/prank';

interface ExitButtonProps {
  onExit: () => void;
  escapeMode?: EscapeMode;
}

export const ExitButton: React.FC<ExitButtonProps> = ({ onExit, escapeMode = 'stealth' }) => {
  const [hovered, setHovered] = useState(false);
  const tapCountRef = useRef(0);
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExit]);

  // Triple-tap handler for stealth mode (top-left 60px corner)
  const handleCornerTap = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    tapCountRef.current += 1;

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    if (tapCountRef.current >= 3) {
      tapCountRef.current = 0;
      onExit();
    } else {
      tapTimerRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 1500);
    }
  };

  if (escapeMode === 'button') {
    return (
      <div
        className="exit-control-wrapper"
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 999999,
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
  }

  // Stealth / Gestures Mode: Invisible 60x60 corner trigger at top-left
  return (
    <div
      onClick={handleCornerTap}
      onTouchStart={handleCornerTap}
      title="Tocá 3 veces acá para salir"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '60px',
        height: '60px',
        zIndex: 999999,
        backgroundColor: 'transparent',
        cursor: 'default',
      }}
    />
  );
};
