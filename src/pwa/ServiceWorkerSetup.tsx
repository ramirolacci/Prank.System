import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

/**
 * Registers the service worker and shows update toast when a new version is available.
 */
export function ServiceWorkerSetup() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(registration) {
      if (registration) {
        console.info('[PWA] Service worker registered');
      }
    },
    onRegisterError(error) {
      console.warn('[PWA] Service worker registration failed:', error);
    },
  });

  if (!needRefresh) return null;

  return (
    <div className="pwa-update-toast" role="alert">
      <RefreshCw size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: '0.8rem' }}>
        Hay una nueva versión de PrankForge disponible.
      </span>
      <button
        type="button"
        className="btn-primary btn-sm"
        onClick={() => updateServiceWorker(true)}
      >
        Actualizar
      </button>
      <button
        type="button"
        className="icon-btn"
        onClick={() => setNeedRefresh(false)}
        aria-label="Cerrar"
        style={{ width: 28, height: 28 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
