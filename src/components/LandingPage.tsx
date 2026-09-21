import React from 'react';
import { motion } from 'framer-motion';
import { PRANK_TEMPLATES, PrankTemplate } from '../utils/templates';
import { getRandomTemplateConfig } from '../utils/examples';
import { HistoryItem } from '../hooks/useLocalStorage';
import { PrankConfig } from '../types/prank';
import { Dashboard } from './dashboard/Dashboard';
import { RecentPranksList } from './history/RecentPranksList';
import { Sparkles, Clock, Bookmark, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getCardVariants } from './shared/motionPresets';

interface LandingPageProps {
  onCreatePrank: (config?: PrankConfig) => void;
  history: HistoryItem[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ onCreatePrank, history }) => {
  const { settings, markGuideSeen } = useTheme();
  const reducedMotion = useReducedMotion();

  const handleRandomPrank = () => {
    onCreatePrank(getRandomTemplateConfig());
  };

  return (
    <div className="landing-container" style={{ zIndex: 5, position: 'relative' }}>
      <div className="landing-glow landing-glow-purple" />
      <div className="landing-glow landing-glow-cyan" />

      {/* Top Row: Tu Panel (Left) + Historial de Bromas (Right) */}
      <div className="landing-top-bar">
        <Dashboard
          history={history}
          onCreatePrank={onCreatePrank}
          onRandomPrank={handleRandomPrank}
          showGuide={!settings.hasSeenGuide}
          onShowGuide={markGuideSeen}
        />

        <motion.section
          initial={getCardVariants(reducedMotion).initial}
          animate={getCardVariants(reducedMotion).animate}
          className="glass-card history-panel-top"
          style={{
            border: '1px solid rgba(139, 92, 246, 0.2)',
            margin: 0,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            boxSizing: 'border-box',
            height: '100%',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
              <Clock size={18} style={{ color: 'var(--primary)' }} />
              Historial de bromas
            </h3>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              {history.length} guardada{history.length !== 1 ? 's' : ''}
            </span>
          </div>

          {history.length === 0 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px dashed var(--border)',
              }}
            >
              <Bookmark size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                Las bromas que configures o guardes aparecerán acá para que puedas abrirlas o editarlas en un toque.
              </p>
            </div>
          ) : (
            <div style={{ overflowY: 'auto', maxHeight: '110px' }}>
              <RecentPranksList
                items={history}
                onLoad={(item) => onCreatePrank(item.config)}
                limit={3}
              />
            </div>
          )}
        </motion.section>
      </div>

      {/* Main Section: 4-Column Template Gallery */}
      <section id="templates" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%' }}>
        <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h3 className="landing-section-title" style={{ fontSize: '1.35rem', textAlign: 'left', marginBottom: '0.15rem' }}>
              Elegí y personalizá en segundos
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'left', margin: 0 }}>
              Cada plantilla es 100% inofensiva y editable.
            </p>
          </div>

          <motion.div
            initial={getCardVariants(reducedMotion).initial}
            animate={getCardVariants(reducedMotion).animate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              color: 'var(--accent)',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            <Sparkles size={14} />
            <span>8 Plantillas listas</span>
          </motion.div>
        </div>

        <div className="template-grid">
          {PRANK_TEMPLATES.map((template: PrankTemplate, index) => {
            const motionProps = getCardVariants(reducedMotion, index);
            return (
              <motion.div
                key={template.id}
                initial={motionProps.initial}
                animate={motionProps.animate}
                transition={motionProps.transition}
                className="glass-card template-card"
                onClick={() => onCreatePrank(template.config)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.9rem' }}>{template.icon}</span>
                  <span className="template-use-badge">
                    Usar
                    <ChevronRight size={12} />
                  </span>
                </div>
                <div>
                  <h4 className="template-name">{template.name}</h4>
                  <p className="template-desc">{template.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
