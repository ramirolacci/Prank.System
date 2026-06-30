import React, { useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import confetti from 'canvas-confetti';
import { Laugh, ArrowRight } from 'lucide-react';

interface ScreenProps {
  config: PrankConfig;
  onExit: () => void;
}

export const SurpriseRevealScreen: React.FC<ScreenProps> = ({ config, onExit }) => {
  const { revealText, targetName } = config;

  useEffect(() => {
    // Fire confetti bursts on mount
    const end = Date.now() + 3 * 1000;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          // since particles fall down, animate slightly above the bottom
          y: Math.random() - 0.2,
        },
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

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
        padding: '2rem',
        textAlign: 'center',
        overflow: 'hidden',
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
          padding: '3rem 2rem',
          maxWidth: '560px',
          width: '100%',
          border: '1px solid var(--border-active)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.2)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--primary-glow)',
            animation: 'bounce 2s infinite',
          }}
        >
          <Laugh size={32} color="#fff" />
        </div>

        <div>
          <h2
            className="text-glow"
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #ffffff 30%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '0.5rem',
            }}
          >
            {targetName ? `¡Caíste, ${targetName}! 😜` : '¡Te la creíste! 😜'}
          </h2>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
            Broma de PrankForge finalizada
          </span>
        </div>

        <p
          style={{
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#e5e7eb',
            margin: '0.5rem 0',
          }}
        >
          {revealText || '¡Todo lo que viste en pantalla fue solo una simulación interactiva súper segura! Tu equipo está 100% perfecto.'}
        </p>

        <div style={{ height: '1px', width: '100%', backgroundColor: 'var(--border)', margin: '0.5rem 0' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
          <button
            onClick={onExit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: '#ffffff',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--primary-glow)',
              transition: 'transform 0.1s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <span>Crear mi propia broma</span>
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={onExit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '10px',
              backgroundColor: 'transparent',
              color: 'var(--text-main)',
              fontWeight: 500,
              border: '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>Ir al Inicio</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
