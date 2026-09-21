import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import { playAlarmSiren, playPulseBuzzer } from '../../utils/audio';
import { vibrateAlarmPattern } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const FbiWarningScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled } = config;
  const [secondsLeft, setSecondsLeft] = useState(duration > 0 ? duration : 300);
  const [userIp] = useState('190.210.45.122');

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
        backgroundColor: '#0a0000',
        color: '#ffffff',
        fontFamily: '"Outfit", "Segoe UI", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isPreview ? '0.75rem 0.5rem' : '2rem 1rem',
        overflow: 'hidden',
        userSelect: 'none',
        border: isPreview ? '4px solid #dc2626' : '12px solid #dc2626',
        animation: 'borderFlash 1s infinite alternate',
        boxSizing: 'border-box',
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: 'rgba(20, 5, 5, 0.92)',
          border: '2px solid #ef4444',
          borderRadius: '16px',
          padding: isPreview ? '1rem 0.85rem' : '2.5rem 1.5rem',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.4)',
          position: 'relative',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* FBI / Police Seal Badge Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isPreview ? '0.6rem' : '1.25rem' }}>
          <div
            style={{
              width: isPreview ? '48px' : '80px',
              height: isPreview ? '48px' : '80px',
              borderRadius: '50%',
              backgroundColor: '#991b1b',
              border: '3px solid #fca5a5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={isPreview ? 26 : 44} color="#ffffff" />
          </div>
        </div>

        <span
          style={{
            backgroundColor: '#dc2626',
            color: '#fff',
            fontWeight: 800,
            fontSize: isPreview ? '0.65rem' : '0.75rem',
            letterSpacing: '1px',
            padding: '3px 10px',
            borderRadius: '999px',
            textTransform: 'uppercase',
          }}
        >
          DIVISIÓN DE DELITOS CIBERNÉTICOS — ORDEN DE BLOQUEO
        </span>

        <h2
          style={{
            fontSize: isPreview ? '1.15rem' : '1.8rem',
            fontWeight: 900,
            color: '#ffffff',
            marginTop: isPreview ? '0.6rem' : '1.25rem',
            marginBottom: isPreview ? '0.4rem' : '0.75rem',
            lineHeight: 1.25,
          }}
        >
          {title || '¡DISPOSITIVO BLOQUEADO POR LA POLICÍA NACIONAL!'}
        </h2>

        <p style={{ color: '#fca5a5', fontSize: isPreview ? '0.78rem' : '0.95rem', lineHeight: 1.4, marginBottom: isPreview ? '0.75rem' : '1.5rem' }}>
          {message ||
            'Se ha detectado actividad sospechosa y tráfico de archivos maliciosos no autorizados proveniente de esta conexión.'}
        </p>

        {/* Victim Information Card */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: isPreview ? '0.5rem 0.75rem' : '1rem 1.5rem',
            marginBottom: isPreview ? '0.75rem' : '1.5rem',
            fontSize: isPreview ? '0.72rem' : '0.85rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.4rem 0.75rem',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ color: '#888' }}>DIRECCIÓN IP:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>{userIp}</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>ESTADO:</span>
            <div style={{ color: '#ef4444', fontWeight: 'bold' }}>INCAUTADO</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>EXPEDIENTE:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>#FED-99482</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>UBICACIÓN:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>LOCAL DETECTADO</div>
          </div>
        </div>

        {/* Countdown Box */}
        <div
          style={{
            backgroundColor: '#7f1d1d',
            borderRadius: '10px',
            padding: isPreview ? '0.5rem' : '1rem',
            marginBottom: isPreview ? '0.75rem' : '1.5rem',
            border: '1px solid #f87171',
          }}
        >
          <div style={{ fontSize: isPreview ? '0.68rem' : '0.78rem', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '1px' }}>
            TIEMPO RESTANTE PARA PAGO DE MULTA FEDERAL:
          </div>
          <div
            style={{
              fontSize: isPreview ? '1.5rem' : '2.5rem',
              fontWeight: 900,
              color: '#ffffff',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              marginTop: '0.2rem',
            }}
          >
            {formatTime(secondsLeft)}
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Policía Federal: Trámite de multa bloqueado por orden judicial.')}
          style={{
            width: '100%',
            padding: isPreview ? '0.65rem' : '0.9rem',
            borderRadius: '8px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: isPreview ? '0.8rem' : '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Lock size={isPreview ? 14 : 18} />
          <span>ABONAR MULTA DE EMERGENCIA ($500 USD)</span>
        </button>
      </div>
    </div>
  );
};
