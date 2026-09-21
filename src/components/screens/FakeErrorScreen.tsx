import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert } from 'lucide-react';
import { playBsodBeep, playRetroErrorDing } from '../../utils/audio';
import { vibrateErrorPulse } from '../../utils/haptics';

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
  const { theme, title, message, intensity, duration, showReveal, soundEnabled, vibrationEnabled } = config;
  const [progress, setProgress] = useState(0);
  const [popups, setPopups] = useState<WindowPosition[]>([]);

  // Sound and vibration on mount
  useEffect(() => {
    if (isPreview) return;
    if (soundEnabled && theme === 'bsod') {
      playBsodBeep();
    }
    if (vibrationEnabled) {
      vibrateErrorPulse();
    }
  }, [isPreview, soundEnabled, vibrationEnabled, theme]);

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
      setPopups([{ id: 1, x: 10, y: 15 }]);
    }
  }, [theme, popups.length]);

  // Handler for retro alert "Aceptar" or close click
  const handleRetroClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPreview && soundEnabled) {
      playRetroErrorDing();
    }
    if (popups.length > 25) {
      if (showReveal) onComplete();
      return;
    }
    
    const newId1 = Date.now();
    const newId2 = Date.now() + 1;
    const randomRange = isPreview ? { x: 30, y: 30 } : { x: 60, y: 60 };
    
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
            padding: isPreview ? '1rem' : '2rem',
            userSelect: 'none',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              backgroundColor: '#0a0a0a',
              border: '2px solid #3c3c3c',
              borderRadius: '8px',
              padding: isPreview ? '1.25rem' : '2.5rem',
              maxWidth: '560px',
              width: '100%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: isPreview ? '30px' : '40px',
                height: isPreview ? '30px' : '40px',
                borderRadius: '50%',
                border: '2px solid #dedede',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                position: 'relative',
              }}
            >
              <div style={{ width: '2px', height: isPreview ? '10px' : '14px', backgroundColor: '#dedede', position: 'absolute', top: '2px' }}></div>
            </div>
            
            <h4 style={{ fontSize: isPreview ? '0.9rem' : '1rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.75rem' }}>
              {title || 'You need to restart your computer.'}
            </h4>
            <p style={{ fontSize: isPreview ? '0.78rem' : '0.85rem', lineHeight: 1.5, color: '#bcbcbc', marginBottom: '1rem' }}>
              {message || 'Hold down the Power button for several seconds or press the Restart button.'}
            </p>
            
            <div style={{ borderTop: '1px solid #333', paddingTop: '0.75rem', marginTop: '1rem', fontSize: '0.7rem', color: '#888', lineHeight: 1.4 }}>
              <p>Veuillez redémarrer votre ordinateur. Maintenez le bouton de démarrage enfoncé.</p>
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
            padding: isPreview ? '1rem' : '2rem',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div className="jitter-effect" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <ShieldAlert size={isPreview ? 44 : 80} color="#fca5a5" style={{ marginBottom: isPreview ? '0.85rem' : '1.5rem' }} />
            <h2 style={{ fontSize: isPreview ? '1.3rem' : '2.25rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '0.5px', lineHeight: 1.25 }}>
              {title || '¡ACCESO NO AUTORIZADO DETECTADO!'}
            </h2>
            <p style={{ fontSize: isPreview ? '0.82rem' : '1.15rem', maxWidth: '600px', opacity: 0.9, lineHeight: 1.5, marginBottom: isPreview ? '1.25rem' : '2rem' }}>
              {message || 'El cortafuegos del sistema ha detectado un archivo malicioso infectando el sector de arranque de su disco primario C:.'}
            </p>
          </div>
          
          <button
            onClick={showReveal ? onComplete : () => alert('Seguridad: Acción Bloqueada')}
            style={{
              padding: isPreview ? '0.6rem 1.5rem' : '0.75rem 2.5rem',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#991b1b',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: isPreview ? '0.8rem' : '1rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
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
            backgroundColor: '#55aaaa',
            fontFamily: '"MS Sans Serif", "Tahoma", sans-serif',
            overflow: 'hidden',
            cursor: 'default',
          }}
        >
          {popups.map((popup) => (
            <div
              key={popup.id}
              style={{
                position: 'absolute',
                left: `${popup.x}%`,
                top: `${popup.y}%`,
                width: isPreview ? '240px' : '320px',
                maxWidth: '90%',
                backgroundColor: '#c0c0c0',
                border: '3px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                zIndex: popup.id,
                padding: '2px',
                userSelect: 'none',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(90deg, #000080, #1084d0)',
                  color: '#ffffff',
                  padding: '4px 6px',
                  fontWeight: 'bold',
                  fontSize: '11px',
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
                  }}
                >
                  X
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', padding: '12px 10px', alignItems: 'center' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    backgroundColor: '#ff0000',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'Courier New, monospace',
                    flexShrink: 0,
                  }}
                >
                  X
                </div>
                <div style={{ fontSize: '11px', color: '#000', lineHeight: 1.35 }}>
                  {message || 'Se ha detectado un desbordamiento de pila en el registro 0x00FF8E. El sistema debe cerrarse.'}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '8px' }}>
                <button
                  onClick={handleRetroClick}
                  style={{
                    minWidth: '70px',
                    padding: '3px 8px',
                    backgroundColor: '#c0c0c0',
                    border: '2px solid',
                    borderColor: '#ffffff #555555 #555555 #ffffff',
                    color: '#000000',
                    fontSize: '11px',
                    cursor: 'pointer',
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
            padding: isPreview ? '1.25rem 1rem' : '4rem 6rem',
            textAlign: 'left',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ fontSize: isPreview ? '4rem' : '8rem', lineHeight: 1, marginBottom: isPreview ? '0.75rem' : '1.5rem' }}>:(</div>
          <h2
            style={{
              fontSize: isPreview ? '1rem' : '1.8rem',
              fontWeight: 300,
              lineHeight: 1.35,
              maxWidth: '900px',
              marginBottom: isPreview ? '1rem' : '2rem',
            }}
          >
            {message ||
              'Se ha producido un problema en su dispositivo y necesita reiniciarse. Estamos recopilando información sobre el error y después se reiniciará automáticamente.'}
          </h2>
          <div
            style={{
              fontSize: isPreview ? '1rem' : '1.8rem',
              fontWeight: 400,
              marginBottom: isPreview ? '1.25rem' : '2.5rem',
            }}
          >
            <span>{progress}% completado</span>
          </div>

          <div style={{ display: 'flex', gap: isPreview ? '1rem' : '2rem', alignItems: 'center' }}>
            <div
              style={{
                width: isPreview ? '64px' : '110px',
                height: isPreview ? '64px' : '110px',
                backgroundColor: '#ffffff',
                padding: isPreview ? '4px' : '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {/* QR Mockup */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '2px solid #000',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '2px',
                  padding: '2px',
                }}
              >
                <div style={{ backgroundColor: '#000' }}></div>
                <div style={{ backgroundColor: '#fff' }}></div>
                <div style={{ backgroundColor: '#000' }}></div>
                <div style={{ backgroundColor: '#fff' }}></div>
                <div style={{ backgroundColor: '#000' }}></div>
                <div style={{ backgroundColor: '#fff' }}></div>
                <div style={{ backgroundColor: '#000' }}></div>
                <div style={{ backgroundColor: '#000' }}></div>
                <div style={{ backgroundColor: '#000' }}></div>
              </div>
            </div>

            <div style={{ fontSize: isPreview ? '0.68rem' : '0.85rem', lineHeight: 1.5, opacity: 0.9 }}>
              <p style={{ marginBottom: '0.2rem' }}>Para obtener más información sobre este problema y posibles soluciones, visita:</p>
              <p style={{ fontWeight: 'bold' }}>https://windows.com/stopcode</p>
              <p style={{ marginTop: '0.4rem', opacity: 0.8 }}>
                Si llamas a un técnico de soporte, dales esta información:
              </p>
              <p style={{ fontWeight: 'bold' }}>Código de detención: {title || 'CRITICAL_PROCESS_DIED'}</p>
            </div>
          </div>
        </div>
      );
  }
};
