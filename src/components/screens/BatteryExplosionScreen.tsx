import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { Flame } from 'lucide-react';
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
        padding: isPreview ? '0.75rem 0.5rem' : '2rem 1rem',
        textAlign: 'center',
        userSelect: 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
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
          padding: isPreview ? '1rem 0.85rem' : '2.25rem 1.5rem',
          boxShadow: '0 0 40px rgba(239,68,68,0.6)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: isPreview ? '48px' : '70px',
            height: isPreview ? '48px' : '70px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isPreview ? '0.65rem' : '1.25rem',
            animation: 'bounce 1s infinite',
            flexShrink: 0,
          }}
        >
          <Flame size={isPreview ? 24 : 40} color="#fff" />
        </div>

        <span
          style={{
            backgroundColor: '#ef4444',
            color: '#fff',
            fontSize: isPreview ? '0.65rem' : '0.75rem',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '3px 10px',
            borderRadius: '999px',
            marginBottom: isPreview ? '0.5rem' : '0.85rem',
            textTransform: 'uppercase',
          }}
        >
          ALERTA TÉRMICA CRÍTICA
        </span>

        <h2 style={{ fontSize: isPreview ? '1.15rem' : '1.6rem', fontWeight: 800, marginBottom: '0.4rem', color: '#ffffff', lineHeight: 1.25 }}>
          {title || '¡SOBRECALENTAMIENTO EXTREMO!'}
        </h2>

        <p style={{ fontSize: isPreview ? '0.78rem' : '0.9rem', color: '#fca5a5', lineHeight: 1.4, marginBottom: isPreview ? '0.75rem' : '1.25rem' }}>
          {message ||
            'La temperatura interna del procesador ha alcanzado niveles críticos. Riesgo de deformación física de la batería.'}
        </p>

        {/* Temperature Gauge Meter */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#2b0707',
            borderRadius: '12px',
            padding: isPreview ? '0.75rem' : '1rem 1.25rem',
            marginBottom: isPreview ? '0.85rem' : '1.25rem',
            border: '1px solid #7f1d1d',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: isPreview ? '0.75rem' : '0.85rem' }}>
            <span style={{ color: '#fca5a5' }}>MEDIDOR TÉRMICO:</span>
            <span style={{ color: temp > 85 ? '#ef4444' : '#f59e0b', fontWeight: 'bold' }}>{temp}°C / 100°C</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#180000',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${temp}%`,
                background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Riesgo térmico: Enfriamiento de emergencia en curso.')}
          style={{
            width: '100%',
            padding: isPreview ? '0.65rem' : '0.85rem',
            borderRadius: '8px',
            backgroundColor: '#dc2626',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: isPreview ? '0.8rem' : '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(220, 38, 38, 0.4)',
          }}
        >
          ENFRIAR BATERÍA URGENTE
        </button>
      </div>
    </div>
  );
};
