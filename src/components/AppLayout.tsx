import React from 'react';
import { Terminal, Flame } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigateHome: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onNavigateHome }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--bg-main)',
      }}
    >
      {/* Header */}
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
          <div
            style={{
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
            }}
          >
            <Flame size={20} color="#fff" />
          </div>
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

        <div className="app-header-badge"
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
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        className="app-footer"
        style={{
          background: 'var(--bg-sidebar)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
        }}
      >
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
            Desarrollado con 💜. <strong>PrankForge</strong> es un simulador visual temporal de código abierto.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1.5rem',
              marginTop: '0.25rem',
              fontSize: '0.72rem',
              color: 'var(--text-dark)',
            }}
          >
            <span>🔒 Sin Base de Datos</span>
            <span>🍪 Sin cookies invasivas</span>
            <span>🎉 Confeti incluido</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
