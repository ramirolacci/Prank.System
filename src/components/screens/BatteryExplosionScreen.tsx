import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { BatteryCharging, Zap, AlertOctagon, Flame } from 'lucide-react';
import { playAlarmSiren, playPulseBuzzer } from '../../utils/audio';
import { vibrateAlarmPattern } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const BatteryExplosionScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled } = config;
  const [temp, setTemp] = useState(42);

  // Temperature rise effect
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setTemp((prev) => {
        if (prev >= 98) return 98;
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 400);

    return () => clearInterval(tempInterval);
  }, []);

  // Audio and vibration alerts
  useEffect(() => {
    if (isPreview) return;
    if (soundEnabled) {
      playAlarmSiren();
      const interval = setInterval(() => playPulseBuzzer(), 2500);
      return () => clearInterval(interval);
    }
    if (vibrationEnabled) {
      vibrateAlarmPattern();
    }
  }, [isPreview, soundEnabled, vibrationEnabled]);

  // Duration handler
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (showReveal) onComplete();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration, showReveal, onComplete]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#180000',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background pulsing red flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(0,0,0,0.9) 100%)',
          animation: 'thermalPulse 0.8s infinite alternate',
        }}
      ></div>

      <div
        className="glass-card"
        style={{
          maxWidth: '460px',
          width: '100%',
          backgroundColor: 'rgba(15, 5, 5, 0.95)',
          border: '2px solid #ef4444',
          borderRadius: '20px',
          padding: '2.5rem 1.5rem',
          boxShadow: '0 0 40px rgba(239,68,68,0.6)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            animation: 'bounce 1s infinite',
          }}
        >
          <Flame size={40} color="#fff" />
        </div>

        <span
          style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}
        >
          CRITICAL THERMAL ALERT
        </span>

        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff' }}>
          {title || '¡SOBRECALENTAMIENTO EXTREMO!'}
        </h2>

        <p style={{ fontSize: '0.9rem', color: '#fca5a5', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message ||
            'La temperatura interna del procesador ha alcanzado niveles críticos. Riesgo de deformación física de la batería.'}
        </p>

        {/* Temperature Gauge Meter */}
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#aaa' }}>TEMPERATURA BATERÍA:</span>
            <span style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.1rem' }}>{temp}°C</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#333',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(temp / 100) * 100}%`,
                backgroundColor: temp > 80 ? '#ef4444' : temp > 60 ? '#f59e0b' : '#10b981',
                transition: 'width 0.3s ease-in-out',
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Dispositivo bloqueado por seguridad térmica.')}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            color: '#991b1b',
            fontWeight: 800,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
          }}
        >
          APAGAR TELÉFONO INMEDIATAMENTE
        </button>
      </div>

      <style>{`
        @keyframes thermalPulse {
          0% { opacity: 0.3; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};
