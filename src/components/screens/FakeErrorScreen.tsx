import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

interface WindowPosition {
  id: number;
  x: number;
  y: number;
}

export const FakeErrorScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { theme, title, message, intensity, duration, showReveal } = config;
  const [progress, setProgress] = useState(0);
  const [popups, setPopups] = useState<WindowPosition[]>([]);

  // Duration handler
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (showReveal) {
          onComplete();
        }
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration, showReveal, onComplete]);

  // BSOD Progress
  useEffect(() => {
    if (theme === 'bsod') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          const next = prev + Math.floor(Math.random() * (intensity + 1)) + 1;
          return Math.min(100, next);
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [theme, intensity]);

  // Spawn initial retro windows if theme is retro-alert
  useEffect(() => {
    if (theme === 'retro-alert' && popups.length === 0) {
      setPopups([{ id: 1, x: 30, y: 30 }]);
    }
  }, [theme]);

  // Handler for retro alert "Aceptar" or close click
  const handleRetroClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (popups.length > 25) {
      // If too many popups, auto-complete to reveal surprise
      if (showReveal) onComplete();
      return;
    }
    
    // Spawn 2 new windows at random coordinates
    const newId1 = Date.now();
    const newId2 = Date.now() + 1;
    
    const randomRange = isPreview ? { x: 40, y: 40 } : { x: 75, y: 75 };
    
    const newPopups = [
      ...popups,
      {
        id: newId1,
        x: Math.random() * randomRange.x + 5,
        y: Math.random() * randomRange.y + 5
      },
      {
        id: newId2,
        x: Math.random() * randomRange.x + 5,
        y: Math.random() * randomRange.y + 5
      }
    ];
    setPopups(newPopups);
  };

  switch (theme) {
    case 'macos-panic':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#1b1b1b',
            color: '#dedede',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '-apple-system, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            padding: '2rem',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              backgroundColor: '#0a0a0a',
              border: '2px solid #3c3c3c',
              borderRadius: '8px',
              padding: '2.5rem',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
              textAlign: 'center',
            }}
          >
            {/* Power symbol */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2.5px solid #dedede',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                position: 'relative',
              }}
            >
              <div style={{ width: '2.5px', height: '14px', backgroundColor: '#dedede', position: 'absolute', top: '2px' }}></div>
            </div>
            
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '1rem' }}>
              {title || 'You need to restart your computer.'}
            </h4>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: '#bcbcbc', marginBottom: '1.25rem' }}>
              {message || 'Hold down the Power button for several seconds or press the Restart button.'}
            </p>
            
            <div style={{ borderTop: '1px solid #333', paddingStep: '1rem', marginTop: '1.5rem', fontSize: '0.72rem', color: '#888', lineHeight: 1.5 }}>
              <p>Veuillez redémarrer votre ordinateur. Maintenez le bouton de démarrage enfoncé.</p>
              <p style={{ marginTop: '0.5rem' }}>Bitte starten Sie den Computer neu. Halten Sie den Ein-/Ausschalter gedrückt.</p>
            </div>
          </div>
        </div>
      );

    case 'critical-warning':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#7a0000',
            background: 'radial-gradient(circle, #b91c1c 0%, #7f1d1d 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: '"Outfit", sans-serif',
            cursor: 'default',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div className="jitter-effect" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ShieldAlert size={80} color="#fca5a5" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.5px' }}>
              {title || '¡ACCESO NO AUTORIZADO DETECTADO!'}
            </h2>
            <p style={{ fontSize: '1.15rem', maxWidth: '600px', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
              {message || 'El cortafuegos del sistema ha detectado un archivo malicioso infectando el sector de arranque de su disco primario C:.'}
            </p>
          </div>
          
          <button
            onClick={showReveal ? onComplete : () => alert('Seguridad: Acción Bloqueada')}
            style={{
              padding: '0.75rem 2.5rem',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#991b1b',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              transition: 'transform 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            DESINFECTAR EQUIPO
          </button>
        </div>
      );

    case 'retro-alert':
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#55aaaa', // Classic Windows 95 desktop teal
            fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          {/* Render spawned popup windows */}
          {popups.map((popup) => (
            <div
              key={popup.id}
              style={{
                position: 'absolute',
                left: `${popup.x}%`,
                top: `${popup.y}%`,
                width: '320px',
                backgroundColor: '#c0c0c0',
                border: '3px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                zIndex: popup.id,
                padding: '2px',
                userSelect: 'none',
              }}
            >
              {/* Windows 98 Title bar */}
              <div
                style={{
                  background: 'linear-gradient(90deg, #000080, #1084d0)',
                  color: '#ffffff',
                  padding: '4px 6px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{title || 'Error de Sistema'}</span>
                <button
                  onClick={handleRetroClick}
                  style={{
                    width: '16px',
                    height: '14px',
                    backgroundColor: '#c0c0c0',
                    border: '1.5px solid',
                    borderColor: '#ffffff #555555 #555555 #ffffff',
                    color: '#000',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    paddingBottom: '2px',
                  }}
                >
                  X
                </button>
              </div>

              {/* Alert Body */}
              <div style={{ display: 'flex', gap: '12px', padding: '16px 12px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#ff0000',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  X
                </div>
                <div style={{ fontSize: '12px', color: '#000', lineHeight: 1.4 }}>
                  {message || 'Se ha detectado un desbordamiento de pila en el registro 0x00FF8E. El sistema debe cerrarse.'}
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10px' }}>
                <button
                  onClick={handleRetroClick}
                  style={{
                    minWidth: '80px',
                    padding: '4px 10px',
                    backgroundColor: '#c0c0c0',
                    border: '2px solid',
                    borderColor: '#ffffff #555555 #555555 #ffffff',
                    color: '#000000',
                    fontSize: '12px',
                    cursor: 'pointer',
                    outline: '1px dotted #555555',
                  }}
                >
                  Aceptar
                </button>
              </div>
            </div>
          ))}
        </div>
      );

    case 'bsod':
    default:
      return (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#0078d7',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            fontFamily: '"Segoe UI Light", "Segoe UI", -apple-system, sans-serif',
            cursor: isPreview ? 'default' : 'none',
            userSelect: 'none',
            padding: isPreview ? '1.5rem' : '4rem 6rem',
            textAlign: 'left',
          }}
        >
          {/* Sad face */}
          <div style={{ fontSize: isPreview ? '3rem' : '6rem', marginBottom: '1.5rem', fontWeight: 300 }}>
            :(
          </div>
          
          <h2 style={{ fontSize: isPreview ? '1.1rem' : '1.75rem', fontWeight: 300, maxWidth: '900px', lineHeight: 1.4, marginBottom: '2rem' }}>
            {title || 'Se ha producido un problema en su dispositivo y necesita reiniciarse. Tan solo estamos recopilando información sobre el error y, después, se reiniciará.'}
          </h2>
          
          <div style={{ fontSize: isPreview ? '1rem' : '1.5rem', fontWeight: 300, marginBottom: '3rem' }}>
            {progress}% completado
          </div>
          
          {/* Footer details: QR Code and Stop Code */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginTop: 'auto', maxWidth: '800px' }}>
            {/* Mock QR Code */}
            <div
              style={{
                width: isPreview ? '50px' : '90px',
                height: isPreview ? '50px' : '90px',
                backgroundColor: '#ffffff',
                padding: '4px',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gridTemplateRows: 'repeat(5, 1fr)',
                gap: '2px',
              }}
            >
              {[...Array(25)].map((_, i) => {
                // Generate a static mock QR look
                const isBlack = (i % 3 === 0) || (i < 5) || (i > 20) || (i % 5 === 0) || (i === 12);
                return (
                  <div key={i} style={{ backgroundColor: isBlack ? '#000000' : '#ffffff' }}></div>
                );
              })}
            </div>
            
            <div style={{ fontSize: isPreview ? '0.75rem' : '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
              <p style={{ fontWeight: 'bold' }}>Para obtener más información sobre este problema y posibles soluciones, visite https://windows.com/stopcode</p>
              <p style={{ marginTop: '0.5rem' }}>Si llama a un técnico de soporte técnico, dele esta información:</p>
              <p style={{ opacity: 0.8 }}>Código de parada: <span style={{ fontWeight: 'bold' }}>{message || 'CRITICAL_PROCESS_DIED'}</span></p>
            </div>
          </div>
        </div>
      );
  }
};
