import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyLinkButtonProps {
  url: string;
  label?: string;
  copiedLabel?: string;
  compact?: boolean;
}

export const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({
  url,
  label = 'Copiar link',
  copiedLabel = '¡Copiado!',
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Error copying link:', err));
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!url}
      className="btn-interactive"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: compact ? '0.6rem 0.9rem' : '0.75rem 1.25rem',
        borderRadius: '8px',
        backgroundColor: copied ? 'var(--success)' : 'rgba(255, 255, 255, 0.04)',
        color: '#fff',
        fontWeight: 600,
        fontSize: compact ? '0.8rem' : '0.85rem',
        border: copied ? 'none' : '1px solid var(--border)',
        cursor: url ? 'pointer' : 'not-allowed',
        transition: 'all 0.2s ease',
        minWidth: compact ? 'auto' : '110px',
        opacity: url ? 1 : 0.5,
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
};
