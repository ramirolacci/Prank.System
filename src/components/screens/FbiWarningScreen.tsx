import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert, Lock, AlertTriangle, Camera, Radio, Globe } from 'lucide-react';
import { playAlarmSiren, playPulseBuzzer } from '../../utils/audio';
import { vibrateAlarmPattern } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const FbiWarningScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled, location, targetName } = config;
  const [secondsLeft, setSecondsLeft] = useState(duration > 0 ? duration : 300);
  const [userIp] = useState('190.210.45.122');

  const victimLocation = location?.trim() ? location : 'LOCAL DETECTADO (GPS ACTIVO)';

  // Trigger audio siren & vibration on start
  useEffect(() => {
    if (isPreview) return;
    if (soundEnabled) {
      playAlarmSiren();
      const interval = setInterval(() => playPulseBuzzer(), 3000);
      return () => clearInterval(interval);
    }
    if (vibrationEnabled) {
      vibrateAlarmPattern();
    }
  }, [isPreview, soundEnabled, vibrationEnabled]);

  // Duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (showReveal) onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showReveal, onComplete]);

  // Format timer MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#050202',
        color: '#ffffff',
        fontFamily: '"Outfit", "Segoe UI", system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isPreview ? '0.5rem' : '1.5rem 1rem',
        overflow: 'hidden',
        userSelect: 'none',
        border: isPreview ? '3px solid #dc2626' : '10px solid #dc2626',
        animation: 'borderFlash 1s infinite alternate',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Police Siren Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isPreview ? '6px' : '10px',
          background: 'linear-gradient(90deg, #dc2626 0%, #2563eb 50%, #dc2626 100%)',
          backgroundSize: '200% 100%',
          animation: 'sirenBar 0.8s linear infinite',
          zIndex: 20,
        }}
      />

      <style>{`
        @keyframes sirenBar {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        @keyframes recBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      <div
        className="glass-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: 'rgba(12, 3, 3, 0.95)',
          border: '1.5px solid rgba(239, 68, 68, 0.6)',
          borderRadius: '16px',
          padding: isPreview ? '0.75rem 0.75rem' : '2rem 1.5rem',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(220, 38, 38, 0.35)',
          position: 'relative',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* Live Camera Active Indicator */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            padding: isPreview ? '2px 8px' : '4px 12px',
            borderRadius: '999px',
            marginBottom: isPreview ? '0.4rem' : '0.85rem',
            fontSize: isPreview ? '0.6rem' : '0.72rem',
            color: '#fca5a5',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          <Camera size={isPreview ? 11 : 14} style={{ animation: 'recBlink 1s infinite' }} color="#ef4444" />
          <span>🔴 CÁMARA FRONTAL ACTIVADA — REGISTRANDO ROSTRO</span>
        </div>

        {/* FBI / Police Seal Badge Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isPreview ? '0.4rem' : '1rem' }}>
          <div
            style={{
              width: isPreview ? '42px' : '72px',
              height: isPreview ? '42px' : '72px',
              borderRadius: '50%',
              backgroundColor: '#881337',
              border: '3px solid #f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(220, 38, 38, 0.7)',
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={isPreview ? 24 : 40} color="#ffffff" />
          </div>
        </div>

        <div
          style={{
            display: 'inline-block',
            backgroundColor: '#dc2626',
            color: '#fff',
            fontWeight: 800,
            fontSize: isPreview ? '0.6rem' : '0.72rem',
            letterSpacing: '1.5px',
            padding: '4px 12px',
            borderRadius: '4px',
            textTransform: 'uppercase',
          }}
        >
          DIVISIÓN DE DELITOS CIBERNÉTICOS — ORDEN JUDICIAL FEDERAL #FED-99482
        </div>

        <h2
          style={{
            fontSize: isPreview ? '1.05rem' : '1.65rem',
            fontWeight: 900,
            color: '#ffffff',
            marginTop: isPreview ? '0.4rem' : '0.85rem',
            marginBottom: isPreview ? '0.3rem' : '0.5rem',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {title || '¡DISPOSITIVO BLOQUEADO POR LA POLICÍA NACIONAL!'}
        </h2>

        {targetName && (
          <div style={{ color: '#fca5a5', fontWeight: 800, fontSize: isPreview ? '0.75rem' : '0.9rem', marginBottom: '0.4rem' }}>
            TITULAR REGISTRADO: {targetName.toUpperCase()}
          </div>
        )}

        <p style={{ color: '#cbd5e1', fontSize: isPreview ? '0.72rem' : '0.88rem', lineHeight: 1.4, marginBottom: isPreview ? '0.6rem' : '1.15rem' }}>
          {message ||
            'Se ha detectado tráfico de archivos no autorizados e intrusión cibernética proveniente de esta dirección de red.'}
        </p>

        {/* Victim Information Forensic Card */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '10px',
            padding: isPreview ? '0.45rem 0.65rem' : '0.85rem 1.25rem',
            marginBottom: isPreview ? '0.6rem' : '1.15rem',
            fontSize: isPreview ? '0.68rem' : '0.82rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: isPreview ? '0.3rem 0.5rem' : '0.5rem 1rem',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Globe size={11} /> DIRECCIÓN IP:
            </span>
            <div style={{ color: '#ffffff', fontWeight: 800, fontFamily: 'monospace' }}>{userIp}</div>
          </div>

          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Radio size={11} /> ESTADO DISPOSITIVO:
            </span>
            <div style={{ color: '#ef4444', fontWeight: 800 }}>BLOQUEADO E INCAUTADO</div>
          </div>

          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>EXPEDIENTE JUDICIAL:</span>
            <div style={{ color: '#fca5a5', fontWeight: 800, fontFamily: 'monospace' }}>#POL-FED-99482-B</div>
          </div>

          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>UBICACIÓN DE LA VÍCTIMA:</span>
            <div style={{ color: '#38bdf8', fontWeight: 800 }}>{victimLocation}</div>
          </div>
        </div>

        {/* Criminal Law Code Disclaimer */}
        <div
          style={{
            fontSize: isPreview ? '0.6rem' : '0.72rem',
            color: '#94a3b8',
            marginBottom: isPreview ? '0.6rem' : '1.15rem',
            lineHeight: 1.3,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            padding: isPreview ? '0.35rem 0.5rem' : '0.6rem 0.85rem',
            borderRadius: '6px',
            borderLeft: '3px solid #ef4444',
            textAlign: 'left',
          }}
        >
          ⚖️ <strong>CÓDIGO PENAL APLICADO:</strong> Ley N° 26.388 (Delitos Informáticos) - Art. 197 / Title 18 U.S.C. § 1030. La memoria caché e historial de este equipo han sido preservados para investigación criminal.
        </div>

        {/* Countdown Box */}
        <div
          style={{
            backgroundColor: '#450a0a',
            borderRadius: '10px',
            padding: isPreview ? '0.45rem' : '0.85rem',
            marginBottom: isPreview ? '0.65rem' : '1.15rem',
            border: '1px solid #ef4444',
          }}
        >
          <div style={{ fontSize: isPreview ? '0.62rem' : '0.75rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
            TIEMPO RESTANTE PARA PAGO DE MULTA DE EMERGENCIA:
          </div>
          <div
            style={{
              fontSize: isPreview ? '1.4rem' : '2.3rem',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              marginTop: '0.1rem',
            }}
          >
            {formatTime(secondsLeft)}
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Policía Federal: Trámite de multa bloqueado por orden judicial.')}
          style={{
            width: '100%',
            padding: isPreview ? '0.55rem' : '0.85rem',
            borderRadius: '8px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: isPreview ? '0.78rem' : '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(220, 38, 38, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            letterSpacing: '0.5px',
          }}
        >
          <Lock size={isPreview ? 13 : 18} />
          <span>ABONAR MULTA DE EMERGENCIA ($500 USD)</span>
        </button>
      </div>
    </div>
  );
};

