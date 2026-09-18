import React, { useState, useEffect } from 'react';
import { PrankConfig } from '../../types/prank';
import { playGlassCrunch } from '../../utils/audio';
import { vibrateGlassCrunch } from '../../utils/haptics';

interface ScreenProps {
  config: PrankConfig;
  onComplete: () => void;
  isPreview?: boolean;
}

interface CrackPoint {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export const BrokenGlassScreen: React.FC<ScreenProps> = ({ config, onComplete, isPreview = false }) => {
  const { title, message, duration, showReveal, soundEnabled, vibrationEnabled } = config;
  const [cracks, setCracks] = useState<CrackPoint[]>([]);

  // Initial central crack
  useEffect(() => {
    const initialCrack: CrackPoint = {
      id: Date.now(),
      x: window.innerWidth / 2 || 200,
      y: window.innerHeight / 2 || 300,
      scale: 1.2,
      rotation: 15,
    };
    setCracks([initialCrack]);
    if (!isPreview) {
      if (soundEnabled) playGlassCrunch();
      if (vibrationEnabled) vibrateGlassCrunch();
    }
  }, [isPreview, soundEnabled, vibrationEnabled]);

  // Handle user tap to add new cracks
  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    let clientX = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.clientX : 0;
    let clientY = e.nativeEvent instanceof MouseEvent ? e.nativeEvent.clientY : 0;

    if (e.nativeEvent instanceof TouchEvent && e.nativeEvent.touches.length > 0) {
      clientX = e.nativeEvent.touches[0].clientX;
      clientY = e.nativeEvent.touches[0].clientY;
    }

    if (!clientX && !clientY) return;

    if (!isPreview) {
      if (soundEnabled) playGlassCrunch();
      if (vibrationEnabled) vibrateGlassCrunch();
    }

    const newCrack: CrackPoint = {
      id: Date.now() + Math.random(),
      x: clientX,
      y: clientY,
      scale: 0.7 + Math.random() * 0.8,
      rotation: Math.floor(Math.random() * 360),
    };

    setCracks((prev) => [...prev, newCrack]);

    if (cracks.length > 12 && showReveal) {
      setTimeout(onComplete, 500);
    }
  };

  // Duration timer
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
      onClick={handleTap}
      onTouchStart={handleTap}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#0a0a0c',
        color: '#ffffff',
        fontFamily: '"Outfit", sans-serif',
        userSelect: 'none',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >
      {/* Spiderweb cracks SVG renderer at click positions */}
      {cracks.map((crack) => (
        <svg
          key={crack.id}
          style={{
            position: 'absolute',
            left: crack.x - 100,
            top: crack.y - 100,
            width: '200px',
            height: '200px',
            pointerEvents: 'none',
            transform: `scale(${crack.scale}) rotate(${crack.rotation}deg)`,
            zIndex: 5,
          }}
          viewBox="0 0 200 200"
        >
          {/* Spiderweb glass crack paths */}
          <g stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.85">
            <path d="M100 100 L20 15 M100 100 L180 30 M100 100 L190 150 M100 100 L30 180 M100 100 L110 5" />
            <path d="M100 100 L5 100 M100 100 L195 90 M100 100 L100 195" />
            <polygon points="80,85 120,75 125,115 85,120" strokeWidth="1" opacity="0.6" />
            <polygon points="60,70 140,55 150,140 50,145" strokeWidth="0.8" opacity="0.4" />
          </g>
        </svg>
      ))}

      {/* Floating glass warning note */}
      <div
        style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '999px',
          padding: '0.6rem 1.5rem',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.9)',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {title || '⚠️ PANTALLA DADAÑADA — TOCA PARA PROBAR INTEGRIDAD'}
      </div>
    </div>
  );
};
