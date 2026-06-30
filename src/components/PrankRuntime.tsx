import React, { useState, useEffect, useRef } from 'react';
import { PrankConfig } from '../types/prank';
import { ExitButton } from './ExitButton';
import { FakeUpdateScreen } from './screens/FakeUpdateScreen';
import { FakeErrorScreen } from './screens/FakeErrorScreen';
import { GlitchScreen } from './screens/GlitchScreen';
import { LoadingScreen } from './screens/LoadingScreen';
import { SurpriseRevealScreen } from './screens/SurpriseRevealScreen';

interface PrankRuntimeProps {
  config: PrankConfig;
  onExit: () => void;
  isPreview?: boolean;
}

export const PrankRuntime: React.FC<PrankRuntimeProps> = ({ config, onExit, isPreview = false }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Attempt to request fullscreen when the user first clicks the page
  const handleScreenClick = () => {
    if (isPreview) return; // Don't trigger actual fullscreen in preview mode
    
    if (config.fullscreen && !document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.warn('Could not enable fullscreen:', err);
      });
    }
  };

  // Clean up fullscreen on component unmount
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.warn('Could not exit fullscreen:', err);
        });
      }
    };
  }, []);

  const handlePrankComplete = () => {
    if (config.showReveal) {
      setIsRevealed(true);
    } else {
      // If reveal is disabled, exit the prank
      handleExit();
    }
  };

  const handleExit = () => {
    // Make sure we exit fullscreen before returning
    if (document.fullscreenElement) {
      document.exitFullscreen()
        .then(() => onExit())
        .catch(() => onExit());
    } else {
      onExit();
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

  return (
    <div
      ref={containerRef}
      onClick={handleScreenClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 99999, // Overlay absolute top
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Floating Exit Button (only shown during actual prank simulation, not on reveal screen) */}
      {!isRevealed && <ExitButton onExit={handleExit} />}
      
      {/* Active Prank Screen */}
      {renderActiveScreen()}
    </div>
  );
};
