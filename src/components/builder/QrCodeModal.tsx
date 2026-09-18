import React from 'react';
import { X, QrCode, ExternalLink, Copy } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ isOpen, onClose, url, title }) => {
  if (!isOpen) return null;

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    url
  )}&color=8b5cf6&bgcolor=0e1117`;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card animate-scale-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '420px',
          width: '100%',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#0e1117',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          borderRadius: '20px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          <X size={20} />
        </button>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            color: 'var(--accent)',
            marginBottom: '1rem',
          }}
        >
          <QrCode size={24} />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
          Escanear Código QR
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Escaneá con la cámara de tu celular para probar la broma en vivo.
        </p>

        <div
          style={{
            backgroundColor: '#0a0d14',
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'inline-block',
            marginBottom: '1.5rem',
          }}
        >
          <img
            src={qrImageUrl}
            alt="QR Code de la Broma"
            style={{ width: '200px', height: '200px', borderRadius: '8px', display: 'block' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => window.open(url, '_blank')}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              borderRadius: '10px',
              backgroundColor: 'var(--primary)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={16} />
            <span>Abrir en otra pestaña</span>
          </button>
        </div>
      </div>
    </div>
  );
};
