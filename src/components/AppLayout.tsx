import React, { useState } from 'react';
import { Terminal, Flame } from 'lucide-react';
import { SettingsPanel } from './settings/SettingsPanel';
import { SettingsUIProvider } from '../context/SettingsUIContext';
import { PwaInstallBanner } from './pwa/PwaInstallBanner';
import { PwaInstallButton } from './pwa/PwaInstallBanner';
import { useStandaloneMode } from '../hooks/useStandaloneMode';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigateHome }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { isStandalone } = useStandaloneMode();

  return (
    <SettingsUIProvider value={{ openSettings: () => setSettingsOpen(true) }}>
    <div className="app-shell">
      {!isStandalone && <PwaInstallBanner />}
      <header
        className="app-header"
        style={{
          background: 'var(--bg-sidebar)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          onClick={onNavigateHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '1.6rem', lineHeight: 1, userSelect: 'none' }}>🎭</span>
          <div>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '0.5px',
                background: 'linear-gradient(to right, #ffffff, #e5e7eb)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Prank<span style={{ color: 'var(--accent)', WebkitTextFillColor: 'initial' }}>Forge</span>
            </h1>
            <span
              style={{
                fontSize: '0.6rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginTop: '-2px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600,
              }}
            >
              Laboratorio de Bromas
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!isStandalone && <PwaInstallButton compact />}
          <div
            className="app-header-badge"
            style={{
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.02)',
              padding: '0.4rem 0.8rem',
              borderRadius: '8px',
              border: '1px solid var(--border)',
            }}
          >
            <Terminal size={14} style={{ color: 'var(--accent)' }} />
            <span>100% Inofensivo</span>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>

      <footer className={`app-footer ${isStandalone ? 'standalone-footer-compact' : ''}`}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p>
            Desarrollado con 💜. <strong>PrankForge</strong> es un simulador visual de código abierto.
          </p>
        </div>
      </footer>

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
    </SettingsUIProvider>
  );
};
