import React from 'react';
import { motion } from 'framer-motion';
import { PRANK_TEMPLATES, PrankTemplate } from '../utils/templates';
import { getRandomTemplateConfig } from '../utils/examples';
import { HistoryItem } from '../hooks/useLocalStorage';
import { PrankConfig } from '../types/prank';
import { Dashboard } from './dashboard/Dashboard';
import { Sparkles, Shield, ChevronRight } from 'lucide-react';
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
        className="glass-card security-banner"
        style={{ maxWidth: '850px', margin: '0 auto', width: '100%', border: '1px solid rgba(6, 182, 212, 0.15)' }}
      >
        <div className="security-icon-wrap">
          <Shield size={24} style={{ color: 'var(--accent)' }} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
            Solo simulación visual
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Sin phishing, sin robo de datos, sin alterar tu sistema. Todo ocurre en el navegador y
            siempre podés salir con un toque.
          </p>
        </div>
      </motion.section>

      <section id="templates" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}>
          <motion.div
            initial={getCardVariants(reducedMotion).initial}
            animate={getCardVariants(reducedMotion).animate}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              borderRadius: '999px',
              background: 'rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              color: 'var(--accent)',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            <span>Plantillas populares</span>
          </motion.div>
          <h3 className="landing-section-title">Elegí y personalizá en segundos</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Cada plantilla es 100% inofensiva y editable.
          </p>
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
                  <span style={{ fontSize: '2rem' }}>{template.icon}</span>
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
