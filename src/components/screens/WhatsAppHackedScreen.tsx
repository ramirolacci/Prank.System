import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { Smartphone, ShieldAlert, Monitor, MapPin, Clock, MessageSquare, Image, Mic, AlertTriangle } from 'lucide-react';
import { playPulseBuzzer } from '../../utils/audio';
import { vibrateErrorPulse } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const WhatsAppHackedScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled, location, targetName } = config;
  const [progress, setProgress] = useState(14);
  const [syncedMessages, setSyncedMessages] = useState(1420);
  const [syncedPhotos, setSyncedPhotos] = useState(384);
  const [syncedAudios, setSyncedAudios] = useState(96);

  const victimLocation = location?.trim() ? location : 'San Pablo, Brasil (IP: 189.210.45.99)';

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

  // Sync counters simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          return 99;
        }
        return prev + Math.floor(Math.random() * 6) + 2;
      });
      setSyncedMessages((prev) => prev + Math.floor(Math.random() * 45) + 12);
      setSyncedPhotos((prev) => prev + Math.floor(Math.random() * 12) + 3);
      setSyncedAudios((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 500);

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
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isPreview ? '0.5rem' : '1.5rem 1rem',
        userSelect: 'none',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Official WhatsApp Top Header Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: isPreview ? '50px' : '90px',
          backgroundColor: '#202c33',
          borderBottom: '1px solid #2a3942',
          display: 'flex',
          alignItems: 'center',
          padding: isPreview ? '0 1rem' : '0 2rem',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            style={{
              width: isPreview ? '24px' : '36px',
              height: isPreview ? '24px' : '36px',
              borderRadius: '50%',
              backgroundColor: '#00a884',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldAlert size={isPreview ? 14 : 20} color="#111b21" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: isPreview ? '0.82rem' : '1rem', color: '#e9edef' }}>
              WhatsApp Security Center
            </div>
            <div style={{ fontSize: isPreview ? '0.62rem' : '0.75rem', color: '#8696a0' }}>
              Aviso del sistema de protección de cuenta
            </div>
          </div>
        </div>
      </div>

      <div
        className="glass-card"
        style={{
          maxWidth: '520px',
          width: '100%',
          backgroundColor: '#111b21',
          border: '1.5px solid #2a3942',
          borderRadius: '16px',
          padding: isPreview ? '0.85rem 0.85rem' : '2.25rem 1.75rem',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          zIndex: 10,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          marginTop: isPreview ? '1rem' : '1.5rem',
        }}
      >
        {/* Device Icon Header */}
        <div
          style={{
            width: isPreview ? '46px' : '68px',
            height: isPreview ? '46px' : '68px',
            borderRadius: '50%',
            backgroundColor: 'rgba(234, 88, 12, 0.15)',
            border: '2px solid #f97316',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isPreview ? '0.5rem' : '1rem',
            boxShadow: '0 0 25px rgba(249, 115, 22, 0.3)',
            flexShrink: 0,
          }}
        >
          <Smartphone size={isPreview ? 24 : 34} color="#f97316" />
        </div>

        <div
          style={{
            backgroundColor: '#ea580c',
            color: '#ffffff',
            fontSize: isPreview ? '0.6rem' : '0.72rem',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '3px 12px',
            borderRadius: '4px',
            marginBottom: isPreview ? '0.4rem' : '0.75rem',
            textTransform: 'uppercase',
          }}
        >
          ALERTA DE SEGURIDAD CRÍTICA — SESIÓN DUPLICADA
        </div>

        <h2 style={{ fontSize: isPreview ? '1.05rem' : '1.5rem', fontWeight: 800, marginBottom: '0.35rem', color: '#ffffff', lineHeight: 1.25 }}>
          {title || '¡NUEVO DISPOSITIVO VINCULADO!'}
        </h2>

        {targetName && (
          <div style={{ color: '#00a884', fontWeight: 700, fontSize: isPreview ? '0.75rem' : '0.9rem', marginBottom: '0.35rem' }}>
            CUENTA DE WHATSAPP: {targetName.toUpperCase()}
          </div>
        )}

        <p style={{ fontSize: isPreview ? '0.72rem' : '0.86rem', color: '#8696a0', lineHeight: 1.4, marginBottom: isPreview ? '0.65rem' : '1.15rem' }}>
          {message ||
            'Se detectó un nuevo inicio de sesión en tu cuenta. Se está sincronizando el historial completo de mensajes y multimedia.'}
        </p>

        {/* Realistic Connection Details Card */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#202c33',
            border: '1px solid #2a3942',
            borderRadius: '10px',
            padding: isPreview ? '0.5rem 0.75rem' : '0.85rem 1.15rem',
            marginBottom: isPreview ? '0.65rem' : '1.15rem',
            fontSize: isPreview ? '0.68rem' : '0.82rem',
            textAlign: 'left',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: isPreview ? '0.3rem 0.5rem' : '0.5rem 0.85rem',
            boxSizing: 'border-box',
          }}
        >
          <div>
            <span style={{ color: '#8696a0', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Monitor size={11} /> DISPOSITIVO REMOTO:
            </span>
            <div style={{ color: '#ffffff', fontWeight: 700 }}>WhatsApp Web / macOS</div>
          </div>

          <div>
            <span style={{ color: '#8696a0', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <MapPin size={11} /> UBICACIÓN:
            </span>
            <div style={{ color: '#f97316', fontWeight: 700 }}>{victimLocation}</div>
          </div>

          <div>
            <span style={{ color: '#8696a0', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
              <Clock size={11} /> HORA DE ACCESO:
            </span>
            <div style={{ color: '#ffffff', fontWeight: 700 }}>Hace 1 min (14:34hs)</div>
          </div>

          <div>
            <span style={{ color: '#8696a0', fontSize: '0.68rem' }}>ESTADO DE CIFRADO:</span>
            <div style={{ color: '#ef4444', fontWeight: 700 }}>⚠️ CLAVE CAMBIADA</div>
          </div>
        </div>

        {/* Live Export Progress Box */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#182229',
            border: '1px solid rgba(0, 168, 132, 0.3)',
            borderRadius: '10px',
            padding: isPreview ? '0.55rem' : '0.9rem',
            marginBottom: isPreview ? '0.65rem' : '1.15rem',
            textAlign: 'left',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: isPreview ? '0.7rem' : '0.82rem' }}>
            <span style={{ color: '#00a884', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldAlert size={isPreview ? 12 : 14} /> Sincronizando respaldo remoto...
            </span>
            <span style={{ color: '#00a884', fontWeight: 800 }}>{progress}%</span>
          </div>

          <div
            style={{
              width: '100%',
              height: '7px',
              backgroundColor: '#111b21',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: isPreview ? '0.4rem' : '0.65rem',
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

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '0.25rem',
              fontSize: isPreview ? '0.6rem' : '0.72rem',
              color: '#8696a0',
              textAlign: 'center',
            }}
          >
            <div>
              <MessageSquare size={isPreview ? 10 : 12} style={{ display: 'inline', marginRight: '3px' }} color="#00a884" />
              <strong style={{ color: '#fff' }}>{syncedMessages}</strong> msgs
            </div>
            <div>
              <Image size={isPreview ? 10 : 12} style={{ display: 'inline', marginRight: '3px' }} color="#00a884" />
              <strong style={{ color: '#fff' }}>{syncedPhotos}</strong> fotos
            </div>
            <div>
              <Mic size={isPreview ? 10 : 12} style={{ display: 'inline', marginRight: '3px' }} color="#00a884" />
              <strong style={{ color: '#fff' }}>{syncedAudios}</strong> audios
            </div>
          </div>
        </div>

        <button
          onClick={showReveal ? onComplete : () => alert('WhatsApp Security: La desvinculación remota requiere código SMS de confirmación.')}
          style={{
            width: '100%',
            padding: isPreview ? '0.55rem' : '0.85rem',
            borderRadius: '8px',
            backgroundColor: '#00a884',
            color: '#111b21',
            fontWeight: 800,
            fontSize: isPreview ? '0.78rem' : '0.9rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(0, 168, 132, 0.4)',
            letterSpacing: '0.3px',
          }}
        >
          CERRAR SESIÓN EN TODOS LOS DISPOSITIVOS
        </button>

        <div style={{ marginTop: isPreview ? '0.4rem' : '0.75rem', fontSize: isPreview ? '0.58rem' : '0.7rem', color: '#667781' }}>
          🔒 WhatsApp LLC — Notificación de Seguridad y Privacidad
        </div>
      </div>
    </div>
  );
};

