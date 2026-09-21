import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const LoadingScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { theme, title, message, intensity, duration, showReveal } = config;
  const [percent, setPercent] = useState(0);
  const [funnyTextIndex, setFunnyTextIndex] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState('4.8 MB/s');

  const funnyMessages = [
    'Inicializando algoritmos de procrastinación...',
    'Calibrando el condensador de flujos cuánticos...',
    'Ordenando los bytes por orden alfabético...',
    'Descargando adaptador de enchufe digital...',
    'Calentando el cable del Wi-Fi para mayor velocidad...',
    'Limpiando polvo acumulado en la memoria caché...',
    'Contratando hámsters adicionales para el servidor...',
    'Verificando si la computadora está enchufada...',
    'Negociando velocidad con los bits...',
    'Inflando los píxeles de la pantalla...'
  ];

  // Rotate messages
  useEffect(() => {
    const textInterval = setInterval(() => {
      setFunnyTextIndex((prev) => (prev + 1) % funnyMessages.length);
    }, Math.max(1500, 4000 - intensity * 300));

    return () => clearInterval(textInterval);
  }, [intensity]);

  // Duration reveal timer
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (showReveal) onComplete();
      }, duration * 1000);
      
      const totalSteps = duration * 10;
      const stepIncrement = 100 / totalSteps;
      const progressInterval = setInterval(() => {
        setPercent((prev) => {
          const next = prev + stepIncrement;
          return next >= 100 ? 100 : next;
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      const progressInterval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 98) return 98;
          return prev + Math.random() * 0.4;
        });
        
        setDownloadSpeed((Math.random() * 3 + 2).toFixed(1) + ' MB/s');
      }, 500);

      return () => clearInterval(progressInterval);
    }
  }, [duration, showReveal, onComplete]);

  switch (theme) {
    case 'windows-98':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#c0c0c0',
            color: '#000000',
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: isPreview ? '0.75rem 0.5rem' : '2rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: isPreview ? '260px' : '360px',
              maxWidth: '95%',
              backgroundColor: '#c0c0c0',
              border: '3px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              boxShadow: '1px 1px 10px rgba(0,0,0,0.15)',
              padding: '6px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                backgroundColor: '#000080',
                color: '#ffffff',
                padding: '4px 6px',
                fontWeight: 'bold',
                fontSize: '11px',
              }}
            >
              {title || 'Instalador de Componentes'}
            </div>
            
            <div style={{ padding: '12px 10px' }}>
              <div style={{ fontSize: '11px', marginBottom: '10px', lineHeight: 1.35 }}>
                {message || 'Copiando archivos del sistema...'}
                <div style={{ color: '#555555', marginTop: '4px', fontStyle: 'italic', height: '16px', overflow: 'hidden' }}>
                  {funnyMessages[funnyTextIndex]}
                </div>
              </div>
              
              <div
                style={{
                  height: '18px',
                  backgroundColor: '#ffffff',
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${percent}%`,
                    backgroundColor: '#000080',
                    transition: 'width 0.1s linear',
                  }}
                ></div>
                
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: percent > 50 ? '#ffffff' : '#000000',
                    mixBlendMode: 'difference',
                  }}
                >
                  {Math.floor(percent)}%
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 6px 6px 0' }}>
              <button
                disabled
                style={{
                  padding: '2px 10px',
                  fontSize: '10px',
                  backgroundColor: '#c0c0c0',
                  color: '#808080',
                  border: '1.5px solid',
                  borderColor: '#ffffff #555555 #555555 #ffffff',
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      );

    case 'downloading-ram':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0a0d13',
            color: '#e5e7eb',
            fontFamily: '"Outfit", sans-serif',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: isPreview ? '0.75rem 0.5rem' : '2rem 1rem',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: isPreview ? '1rem 0.85rem' : '2.25rem 1.5rem',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isPreview ? '0.75rem' : '1.25rem' }}>
              <div
                style={{
                  width: isPreview ? '40px' : '56px',
                  height: isPreview ? '40px' : '56px',
                  borderRadius: '50%',
                  border: '3px dashed var(--accent)',
                  animation: `spin ${3 / (intensity / 5 + 0.5)}s infinite linear`,
                }}
              ></div>
            </div>
            
            <h3 style={{ fontSize: isPreview ? '1.05rem' : '1.25rem', fontWeight: 'bold', marginBottom: '0.4rem', color: '#fff' }}>
              {title || 'Descargando RAM Adicional'}
            </h3>
            
            <p style={{ fontSize: isPreview ? '0.78rem' : '0.875rem', color: 'var(--accent)', fontWeight: 500, marginBottom: isPreview ? '0.75rem' : '1.25rem' }}>
              Velocidad: {downloadSpeed} | Restante: {Math.max(1, 100 - Math.floor(percent)) * 2.4} MB
            </p>
            
            <div
              style={{
                height: '8px',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: isPreview ? '0.75rem' : '1rem',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percent}%`,
                  background: 'linear-gradient(to right, var(--accent), var(--primary))',
                  borderRadius: '999px',
                  transition: 'width 0.1s linear',
                }}
              ></div>
            </div>
            
            <div style={{ fontSize: isPreview ? '0.75rem' : '0.8rem', color: 'var(--text-muted)', height: '18px', overflow: 'hidden' }}>
              {funnyMessages[funnyTextIndex]}
            </div>
          </div>
        </div>
      );

    case 'futuristic':
    default:
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#07080e',
            color: '#ffffff',
            fontFamily: '"Fira Code", monospace',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: isPreview ? '0.75rem 0.5rem' : '2rem 1rem',
            boxSizing: 'border-box',
          }}
        >
          <div className="crt-overlay"></div>
          <div className="scanline"></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isPreview ? '1rem' : '2rem', width: '100%' }}>
            <div
              className="spinner"
              style={{
                width: isPreview ? '44px' : '64px',
                height: isPreview ? '44px' : '64px',
                borderColor: 'rgba(139, 92, 246, 0.1)',
                borderLeftColor: 'var(--primary)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            ></div>
            
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h2
                className="text-glow"
                style={{
                  fontSize: isPreview ? '1.05rem' : '1.25rem',
                  fontWeight: 'normal',
                  color: 'var(--primary)',
                  marginBottom: '0.75rem',
                }}
              >
                {title || 'INICIALIZANDO PROTOCOLO'}
              </h2>
              
              <div
                style={{
                  fontSize: isPreview ? '0.78rem' : '0.85rem',
                  color: 'var(--text-muted)',
                  background: 'rgba(139, 92, 246, 0.05)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  padding: isPreview ? '0.5rem 1rem' : '0.75rem 1.5rem',
                  borderRadius: '8px',
                  maxWidth: '380px',
                  width: '90%',
                  margin: '0 auto',
                  height: isPreview ? '36px' : '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxSizing: 'border-box',
                }}
              >
                {message || funnyMessages[funnyTextIndex]}
              </div>
            </div>
          </div>
        </div>
      );
  }
};
