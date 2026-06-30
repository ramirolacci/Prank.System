import React from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Shuffle,
  Palette,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { PrankConfig } from '../../types/prank';
import { HistoryItem } from '../../hooks/useLocalStorage';
import { useTheme } from '../../context/ThemeProvider';
import { useSettingsUI } from '../../context/SettingsUIContext';
import { THEME_LABELS } from '../../theme/themeConfig';
import { RecentPranksList } from '../history/RecentPranksList';
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
  const { theme } = useTheme();
  const { openSettings } = useSettingsUI();
  const reducedMotion = useReducedMotion();
  const themeMeta = THEME_LABELS[theme];
  const cardMotion = getCardVariants(reducedMotion);

  return (
    <motion.section
      className="dashboard"
      initial={cardMotion.initial}
      animate={cardMotion.animate}
      transition={cardMotion.transition}
    >
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Tu panel</h2>
          <p className="dashboard-subtitle">
            {history.length > 0
              ? `${history.length} broma${history.length !== 1 ? 's' : ''} guardada${history.length !== 1 ? 's' : ''} en este dispositivo`
              : 'Empezá creando tu primera broma visual'}
          </p>
        </div>
        <div className="dashboard-theme-badge" onClick={openSettings} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openSettings()}>
          <Palette size={14} />
          <span>Tema: {themeMeta.label}</span>
        </div>
      </div>

      <div className="dashboard-actions">
        <button type="button" onClick={() => onCreatePrank()} className="btn-primary dashboard-action-btn">
          <Plus size={18} />
          Nueva broma
        </button>
        <button type="button" onClick={onRandomPrank} className="btn-secondary dashboard-action-btn">
          <Shuffle size={18} />
          Aleatoria
        </button>
      </div>

      {showGuide && onShowGuide && (
        <div className="guide-banner">
          <BookOpen size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: '0.85rem' }}>¿Primera vez?</strong>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              Elegí plantilla → personalizá → generá link → compartí. Siempre hay botón de salida.
            </p>
          </div>
          <button type="button" onClick={onShowGuide} className="btn-ghost btn-sm">
            Entendido
          </button>
        </div>
      )}

      <div className="dashboard-recent">
        <h3 className="dashboard-section-title">
          <Sparkles size={16} style={{ color: 'var(--primary)' }} />
          Recientes
        </h3>
        <RecentPranksList
          items={history.slice(0, 5)}
          onLoad={(item) => onCreatePrank(item.config)}
          limit={5}
        />
      </div>
    </motion.section>
  );
};
