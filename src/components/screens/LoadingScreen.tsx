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
    }, Math.max(1500, 4000 - intensity * 300)); // Higher intensity = faster text changes

    return () => clearInterval(textInterval);
  }, [intensity]);

  // Duration reveal timer
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (showReveal) onComplete();
      }, duration * 1000);
      
      // Also advance a mock progress percentage
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
      // Infinite mode: slow mock progress that slows down near 99%
      const progressInterval = setInterval(() => {
        setPercent((prev) => {
          if (prev >= 98) return 98;
          return prev + Math.random() * 0.4;
        });
        
        // Randomize download speed slightly for realistic look
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
            padding: '2rem',
          }}
        >
          {/* Windows 98 Setup dialog */}
          <div
            style={{
              width: '360px',
              backgroundColor: '#c0c0c0',
              border: '3px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              boxShadow: '1px 1px 10px rgba(0,0,0,0.15)',
              padding: '6px',
            }}
          >
            {/* Title */}
            <div
              style={{
                backgroundColor: '#000080',
                color: '#ffffff',
                padding: '4px 6px',
                fontWeight: 'bold',
                fontSize: '12px',
              }}
            >
              {title || 'Instalador de Componentes'}
            </div>
            
            <div style={{ padding: '16px 12px' }}>
              <div style={{ fontSize: '12px', marginBottom: '12px', lineHeight: 1.4 }}>
                {message || 'Copiando archivos del sistema...'}
                <div style={{ color: '#555555', marginTop: '6px', fontStyle: 'italic', height: '18px', overflow: 'hidden' }}>
                  {funnyMessages[funnyTextIndex]}
                </div>
              </div>
              
              {/* Progress bar */}
              <div
                style={{
                  height: '20px',
                  backgroundColor: '#ffffff',
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                }}
              >
                {/* Segments container */}
                <div
                  style={{
                    height: '100%',
                    width: `${percent}%`,
                    backgroundColor: '#000080',
                    transition: 'width 0.1s linear',
                  }}
                ></div>
                
                {/* Text overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: percent > 50 ? '#ffffff' : '#000000',
                    mixBlendMode: 'difference',
                  }}
                >
                  {Math.floor(percent)}%
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px 8px 0', gap: '8px' }}>
              <button
                disabled
                style={{
                  padding: '3px 12px',
                  fontSize: '11px',
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
            padding: '2rem',
          }}
        >
          <div
            className="glass-card"
            style={{
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              border: '1px solid rgba(6, 182, 212, 0.2)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              {/* Spinner using modern HSL rotation */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '3px dashed var(--accent)',
                  animation: `spin ${3 / (intensity / 5 + 0.5)}s infinite linear`,
                }}
              ></div>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>
              {title || 'Descargando RAM Adicional'}
            </h3>
            
            <p style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500, marginBottom: '1.5rem' }}>
              Velocidad: {downloadSpeed} | Restante: {Math.max(1, 100 - Math.floor(percent)) * 2.4} MB
            </p>
            
            {/* Flat loading bar */}
            <div
              style={{
                height: '8px',
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '999px',
                overflow: 'hidden',
                marginBottom: '1rem',
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
            
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', height: '20px', overflow: 'hidden' }}>
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
            padding: '2rem',
          }}
        >
          <div className="crt-overlay"></div>
          <div className="scanline"></div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            {/* Large neon circular loader */}
            <div
              className="spinner"
              style={{
                width: '64px',
                height: '64px',
                borderColor: 'rgba(139, 92, 246, 0.1)',
                borderLeftColor: 'var(--primary)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
              }}
            ></div>
            
            <div style={{ textAlign: 'center' }}>
              <h2
                className="text-glow"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 'normal',
                  color: 'var(--primary)',
                  marginBottom: '1rem',
                }}
              >
                {title || 'INICIALIZANDO PROTOCOLO'}
              </h2>
              
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  background: 'rgba(139, 92, 246, 0.05)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  maxWidth: '380px',
                  margin: '0 auto',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
