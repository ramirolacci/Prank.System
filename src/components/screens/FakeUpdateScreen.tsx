import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const FakeUpdateScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const [progress, setProgress] = useState(0);
  const { theme, title, message, intensity, duration, showReveal } = config;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (duration > 0) {
      // Calculate progress increment to reach 100% exactly at duration
      const totalSteps = duration * 10; // 10 steps per second (100ms interval)
      const stepIncrement = 100 / totalSteps;
      
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + stepIncrement;
          if (next >= 100) {
            clearInterval(interval);
            if (showReveal) {
              setTimeout(onComplete, 800); // Small pause at 100% before reveal
            }
            return 100;
          }
          return next;
        });
      }, 100);
    } else {
      // Infinite mode: random increments, slows down as it gets closer to 99%
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) return 99; // Never reaches 100% in infinite mode
          
          // Higher intensity = faster initial progress
          const remaining = 100 - prev;
          const factor = intensity / 10;
          const increment = Math.max(0.1, (Math.random() * remaining * 0.05 * factor));
          
          return Math.min(99, prev + increment);
        });
      }, 800);
    }

    return () => clearInterval(interval);
  }, [duration, intensity, showReveal, onComplete]);

  const displayPercent = Math.floor(progress);

  // Render based on selected theme
  switch (theme) {
    case 'windows-10':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#006cbe',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Segoe UI", -apple-system, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: '2rem',
          }}
        >
          <div className="mac-spinner" style={{ width: '50px', height: '50px', border: '5px solid rgba(255,255,255,0.2)', borderTopColor: '#ffffff', marginBottom: '2.5rem' }}></div>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 300, marginBottom: '1rem' }}>
              {title || 'Trabajando en las actualizaciones'} {displayPercent}%
            </h2>
            <p style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.5 }}>
              {message || 'No apagues el equipo. Esto tardará unos minutos.'}
            </p>
            <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '1.5rem' }}>
              Tu PC se reiniciará varias veces
            </p>
          </div>
        </div>
      );

    case 'macos':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
          }}
        >
          {/* Apple Logo  */}
          <svg
            viewBox="0 0 170 170"
            style={{ width: '80px', height: '80px', fill: '#ffffff', marginBottom: '4rem' }}
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.9-14.28-6.08-3.38-2.77-7.22-7.46-11.53-14.07-8.77-13.43-15.02-28.79-18.73-46.06-2.58-12.06-3.87-23.24-3.87-33.54 0-16.14 4.09-29.35 12.28-39.63 8.18-10.28 18.23-15.5 30.13-15.66 5.86 0 12.02 1.68 18.49 5.04 6.47 3.35 11.26 5.04 14.37 5.04 2.85 0 7.57-1.68 14.16-5.04 6.6-3.35 12.44-4.97 17.53-4.85 14.17.4 25.13 5.76 32.9 16.1-12.35 7.52-18.42 17.75-18.2 30.7 0.22 10.26 3.99 18.84 11.31 25.75 7.32 6.9 16.39 10.63 27.22 11.19-2.22 6.77-5.58 13.91-10.08 21.41zM119.22 26.24c0-7.72 2.76-14.88 8.27-21.49 6.69-7.72 14.5-11.77 22.36-11.75.13 0.84.2 1.56.2 2.14 0 7.52-2.79 14.61-8.39 21.28-3.04 3.71-6.9 6.75-11.56 9.1-4.66 2.36-9.18 3.59-13.56 3.7-0.89.04-1.57-.43-1.32-2.98z" />
          </svg>
          
          {/* Mac Loading Bar */}
          <div
            style={{
              width: '240px',
              height: '5px',
              backgroundColor: '#333333',
              borderRadius: '10px',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#ffffff',
                transition: 'width 0.1s linear',
              }}
            ></div>
          </div>
          
          <div style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.5rem' }}>
            {title ? `${title} (${displayPercent}%)` : `Instalando actualización de macOS... ${displayPercent}%`}
          </div>
        </div>
      );

    case 'android':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Roboto, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: '2rem',
          }}
        >
          {/* Android Robot outline / Modern Spinner */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: '4px solid #3c3c3c',
              borderTopColor: '#3ddc84', // Android green
              animation: 'spin 1.5s infinite linear',
              marginBottom: '3rem',
            }}
          ></div>
          
          <div style={{ textAlign: 'left', width: '100%', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 400, marginBottom: '0.5rem', color: '#f3f4f6' }}>
              {title || 'Actualizando sistema de Android'}
            </h3>
            
            {/* Android progress bar */}
            <div
              style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#222222',
                borderRadius: '2px',
                overflow: 'hidden',
                margin: '1rem 0 0.5rem 0',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: '#3ddc84',
                  transition: 'width 0.1s linear',
                }}
              ></div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#9ca3af' }}>
              <span>{message || 'Instalando paquete de actualización...'}</span>
              <span>{displayPercent}%</span>
            </div>
          </div>
        </div>
      );

    case 'windows-11':
    default:
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000', // Win 11 update is dark screen
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Segoe UI", -apple-system, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: '2rem',
          }}
        >
          {/* Windows 11 Fluent Spinner */}
          <div
            style={{
              position: 'relative',
              width: '56px',
              height: '56px',
              marginBottom: '3rem',
            }}
          >
            {/* 6 dots spinning */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  left: '25px',
                  top: '25px',
                  transformOrigin: '3px 28px',
                  transform: `rotate(${i * 60}deg)`,
                  animation: 'spin 2s infinite cubic-bezier(0.5, 0.1, 0.4, 0.9)',
                  animationDelay: `${i * 0.12}s`,
                }}
              ></div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 300, marginBottom: '0.8rem', letterSpacing: '0.5px' }}>
              {title || 'Actualizando el equipo'} {displayPercent}%
            </h2>
            <p style={{ fontSize: '0.95rem', opacity: 0.75, marginBottom: '0.5rem' }}>
              {message || 'Mantén el equipo encendido y conectado.'}
            </p>
            <p style={{ fontSize: '0.9rem', opacity: 0.5, marginTop: '2rem' }}>
              Tu dispositivo podría reiniciarse unas cuantas veces.
            </p>
          </div>
          
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); opacity: 0.2; }
              50% { opacity: 1; }
              100% { transform: rotate(360deg); opacity: 0.2; }
            }
          `}</style>
        </div>
      );
  }
};
