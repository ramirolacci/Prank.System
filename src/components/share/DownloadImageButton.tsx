import React from 'react';
import { ImageDown, Loader2 } from 'lucide-react';

interface DownloadImageButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const DownloadImageButton: React.FC<DownloadImageButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || loading}
    className="btn-secondary btn-sm"
    aria-busy={loading}
  >
    {loading ? <Loader2 size={14} className="spin-icon" /> : <ImageDown size={14} />}
    Descargar PNG
  </button>
);
