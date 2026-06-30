import React, { useState, useEffect } from 'react';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './components/LandingPage';
import { PrankBuilder } from './components/PrankBuilder';
import { PrankRuntime } from './components/PrankRuntime';
import { AnimatedPageTransition } from './components/shared/AnimatedPageTransition';
import { SocialPreviewMetadata } from './components/social/SocialPreviewMetadata';
import { SocialPreviewPage } from './components/social/SocialPreviewPage';
import { MobileSafeLayout } from './components/layout/MobileSafeLayout';
import { StandaloneModeWrapper } from './components/pwa/StandaloneModeWrapper';
import { PrankConfig } from './types/prank';
import { DEFAULT_CONFIG, decodeConfig, normalizeConfig, generateShareUrl } from './utils/url';
import { getSocialPreviewUrl } from './utils/socialMetadata';
import { usePrankStorage } from './context/LocalStorageContext';
import { useTheme } from './context/ThemeProvider';

type AppView = 'landing' | 'builder' | 'runtime' | 'social-preview';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [activeConfig, setActiveConfig] = useState<PrankConfig>(DEFAULT_CONFIG);
  const [shareUrl, setShareUrl] = useState('');
  const [preferDraft, setPreferDraft] = useState(false);
  const { history, lastPrank } = usePrankStorage();
  const { settings } = useTheme();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('p');
    const mode = params.get('mode');

    if (p) {
      const decoded = decodeConfig(p);
      if (decoded) {
        setActiveConfig(decoded);
        setShareUrl(generateShareUrl(decoded));

        if (mode === 'social') {
          setView('social-preview');
        } else {
          setView('runtime');
        }
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
    setShareUrl('');
    setView('builder');
  };

  const handleNavigateHome = () => {
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setShareUrl('');
    setView('landing');
  };

  const handleLaunchPrank = (config: PrankConfig) => {
    setActiveConfig(config);
    setShareUrl(generateShareUrl(config));
    setView('runtime');
  };

  const handleOpenSocialPreview = (config: PrankConfig) => {
    setActiveConfig(config);
    const url = generateShareUrl(config);
    setShareUrl(url);
    window.history.pushState({}, '', getSocialPreviewUrl(config));
    setView('social-preview');
  };

  const metadataConfig =
    view === 'runtime' || view === 'social-preview' || view === 'builder'
      ? activeConfig
      : null;

  const metadataShareUrl =
    shareUrl || (metadataConfig ? generateShareUrl(metadataConfig) : undefined);

  const content = (() => {
    if (view === 'runtime') {
      return <PrankRuntime config={activeConfig} onExit={handleNavigateHome} />;
    }

    if (view === 'social-preview') {
      return (
        <SocialPreviewPage
          config={activeConfig}
          onOpenPrank={() => setView('runtime')}
          onNavigateHome={handleNavigateHome}
        />
      );
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
              onOpenSocialPreview={handleOpenSocialPreview}
              onShareUrlChange={setShareUrl}
            />
          )}
        </AnimatedPageTransition>
      </AppLayout>
    );
  })();

  return (
    <StandaloneModeWrapper>
      <MobileSafeLayout>
        <SocialPreviewMetadata config={metadataConfig} shareUrl={metadataShareUrl}>
          {content}
        </SocialPreviewMetadata>
      </MobileSafeLayout>
    </StandaloneModeWrapper>
  );
}
