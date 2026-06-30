import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './components/LandingPage';
import { PrankBuilder } from './components/PrankBuilder';
import { PrankRuntime } from './components/PrankRuntime';
import { AnimatedPageTransition } from './components/shared/AnimatedPageTransition';
import { PrankConfig } from './types/prank';
import { DEFAULT_CONFIG, decodeConfig, normalizeConfig } from './utils/url';
import { usePrankStorage } from './context/LocalStorageContext';
import { useTheme } from './context/ThemeProvider';

export default function App() {
  const [view, setView] = useState<'landing' | 'builder' | 'runtime'>('landing');
  const [activeConfig, setActiveConfig] = useState<PrankConfig>(DEFAULT_CONFIG);
  const [preferDraft, setPreferDraft] = useState(false);
  const { history, lastPrank } = usePrankStorage();
  const { settings } = useTheme();

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

  const configWithGlobalTheme = (base?: Partial<PrankConfig>): PrankConfig =>
    normalizeConfig({
      ...DEFAULT_CONFIG,
      appTheme: settings.appTheme,
      accentColor: settings.accentColor,
      ...base,
    });

  const handleCreatePrank = (initialConfig?: PrankConfig) => {
    if (initialConfig) {
      setActiveConfig(initialConfig);
      setPreferDraft(false);
    } else {
      setActiveConfig(
        lastPrank
          ? { ...lastPrank, appTheme: settings.appTheme, accentColor: settings.accentColor }
          : configWithGlobalTheme()
      );
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
    return <PrankRuntime config={activeConfig} onExit={handleNavigateHome} />;
  }

  return (
    <AppLayout onNavigateHome={handleNavigateHome}>
      <AnimatedPageTransition viewKey={view}>
        {view === 'landing' ? (
          <LandingPage onCreatePrank={handleCreatePrank} history={history} />
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
