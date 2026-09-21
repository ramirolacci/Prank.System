import React, { useState, useEffect, useRef } from 'react';
import { PrankConfig } from '../../types/prank';
import { Terminal, ShieldAlert, Cpu, HardDrive, Lock, Globe, Server, AlertTriangle } from 'lucide-react';
import { playHackerTyping } from '../../utils/audio';
import { vibrateImpactGlitch } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

export const GlitchScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, intensity, duration, showReveal, soundEnabled, vibrationEnabled, location, targetName } = config;
  const [hackLogs, setHackLogs] = useState<string[]>([]);
  const [hexDump, setHexDump] = useState<string[]>([]);
  const [cpuLoad, setCpuLoad] = useState(94);
  const containerRef = useRef<HTMLDivElement>(null);

  const victimLocation = location?.trim() ? location : 'Buenos Aires, Argentina (Nodo 5G)';
  const victimName = targetName?.trim() ? targetName.toUpperCase() : 'DISPOSITIVO_LOCAL_01';

  // Generate continuous random hex dump stream
  useEffect(() => {
    const generateHexLine = () => {
      const addr = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0').toUpperCase();
      const bytes = Array.from({ length: 8 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase()).join(' ');
      return `0x${addr}: ${bytes}`;
    };

    const interval = setInterval(() => {
      setHexDump((prev) => {
        const next = [...prev, generateHexLine()];
        return next.slice(isPreview ? -4 : -7);
      });
      setCpuLoad(Math.floor(Math.random() * 5) + 94);
    }, 150);

    return () => clearInterval(interval);
  }, [isPreview]);

  // Terminal log simulation sequence
  useEffect(() => {
    const getTimeStamp = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
    };

    const baseLogs = [
      `[${getTimeStamp()}] INICIANDO EXPLOTACIÓN EN PUERTO 443 (HTTPS)...`,
      `[${getTimeStamp()}] DESACTIVANDO CORTAFUEGOS Y ANÁLISIS DE CONDUCTA...`,
      `[${getTimeStamp()}] OBJETIVO IDENTIFICADO: ${victimName}`,
      `[${getTimeStamp()}] UBICACIÓN RASTREADA: ${victimLocation}`,
      `[${getTimeStamp()}] EXTRACCIÓN DE TOKENS DE SESIÓN Y CONTRASEÑAS...`,
      `[${getTimeStamp()}] INYECTANDO PAYLOAD EN UNIDAD PRINCIPAL /dev/nvme0n1...`,
      `[${getTimeStamp()}] TRANSMITIENDO COPIA DE DISCO A SERVIDOR C2 [RUSSIA-NODE-9]...`,
      `[${getTimeStamp()}] 🔴 PRIVILEGIOS DE SUPERUSUARIO (ROOT) CONCEDIDOS`,
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (!isPreview) {
        if (soundEnabled) playHackerTyping();
        if (vibrationEnabled && index % 2 === 0) vibrateImpactGlitch();
      }

      setHackLogs((prev) => {
        const maxLogs = isPreview ? 4 : 8;
        const next = [...prev, baseLogs[index % baseLogs.length]];
        return next.slice(-maxLogs);
      });
      index++;
    }, 900);

    return () => clearInterval(interval);
  }, [isPreview, soundEnabled, vibrationEnabled, victimLocation, victimName]);

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
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#03070a',
        color: '#22c55e',
        fontFamily: '"Fira Code", "JetBrains Mono", "Share Tech Mono", monospace',
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
      {/* CRT Scanline & Subtle Grid Overlay */}
      <div className="crt-overlay" style={{ pointerEvents: 'none', opacity: 0.15 }}></div>
      <div className="scanline" style={{ pointerEvents: 'none', opacity: 0.2 }}></div>

      {/* Terminal Container */}
      <div
        className="glass-card"
        style={{
          maxWidth: '720px',
          width: '100%',
          backgroundColor: 'rgba(5, 12, 18, 0.95)',
          border: '1.5px solid rgba(34, 197, 94, 0.4)',
          borderRadius: '12px',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.2), 0 20px 60px rgba(0, 0, 0, 0.9)',
          overflow: 'hidden',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        {/* Terminal Header Bar */}
        <div
          style={{
            backgroundColor: '#09151f',
            borderBottom: '1px solid rgba(34, 197, 94, 0.3)',
            padding: isPreview ? '0.35rem 0.65rem' : '0.6rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: isPreview ? '0.65rem' : '0.78rem',
            color: '#86efac',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700 }}>
            <Terminal size={isPreview ? 12 : 16} color="#22c55e" />
            <span>ROOT_EXPLOIT_CONSOLES_v6.8.2 — CONEXIÓN SSH ACTIVA</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#ef4444', fontWeight: 800 }}>
            <AlertTriangle size={isPreview ? 11 : 14} />
            <span>ACCESO ROOT OBTENIDO</span>
          </div>
        </div>

        <div style={{ padding: isPreview ? '0.65rem' : '1.5rem', textAlign: 'left' }}>
          {/* Main Title Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              padding: isPreview ? '0.4rem 0.65rem' : '0.75rem 1rem',
              borderRadius: '8px',
              marginBottom: isPreview ? '0.5rem' : '1rem',
            }}
          >
            <ShieldAlert size={isPreview ? 20 : 28} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ color: '#ef4444', fontWeight: 900, fontSize: isPreview ? '0.85rem' : '1.15rem', letterSpacing: '0.5px' }}>
                {title || 'ALERTA DE SEGURIDAD: INTRUSIÓN DE SISTEMA'}
              </div>
              <div style={{ color: '#fca5a5', fontSize: isPreview ? '0.62rem' : '0.78rem', marginTop: '2px' }}>
                {message || 'Un terminal remoto ha tomado el control del kernel y memoria del sistema.'}
              </div>
            </div>
          </div>

          {/* Forensic System Details Grid */}
          <div
            style={{
              backgroundColor: '#020609',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              borderRadius: '8px',
              padding: isPreview ? '0.45rem 0.65rem' : '0.75rem 1rem',
              marginBottom: isPreview ? '0.5rem' : '1rem',
              fontSize: isPreview ? '0.65rem' : '0.78rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: isPreview ? '0.25rem 0.5rem' : '0.4rem 1rem',
            }}
          >
            <div>
              <span style={{ color: '#64748b' }}>OBJETIVO:</span>{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>{victimName}</span>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>UBICACIÓN:</span>{' '}
              <span style={{ color: '#38bdf8', fontWeight: 700 }}>{victimLocation}</span>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>DIRECCIÓN IP:</span>{' '}
              <span style={{ color: '#86efac', fontWeight: 700 }}>190.210.45.122</span>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>CARGA CPU:</span>{' '}
              <span style={{ color: '#ef4444', fontWeight: 800 }}>{cpuLoad}% (SOBRECARGA)</span>
            </div>
          </div>

          {/* Dual Console View: Terminal Logs + Hex Dump */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isPreview ? '1fr' : '1.4fr 1fr',
              gap: isPreview ? '0.5rem' : '0.75rem',
              marginBottom: isPreview ? '0.4rem' : '0.85rem',
            }}
          >
            {/* Terminal Log Stream */}
            <div
              style={{
                backgroundColor: '#010407',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                padding: isPreview ? '0.4rem 0.5rem' : '0.75rem',
                fontSize: isPreview ? '0.62rem' : '0.75rem',
                lineHeight: 1.4,
                minHeight: isPreview ? '85px' : '150px',
                color: '#4ade80',
                boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.9)',
              }}
            >
              {hackLogs.map((log, i) => (
                <div key={i} style={{ opacity: i === hackLogs.length - 1 ? 1 : 0.7, marginBottom: '2px' }}>
                  {log}
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#86efac' }}>
                <span>&gt;</span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '7px',
                    height: '13px',
                    backgroundColor: '#22c55e',
                    animation: 'recBlink 0.8s infinite',
                  }}
                />
              </div>
            </div>

            {/* Memory Hex Dump Stream (Hidden on small preview) */}
            {!isPreview && (
              <div
                style={{
                  backgroundColor: '#010407',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  fontSize: '0.7rem',
                  lineHeight: 1.4,
                  color: '#38bdf8',
                  boxShadow: 'inset 0 0 12px rgba(0, 0, 0, 0.9)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ color: '#64748b', fontSize: '0.65rem', marginBottom: '4px', fontWeight: 700 }}>
                  MEMORIA CACHÉ ENCRIPTA EN VIVO:
                </div>
                {hexDump.map((hex, i) => (
                  <div key={i} style={{ opacity: 0.85, fontFamily: 'monospace' }}>
                    {hex}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: isPreview ? '0.6rem' : '0.72rem',
              color: '#64748b',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              paddingTop: isPreview ? '0.35rem' : '0.65rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Lock size={12} color="#22c55e" />
              <span>CLAVE RSA 4096-BIT INFILTRADA</span>
            </div>
            <div style={{ color: '#ef4444', fontWeight: 700 }}>SISTEMA COMPROMETIDO</div>
          </div>
        </div>
      </div>
    </div>
  );
};
