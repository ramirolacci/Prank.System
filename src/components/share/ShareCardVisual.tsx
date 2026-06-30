import React from 'react';
import { PrankConfig, PRANK_TYPE_LABELS } from '../../types/prank';
import { APP_THEMES } from '../../utils/themes';
import { SHARE_CARD_EXPORT_ID } from '../../utils/imageExport';
import { Sparkles } from 'lucide-react';

interface ShareCardVisualProps {
  config: PrankConfig;
  /** Fixed dimensions optimized for export / OG capture */
  exportMode?: boolean;
  className?: string;
}

/**
 * Static visual card — no animations, safe for html-to-image capture.
 */
export const ShareCardVisual: React.FC<ShareCardVisualProps> = ({
  config,
  exportMode = false,
  className = '',
}) => {
  const themeLabel =
    APP_THEMES.find((t) => t.value === config.appTheme)?.label ?? config.appTheme;

  return (
    <div
      className={`share-card-preview app-theme-${config.appTheme} ${exportMode ? 'share-card-export' : ''} ${className}`.trim()}
      data-export-target={SHARE_CARD_EXPORT_ID}
      style={{ ['--accent-color' as string]: config.accentColor }}
    >
      <div className="share-card-badge">
        <Sparkles size={12} />
        PrankForge
      </div>
      <div className="share-card-type">{PRANK_TYPE_LABELS[config.prankType]}</div>
      <h3 className="share-card-title">{config.title || 'Broma sin título'}</h3>
      <p className="share-card-message">
        {config.message || 'Abrí el link para ver la simulación visual.'}
      </p>
      <div className="share-card-meta">
        <span>Tema: {themeLabel}</span>
        <span>·</span>
        <span>Intensidad {config.intensity}/10</span>
      </div>
      <div className="share-card-cta">Tocá para abrir la broma →</div>
      {exportMode && (
        <div className="share-card-footer-url">prankforge.app · broma visual inofensiva</div>
      )}
    </div>
  );
};
