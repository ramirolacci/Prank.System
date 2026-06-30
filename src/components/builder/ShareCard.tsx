import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  ExternalLink,
  ImageDown,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { PrankConfig, PRANK_TYPE_LABELS } from '../../types/prank';
import { CopyLinkButton } from '../shared/CopyLinkButton';
import { getShortShareDisplay } from '../../utils/url';
import { APP_THEMES } from '../../utils/themes';

interface ShareCardProps {
  config: PrankConfig;
  shareUrl: string;
  onGenerate: () => void;
  onOpenPreview: () => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({
  config,
  shareUrl,
  onGenerate,
  onOpenPreview,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const themeLabel =
    APP_THEMES.find((t) => t.value === config.appTheme)?.label ?? config.appTheme;

  const whatsappText = encodeURIComponent(
    `Che, mirá esto que me apareció en pantalla... 😱 Es solo una broma visual, abrilo: ${shareUrl || ''}`
  );

  const handleDownloadImage = async () => {
    // Architecture ready for html-to-image integration later
    console.info('[ShareCard] Image export ready — integrate html-to-image when needed');
    alert(
      'La exportación de imagen estará disponible pronto. Por ahora podés copiar el link o compartir por WhatsApp.'
    );
  };

  if (!shareUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '1.25rem', textAlign: 'center' }}
      >
        <Share2 size={24} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Generá un link corto para compartir tu broma por WhatsApp o redes.
        </p>
        <button type="button" onClick={onGenerate} className="btn-primary">
          <Share2 size={16} />
          Generar link compartible
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {/* Social preview card */}
      <div
        ref={cardRef}
        className={`share-card-preview app-theme-${config.appTheme}`}
        data-export-target="share-card"
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
      </div>

      {/* Share actions */}
      <div className="glass-card bg-glow-purple" style={{ padding: '1.25rem', border: '1px solid var(--border-active)' }}>
        <h5
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Share2 size={14} style={{ color: 'var(--accent)' }} />
          ¡Tu broma está lista!
        </h5>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Copiá el link y mandalo por WhatsApp. Al abrirlo, la simulación arranca directo.
        </p>

        <div className="share-url-row">
          <input type="text" readOnly value={getShortShareDisplay(shareUrl)} className="input-field mono" title={shareUrl} />
          <CopyLinkButton url={shareUrl} />
        </div>

        <div className="share-actions-row">
          <button type="button" onClick={onOpenPreview} className="btn-secondary btn-sm">
            <ExternalLink size={14} />
            Abrir preview
          </button>
          <button type="button" onClick={handleDownloadImage} className="btn-ghost btn-sm">
            <ImageDown size={14} />
            Descargar imagen
          </button>
        </div>

        <div className="whatsapp-help">
          <MessageCircle size={14} style={{ color: '#25D366', flexShrink: 0 }} />
          <p>
            <strong>Tip WhatsApp:</strong> Pegá el link en un chat con un mensaje tipo "mirá qué
            raro me salió esto" para más efecto. Siempre es una broma visual inofensiva.
          </p>
        </div>

        <a
          href={`https://api.whatsapp.com/send?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-link"
        >
          💬 Compartir por WhatsApp
        </a>
      </div>
    </motion.div>
  );
};
