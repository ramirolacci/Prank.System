import React from 'react';
import { PrankConfig } from '../../types/prank';
import { ShareCardVisual } from '../share/ShareCardVisual';
import { generateShareUrl } from '../../utils/url';
import { Flame, ExternalLink, ArrowLeft } from 'lucide-react';

interface SocialPreviewPageProps {
  config: PrankConfig;
  onOpenPrank: () => void;
  onNavigateHome: () => void;
}

/**
 * Dedicated social preview view — separate from prank runtime.
 * URL: ?p=...&mode=social
 */
export const SocialPreviewPage: React.FC<SocialPreviewPageProps> = ({
  config,
  onOpenPrank,
  onNavigateHome,
}) => {
  const shareUrl = generateShareUrl(config);

  return (
    <div className="social-preview-page">
      <header className="social-preview-header">
        <button type="button" onClick={onNavigateHome} className="btn-ghost btn-sm">
          <ArrowLeft size={16} />
          Inicio
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Flame size={18} style={{ color: 'var(--primary)' }} />
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Vista social</span>
        </div>
      </header>

      <main className="social-preview-main">
        <p className="social-preview-intro">
          Así se ve la preview al compartir. La broma sigue siendo 100% visual e inofensiva.
        </p>

        <div className="social-preview-card-wrap">
          <ShareCardVisual config={config} exportMode />
        </div>

        <div className="social-preview-actions">
          <button type="button" onClick={onOpenPrank} className="btn-primary">
            <ExternalLink size={16} />
            Abrir broma
          </button>
        </div>

        <p className="social-preview-url" title={shareUrl}>
          {shareUrl}
        </p>
      </main>
    </div>
  );
};
