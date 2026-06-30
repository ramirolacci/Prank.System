import React from 'react';
import { Download, X, Share } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import { readStorage, writeStorage } from '../../hooks/useStorage';
import { PWA_INSTALL_DISMISS_KEY } from '../../pwa/AppManifestConfig';

interface PwaInstallButtonProps {
  compact?: boolean;
  className?: string;
}

export const PwaInstallButton: React.FC<PwaInstallButtonProps> = ({
  compact = false,
  className = '',
}) => {
  const { canInstall, promptInstall, isInstalled, showIOSInstructions } = usePwaInstall();

  if (isInstalled) return null;

  if (showIOSInstructions && !compact) {
    return (
      <button type="button" className={`btn-secondary btn-sm ${className}`} disabled title="En Safari: Compartir → Agregar a pantalla de inicio">
        <Share size={14} />
        Agregar a inicio (iOS)
      </button>
    );
  }

  if (!canInstall) return null;

  return (
    <button
      type="button"
      className={`btn-secondary ${compact ? 'btn-sm' : ''} ${className}`.trim()}
      onClick={() => promptInstall()}
    >
      <Download size={compact ? 14 : 16} />
      {compact ? 'Instalar' : 'Instalar app'}
    </button>
  );
};

interface PwaInstallBannerProps {
  className?: string;
}

export const PwaInstallBanner: React.FC<PwaInstallBannerProps> = ({ className = '' }) => {
  const { canInstall, promptInstall, isInstalled, showIOSInstructions, installOutcome } =
    usePwaInstall();
  const [dismissed, setDismissed] = React.useState(() =>
    readStorage<boolean>(PWA_INSTALL_DISMISS_KEY, false)
  );

  if (isInstalled || dismissed) return null;
  if (!canInstall && !showIOSInstructions) return null;

  const handleDismiss = () => {
    setDismissed(true);
    writeStorage(PWA_INSTALL_DISMISS_KEY, true);
  };

  return (
    <div className={`pwa-install-banner ${className}`.trim()} role="region" aria-label="Instalar aplicación">
      <div className="pwa-install-banner-icon">
        <Download size={20} style={{ color: 'var(--primary)' }} />
      </div>
      <div className="pwa-install-banner-content">
        <strong className="pwa-install-banner-title">Instalá PrankForge</strong>
        <p className="pwa-install-banner-desc">
          {showIOSInstructions
            ? 'En Safari, tocá Compartir → "Agregar a pantalla de inicio" para usarla como app.'
            : 'Accedé más rápido desde tu pantalla de inicio. Sin tienda, sin permisos raros.'}
        </p>
        {installOutcome === 'dismissed' && (
          <p className="pwa-install-banner-hint">Podés instalarla cuando quieras desde el menú del navegador.</p>
        )}
      </div>
      <div className="pwa-install-banner-actions">
        {canInstall && (
          <button type="button" className="btn-primary btn-sm" onClick={() => promptInstall()}>
            Instalar
          </button>
        )}
        <button
          type="button"
          className="icon-btn"
          onClick={handleDismiss}
          aria-label="Cerrar banner"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
