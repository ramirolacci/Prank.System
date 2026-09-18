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
  const [userIp, setUserIp] = useState('190.210.45.122');

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
        padding: '2rem',
        overflow: 'hidden',
        userSelect: 'none',
        border: '12px solid #dc2626',
        animation: 'borderFlash 1s infinite alternate',
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
          padding: '2.5rem',
          textAlign: 'center',
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.4)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* FBI / Police Seal Badge Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#991b1b',
              border: '3px solid #fca5a5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)',
            }}
          >
            <ShieldAlert size={44} color="#ffffff" />
          </div>
        </div>

        <span
          style={{
            backgroundColor: '#dc2626',
            color: '#fff',
            fontWeight: 800,
            fontSize: '0.75rem',
            letterSpacing: '2px',
            padding: '4px 14px',
            borderRadius: '999px',
            textTransform: 'uppercase',
          }}
        >
          DIVISIÓN DE DELITOS CIBERNÉTICOS — ORDEN DE BLOQUEO
        </span>

        <h2
          style={{
            fontSize: '1.8rem',
            fontWeight: 900,
            color: '#ffffff',
            marginTop: '1.25rem',
            marginBottom: '0.75rem',
            lineHeight: 1.3,
          }}
        >
          {title || '¡DISPOSITIVO BLOQUEADO POR LA POLICÍA NACIONAL!'}
        </h2>

        <p style={{ color: '#fca5a5', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {message ||
            'Se ha detectado actividad sospechosa y tráfico de archivos maliciosos no autorizados proveniente de esta conexión.'}
        </p>

        {/* Victim Information Card */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '10px',
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
          }}
        >
          <div>
            <span style={{ color: '#888' }}>DIRECCIÓN IP:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>{userIp}</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>ESTADO DEL DISPOSITIVO:</span>
            <div style={{ color: '#ef4444', fontWeight: 'bold' }}>INCAUTADO / BLOQUEADO</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>CÓDIGO DE EXPEDIENTE:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>#FED-99482-CYBER</div>
          </div>
          <div>
            <span style={{ color: '#888' }}>UBICACIÓN REGISTRADA:</span>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>LOCAL DETECTADO</div>
          </div>
        </div>

        {/* Countdown Box */}
        <div
          style={{
            backgroundColor: '#7f1d1d',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid #f87171',
          }}
        >
          <div style={{ fontSize: '0.8rem', color: '#fecaca', fontWeight: 600, textTransform: 'uppercase' }}>
            TIEMPO RESTANTE ANTES DE BLOQUEO PERMANENTE DE DISCO:
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'monospace', letterSpacing: '2px' }}>
            {formatTime(secondsLeft)}
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Acceso denegado: El dispositivo está bajo supervisión.')}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '10px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '1rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(239, 68, 68, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Lock size={18} />
          <span>PAGAR MULTA DE DESBLOQUEO ($250 USD)</span>
        </button>
      </div>

      <style>{`
        @keyframes borderFlash {
          0% { border-color: #dc2626; }
          100% { border-color: #1e3a8a; }
        }
      `}</style>
    </div>
  );
};
