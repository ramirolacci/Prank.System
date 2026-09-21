import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Shuffle,
  Shield,
  BookOpen,
} from 'lucide-react';
import { PrankConfig } from '../../types/prank';
import { HistoryItem } from '../../hooks/useLocalStorage';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getCardVariants } from '../shared/motionPresets';

interface DashboardProps {
  history: HistoryItem[];
  onCreatePrank: (config?: PrankConfig) => void;
  onRandomPrank: () => void;
  onShowGuide?: () => void;
  showGuide?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  history,
  onCreatePrank,
  onRandomPrank,
  onShowGuide,
  showGuide = false,
}) => {
  const reducedMotion = useReducedMotion();
  const cardMotion = getCardVariants(reducedMotion);

  return (
    <motion.section
      className="dashboard glass-card"
      initial={cardMotion.initial}
      animate={cardMotion.animate}
      transition={cardMotion.transition}
      style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.9rem',
        justifyContent: 'center',
        margin: 0,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h2 className="dashboard-title" style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.2rem' }}>Tu panel</h2>
          <p className="dashboard-subtitle" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {history.length > 0
              ? `${history.length} broma${history.length !== 1 ? 's' : ''} guardada${history.length !== 1 ? 's' : ''} en este dispositivo`
              : 'Empezá creando tu primera broma visual'}
          </p>
        </div>

        <div className="dashboard-actions" style={{ display: 'flex', gap: '0.6rem', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => onCreatePrank()}
            className="btn-primary dashboard-action-btn"
            style={{
              padding: '0.6rem 1.1rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexShrink: 0,
            }}
          >
            <Plus size={17} />
            <span>Nueva broma</span>
          </button>
          <button
            type="button"
            onClick={onRandomPrank}
            className="btn-secondary dashboard-action-btn"
            style={{
              padding: '0.6rem 1rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexShrink: 0,
            }}
          >
            <Shuffle size={17} />
            <span>Aleatoria</span>
          </button>
        </div>
      </div>

      {showGuide && onShowGuide && (
        <div className="guide-banner" style={{ padding: '0.6rem 0.85rem', margin: 0 }}>
          <BookOpen size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '0.82rem' }}>¿Primera vez?</strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
              Elegí plantilla → personalizá → generá link → compartí.
            </span>
          </div>
          <button type="button" onClick={onShowGuide} className="btn-ghost btn-sm" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>
            Entendido
          </button>
        </div>
      )}

      {/* Security simulation note inside Tu Panel */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.65rem 0.9rem',
          borderRadius: '10px',
          background: 'rgba(6, 182, 212, 0.08)',
          border: '1px solid rgba(6, 182, 212, 0.2)',
          margin: 0,
        }}
      >
        <Shield size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
        <div style={{ textAlign: 'left', flex: 1 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginRight: '0.4rem' }}>
            Solo simulación visual:
          </span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
            Sin phishing, sin robo de datos, sin alterar tu sistema. Todo ocurre en el navegador y siempre podés salir con un toque.
          </span>
        </div>
      </div>
    </motion.section>
  );
};
