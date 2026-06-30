import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './components/LandingPage';
import { PrankBuilder } from './components/PrankBuilder';
import { PrankRuntime } from './components/PrankRuntime';
import { PrankConfig } from './types/prank';
import { DEFAULT_CONFIG, decodeConfig } from './utils/url';

export default function App() {
  const [view, setView] = useState<'landing' | 'builder' | 'runtime'>('landing');
  const [activeConfig, setActiveConfig] = useState<PrankConfig>(DEFAULT_CONFIG);

  // Parse URL search parameters on mount to check if this is a shared prank link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    if (p) {
      const decoded = decodeConfig(p);
      if (decoded) {
        setActiveConfig(decoded);
        setView('runtime');
      }
    }
  }, []);

  const handleCreatePrank = (initialConfig?: PrankConfig) => {
    if (initialConfig) {
      setActiveConfig(initialConfig);
    } else {
      setActiveConfig(DEFAULT_CONFIG);
    }
    setView('builder');
  };

  const handleNavigateHome = () => {
    // Clear URL query parameters when returning to landing page
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setView('landing');
  };

  const handleLaunchPrank = (config: PrankConfig) => {
    setActiveConfig(config);
    setView('runtime');
  };

  // If in active runtime mode (shared link or playing builder preview), load full immersion directly
  if (view === 'runtime') {
    return (
      <PrankRuntime
        config={activeConfig}
        onExit={handleNavigateHome}
      />
    );
  }

  return (
    <AppLayout onNavigateHome={handleNavigateHome}>
      {view === 'landing' ? (
        <LandingPage
          onCreatePrank={handleCreatePrank}
        />
      ) : (
        <PrankBuilder
          initialConfig={activeConfig}
          onNavigateHome={handleNavigateHome}
          onLaunchPrank={handleLaunchPrank}
        />
      )}
    </AppLayout>
  );
}
