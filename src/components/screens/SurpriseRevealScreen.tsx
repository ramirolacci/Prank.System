import React from 'react';
import { PrankConfig } from '../../types/prank';
import { Laugh, ArrowRight } from 'lucide-react';

interface ScreenProps {
  config: PrankConfig;
  onExit: () => void;
}

export const SurpriseRevealScreen: React.FC<ScreenProps> = ({ config, onExit }) => {
  const { revealText, targetName } = config;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#07080e',
        background: 'radial-gradient(circle at center, #1e1b4b 0%, #07080e 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Outfit", sans-serif',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative backdrop glow */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'var(--primary-glow)',
          filter: 'blur(100px)',
          borderRadius: '50%',
          top: '25%',
          zIndex: 0,
        }}
      ></div>

      <div
        className="glass-card"
        style={{
          padding: '2rem 1.25rem',
          maxWidth: '560px',
          width: '100%',
          border: '1px solid var(--border-active)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--primary-glow)',
            animation: 'bounce 2s infinite',
            flexShrink: 0,
          }}
        >
          <Laugh size={28} color="#fff" />
        </div>

        {targetName && (
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '0.2rem 0.75rem',
              borderRadius: '999px',
              background: 'rgba(6, 182, 212, 0.1)',
              border: '1px solid rgba(6, 182, 212, 0.2)',
            }}
          >
            Para: {targetName}
          </span>
        )}

        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 800,
            background: 'linear-gradient(to right, #ffffff, var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          ¡ES UNA BROMA! 😂
        </h2>

        <p
          style={{
            fontSize: '1rem',
            color: 'var(--text-main)',
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {revealText || 'Tranquilo/a, tu dispositivo está 100% a salvo.'}
        </p>

        <button
          type="button"
          onClick={onExit}
          className="btn-primary"
          style={{
            marginTop: '0.5rem',
            padding: '0.75rem 1.75rem',
            fontSize: '0.9rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>Volver al inicio</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
