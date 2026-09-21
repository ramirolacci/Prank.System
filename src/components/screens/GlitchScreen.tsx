import React, { useState, useEffect, useRef } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert } from 'lucide-react';
import { playHackerTyping } from '../../utils/audio';
import { vibrateImpactGlitch } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export const GlitchScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, intensity, duration, theme, showReveal, soundEnabled, vibrationEnabled } = config;
  const [trails, setTrails] = useState<TrailDot[]>([]);
  const [hackLines, setHackLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Glitch message terminal simulation
  useEffect(() => {
    const defaultLines = [
      'SYSTEM OVERRIDE INITIATED...',
      'BYPASSING SECURITY FIREWALL...',
      'EXTRACTING KERNEL MEMORY DUMP...',
      'WARNING: STACK OVERFLOW AT NODE #4982',
      'ENCRYPTING LOCAL USER CLUSTERS...',
      'CRITICAL: SYSTEM HEAT LIMIT REACHED',
      'IP ROUTE REDIRECTED TO 127.0.0.1'
    ];

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (!isPreview) {
        if (soundEnabled) playHackerTyping();
        if (vibrationEnabled && lineIndex % 2 === 0) vibrateImpactGlitch();
      }
      setHackLines((prev) => {
        const maxLines = isPreview ? 4 : 8;
        const next = [...prev, defaultLines[lineIndex % defaultLines.length]];
        if (next.length > maxLines) next.shift();
        return next;
      });
      lineIndex++;
    }, 1200 / (intensity / 4 + 0.5));

    return () => clearInterval(interval);
  }, [intensity, isPreview, soundEnabled, vibrationEnabled]);

  // Duration reveal timer
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (showReveal) onComplete();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration, showReveal, onComplete]);

  // Handle cursor movement to generate haunted trails
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPreview) return;
    
    const newDot: TrailDot = {
      id: Math.random() + Date.now(),
      x: e.clientX,
      y: e.clientY
    };

    setTrails((prev) => [...prev.slice(-15), newDot]);
  };

  // Clean up trail dots
  useEffect(() => {
    if (trails.length === 0) return;
    const timeout = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 200);
    return () => clearTimeout(timeout);
  }, [trails]);

  const glitchStyle: React.CSSProperties = {
    animation: intensity > 6 ? 'jitter 0.15s infinite' : intensity > 3 ? 'jitter 0.3s infinite' : 'none',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#05070a',
        color: '#39ff14',
        fontFamily: '"Fira Code", "Share Tech Mono", monospace',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'crosshair',
        padding: isPreview ? '0.75rem 0.5rem' : '2rem 1rem',
        userSelect: 'none',
        boxSizing: 'border-box',
        ...glitchStyle,
      }}
    >
      <div className="crt-overlay"></div>
      <div className="scanline"></div>

      {!isPreview && (
        <div className="cursor-trail-layer">
          {trails.map((dot) => (
            <div
              key={dot.id}
              className="trail-dot"
              style={{
                left: dot.x,
                top: dot.y,
                backgroundColor: theme === 'matrix' ? '#39ff14' : 'var(--accent)',
                boxShadow: `0 0 10px ${theme === 'matrix' ? '#39ff14' : 'var(--accent)'}`,
              }}
            ></div>
          ))}
        </div>
      )}

      {/* Cyberpunk matrix content card */}
      <div
        className="glass-card bg-glow-purple"
        style={{
          border: '1px solid rgba(57, 255, 20, 0.3)',
          backgroundColor: 'rgba(5, 7, 10, 0.85)',
          maxWidth: '640px',
          width: '100%',
          padding: isPreview ? '1rem 0.85rem' : '2rem 1.5rem',
          textAlign: 'left',
          boxShadow: '0 8px 32px rgba(57, 255, 20, 0.15)',
          zIndex: 10,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: isPreview ? '0.6rem' : '1rem', marginBottom: isPreview ? '0.75rem' : '1.5rem' }}>
          <ShieldAlert size={isPreview ? 24 : 36} color={intensity > 7 ? 'var(--accent-pink)' : '#39ff14'} className="jitter-effect" />
          <h2
            className="glitch-text"
            data-text={title || 'ALERT: SECURITY OVERRIDE'}
            style={{
              fontSize: isPreview ? '1.1rem' : '1.5rem',
              fontWeight: 'bold',
              color: intensity > 7 ? 'var(--accent-pink)' : '#39ff14',
              lineHeight: 1.25,
            }}
          >
            {title || 'ALERT: SECURITY OVERRIDE'}
          </h2>
        </div>

        <p style={{ color: '#fff', fontSize: isPreview ? '0.78rem' : '0.95rem', opacity: 0.9, lineHeight: 1.4, marginBottom: isPreview ? '0.75rem' : '1.5rem' }}>
          {message || 'Un dispositivo remoto está intentando tomar el control del sistema del puntero.'}
        </p>

        {/* Terminal logs block */}
        <div
          style={{
            backgroundColor: '#020305',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            borderRadius: '6px',
            padding: isPreview ? '0.6rem' : '1rem',
            fontSize: isPreview ? '0.7rem' : '0.8rem',
            lineHeight: 1.5,
            minHeight: isPreview ? '90px' : '180px',
            color: 'rgba(57, 255, 20, 0.85)',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          {hackLines.map((line, idx) => (
            <div key={idx} style={{ opacity: idx === hackLines.length - 1 ? 1 : 0.6 }}>
              <span style={{ color: 'var(--accent-pink)', marginRight: '6px' }}>&gt;</span>
              {line}
            </div>
          ))}
          <div>
            <span style={{ color: 'var(--accent-pink)', marginRight: '6px' }}>&gt;</span>
            <span className="terminal-cursor"></span>
          </div>
        </div>

        <div style={{ marginTop: isPreview ? '0.75rem' : '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: isPreview ? '0.68rem' : '0.75rem', color: '#666' }}>
          <span>GLITCH_INTENSITY: {intensity}/10</span>
          <span>SYSTEM: COMPROMISED</span>
        </div>
      </div>
    </div>
  );
};
