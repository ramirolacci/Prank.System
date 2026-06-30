import React, { useState } from 'react';
import { PrankConfig } from '../../types/prank';
import { PrankRuntime } from '../PrankRuntime';
import { Monitor, Smartphone } from 'lucide-react';

interface ResponsivePreviewWrapperProps {
  config: PrankConfig;
  children?: React.ReactNode;
}

export const ResponsivePreviewWrapper: React.FC<ResponsivePreviewWrapperProps> = ({
  config,
  children,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const isMobile = viewMode === 'mobile';

  return (
    <div className="preview-wrapper">
      <div className="preview-header">
        <h4 className="preview-title">
          <Monitor size={16} style={{ color: 'var(--primary)' }} />
          Vista previa en vivo
        </h4>
        <div className="preview-mode-toggle">
          <button
            type="button"
            onClick={() => setViewMode('desktop')}
            className={`preview-mode-btn ${!isMobile ? 'active' : ''}`}
            aria-label="Vista escritorio"
          >
            <Monitor size={14} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`preview-mode-btn ${isMobile ? 'active' : ''}`}
            aria-label="Vista móvil"
          >
            <Smartphone size={14} />
          </button>
        </div>
      </div>

      <div
        className={`browser-mockup ${isMobile ? 'browser-mockup-mobile' : ''}`}
        style={{
          maxWidth: isMobile ? '320px' : '100%',
          margin: isMobile ? '0 auto' : undefined,
        }}
      >
        <div className="browser-chrome">
          <div className="browser-dots">
            <div className="dot dot-red" />
            <div className="dot dot-yellow" />
            <div className="dot dot-green" />
          </div>
          <div className="browser-url">prankforge.app/?p=…</div>
          <div style={{ width: '42px' }} />
        </div>

        <div className="browser-content">
          {children ?? (
            <PrankRuntime
              key={JSON.stringify(config)}
              config={config}
              onExit={() => {}}
              isPreview={true}
            />
          )}
        </div>
      </div>

      <p className="preview-tip">
        💡 En preview no se activa fullscreen real. Usá <strong>"Probar pantalla completa"</strong>{' '}
        para la experiencia inmersiva.
      </p>
    </div>
  );
};
