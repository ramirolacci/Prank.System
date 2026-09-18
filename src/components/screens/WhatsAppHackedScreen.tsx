import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert, Smartphone, DownloadCloud, AlertTriangle } from 'lucide-react';
import { playPulseBuzzer, playAlarmSiren } from '../../utils/audio';
import { vibrateErrorPulse } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const WhatsAppHackedScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled } = config;
  const [progress, setProgress] = useState(12);

  // Audio and vibration on mount
  useEffect(() => {
    if (isPreview) return;
    if (soundEnabled) {
      playPulseBuzzer();
      const interval = setInterval(() => playPulseBuzzer(), 3500);
      return () => clearInterval(interval);
    }
    if (vibrationEnabled) {
      vibrateErrorPulse();
    }
  }, [isPreview, soundEnabled, vibrationEnabled]);

  // Export progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Duration reveal timer
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
        backgroundColor: '#0b141a',
        color: '#e9edef',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* WhatsApp Green Top Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '140px',
          backgroundColor: '#00a884',
          zIndex: 1,
        }}
      ></div>

      <div
        className="glass-card"
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#111b21',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          padding: '2.5rem 1.75rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#00a884',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
            boxShadow: '0 0 20px rgba(0, 168, 132, 0.4)',
          }}
        >
          <Smartphone size={32} color="#fff" />
        </div>

        <span
          style={{
            backgroundColor: '#ea580c',
            color: '#fff',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '4px 12px',
            borderRadius: '999px',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}
        >
          WHATSAPP WEB — SESIÓN CLONADA
        </span>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: '#ffffff' }}>
          {title || '¡NUEVO DISPOSITIVO VINCULADO!'}
        </h2>

        <p style={{ fontSize: '0.9rem', color: '#8696a0', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message ||
            'Se ha iniciado sesión desde una IP desconocida en San Pablo, Brasil. Exportando historial completo de chats y archivos multimedia...'}
        </p>

        {/* Export Progress Bar */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#202c33',
            borderRadius: '12px',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            textAlign: 'left',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
            <span style={{ color: '#8696a0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <DownloadCloud size={14} color="#00a884" />
              Exportando mensajes...
            </span>
            <span style={{ color: '#00a884', fontWeight: 'bold' }}>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#111b21',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#00a884',
                transition: 'width 0.3s ease',
              }}
            ></div>
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('Error: La vinculación remota no se puede detener desde este equipo.')}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '10px',
            backgroundColor: '#00a884',
            color: '#111b21',
            fontWeight: 800,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0, 168, 132, 0.3)',
          }}
        >
          DESVINCULAR SESIÓN REMOTA YA
        </button>
      </div>
    </div>
  );
};
