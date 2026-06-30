import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './components/LandingPage';
import { PrankBuilder } from './components/PrankBuilder';
import { PrankRuntime } from './components/PrankRuntime';
import { AnimatedPageTransition } from './components/shared/AnimatedPageTransition';
import { PrankConfig } from './types/prank';
import { DEFAULT_CONFIG, decodeConfig } from './utils/url';
import { usePrankStorage } from './context/LocalStorageContext';

export default function App() {
  const [view, setView] = useState<'landing' | 'builder' | 'runtime'>('landing');
  const [activeConfig, setActiveConfig] = useState<PrankConfig>(DEFAULT_CONFIG);
  const [preferDraft, setPreferDraft] = useState(false);
  const { history } = usePrankStorage();

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
      setPreferDraft(false);
    } else {
      setActiveConfig(DEFAULT_CONFIG);
      setPreferDraft(true);
    }
    setView('builder');
  };

  const handleNavigateHome = () => {
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setView('landing');
  };

  const handleLaunchPrank = (config: PrankConfig) => {
    setActiveConfig(config);
    setView('runtime');
  };

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
      <AnimatedPageTransition viewKey={view}>
        {view === 'landing' ? (
          <LandingPage
            onCreatePrank={handleCreatePrank}
            recentHistory={history.slice(0, 3)}
          />
        ) : (
          <PrankBuilder
            initialConfig={activeConfig}
            preferDraft={preferDraft}
            onNavigateHome={handleNavigateHome}
            onLaunchPrank={handleLaunchPrank}
          />
        )}
      </AnimatedPageTransition>
    </AppLayout>
  );
}
