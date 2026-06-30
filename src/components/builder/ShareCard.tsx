import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Share2,
  ExternalLink,
  MessageCircle,
  Eye,
} from 'lucide-react';
import { PrankConfig } from '../../types/prank';
import { CopyLinkButton } from '../shared/CopyLinkButton';
import { getShortShareDisplay } from '../../utils/url';
import { ShareCardExporter } from '../share/ShareCardExporter';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface ShareCardProps {
  config: PrankConfig;
  shareUrl: string;
  onGenerate: () => void;
  onOpenPreview: () => void;
  onOpenSocialPreview?: () => void;
}

export const ShareCard: React.FC<ShareCardProps> = ({
  config,
  shareUrl,
  onGenerate,
  onOpenPreview,
  onOpenSocialPreview,
}) => {
  const reducedMotion = useReducedMotionPreference();

  const whatsappText = encodeURIComponent(
    `Che, mirá esto que me apareció en pantalla... 😱 Es solo una broma visual, abrilo: ${shareUrl || ''}`
  );

  if (!shareUrl) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
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
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.25 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <ShareCardExporter config={config} />

      <div
        className="glass-card bg-glow-purple"
        style={{ padding: '1.25rem', border: '1px solid var(--border-active)' }}
      >
        <h5 className="share-card-actions-title">
          <Share2 size={14} style={{ color: 'var(--accent)' }} />
          ¡Tu broma está lista!
        </h5>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Copiá el link, descargá la imagen o compartila directo. Al abrir el link, la simulación
          arranca sola.
        </p>

        <div className="share-url-row">
          <input
            type="text"
            readOnly
            value={getShortShareDisplay(shareUrl)}
            className="input-field mono"
            title={shareUrl}
          />
          <CopyLinkButton url={shareUrl} />
        </div>

        <div className="share-actions-row">
          <button type="button" onClick={onOpenPreview} className="btn-secondary btn-sm">
            <ExternalLink size={14} />
            Probar broma
          </button>
          {onOpenSocialPreview && (
            <button type="button" onClick={onOpenSocialPreview} className="btn-ghost btn-sm">
              <Eye size={14} />
              Vista social
            </button>
          )}
        </div>

        <div className="whatsapp-help">
          <MessageCircle size={14} style={{ color: '#25D366', flexShrink: 0 }} />
          <p>
            <strong>Tip WhatsApp:</strong> Mandá el link o la imagen PNG. Siempre es una broma
            visual inofensiva con botón de salida.
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
