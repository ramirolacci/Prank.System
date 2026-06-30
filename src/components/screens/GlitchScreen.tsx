import React, { useState, useEffect, useRef } from 'react';
import { PrankConfig } from '../../types/prank';
import { ShieldAlert } from 'lucide-react';

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
  const { title, message, intensity, duration, theme, showReveal } = config;
  const [trails, setTrails] = useState<TrailDot[]>([]);
  const [glitchMessage, setGlitchMessage] = useState('');
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
      setHackLines((prev) => {
        const next = [...prev, defaultLines[lineIndex % defaultLines.length]];
        if (next.length > 8) next.shift(); // Keep only last 8 lines
        return next;
      });
      lineIndex++;
    }, 1200 / (intensity / 4 + 0.5));

    return () => clearInterval(interval);
  }, [intensity]);

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
    if (isPreview) return; // Don't intercept cursor in builder preview
    
    // Add new coordinate
    const newDot: TrailDot = {
      id: Math.random() + Date.now(),
      x: e.clientX,
      y: e.clientY
    };

    setTrails((prev) => [...prev.slice(-15), newDot]); // Limit trail length to 15 dots
  };

  // Clean up trail dots
  useEffect(() => {
    if (trails.length === 0) return;
    const timeout = setTimeout(() => {
      setTrails((prev) => prev.slice(1));
    }, 200);
    return () => clearTimeout(timeout);
  }, [trails]);

  // Jitter effect styling depending on intensity
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
        color: '#39ff14', // Cyberpunk neon green
        fontFamily: '"Fira Code", "Share Tech Mono", monospace',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'crosshair',
        padding: '2rem',
        userSelect: 'none',
        ...glitchStyle,
      }}
    >
      {/* CRT Overlay effect */}
      <div className="crt-overlay"></div>
      <div className="scanline"></div>

      {/* Cursor trail overlay */}
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
          padding: '2rem',
          textAlign: 'left',
          boxShadow: '0 8px 32px rgba(57, 255, 20, 0.15)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <ShieldAlert size={36} color={intensity > 7 ? 'var(--accent-pink)' : '#39ff14'} className="jitter-effect" />
          <h2
            className="glitch-text"
            data-text={title || 'ALERT: SECURITY OVERRIDE'}
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: intensity > 7 ? 'var(--accent-pink)' : '#39ff14',
            }}
          >
            {title || 'ALERT: SECURITY OVERRIDE'}
          </h2>
        </div>

        <p style={{ color: '#fff', fontSize: '0.95rem', opacity: 0.9, lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message || 'Un dispositivo remoto está intentando tomar el control del sistema del puntero.'}
        </p>

        {/* Terminal logs block */}
        <div
          style={{
            backgroundColor: '#020305',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            borderRadius: '6px',
            padding: '1rem',
            fontSize: '0.8rem',
            lineHeight: 1.6,
            minHeight: '180px',
            color: 'rgba(57, 255, 20, 0.85)',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          {hackLines.map((line, idx) => (
            <div key={idx} style={{ opacity: idx === hackLines.length - 1 ? 1 : 0.6 }}>
              <span style={{ color: 'var(--accent-pink)', marginRight: '8px' }}>&gt;</span>
              {line}
            </div>
          ))}
          <div>
            <span style={{ color: 'var(--accent-pink)', marginRight: '8px' }}>&gt;</span>
            <span className="terminal-cursor"></span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#666' }}>
          <span>GLITCH_INTENSITY: {intensity}/10</span>
          <span>SYSTEM: COMPROMISED</span>
        </div>
      </div>

      <style>{`
        @keyframes jitter {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2px, 1px) rotate(-0.5deg); }
          20% { transform: translate(2px, -2px) rotate(0.5deg); }
          30% { transform: translate(-1px, 2px) rotate(0deg); }
          40% { transform: translate(1.5px, -1.5px) rotate(0.5deg); }
          50% { transform: translate(-2px, -2px) rotate(-0.5deg); }
          60% { transform: translate(2px, 2px) rotate(0.5deg); }
          70% { transform: translate(-1px, -1px) rotate(-1deg); }
          80% { transform: translate(2px, -2px) rotate(0.5deg); }
          90% { transform: translate(-2px, 1.5px) rotate(0deg); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};
