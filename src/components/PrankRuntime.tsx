import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PrankConfig } from '../types/prank';
import { ExitButton } from './ExitButton';
import { FakeUpdateScreen } from './screens/FakeUpdateScreen';
import { FakeErrorScreen } from './screens/FakeErrorScreen';
import { GlitchScreen } from './screens/GlitchScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { SurpriseRevealScreen } from './screens/SurpriseRevealScreen';
import { getAppThemeClass } from '../utils/themes';

interface PrankRuntimeProps {
  config: PrankConfig;
  onExit: () => void;
  isPreview?: boolean;
}

export const PrankRuntime: React.FC<PrankRuntimeProps> = ({
  config,
  onExit,
  isPreview = false,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenBlocked, setFullscreenBlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hintShownRef = useRef(false);

  const syncFullscreenState = useCallback(() => {
    const active = !!document.fullscreenElement;
    setIsFullscreen(active);
    if (!active) setFullscreenBlocked(false);
  }, []);

  useEffect(() => {
    document.addEventListener('fullscreenchange', syncFullscreenState);
    return () => document.removeEventListener('fullscreenchange', syncFullscreenState);
  }, [syncFullscreenState]);

  useEffect(() => {
    if (isPreview || !config.fullscreen) return;
    const timer = setTimeout(() => {
      if (!hintShownRef.current) {
        setShowHint(true);
        hintShownRef.current = true;
        setTimeout(() => setShowHint(false), 4000);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isPreview, config.fullscreen]);

  const requestFullscreen = useCallback(async () => {
    if (isPreview || !config.fullscreen || document.fullscreenElement) return;

    try {
      await containerRef.current?.requestFullscreen();
      setFullscreenBlocked(false);
    } catch (err) {
      console.warn('Could not enable fullscreen:', err);
      setFullscreenBlocked(true);
    }
  }, [isPreview, config.fullscreen]);

  const handleScreenClick = () => {
    requestFullscreen();
  };

  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  const handleExit = useCallback(() => {
    if (document.fullscreenElement) {
      document
        .exitFullscreen()
        .then(() => onExit())
        .catch(() => onExit());
    } else {
      onExit();
    }
  }, [onExit]);

  const handlePrankComplete = () => {
    if (config.showReveal) {
      setIsRevealed(true);
    } else {
      handleExit();
    }
  };

  const renderActiveScreen = () => {
    if (isRevealed) {
      return <SurpriseRevealScreen config={config} onExit={handleExit} />;
    }

    const props = {
      config,
      onComplete: handlePrankComplete,
      isPreview,
    };

    switch (config.prankType) {
      case 'fake-update':
        return <FakeUpdateScreen {...props} />;
      case 'fake-error':
        return <FakeErrorScreen {...props} />;
      case 'glitch':
        return <GlitchScreen {...props} />;
      case 'loading':
        return <LoadingScreen {...props} />;
      case 'surprise-reveal':
        return <SurpriseRevealScreen config={config} onExit={handleExit} />;
      default:
        return <FakeUpdateScreen {...props} />;
    }
  };

  const themeClass = getAppThemeClass(config.appTheme);

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      className={themeClass}
      style={{
        position: isPreview ? 'absolute' : 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: isPreview ? 1 : 99999,
        width: isPreview ? '100%' : '100vw',
        height: isPreview ? '100%' : '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ['--accent-color' as string]: config.accentColor,
      }}
    >
      {!isPreview && fullscreenBlocked && config.fullscreen && (
        <div className="fullscreen-banner">
          Tu navegador no permite pantalla completa automática. La broma sigue funcionando — usá el
          botón de salir cuando quieras.
        </div>
      )}

      {!isPreview && showHint && config.fullscreen && !isFullscreen && (
        <div className="fullscreen-hint">Tocá la pantalla para expandir (opcional)</div>
      )}

      {!isRevealed && !isPreview && <ExitButton onExit={handleExit} />}

      {renderActiveScreen()}
    </div>
  );
};
