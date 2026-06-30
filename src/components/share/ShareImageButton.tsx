import React from 'react';
import { Copy, Share2, Loader2 } from 'lucide-react';

interface ShareImageButtonProps {
  onCopy: () => void;
  onShare?: () => void;
  canCopy?: boolean;
  canShare?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const ShareImageButton: React.FC<ShareImageButtonProps> = ({
  onCopy,
  onShare,
  canCopy = true,
  canShare = false,
  disabled = false,
  loading = false,
}) => {
  if (canShare && onShare) {
    return (
      <button
        type="button"
        onClick={onShare}
        disabled={disabled || loading}
        className="btn-ghost btn-sm"
        aria-busy={loading}
      >
        {loading ? <Loader2 size={14} className="spin-icon" /> : <Share2 size={14} />}
        Compartir imagen
      </button>
    );
  }

  if (!canCopy) return null;

  return (
    <button
      type="button"
      onClick={onCopy}
      disabled={disabled || loading}
      className="btn-ghost btn-sm"
      aria-busy={loading}
    >
      {loading ? <Loader2 size={14} className="spin-icon" /> : <Copy size={14} />}
      Copiar imagen
    </button>
  );
};
